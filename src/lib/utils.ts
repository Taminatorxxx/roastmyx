import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeUsername(raw: string): string {
  return raw
    .trim()
    .replace(/^@+/, "")
    .replace(/^https?:\/\/(www\.)?(twitter|x)\.com\//i, "")
    .split(/[/?#]/)[0]
    .replace(/[^a-zA-Z0-9_]/g, "")
    .slice(0, 15);
}

export function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{1,15}$/.test(username);
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return n.toLocaleString();
}

export function scoreLabel(score: number): string {
  if (score >= 90) return "Elite";
  if (score >= 80) return "Spicy";
  if (score >= 70) return "Solid";
  if (score >= 55) return "Mid";
  if (score >= 40) return "Rough";
  return "Yikes";
}

export function scoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-400";
  if (score >= 40) return "text-orange-400";
  return "text-rose-400";
}

export function scoreGradient(score: number): string {
  if (score >= 80) return "from-emerald-500 to-cyan-400";
  if (score >= 60) return "from-amber-500 to-orange-400";
  if (score >= 40) return "from-orange-500 to-rose-500";
  return "from-rose-600 to-red-500";
}

export function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://roastmyx.ai"
  );
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
