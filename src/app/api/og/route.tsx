import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const username = (searchParams.get("username") || "unknown").replace(
    /^@/,
    ""
  );
  const score = Math.min(
    100,
    Math.max(0, Number(searchParams.get("score") || 50))
  );
  const quote =
    searchParams.get("quote") || "Your timeline called. It wants a strategy.";
  const archetype = searchParams.get("archetype") || "Algorithm Victim";
  const badge = searchParams.get("badge") || "Certified Roastable";
  const avatar = searchParams.get("avatar") || "";
  const s1 = Number(searchParams.get("s1") || 50);
  const s2 = Number(searchParams.get("s2") || 50);
  const s3 = Number(searchParams.get("s3") || 50);
  const l1 = searchParams.get("l1") || "Hook";
  const l2 = searchParams.get("l2") || "Content";
  const l3 = searchParams.get("l3") || "Brand";

  const scoreColor =
    score >= 80 ? "#34d399" : score >= 60 ? "#fbbf24" : score >= 40 ? "#fb923c" : "#f43f5e";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(145deg, #050505 0%, #0c0c12 40%, #1a0a12 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
          padding: "48px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -40,
            width: 360,
            height: 360,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(244,63,94,0.35) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "linear-gradient(135deg, #f97316, #f43f5e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
              }}
            >
              🔥
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
                RoastMyX
              </span>
              <span style={{ fontSize: 14, color: "#a1a1aa" }}>roastmyx.ai</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 18px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              fontSize: 16,
              color: "#fbbf24",
              fontWeight: 600,
            }}
          >
            {badge}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            borderRadius: 28,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            padding: 36,
            gap: 36,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 220,
              gap: 16,
            }}
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatar}
                width={140}
                height={140}
                alt=""
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 999,
                  border: "3px solid rgba(249,115,22,0.6)",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 999,
                  background: "linear-gradient(135deg, #f97316, #f43f5e)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 56,
                  fontWeight: 700,
                }}
              >
                {username.charAt(0).toUpperCase()}
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 26, fontWeight: 700 }}>@{username}</span>
              <span
                style={{
                  fontSize: 15,
                  color: "#a78bfa",
                  fontWeight: 600,
                  padding: "6px 12px",
                  borderRadius: 999,
                  background: "rgba(167,139,250,0.15)",
                }}
              >
                {archetype}
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 28 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    color: "#a1a1aa",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Overall
                </span>
                <span
                  style={{
                    fontSize: 88,
                    fontWeight: 800,
                    lineHeight: 1,
                    color: scoreColor,
                    letterSpacing: -3,
                  }}
                >
                  {score}
                </span>
                <span style={{ fontSize: 16, color: "#71717a" }}>/ 100</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  padding: "20px 24px",
                  borderRadius: 20,
                  background: "rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span style={{ fontSize: 14, color: "#f97316", marginBottom: 8 }}>
                  🔥 THE ROAST
                </span>
                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 600,
                    lineHeight: 1.35,
                    color: "#fafafa",
                  }}
                >
                  “{quote.length > 120 ? `${quote.slice(0, 117)}…` : quote}”
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
              {[
                { label: l1, value: s1 },
                { label: l2, value: s2 },
                { label: l3, value: s3 },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                    padding: "14px 16px",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#a1a1aa" }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: 28, fontWeight: 700 }}>
                    {Math.round(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 28,
          }}
        >
          <span style={{ fontSize: 18, color: "#71717a" }}>
            Enter username → get roasted → share the pain
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 16px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.06)",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            🔥 roastmyx.ai
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
