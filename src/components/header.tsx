"use client";

import Link from "next/link";
import { Flame } from "lucide-react";
import { Badge } from "./ui/badge";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 shadow-lg shadow-rose-500/30 transition-transform group-hover:scale-105">
            <Flame className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-white">
              RoastMyX
            </span>
            <span className="text-[10px] text-zinc-500">roastmyx.ai</span>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Badge className="hidden sm:inline-flex border-orange-500/20 bg-orange-500/10 text-orange-300">
            No login required
          </Badge>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 transition-colors hover:text-white"
          >
            Built for X
          </a>
        </nav>
      </div>
    </header>
  );
}
