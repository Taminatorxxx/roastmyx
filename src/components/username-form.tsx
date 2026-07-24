"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Flame, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { isValidUsername, normalizeUsername } from "@/lib/utils";

interface UsernameFormProps {
  initialUsername?: string;
  size?: "default" | "large";
  onSubmitStart?: (username: string) => void;
}

export function UsernameForm({
  initialUsername = "",
  size = "large",
  onSubmitStart,
}: UsernameFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState(initialUsername);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const clean = normalizeUsername(username);

    if (!clean) {
      setError("Enter an X username");
      return;
    }
    if (!isValidUsername(clean)) {
      setError("Use 1–15 letters, numbers, or underscores");
      return;
    }

    setError(null);
    setPending(true);
    onSubmitStart?.(clean);
    router.push(`/roast/${encodeURIComponent(clean)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl">
      <div
        className={`flex w-full flex-col gap-3 ${size === "large" ? "sm:flex-row sm:items-stretch" : "sm:flex-row"}`}
      >
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg font-semibold text-zinc-500">
            @
          </span>
          <Input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error) setError(null);
            }}
            placeholder="elonmusk"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            aria-label="X username"
            className="pl-10 pr-4 text-lg"
            disabled={pending}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="min-w-[160px] shrink-0"
        >
          {pending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading…
            </>
          ) : (
            <>
              <Flame className="h-5 w-5" />
              Roast Me
            </>
          )}
        </Button>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-rose-400"
          role="alert"
        >
          {error}
        </motion.p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500 sm:justify-start">
        {["elonmusk", "levelsio", "taminatorxx"].map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setUsername(example)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 transition-colors hover:border-orange-500/30 hover:text-orange-300"
          >
            @{example}
          </button>
        ))}
      </div>
    </form>
  );
}
