"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────
   AppWindow — the "software chrome" frame used everywhere
   a screenshot is meant to live. Drop a real image in via
   the `src` prop once you have one; until then it falls
   back to PlaceholderMock so the section never looks empty.
───────────────────────────────────────────────────────── */
export function AppWindow({
  src,
  alt,
  label,
  accent,
  variant = "dashboard",
  seed = 0,
}: {
  src?: string;
  alt: string;
  label: string;
  accent: string;
  variant?: "dashboard" | "focus";
  seed?: number;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        background: "#0E0E10",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
      }}
    >
      {/* title bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 16px",
          background: "#17171A",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
        <span
          style={{
            marginLeft: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11.5,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.02em",
          }}
        >
          {label}
        </span>
      </div>

      {/* body */}
      <div style={{ position: "relative", background: "#0E0E10", minHeight: variant === "focus" ? 220 : 340 }}>
        {src ? (
          <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
        ) : (
          <PlaceholderMock accent={accent} variant={variant} seed={seed} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PlaceholderMock — a pure-CSS stand-in "screenshot" so the
   page reads as a real product before real screenshots exist.
   Swap it out by passing `src` to AppWindow above.
───────────────────────────────────────────────────────── */
export function PlaceholderMock({
  accent,
  variant = "dashboard",
  seed = 0,
}: {
  accent: string;
  variant?: "dashboard" | "focus";
  seed?: number;
}) {
  const bars = [42, 68, 30, 85, 54, 71, 38].map((h, i) => ((h + seed * 13 + i * 7) % 60) + 30);

  if (variant === "focus") {
    return (
      <div
        style={{
          padding: "28px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          minHeight: 220,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${accent}22`,
            border: `1.5px dashed ${accent}66`,
          }}
        />
        <div style={{ width: "70%", height: 8, borderRadius: 4, background: "rgba(255,255,255,0.08)" }} />
        <div style={{ width: "45%", height: 8, borderRadius: 4, background: "rgba(255,255,255,0.06)" }} />
        <div
          style={{
            marginTop: 10,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.04em",
          }}
        >
          SCREENSHOT PENDING
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: 340 }}>
      {/* fake sidebar */}
      <div style={{ width: 64, borderRight: "1px solid rgba(255,255,255,0.06)", padding: "18px 12px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: `${accent}33` }} />
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(255,255,255,0.05)" }} />
        ))}
      </div>

      {/* fake main area */}
      <div style={{ flex: 1, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ flex: 1, height: 56, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }} />
          ))}
        </div>

        <div style={{ flex: 1, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: 18, display: "flex", alignItems: "flex-end", gap: 8, minHeight: 130 }}>
          {bars.map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                borderRadius: "4px 4px 0 0",
                background: i % 3 === 0 ? accent : `${accent}55`,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={{ height: 9, borderRadius: 4, width: `${85 - i * 14}%`, background: "rgba(255,255,255,0.05)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   ScreenshotConsole — the interactive module browser.
   Click a module on the left, its "screenshot" shows on the
   right. Add `img: "your-url.png"` to any module in the data
   file to replace its placeholder with the real thing.
───────────────────────────────────────────────────────── */
export function ScreenshotConsole({
  modules,
  accent,
  light,
  mid,
  productName,
}: {
  modules: { icon: string; title: string; desc: string; img?: string }[];
  accent: string;
  light: string;
  mid: string;
  productName: string;
}) {
  const [active, setActive] = useState(0);
  const m = modules[active];

  return (
    <div
      className="console-grid"
      style={{
        borderRadius: 22,
        overflow: "hidden",
        border: `1.5px solid ${mid}`,
        background: "#fff",
      }}
    >
      {/* module list */}
      <div style={{ background: light, padding: 10, maxHeight: 460, overflowY: "auto" }}>
        {modules.map((mod, i) => (
          <button
            key={mod.title}
            onClick={() => setActive(i)}
            style={{
              width: "100%",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 12,
              border: "none",
              background: active === i ? "#fff" : "transparent",
              boxShadow: active === i ? `0 4px 16px ${accent}22` : "none",
              cursor: "pointer",
              marginBottom: 4,
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: 17, width: 22, textAlign: "center" as const }}>{mod.icon}</span>
            <span
              style={{
                fontSize: 13.5,
                fontWeight: active === i ? 800 : 600,
                color: active === i ? "#141414" : "#666",
              }}
            >
              {mod.title}
            </span>
            {active === i && (
              <span
                style={{
                  marginLeft: "auto",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: accent,
                  flexShrink: 0,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* screenshot pane */}
      <div style={{ padding: 20, background: "#0E0E10", display: "flex", flexDirection: "column", gap: 16 }}>
        <AppWindow
          src={m.img}
          alt={`${productName} — ${m.title}`}
          label={`${productName.toLowerCase().replace(/\s+/g, "-")}.app — ${m.title.toLowerCase()}`}
          accent={accent}
          variant="focus"
          seed={active}
        />
        <div>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              color: accent,
              letterSpacing: "0.08em",
              marginBottom: 6,
            }}
          >
            MODULE {String(active + 1).padStart(2, "0")} / {String(modules.length).padStart(2, "0")}
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: "#fff", marginBottom: 6 }}>
            {m.title}
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>
            {m.desc}
          </div>
        </div>
      </div>
    </div>
  );
}