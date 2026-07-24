"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame } from "lucide-react";
import { LOADING_MESSAGES } from "@/lib/constants";

interface LoadingRoastProps {
  username: string;
}

export function LoadingRoast({ username }: LoadingRoastProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-10">
        <motion.div
          className="absolute inset-0 rounded-full bg-orange-500/30 blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-orange-500 to-rose-600 shadow-2xl shadow-rose-500/40"
          animate={{ rotate: [0, 6, -6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Flame className="h-12 w-12 text-white" />
        </motion.div>
      </div>

      <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
        Roasting @{username}
      </h2>
      <p className="mb-8 text-sm text-zinc-500">
        Fetching public profile · analyzing content · sharpening knives
      </p>

      <div className="relative h-8 w-full max-w-md overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="text-base font-medium text-orange-300/90"
          >
            {LOADING_MESSAGES[index]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex w-full max-w-xs gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="h-1 flex-1 rounded-full bg-white/10"
            animate={{
              backgroundColor: [
                "rgba(255,255,255,0.1)",
                "rgba(249,115,22,0.9)",
                "rgba(255,255,255,0.1)",
              ],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
