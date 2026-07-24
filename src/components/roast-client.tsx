"use client";

import { useEffect, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import type { RoastApiError, RoastResult } from "@/types/roast";
import { LoadingRoast } from "./loading-roast";
import { RoastResults } from "./roast-results";
import { Button } from "./ui/button";
import Link from "next/link";

interface RoastClientProps {
  username: string;
}

export function RoastClient({ username }: RoastClientProps) {
  const [result, setResult] = useState<RoastResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function load(signal?: AbortSignal) {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/roast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
        signal,
      });

      const data = (await res.json()) as
        | { success: true; data: RoastResult }
        | RoastApiError;

      if (!res.ok || !data.success) {
        throw new Error(
          !data.success
            ? data.error
            : "The roast failed. The algorithm is laughing at us."
        );
      }

      setResult(data.data);
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while roasting."
      );
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (loading) {
    return <LoadingRoast username={username} />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-white">Roast interrupted</h2>
        <p className="mb-6 max-w-md text-sm text-zinc-400">{error}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => load()}>
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Link href="/">
            <Button variant="secondary">Back home</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return <RoastResults result={result} />;
}
