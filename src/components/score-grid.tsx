"use client";

import { motion } from "framer-motion";
import type { ScoreBreakdown } from "@/types/roast";
import { cn, scoreColor } from "@/lib/utils";

const SCORE_META: {
  key: keyof ScoreBreakdown;
  label: string;
  hint: string;
}[] = [
  { key: "profile", label: "Profile", hint: "Bio, avatar, first impression" },
  { key: "content", label: "Content", hint: "Tweet quality & substance" },
  { key: "hook", label: "Hook", hint: "First-line stop power" },
  { key: "consistency", label: "Consistency", hint: "Cadence & reliability" },
  { key: "originality", label: "Originality", hint: "Voice & unique POV" },
  { key: "virality", label: "Virality", hint: "Share & travel potential" },
  { key: "authority", label: "Authority", hint: "Trust & credibility" },
  { key: "personalBrand", label: "Personal Brand", hint: "Positioning clarity" },
];

export function ScoreGrid({ scores }: { scores: ScoreBreakdown }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {SCORE_META.map((item, i) => {
        const value = scores[item.key];
        return (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
            className="glass-card group rounded-2xl p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-400">
                {item.label}
              </span>
              <span
                className={cn(
                  "text-lg font-bold tabular-nums",
                  scoreColor(value)
                )}
              >
                {value}
              </span>
            </div>
            <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-rose-500"
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.8 }}
              />
            </div>
            <p className="text-[11px] text-zinc-600 group-hover:text-zinc-500">
              {item.hint}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
