"use client";

import { forwardRef } from "react";
import type { RoastResult } from "@/types/roast";
import { formatNumber, scoreColor } from "@/lib/utils";
import { APP_DOMAIN } from "@/lib/constants";

interface ShareCardProps {
  result: RoastResult;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  function ShareCard({ result }, ref) {
    const { profile, analysis } = result;
    const { scores } = analysis;

    return (
      <div
        ref={ref}
        className="relative w-[360px] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0c] p-5 text-white shadow-2xl"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 90% 10%, rgba(244,63,94,0.25), transparent 50%), radial-gradient(ellipse at 10% 90%, rgba(249,115,22,0.2), transparent 45%)",
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-rose-500 text-sm">
              🔥
            </div>
            <div>
              <div className="text-sm font-bold leading-none">RoastMyX</div>
              <div className="text-[10px] text-zinc-500">{APP_DOMAIN}</div>
            </div>
          </div>
          <div className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-300">
            {analysis.badge}
          </div>
        </div>

        <div className="mb-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.profileImageUrl}
            alt=""
            width={56}
            height={56}
            className="h-14 w-14 rounded-full border-2 border-orange-500/50 object-cover"
            crossOrigin="anonymous"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate font-bold">@{profile.username}</div>
            <div className="truncate text-xs text-zinc-400">{profile.name}</div>
            <div className="mt-0.5 text-[10px] text-violet-300">
              {analysis.archetype}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">
              Score
            </div>
            <div
              className={`text-3xl font-extrabold tabular-nums leading-none ${scoreColor(scores.overall)}`}
            >
              {scores.overall}
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-2xl border border-white/10 bg-black/40 p-3.5">
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-orange-400">
            The roast
          </div>
          <p className="text-sm font-medium leading-snug text-zinc-100">
            “{analysis.roastQuote}”
          </p>
        </div>

        <div className="mb-4 grid grid-cols-3 gap-2">
          {[
            { label: "Hook", value: scores.hook },
            { label: "Content", value: scores.content },
            { label: "Brand", value: scores.personalBrand },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-center"
            >
              <div className="text-[10px] text-zinc-500">{s.label}</div>
              <div className="text-lg font-bold tabular-nums">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mb-4 flex justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-[10px] text-zinc-500">
          <span>{formatNumber(profile.followersCount)} followers</span>
          <span>{formatNumber(profile.followingCount)} following</span>
          <span>{formatNumber(profile.tweetCount)} posts</span>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3">
          <div className="text-[11px] text-zinc-500">
            Get roasted free at
            <br />
            <span className="font-semibold text-zinc-300">{APP_DOMAIN}</span>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white p-1">
            <div
              className="grid h-full w-full grid-cols-5 grid-rows-5 gap-px"
              aria-hidden
            >
              {Array.from({ length: 25 }).map((_, i) => {
                const on =
                  [0, 1, 2, 4, 5, 6, 10, 12, 14, 18, 19, 20, 22, 23, 24].includes(
                    i
                  ) ||
                  (i * 7 + profile.username.length) % 3 === 0;
                return (
                  <div
                    key={i}
                    className={on ? "bg-black" : "bg-white"}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
