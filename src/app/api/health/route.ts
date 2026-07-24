import { NextResponse } from "next/server";
import { isXApiConfigured } from "@/lib/x-api";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "roastmyx",
    timestamp: new Date().toISOString(),
    xai: Boolean(process.env.XAI_API_KEY),
    xApi: isXApiConfigured(),
    demoFallback: process.env.ALLOW_DEMO_FALLBACK !== "false",
  });
}
