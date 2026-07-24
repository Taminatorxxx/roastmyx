import OpenAI from "openai";
import type {
  CreatorArchetype,
  RoastAnalysis,
  ScoreBreakdown,
  XProfile,
} from "@/types/roast";
import { ARCHETYPES } from "./constants";
import { formatNumber } from "./utils";

const DEFAULT_MODEL = process.env.XAI_MODEL || "grok-4-1-fast-non-reasoning";

function getClient(): OpenAI | null {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({
    apiKey,
    baseURL: "https://api.x.ai/v1",
  });
}

function profileContext(profile: XProfile): string {
  const tweets = profile.recentTweets
    .slice(0, 12)
    .map(
      (t, i) =>
        `${i + 1}. "${t.text}" (❤${t.likeCount} 🔁${t.retweetCount} 💬${t.replyCount})`
    )
    .join("\n");

  return `
Username: @${profile.username}
Name: ${profile.name}
Bio: ${profile.bio || "(empty)"}
Followers: ${formatNumber(profile.followersCount)}
Following: ${formatNumber(profile.followingCount)}
Tweet count: ${formatNumber(profile.tweetCount)}
Verified: ${profile.verified}
Account created: ${profile.createdAt}
Location: ${profile.location || "n/a"}

Recent tweets:
${tweets || "(no recent public tweets available)"}
`.trim();
}

const SYSTEM_PROMPT = `You are RoastMyX — an elite stand-up comedian who also works as a personal brand growth consultant for creators on X (Twitter).

Your job: roast a PUBLIC X profile in a way that is:
- 80% funny, 20% educational
- Brutally honest about CONTENT, posting patterns, hooks, bio, brand positioning
- NEVER hateful, never targets protected characteristics (race, gender, religion, disability, sexuality, nationality, etc.)
- NEVER insult the person as a human — only their content strategy, vibes, and execution
- Constructive: every jab should imply a better path
- Shareable: lines people will screenshot

Tone: sharp, witty, modern internet culture, slightly unhinged but professional enough for Product Hunt.

Creator archetypes you may assign (pick exactly one):
${ARCHETYPES.join(", ")}

Respond with VALID JSON only (no markdown fences) matching this schema exactly:
{
  "scores": {
    "overall": 0-100,
    "profile": 0-100,
    "content": 0-100,
    "hook": 0-100,
    "consistency": 0-100,
    "originality": 0-100,
    "virality": 0-100,
    "authority": 0-100,
    "personalBrand": 0-100
  },
  "biggestCrime": "string (1-2 sentences, hilarious)",
  "biggestStrength": "string (1-2 sentences)",
  "thirtyDayPlan": "string starting with energy like 'If I had your account for 30 days...'",
  "threeFixes": ["fix1", "fix2", "fix3"],
  "embarrassedTweet": "string describing or quoting the tweet they're probably embarrassed by (or invent a plausible pattern if few tweets)",
  "pinTweet": "string describing the tweet strategy/content you'd pin",
  "archetype": "one of the archetypes listed",
  "roastQuote": "one killer one-liner under 140 chars for the share card",
  "fullRoast": "2-4 paragraph roast narrative",
  "badge": "short punchy badge title like 'Certified Mid' or 'Hook Hazard' or 'Silent Killer'",
  "analysisNotes": ["short insight 1", "short insight 2", "short insight 3"]
}

Scoring guide:
- 90-100: elite operator
- 70-89: strong with clear gaps
- 50-69: mid — salvageable
- 30-49: rough — needs intervention
- 0-29: algorithm victim / professional lurker energy

Be specific to the actual bio and tweets when available. Avoid generic roasts.`;

function clampScore(n: unknown, fallback = 50): number {
  const v = typeof n === "number" ? n : Number(n);
  if (!Number.isFinite(v)) return fallback;
  return Math.max(0, Math.min(100, Math.round(v)));
}

function normalizeScores(raw: Partial<ScoreBreakdown> | undefined): ScoreBreakdown {
  const scores: ScoreBreakdown = {
    overall: clampScore(raw?.overall, 55),
    profile: clampScore(raw?.profile, 55),
    content: clampScore(raw?.content, 50),
    hook: clampScore(raw?.hook, 48),
    consistency: clampScore(raw?.consistency, 52),
    originality: clampScore(raw?.originality, 50),
    virality: clampScore(raw?.virality, 45),
    authority: clampScore(raw?.authority, 48),
    personalBrand: clampScore(raw?.personalBrand, 50),
  };

  if (!raw?.overall) {
    const keys: (keyof ScoreBreakdown)[] = [
      "profile",
      "content",
      "hook",
      "consistency",
      "originality",
      "virality",
      "authority",
      "personalBrand",
    ];
    const avg =
      keys.reduce((sum, k) => sum + scores[k], 0) / keys.length;
    scores.overall = Math.round(avg);
  }

  return scores;
}

