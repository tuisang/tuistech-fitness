import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Tuistech Fitness & Wellness - Nairobi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const badgePath = path.join(process.cwd(), "public", "images", "tuistech-badge.png");
  const badgeBase64 = fs.readFileSync(badgePath).toString("base64");
  const badgeSrc = `data:image/png;base64,${badgeBase64}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#15160f",
          fontFamily: "sans-serif",
        }}
      >
        <img src={badgeSrc} width={180} height={207} alt="" style={{ marginBottom: 28 }} />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontSize: 88,
            fontWeight: 700,
            color: "#f2f0e6",
            letterSpacing: "-0.02em",
          }}
        >
          TUISTECH
          <span style={{ color: "#2e9e44" }}>.</span>
        </div>
        <div
          style={{
            fontSize: 28,
            letterSpacing: "0.25em",
            color: "#2e9e44",
            marginTop: 4,
            textTransform: "uppercase",
          }}
        >
          Fitness &amp; Wellness
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#8fd14f",
            marginTop: 36,
            letterSpacing: "0.05em",
          }}
        >
          Stronger body. Healthier mind. Better life.
        </div>
      </div>
    ),
    { ...size }
  );
}