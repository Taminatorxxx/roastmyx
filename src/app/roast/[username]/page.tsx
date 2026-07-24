import type { Metadata } from "next";
import { RoastClient } from "@/components/roast-client";
import { normalizeUsername, isValidUsername, siteUrl } from "@/lib/utils";
import { APP_NAME } from "@/lib/constants";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username: raw } = await params;
  const username = normalizeUsername(decodeURIComponent(raw));
  const title = `Roast of @${username}`;
  const description = `See how @${username} got roasted by AI — scores, archetype, and a shareable card on ${APP_NAME}.`;
  const og = `${siteUrl()}/api/og?username=${encodeURIComponent(username)}&score=??&quote=${encodeURIComponent("Enter the fire. Get your roast card.")}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} · ${APP_NAME}`,
      description,
      url: `${siteUrl()}/roast/${username}`,
      images: [{ url: og, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${APP_NAME}`,
      description,
      images: [og],
    },
  };
}

export default async function RoastPage({ params }: PageProps) {
  const { username: raw } = await params;
  const username = normalizeUsername(decodeURIComponent(raw));

  if (!isValidUsername(username)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-2 text-2xl font-bold text-white">Invalid username</h1>
        <p className="text-sm text-zinc-400">
          X usernames are 1–15 characters: letters, numbers, underscores.
        </p>
      </div>
    );
  }

  return <RoastClient username={username} />;
}