function isArchetype(v: unknown): v is CreatorArchetype {
  return typeof v === "string" && (ARCHETYPES as readonly string[]).includes(v);
}

function parseAnalysis(raw: string): RoastAnalysis {
  const cleaned = raw
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = JSON.parse(cleaned) as Partial<RoastAnalysis>;
  const three = Array.isArray(parsed.threeFixes)
    ? parsed.threeFixes.filter((x): x is string => typeof x === "string")
    : [];

  while (three.length < 3) {
    three.push("Post less, say more. One idea per tweet.");
  }

  return {
    scores: normalizeScores(parsed.scores),
    biggestCrime:
      parsed.biggestCrime ||
      "Treating your timeline like a private diary the algorithm is forced to ignore.",
    biggestStrength:
      parsed.biggestStrength ||
      "You actually show up — most people ghost their own brand.",
    thirtyDayPlan:
      parsed.thirtyDayPlan ||
      "If I had your account for 30 days, I'd delete half the noise, pin a proof post, and make every hook earn its place.",
    threeFixes: [three[0], three[1], three[2]],
    embarrassedTweet:
      parsed.embarrassedTweet ||
      "That vague 'something big is coming' post with zero follow-through.",
    pinTweet:
      parsed.pinTweet ||
      "A single sharp proof-of-work post that shows who you help and why they should care.",
    archetype: isArchetype(parsed.archetype)
      ? parsed.archetype
      : "Algorithm Victim",
    roastQuote:
      (parsed.roastQuote || "Your content is a LinkedIn post wearing a streetwear hoodie.")
        .slice(0, 160),
    fullRoast:
      parsed.fullRoast ||
      "Your account has potential trapped under layers of safe posts and soft hooks. The timeline doesn't reward vibes — it rewards clarity, tension, and receipts.",
    badge: parsed.badge || "Certified Roastable",
    analysisNotes: Array.isArray(parsed.analysisNotes)
      ? parsed.analysisNotes.filter((x): x is string => typeof x === "string").slice(0, 5)
      : ["Hooks need sharper first lines", "Bio under-sells the offer", "Consistency beats random bangers"],
  };
}

