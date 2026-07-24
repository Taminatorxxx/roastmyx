import type { XProfile } from "@/types/roast";

const DEMO_PROFILES: Record<string, Partial<XProfile>> = {
  elonmusk: {
    name: "Elon Musk",
    bio: "Formally known as Dogecoin, but now I'm just a humble meme lord running multiple companies while posting at 3am.",
    followersCount: 200_000_000,
    followingCount: 700,
    tweetCount: 45_000,
    verified: true,
    recentTweets: [
      {
        id: "1",
        text: "Interesting",
        createdAt: new Date(Date.now() - 3600_000).toISOString(),
        likeCount: 250_000,
        retweetCount: 30_000,
        replyCount: 40_000,
      },
      {
        id: "2",
        text: "The most entertaining outcome is the most likely",
        createdAt: new Date(Date.now() - 7200_000).toISOString(),
        likeCount: 180_000,
        retweetCount: 22_000,
        replyCount: 15_000,
      },
      {
        id: "3",
        text: "Working on something fun",
        createdAt: new Date(Date.now() - 86_400_000).toISOString(),
        likeCount: 95_000,
        retweetCount: 8_000,
        replyCount: 12_000,
      },
    ],
  },
  levelsio: {
    name: "Pieter Levels",
    bio: "Building in public. Digital nomad. Indie maker. Ship or die.",
    followersCount: 500_000,
    followingCount: 1_200,
    tweetCount: 28_000,
    verified: true,
    recentTweets: [
      {
        id: "1",
        text: "Just shipped a new feature in 4 hours. Don't overthink it.",
        createdAt: new Date(Date.now() - 3600_000).toISOString(),
        likeCount: 4_200,
        retweetCount: 320,
        replyCount: 180,
      },
      {
        id: "2",
        text: "Revenue update: another $1k day. Keep building.",
        createdAt: new Date(Date.now() - 86_400_000).toISOString(),
        likeCount: 8_100,
        retweetCount: 540,
        replyCount: 290,
      },
      {
        id: "3",
        text: "Most startups fail because they don't ship. That's it.",
        createdAt: new Date(Date.now() - 172_800_000).toISOString(),
        likeCount: 12_000,
        retweetCount: 1_100,
        replyCount: 450,
      },
    ],
  },
  taminatorxx: {
    name: "Taminator",
    bio: "Building cool things. AI · Product · Vibes. Always shipping.",
    followersCount: 2_400,
    followingCount: 890,
    tweetCount: 1_200,
    verified: false,
    recentTweets: [
      {
        id: "1",
        text: "Shipping something wild this week. Stay tuned.",
        createdAt: new Date(Date.now() - 7200_000).toISOString(),
        likeCount: 42,
        retweetCount: 5,
        replyCount: 8,
      },
      {
        id: "2",
        text: "Hot take: most SaaS landing pages are just vibes and a waitlist.",
        createdAt: new Date(Date.now() - 86_400_000).toISOString(),
        likeCount: 128,
        retweetCount: 14,
        replyCount: 22,
      },
      {
        id: "3",
        text: "Just spent 3 hours perfecting a gradient. Worth it.",
        createdAt: new Date(Date.now() - 259_200_000).toISOString(),
        likeCount: 67,
        retweetCount: 3,
        replyCount: 11,
      },
    ],
  },
};

function hashUsername(username: string): number {
  let h = 0;
  for (let i = 0; i < username.length; i++) {
    h = (h * 31 + username.charCodeAt(i)) >>> 0;
  }
  return h;
}

function generateMockTweets(username: string, seed: number) {
  const templates = [
    `Just shipped something for @${username}'s brand. Thoughts?`,
    "Unpopular opinion: consistency beats virality every single time.",
    "Building in public is hard when the public doesn't care (yet).",
    "If your hook needs a thread, your hook failed.",
    "Day 47 of posting daily. The algorithm still ignores me.",
    "Hot take: your bio is a landing page. Make it convert.",
    "Stopped doomscrolling. Started shipping. Still doomscrolling a little.",
    "This post will flop and I'm posting it anyway.",
  ];

  return templates.slice(0, 6).map((text, i) => ({
    id: `${seed}-${i}`,
    text,
    createdAt: new Date(Date.now() - (i + 1) * 36_000_000).toISOString(),
    likeCount: ((seed + i * 17) % 500) + 5,
    retweetCount: ((seed + i * 7) % 80) + 1,
    replyCount: ((seed + i * 11) % 60) + 1,
  }));
}

export function createDemoProfile(username: string): XProfile {
  const lower = username.toLowerCase();
  const preset = DEMO_PROFILES[lower];
  const seed = hashUsername(lower);
  const followers =
    preset?.followersCount ?? 100 + (seed % 50_000);
  const following =
    preset?.followingCount ?? 50 + (seed % 2_000);

  return {
    id: `demo-${seed}`,
    username: lower,
    name: preset?.name ?? username.charAt(0).toUpperCase() + username.slice(1),
    bio:
      preset?.bio ??
      "Building the future · Founder · AI enthusiast · Views are my own (and occasionally good)",
    profileImageUrl: `https://api.dicebear.com/9.x/avataaars/png?seed=${encodeURIComponent(lower)}&size=200`,
    bannerUrl: undefined,
    followersCount: followers,
    followingCount: following,
    tweetCount: preset?.tweetCount ?? 200 + (seed % 8_000),
    verified: preset?.verified ?? seed % 5 === 0,
    createdAt: new Date(
      Date.now() - (365 + (seed % 2000)) * 86_400_000
    ).toISOString(),
    location: seed % 2 === 0 ? "Internet" : undefined,
    recentTweets: preset?.recentTweets ?? generateMockTweets(lower, seed),
  };
}

export const USE_DEMO_WHEN_NO_TOKEN = true;
