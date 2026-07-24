"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Zap } from "lucide-react";
import { UsernameForm } from "./username-form";
import { Badge } from "./ui/badge";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-rose-600/20 blur-[120px]" />
        <div className="absolute right-0 top-40 h-[320px] w-[320px] rounded-full bg-orange-500/15 blur-[100px]" />
        <div className="absolute bottom-0 left-10 h-[240px] w-[240px] rounded-full bg-violet-600/10 blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-6 border-orange-500/25 bg-orange-500/10 px-4 py-1.5 text-orange-200">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Spotify Wrapped × Duolingo roast × Profile cards
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.55 }}
          className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.05]"
        >
          Your X account.{" "}
          <span className="bg-gradient-to-r from-orange-400 via-rose-400 to-pink-400 bg-clip-text text-transparent">
            Roasted by AI.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
          className="mt-5 max-w-xl text-base text-zinc-400 sm:text-lg"
        >
          Enter a username. Get a brutal, funny, constructive roast of your
          profile, hooks, and personal brand — then share the card.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="mt-10 w-full"
        >
          <div className="mx-auto flex justify-center">
            <UsernameForm />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500"
        >
          <span className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5 text-orange-500" />
            No login
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            Public profiles only
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            Shareable cards
          </span>
        </motion.div>
      </div>
    </section>
  );
}
