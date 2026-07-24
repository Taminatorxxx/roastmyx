"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Crown,
  Flame,
  Pin,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import type { RoastResult } from "@/types/roast";
import { formatNumber } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ScoreRing } from "./ui/score-ring";
import { ScoreGrid } from "./score-grid";
import { ShareCard } from "./share-card";
import { ShareActions } from "./share-actions";
import { UsernameForm } from "./username-form";

interface RoastResultsProps {
  result: RoastResult;
}

function SectionCard({
  icon,
  title,
  children,
  delay = 0,
  accent = "orange",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
  accent?: "orange" | "emerald" | "violet" | "rose" | "amber";
}) {
  const accents = {
    orange: "from-orange-500/10 border-orange-500/20",
    emerald: "from-emerald-500/10 border-emerald-500/20",
    violet: "from-violet-500/10 border-violet-500/20",
    rose: "from-rose-500/10 border-rose-500/20",
    amber: "from-amber-500/10 border-amber-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      className={`glass-card rounded-2xl border bg-gradient-to-b ${accents[accent]} to-transparent p-5 sm:p-6`}
    >
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
          {title}
        </h3>
      </div>
      <div className="text-[15px] leading-relaxed text-zinc-200">{children}</div>
    </motion.div>
  );
}

export function RoastResults({ result }: RoastResultsProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { profile, analysis, isDemo } = result;

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4" />
            New roast
          </Button>
        </Link>
        {isDemo && (
          <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-200">
            Demo mode — add X_BEARER_TOKEN for live profiles
          </Badge>
        )}
      </div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card mb-8 overflow-hidden rounded-3xl p-6 sm:p-8"
      >
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-1 flex-col items-center gap-5 text-center lg:flex-row lg:items-start lg:text-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.profileImageUrl}
              alt={`@${profile.username}`}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border-2 border-orange-500/40 object-cover shadow-xl shadow-rose-500/20"
            />
            <div>
              <div className="mb-1 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  @{profile.username}
                </h1>
                {profile.verified && (
                  <Badge className="border-sky-500/30 bg-sky-500/10 text-sky-300">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-zinc-400">{profile.name}</p>
              {profile.bio && (
                <p className="mt-2 max-w-lg text-sm text-zinc-500">
                  {profile.bio}
                </p>
              )}
              <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs text-zinc-500 lg:justify-start">
                <span>
                  <strong className="text-zinc-300">
                    {formatNumber(profile.followersCount)}
                  </strong>{" "}
                  followers
                </span>
                <span>
                  <strong className="text-zinc-300">
                    {formatNumber(profile.followingCount)}
                  </strong>{" "}
                  following
                </span>
                <span>
                  <strong className="text-zinc-300">
                    {formatNumber(profile.tweetCount)}
                  </strong>{" "}
                  posts
                </span>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                <Badge className="border-violet-500/30 bg-violet-500/10 text-violet-200">
                  {analysis.archetype}
                </Badge>
                <Badge className="border-orange-500/30 bg-orange-500/10 text-orange-200">
                  {analysis.badge}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <ScoreRing score={analysis.scores.overall} size={170} />
            <p className="mt-3 max-w-xs text-center text-sm font-medium italic text-zinc-300">
              “{analysis.roastQuote}”
            </p>
          </div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-8"
      >
        <ShareActions result={result} cardRef={cardRef} />
      </motion.div>

      <section className="mb-8">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <Zap className="h-5 w-5 text-orange-400" />
          Score breakdown
        </h2>
        <ScoreGrid scores={analysis.scores} />
      </section>

      <SectionCard
        icon={<Flame className="h-4 w-4 text-orange-400" />}
        title="The full roast"
        delay={0.1}
        accent="orange"
      >
        <div className="whitespace-pre-line">{analysis.fullRoast}</div>
      </SectionCard>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SectionCard
          icon={<AlertTriangle className="h-4 w-4 text-rose-400" />}
          title="Your biggest crime"
          delay={0.15}
          accent="rose"
        >
          {analysis.biggestCrime}
        </SectionCard>
        <SectionCard
          icon={<Crown className="h-4 w-4 text-emerald-400" />}
          title="Your biggest strength"
          delay={0.2}
          accent="emerald"
        >
          {analysis.biggestStrength}
        </SectionCard>
      </div>

      <div className="mt-4">
        <SectionCard
          icon={<Target className="h-4 w-4 text-violet-400" />}
          title="If I had your account for 30 days..."
          delay={0.25}
          accent="violet"
        >
          {analysis.thirtyDayPlan}
        </SectionCard>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <SectionCard
          icon={<Sparkles className="h-4 w-4 text-amber-400" />}
          title="Three things I'd fix first"
          delay={0.3}
          accent="amber"
        >
          <ol className="list-decimal space-y-2 pl-5">
            {analysis.threeFixes.map((fix, i) => (
              <li key={i}>{fix}</li>
            ))}
          </ol>
        </SectionCard>
        <div className="grid gap-4">
          <SectionCard
            icon={<AlertTriangle className="h-4 w-4 text-rose-400" />}
            title="The tweet you're probably embarrassed by"
            delay={0.35}
            accent="rose"
          >
            {analysis.embarrassedTweet}
          </SectionCard>
          <SectionCard
            icon={<Pin className="h-4 w-4 text-emerald-400" />}
            title="The tweet I'd pin"
            delay={0.4}
            accent="emerald"
          >
            {analysis.pinTweet}
          </SectionCard>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Your share card
        </h2>
        <div className="flex flex-col items-start gap-6 lg:flex-row">
          <div className="overflow-x-auto pb-2">
            <ShareCard ref={cardRef} result={result} />
          </div>
          <div className="flex-1 space-y-4">
            <p className="text-sm text-zinc-400">
              Optimized for X, Instagram Stories, LinkedIn, and TikTok
              screenshots. Download the PNG or share straight to X.
            </p>
            <ShareActions result={result} cardRef={cardRef} />
            <div className="glass-card rounded-2xl p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Coming soon
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>Compare Two Accounts</Badge>
                <Badge>Leaderboard</Badge>
                <Badge>Daily Worst Roast</Badge>
                <Badge>Roast of the Day</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="mb-2 text-xl font-bold text-white">
          Roast someone else
        </h2>
        <p className="mb-6 text-sm text-zinc-500">
          Friendship is temporary. Viral cards are forever.
        </p>
        <div className="mx-auto flex justify-center">
          <UsernameForm size="default" />
        </div>
      </section>
    </div>
  );
}
