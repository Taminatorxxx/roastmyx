export const APP_NAME = "RoastMyX";
export const APP_TAGLINE = "Your X account, roasted by AI.";
export const APP_DESCRIPTION =
  "Enter your X username. Get a brutally funny, constructive roast of your profile, content, and personal brand. Spotify Wrapped meets Duolingo roast.";
export const APP_DOMAIN = "roastmyx.ai";

export const LOADING_MESSAGES = [
  "Reading your terrible hooks...",
  "Finding your least funny tweet...",
  "Calculating cringe levels...",
  "Consulting the algorithm...",
  "Judging your bio...",
  "Reading your replies...",
  "Training my sarcasm...",
  "Scanning for founder cosplay...",
  "Measuring main character energy...",
  "Detecting engagement farming...",
  "Rating your profile pic choices...",
  "Counting how many times you said 'building'...",
  "Checking if you're a Reply Goblin...",
  "Almost done...",
  "Writing something you'll screenshot...",
] as const;

export const ARCHETYPES = [
  "Reply Goblin",
  "Trend Chaser",
  "Hidden Genius",
  "Founder Mode",
  "AI NPC",
  "Crypto DeGen",
  "Main Character",
  "Underrated Builder",
  "Professional Lurker",
  "Algorithm Victim",
  "Thought Leader Lite",
  "Hot Take Merchant",
  "Quiet Operator",
  "Engagement Farmer",
  "Niche Oracle",
] as const;

export const FEATURES = [
  {
    title: "Share to X",
    description: "One-tap roast flex for maximum timeline damage.",
    status: "live" as const,
  },
  {
    title: "Download PNG",
    description: "Story-ready cards for IG, LinkedIn, and TikTok.",
    status: "live" as const,
  },
  {
    title: "Copy Roast",
    description: "Paste the full roast anywhere. Weaponized wit.",
    status: "live" as const,
  },
  {
    title: "Challenge a Friend",
    description: "Send them into the fire. Friendship is optional.",
    status: "soon" as const,
  },
  {
    title: "Compare Two Accounts",
    description: "Head-to-head roast battles. Who survives?",
    status: "soon" as const,
  },
  {
    title: "Leaderboard",
    description: "Daily worst roasts and roast of the day.",
    status: "soon" as const,
  },
] as const;

export const RATE_LIMIT = {
  windowMs: 60_000,
  maxRequests: 8,
} as const;
