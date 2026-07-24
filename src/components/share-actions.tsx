"use client";

import { useCallback, useState } from "react";
import { toPng } from "html-to-image";
import {
  Check,
  Copy,
  Download,
  Share2,
  Swords,
} from "lucide-react";
import { Button } from "./ui/button";
import { formatRoastAsText } from "@/lib/ai-roast";
import { siteUrl } from "@/lib/utils";
import type { RoastResult } from "@/types/roast";

interface ShareActionsProps {
  result: RoastResult;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export function ShareActions({ result, cardRef }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const username = result.profile.username;
  const shareUrl = `${siteUrl()}/roast/${username}`;
  const text = formatRoastAsText(username, result.analysis);

  const shareToX = useCallback(() => {
    const tweet = encodeURIComponent(
      `I just got roasted by AI 🔥\n\n@${username} scored ${result.analysis.scores.overall}/100\n\n"${result.analysis.roastQuote}"\n\nArchetype: ${result.analysis.archetype}\n\nGet yours → ${shareUrl}`
    );
    window.open(`https://x.com/intent/tweet?text=${tweet}`, "_blank", "noopener,noreferrer");
  }, [username, result.analysis, shareUrl]);

  const copyRoast = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [text]);

  const downloadPng = useCallback(async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#0a0a0c",
      });
      const link = document.createElement("a");
      link.download = `roastmyx-${username}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("PNG export failed", err);
      const og = `/api/og?username=${encodeURIComponent(username)}&score=${result.analysis.scores.overall}&quote=${encodeURIComponent(result.analysis.roastQuote)}&archetype=${encodeURIComponent(result.analysis.archetype)}&badge=${encodeURIComponent(result.analysis.badge)}&avatar=${encodeURIComponent(result.profile.profileImageUrl)}&s1=${result.analysis.scores.hook}&s2=${result.analysis.scores.content}&s3=${result.analysis.scores.personalBrand}`;
      window.open(og, "_blank");
    } finally {
      setDownloading(false);
    }
  }, [cardRef, username, result]);

  const challengeFriend = useCallback(async () => {
    const challenge = `I just got roasted on RoastMyX 🔥 Score: ${result.analysis.scores.overall}/100.\n\nThink you can survive? Enter your @ and face the fire → ${siteUrl()}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "RoastMyX Challenge",
          text: challenge,
          url: siteUrl(),
        });
        return;
      } catch {
        // user cancelled or not supported fully
      }
    }
    const tweet = encodeURIComponent(challenge);
    window.open(`https://x.com/intent/tweet?text=${tweet}`, "_blank", "noopener,noreferrer");
  }, [result.analysis.scores.overall]);

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={shareToX} size="sm">
        <span className="text-sm font-black leading-none">𝕏</span>
        Share to X
      </Button>
      <Button
        onClick={downloadPng}
        variant="secondary"
        size="sm"
        disabled={downloading}
      >
        <Download className="h-4 w-4" />
        {downloading ? "Exporting…" : "Download PNG"}
      </Button>
      <Button onClick={copyRoast} variant="secondary" size="sm">
        {copied ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        {copied ? "Copied" : "Copy Roast"}
      </Button>
      <Button onClick={challengeFriend} variant="outline" size="sm">
        <Swords className="h-4 w-4" />
        Challenge a Friend
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: `Roast of @${username}`,
              text: result.analysis.roastQuote,
              url: shareUrl,
            });
          } else {
            shareToX();
          }
        }}
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    </div>
  );
}
