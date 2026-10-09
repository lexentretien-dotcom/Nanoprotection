import { ImageResponse } from "next/og";

export const alt = "Les Experts Nano Protection Toitures";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b1230",
          color: "#ffffff",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#b9a6ff", textTransform: "uppercase" }}>
          Les Experts
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.02 }}>Nano Protection Toitures</div>
          <div style={{ marginTop: 24, fontSize: 36, color: "#d9d5ee" }}>
            Préservation de toiture au Québec
          </div>
        </div>
      </div>
    ),
    size,
  );
}
