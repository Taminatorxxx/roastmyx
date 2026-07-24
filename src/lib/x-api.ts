import type { TweetData, XProfile } from "@/types/roast";
import { createDemoProfile } from "./mock-data";

const X_API_BASE = "https://api.x.com/2";

interface XUserResponse {
  data?: {
    id: string;
    name: string;
    username: string;
    description?: string;
    profile_image_url?: string;
    profile_banner_url?: string;
    verified?: boolean;
    created_at?: string;
    location?: string;
    url?: string;
    public_metrics?: {
      followers_count?: number;
      following_count?: number;
      tweet_count?: number;
    };
  };
  errors?: Array<{ detail?: string; title?: string }>;
}

interface XTweetsResponse {
  data?: Array<{
    id: string;
    text: string;
    created_at?: string;
    public_metrics?: {
      like_count?: number;
      retweet_count?: number;
      reply_count?: number;
      impression_count?: number;
    };
  }>;
  errors?: Array<{ detail?: string; title?: string }>;
}

function getBearerToken(): string | undefined {
  return (
    process.env.X_BEARER_TOKEN ||
    process.env.TWITTER_BEARER_TOKEN ||
    undefined
  );
}

export function isXApiConfigured(): boolean {
  return Boolean(getBearerToken());
}

async function xFetch<T>(path: string): Promise<T> {
  const token = getBearerToken();
  if (!token) {
    throw new Error("X API not configured");
  }

  const res = await fetch(`${X_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "RoastMyX/1.0",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`X API ${res.status}: ${body.slice(0, 200)}`);
  }

  return res.json() as Promise<T>;
}

function mapTweets(data: XTweetsResponse["data"]): TweetData[] {
  if (!data?.length) return [];
  return data.map((t) => ({
    id: t.id,
    text: t.text,
    createdAt: t.created_at || new Date().toISOString(),
    likeCount: t.public_metrics?.like_count ?? 0,
    retweetCount: t.public_metrics?.retweet_count ?? 0,
    replyCount: t.public_metrics?.reply_count ?? 0,
    impressionCount: t.public_metrics?.impression_count,
  }));
}

export async function fetchXProfile(
  username: string
): Promise<{ profile: XProfile; isDemo: boolean }> {
  const clean = username.replace(/^@/, "").toLowerCase();

  if (!isXApiConfigured()) {
    return { profile: createDemoProfile(clean), isDemo: true };
  }

  try {
    const userFields = [
      "description",
      "profile_image_url",
      "public_metrics",
      "verified",
      "created_at",
      "location",
      "url",
    ].join(",");

    const user = await xFetch<XUserResponse>(
      `/users/by/username/${encodeURIComponent(clean)}?user.fields=${userFields}`
    );

    if (!user.data?.id) {
      const msg = user.errors?.[0]?.detail || "User not found";
      throw new Error(msg);
    }

    const tweetFields = ["created_at", "public_metrics"].join(",");
    let tweets: TweetData[] = [];

    try {
      const timeline = await xFetch<XTweetsResponse>(
        `/users/${user.data.id}/tweets?max_results=20&exclude=retweets,replies&tweet.fields=${tweetFields}`
      );
      tweets = mapTweets(timeline.data);
    } catch {
      tweets = [];
    }

    const metrics = user.data.public_metrics;
    const avatar =
      user.data.profile_image_url?.replace("_normal", "_400x400") ||
      `https://api.dicebear.com/9.x/avataaars/png?seed=${encodeURIComponent(clean)}&size=200`;

    const profile: XProfile = {
      id: user.data.id,
      username: user.data.username,
      name: user.data.name,
      bio: user.data.description || "",
      profileImageUrl: avatar,
      bannerUrl: user.data.profile_banner_url,
      followersCount: metrics?.followers_count ?? 0,
      followingCount: metrics?.following_count ?? 0,
      tweetCount: metrics?.tweet_count ?? 0,
      verified: Boolean(user.data.verified),
      createdAt: user.data.created_at || new Date().toISOString(),
      location: user.data.location,
      url: user.data.url,
      recentTweets: tweets,
    };

    return { profile, isDemo: false };
  } catch (error) {
    if (process.env.ALLOW_DEMO_FALLBACK !== "false") {
      console.warn(
        "[x-api] Falling back to demo profile:",
        error instanceof Error ? error.message : error
      );
      return { profile: createDemoProfile(clean), isDemo: true };
    }
    throw error;
  }
}
