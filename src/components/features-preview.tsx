"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/lib/constants";
import { Badge } from "./ui/badge";

export function FeaturesPreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Built to go viral
        </h2>
        <p className="mt-2 text-zinc-500">
          Every feature is designed for screenshots, shares, and challenges.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-2xl p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-white">{feature.title}</h3>
              {feature.status === "soon" ? (
                <Badge className="border-zinc-600 text-zinc-400">Soon</Badge>
              ) : (
                <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                  Live
                </Badge>
              )}
            </div>
            <p className="text-sm text-zinc-500">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
