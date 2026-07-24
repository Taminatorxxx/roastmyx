import { NextResponse } from "next/server";
import { z } from "zod";
import { generateRoast } from "@/lib/ai-roast";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { isValidUsername, normalizeUsername } from "@/lib/utils";
import { fetchXProfile } from "@/lib/x-api";
import type { RoastApiError, RoastApiResponse } from "@/types/roast";

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  username: z.string().min(1).max(80),
});

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limit = rateLimit(`roast:${ip}`);

    if (!limit.success) {
      const error: RoastApiError = {
        success: false,
        error: "Too many roasts. Take a breath and try again in a minute.",
        code: "RATE_LIMITED",
      };
      return NextResponse.json(error, {
        status: 429,
        headers: {
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(limit.resetAt),
        },
      });
    }

    const json = await request.json().catch(() => null);
    const parsed = bodySchema.safeParse(json);

    if (!parsed.success) {
      const error: RoastApiError = {
        success: false,
        error: "Send a username. Preferably one that exists.",
        code: "INVALID_BODY",
      };
      return NextResponse.json(error, { status: 400 });
    }

    const username = normalizeUsername(parsed.data.username);

    if (!isValidUsername(username)) {
      const error: RoastApiError = {
        success: false,
        error: "That doesn't look like an X username.",
        code: "INVALID_USERNAME",
      };
      return NextResponse.json(error, { status: 400 });
    }

    const { profile, isDemo } = await fetchXProfile(username);
    const analysis = await generateRoast(profile);

    const payload: RoastApiResponse = {
      success: true,
      data: {
        profile,
        analysis,
        generatedAt: new Date().toISOString(),
        isDemo,
      },
    };

    return NextResponse.json(payload, {
      headers: {
        "X-RateLimit-Remaining": String(limit.remaining),
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[api/roast]", error);
    const errorBody: RoastApiError = {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Something burned too hot. Try again.",
      code: "INTERNAL",
    };
    return NextResponse.json(errorBody, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      {
        success: false,
        error: "Query ?username=handle",
        code: "INVALID_BODY",
      } satisfies RoastApiError,
      { status: 400 }
    );
  }

  // Reuse POST logic via internal call pattern
  const fakeRequest = new Request(request.url, {
    method: "POST",
    headers: request.headers,
    body: JSON.stringify({ username }),
  });

  return POST(fakeRequest);
}
