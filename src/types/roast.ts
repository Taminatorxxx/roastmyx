export type CreatorArchetype =
  | "Reply Goblin"
  | "Trend Chaser"
  | "Hidden Genius"
  | "Founder Mode"
  | "AI NPC"
  | "Crypto DeGen"
  | "Main Character"
  | "Underrated Builder"
  | "Professional Lurker"
  | "Algorithm Victim"
  | "Thought Leader Lite"
  | "Hot Take Merchant"
  | "Quiet Operator"
  | "Engagement Farmer"
  | "Niche Oracle";

export interface TweetData {
  id: string;
  text: string;
  createdAt: string;
  likeCount: number;
  retweetCount: number;
  replyCount: number;
  impressionCount?: number;
}

export interface XProfile {
  id: string;
  username: string;
  name: string;
  bio: string;
  profileImageUrl: string;
  bannerUrl?: string;
  followersCount: number;
  followingCount: number;
  tweetCount: number;
  verified: boolean;
  createdAt: string;
  location?: string;
  url?: string;
  recentTweets: TweetData[];
}

export interface ScoreBreakdown {
  overall: number;
  profile: number;
  content: number;
  hook: number;
  consistency: number;
  originality: number;
  virality: number;
  authority: number;
  personalBrand: number;
}

export interface RoastAnalysis {
  scores: ScoreBreakdown;
  biggestCrime: string;
  biggestStrength: string;
  thirtyDayPlan: string;
  threeFixes: [string, string, string];
  embarrassedTweet: string;
  pinTweet: string;
  archetype: CreatorArchetype;
  roastQuote: string;
  fullRoast: string;
  badge: string;
  analysisNotes: string[];
}

export interface RoastResult {
  profile: XProfile;
  analysis: RoastAnalysis;
  generatedAt: string;
  isDemo: boolean;
}

export interface RoastRequest {
  username: string;
}

export interface RoastApiResponse {
  success: true;
  data: RoastResult;
}

export interface RoastApiError {
  success: false;
  error: string;
  code?: string;
}