function heuristicRoast(profile: XProfile): RoastAnalysis {
  const followers = profile.followersCount;
  const following = profile.followingCount;
  const ratio = following > 0 ? followers / following : followers;
  const bioLen = profile.bio.length;
  const tweetCount = profile.recentTweets.length;
  const avgLikes =
    tweetCount > 0
      ? profile.recentTweets.reduce((s, t) => s + t.likeCount, 0) / tweetCount
      : 0;

  const profileScore = clampScore(
    (bioLen > 20 ? 20 : bioLen) +
      (profile.verified ? 15 : 5) +
      Math.min(40, Math.log10(followers + 1) * 12) +
      (ratio > 1 ? 15 : 5)
  );

  const contentScore = clampScore(
    30 +
      Math.min(35, avgLikes / 10) +
      (tweetCount >= 5 ? 15 : tweetCount * 2) +
      (bioLen > 40 ? 10 : 0)
  );

  const hookScore = clampScore(
    25 +
      (profile.recentTweets.some((t) => t.text.length < 120) ? 20 : 5) +
      Math.min(30, avgLikes / 8) +
      (bioLen > 10 && bioLen < 160 ? 15 : 5)
  );

  const consistency = clampScore(40 + (tweetCount >= 6 ? 30 : tweetCount * 4) + (profile.tweetCount > 500 ? 15 : 5));
  const originality = clampScore(35 + (bioLen > 50 ? 20 : 10) + (ratio > 2 ? 15 : 5) + Math.min(20, avgLikes / 15));
  const virality = clampScore(20 + Math.min(50, Math.log10(avgLikes + 1) * 18) + Math.min(20, Math.log10(followers + 1) * 5));
  const authority = clampScore(
    Math.min(90, Math.log10(followers + 1) * 18) + (profile.verified ? 10 : 0)
  );
  const personalBrand = clampScore((profileScore + contentScore + originality) / 3);

  const scores = normalizeScores({
    profile: profileScore,
    content: contentScore,
    hook: hookScore,
    consistency,
    originality,
    virality,
    authority,
    personalBrand,
  });

  let archetype: CreatorArchetype = "Algorithm Victim";
  if (followers > 100_000 && avgLikes > 1000) archetype = "Main Character";
  else if (following > followers * 2) archetype = "Professional Lurker";
  else if (/ai|gpt|llm|build/i.test(profile.bio)) archetype = "Founder Mode";
  else if (/crypto|nft|web3|degen/i.test(profile.bio)) archetype = "Crypto DeGen";
  else if (avgLikes < 5 && tweetCount > 0) archetype = "Underrated Builder";
  else if (ratio < 0.3) archetype = "Reply Goblin";
  else if (followers > 10_000) archetype = "Thought Leader Lite";
  else archetype = "Hidden Genius";

  const roastQuote =
    scores.overall >= 75
      ? `Somehow @${profile.username} is cooking — the algorithm just hasn't RSVP'd yet.`
      : `Your bio promises a brand. Your tweets deliver a group chat.`;

  return {
    scores,
    biggestCrime:
      bioLen < 15
        ? "An empty bio is a closed store with the lights on."
        : "Posting like the algorithm owes you attention for existing.",
    biggestStrength:
      followers > 5000
        ? "You already have an audience. Most people would kill for that distribution."
        : "There's a pulse here — you're not a ghost account, which is already ahead of half of X.",
    thirtyDayPlan: `If I had your account for 30 days, I'd rewrite the bio into a one-line offer, pin a receipts post, cut low-signal tweets, and force one sharp hook per day until the timeline notices.`,
    threeFixes: [
      "Rewrite your bio as: who you help + how + proof.",
      "Open every tweet with tension, not throat-clearing.",
      "Ship one concrete win publicly every week — screenshots > slogans.",
    ],
    embarrassedTweet:
      profile.recentTweets[profile.recentTweets.length - 1]?.text ||
      "That vague 'building something' post that never shipped a sequel.",
    pinTweet:
      "A pinned post with a clear offer, social proof, and one unforgettable line.",
    archetype,
    roastQuote,
    fullRoast: `@${profile.username} walks into the timeline with ${formatNumber(followers)} followers and the energy of someone who believes vibes are a growth strategy. The bio ${bioLen ? `says "${profile.bio.slice(0, 80)}${profile.bio.length > 80 ? "…" : ""}"` : "is basically a blank stare"}.

Your content ${avgLikes < 20 ? "isn't failing because you're boring — it's failing because it's safe. Safe doesn't travel." : "gets some motion, but the hooks are leaving free performance on the table."}

This isn't personal. It's product. Your account is a product page. Right now it converts curiosity into a shrug. Fix the first line, show receipts, pick a lane, and stop whispering at the algorithm like it might hear you if you're polite enough.`,
    badge:
      scores.overall >= 80
        ? "Main Character"
        : scores.overall >= 60
          ? "Almost Dangerous"
          : scores.overall >= 40
            ? "Certified Mid"
            : "Algorithm Victim",
    analysisNotes: [
      `Follower/following ratio: ${ratio.toFixed(2)}`,
      `Avg likes on sample: ${Math.round(avgLikes)}`,
      `Archetype lean: ${archetype}`,
    ],
  };
}

export async function generateRoast(profile: XProfile): Promise<RoastAnalysis> {
  const client = getClient();

  if (!client) {
    return heuristicRoast(profile);
  }

  try {
    const completion = await client.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: 0.9,
      max_tokens: 2000,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Roast this X account:\n\n${profileContext(profile)}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return heuristicRoast(profile);
    }

    return parseAnalysis(content);
  } catch (error) {
    console.error(
      "[ai-roast] xAI failed, using heuristic:",
      error instanceof Error ? error.message : error
    );
    return heuristicRoast(profile);
  }
}

export function formatRoastAsText(
  username: string,
  analysis: RoastAnalysis
): string {
  return `🔥 RoastMyX — @${username}

Overall: ${analysis.scores.overall}/100 · ${analysis.archetype}
"${analysis.roastQuote}"

Biggest crime: ${analysis.biggestCrime}
Biggest strength: ${analysis.biggestStrength}

${analysis.thirtyDayPlan}

Three fixes:
1. ${analysis.threeFixes[0]}
2. ${analysis.threeFixes[1]}
3. ${analysis.threeFixes[2]}

Badge: ${analysis.badge}
Get roasted → https://roastmyx.ai`;
}
