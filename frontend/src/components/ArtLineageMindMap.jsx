import { useMemo, useState } from "react";
import data from "../data/lineageMindMap.json";

export default function ArtLineageMindMap({ theme }) {
  const [active, setActive] = useState(null);

  const detail = useMemo(() => {
    if (!active) return null;
    for (const p of data.pillars) {
      const n = p.nodes.find((x) => x.id === active);
      if (n) return { pillar: p, node: n };
    }
    return null;
  }, [active]);

  return (
    <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto" }}>
      <div
        style={{
          position: "relative",
          marginBottom: "28px",
          padding: "20px 24px",
          borderRadius: "20px",
          background: `linear-gradient(135deg, ${theme.bg}, #fff)`,
          border: `1.5px solid ${theme.color}28`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "12px 28px",
            borderRadius: "999px",
            background: "#fff",
            border: `2px solid ${theme.color}`,
            boxShadow: `0 8px 28px ${theme.color}25`,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(17px, 2.5vw, 22px)",
            fontWeight: 700,
            color: theme.color,
          }}
        >
          Indian classical arts
        </div>
        <p style={{ margin: "14px 0 0", fontSize: "13px", color: "#8B6452", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>
          Tap any node to read a short lineage note — a compact map of dance, music, and śāstra connections.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          alignItems: "start",
        }}
      >
        {data.pillars.map((pillar) => (
          <div
            key={pillar.id}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "20px 18px 22px",
              border: `1.5px solid ${theme.color}22`,
              boxShadow: "0 6px 24px rgba(0,0,0,0.04)",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "3px",
                borderRadius: "2px",
                background: theme.gradient,
                marginBottom: "12px",
              }}
            />
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "20px",
                fontWeight: 700,
                color: theme.color,
                marginBottom: "4px",
              }}
            >
              {pillar.title}
            </h2>
            <p style={{ fontSize: "12px", color: "#8B6452", marginBottom: "16px" }}>{pillar.subtitle}</p>

            <div
              style={{
                borderLeft: `3px solid ${theme.color}45`,
                paddingLeft: "14px",
                marginLeft: "6px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {pillar.nodes.map((n) => {
                const on = active === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => setActive(on ? null : n.id)}
                    style={{
                      textAlign: "left",
                      padding: "10px 12px",
                      borderRadius: "12px",
                      border: on ? `1.5px solid ${theme.color}` : `1px solid ${theme.color}25`,
                      background: on ? theme.bg : "rgba(0,0,0,0.02)",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      fontWeight: on ? 600 : 500,
                      color: on ? theme.color : "#5D3A1A",
                      transition: "border-color 0.2s, background 0.2s",
                    }}
                  >
                    {n.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {detail && (
        <div
          style={{
            marginTop: "24px",
            padding: "22px 24px",
            borderRadius: "18px",
            background: "#fff",
            border: `1.5px solid ${theme.color}30`,
            animation: "fadeIn 0.25s ease",
          }}
        >
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", color: "#8B6452", marginBottom: "6px" }}>
            {detail.pillar.title}
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: theme.color, marginBottom: "10px" }}>
            {detail.node.label}
          </h3>
          <p style={{ fontSize: "15px", lineHeight: 1.65, color: "#5D3A1A", fontWeight: 300, margin: 0 }}>
            {detail.node.hint}
          </p>
          <button
            type="button"
            onClick={() => setActive(null)}
            style={{
              marginTop: "16px",
              padding: "8px 14px",
              borderRadius: "10px",
              border: `1px solid ${theme.color}40`,
              background: "transparent",
              color: theme.color,
              fontSize: "13px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Close detail
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
