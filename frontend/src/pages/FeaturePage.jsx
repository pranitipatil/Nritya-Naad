import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import features from "../data/features.json";
import Navbar from "../components/Navbar";

const FEATURE_THEMES = {
  mudra:      { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "🤲" },
  gallery:    { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🖼️" },
  academy:    { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🏛️" },
  chatbot:    { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "💬" },
  stories:    { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "📖" },
  map:        { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🗺️" },
  upload:     { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🎬" },
  danceform:  { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🎵" },
  quiz:       { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "❓" },
  event:      { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "📅" },
  reels:      { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🎞️" },
  mindmap:    { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🧠" },
  pitch:      { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "🎙️" },
  karaoke:    { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🎤" },
  visualizer: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🌊" },
  swaras:     { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🎶" },
};

// ── Dance Gallery Data ──────────────────────────────────────────────
const DANCE_FORMS = [
  {
    id: 1,
    name: "Bharatanatyam",
    region: "Tamil Nadu",
    category: "Classical",
    emoji: "💃",
    origin: "~2nd century BCE",
    description:
      "One of the oldest classical dance forms of India, rooted in the Natya Shastra. Known for its fixed upper torso, bent legs, and intricate footwork combined with expressive hand gestures (mudras).",
    keyFeatures: ["Nritta", "Nritya", "Natya", "Abhinaya"],
    color: "#C2185B",
    bg: "rgba(194,24,91,0.08)",
    border: "rgba(194,24,91,0.25)",
  },
  {
    id: 2,
    name: "Kathak",
    region: "North India",
    category: "Classical",
    emoji: "🌀",
    origin: "~15th century CE",
    description:
      "Originating from the storytelling Kathakas of northern India, Kathak blends Hindu devotional themes with Mughal court aesthetics. Famous for rapid spins (chakkar) and intricate tatkaar footwork.",
    keyFeatures: ["Tatkaar", "Chakkar", "Thumri", "Abhinaya"],
    color: "#FF6B00",
    bg: "rgba(255,107,0,0.08)",
    border: "rgba(255,107,0,0.25)",
  },
  {
    id: 3,
    name: "Odissi",
    region: "Odisha",
    category: "Classical",
    emoji: "🏛️",
    origin: "~2nd century BCE",
    description:
      "One of the earliest classical dance forms with roots in the Odisha temple tradition. Odissi is lyrical and sculpturesque, with the tribhangi posture (three-body bends) as its hallmark.",
    keyFeatures: ["Tribhangi", "Chouka", "Mangalacharan", "Abhinaya"],
    color: "#3949AB",
    bg: "rgba(57,73,171,0.08)",
    border: "rgba(57,73,171,0.25)",
  },
  {
    id: 4,
    name: "Kathakali",
    region: "Kerala",
    category: "Classical",
    emoji: "🎭",
    origin: "~17th century CE",
    description:
      "A highly stylised dance-drama from Kerala, Kathakali is known for its elaborate makeup (chutti), vivid costumes, and expressive storytelling drawn from the Mahabharata and Ramayana.",
    keyFeatures: ["Chutti makeup", "Navarasas", "Mudras", "Padam"],
    color: "#00897B",
    bg: "rgba(0,137,123,0.08)",
    border: "rgba(0,137,123,0.25)",
  },
  {
    id: 5,
    name: "Kuchipudi",
    region: "Andhra Pradesh",
    category: "Classical",
    emoji: "🎶",
    origin: "~3rd century BCE",
    description:
      "From the village of Kuchipudi in Andhra Pradesh, this form is known for its fast rhythmic footwork, graceful movements, and unique tarangam — dancing on the rim of a brass plate.",
    keyFeatures: ["Tarangam", "Jathi", "Sabdam", "Tillana"],
    color: "#C2185B",
    bg: "rgba(194,24,91,0.08)",
    border: "rgba(194,24,91,0.25)",
  },
  {
    id: 6,
    name: "Manipuri",
    region: "Manipur",
    category: "Classical",
    emoji: "🌸",
    origin: "~15th century CE",
    description:
      "A gentle and lyrical dance form from Manipur, closely tied to Vaishnavism. The Ras Leela performances depicting Radha-Krishna are its most celebrated expressions.",
    keyFeatures: ["Ras Leela", "Pung Cholom", "Lai Haraoba", "Sankirtana"],
    color: "#FF6B00",
    bg: "rgba(255,107,0,0.08)",
    border: "rgba(255,107,0,0.25)",
  },
  {
    id: 7,
    name: "Mohiniyattam",
    region: "Kerala",
    category: "Classical",
    emoji: "🌊",
    origin: "~16th century CE",
    description:
      "The 'dance of the enchantress' is a graceful, feminine solo form from Kerala with swaying movements evoking ocean waves and palm trees. Performed exclusively by women in traditional white and gold.",
    keyFeatures: ["Lasya", "Cholkettu", "Tharangu", "Varnam"],
    color: "#3949AB",
    bg: "rgba(57,73,171,0.08)",
    border: "rgba(57,73,171,0.25)",
  },
  {
    id: 8,
    name: "Sattriya",
    region: "Assam",
    category: "Classical",
    emoji: "🪷",
    origin: "~15th century CE",
    description:
      "Founded by the Vaishnavite saint Srimanta Shankardev, Sattriya originated in the sattra monasteries of Assam. It combines dance, music, and drama to narrate episodes from Vaishnavite literature.",
    keyFeatures: ["Dashavatara", "Chali", "Rajagharia Chali", "Ojapali"],
    color: "#00897B",
    bg: "rgba(0,137,123,0.08)",
    border: "rgba(0,137,123,0.25)",
  },
];

const CATEGORIES = ["All", "Classical"];
const REGIONS = ["All Regions", "Tamil Nadu", "North India", "Odisha", "Kerala", "Andhra Pradesh", "Manipur", "Assam"];

// ── Dance Gallery Component ─────────────────────────────────────────
function DanceGallery({ theme }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedDance, setSelectedDance] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = DANCE_FORMS.filter((d) => {
    const matchCat = selectedCategory === "All" || d.category === selectedCategory;
    const matchReg = selectedRegion === "All Regions" || d.region === selectedRegion;
    const matchSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchReg && matchSearch;
  });

  const pillStyle = (active, color = theme.color) => ({
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    border: `1.5px solid ${active ? color : "rgba(0,0,0,0.12)"}`,
    background: active ? color : "#fff",
    color: active ? "#fff" : "#5D3A1A",
    transition: "all 0.2s",
  });

  return (
    <div>
      {/* Search + Filters */}
      <div style={{ marginBottom: "28px" }}>
        <input
          type="text"
          placeholder="Search dance forms or regions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "12px",
            border: `1.5px solid ${theme.color}30`,
            fontSize: "14px",
            color: "#3D1C00",
            outline: "none",
            marginBottom: "16px",
            boxSizing: "border-box",
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {REGIONS.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              style={pillStyle(selectedRegion === r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p style={{ fontSize: "13px", color: "#8B6452", marginBottom: "20px" }}>
        Showing <strong style={{ color: theme.color }}>{filtered.length}</strong> dance forms
      </p>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "20px",
      }}>
        {filtered.map((dance) => (
          <div
            key={dance.id}
            onClick={() => setSelectedDance(dance)}
            style={{
              background: "#fff",
              borderRadius: "18px",
              padding: "24px 20px",
              border: `1.5px solid ${dance.border}`,
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 12px 32px ${dance.border}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Top accent */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "4px",
              background: dance.color, borderRadius: "18px 18px 0 0",
            }} />

            {/* Emoji icon */}
            <div style={{
              width: "52px", height: "52px",
              borderRadius: "14px",
              background: dance.bg,
              border: `1.5px solid ${dance.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "24px",
              marginBottom: "14px",
            }}>
              {dance.emoji}
            </div>

            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "17px",
              fontWeight: 700,
              color: dance.color,
              marginBottom: "4px",
            }}>
              {dance.name}
            </h3>

            <p style={{ fontSize: "12px", color: "#8B6452", marginBottom: "10px", fontWeight: 500 }}>
              📍 {dance.region}
            </p>

            <p style={{
              fontSize: "12px", color: "#7B5040", lineHeight: 1.6,
              display: "-webkit-box", WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {dance.description}
            </p>

            <div style={{
              marginTop: "14px", fontSize: "12px",
              color: dance.color, fontWeight: 500,
            }}>
              Tap to explore →
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#8B6452" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
          <p style={{ fontSize: "15px" }}>No dance forms match your search.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedDance && (
        <div
          onClick={() => setSelectedDance(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 1000, padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "40px",
              maxWidth: "520px",
              width: "100%",
              position: "relative",
              overflow: "hidden",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Gradient bar */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "5px",
              background: `linear-gradient(135deg, ${selectedDance.color}, #004D40)`,
            }} />

            {/* Close */}
            <button
              onClick={() => setSelectedDance(null)}
              style={{
                position: "absolute", top: "20px", right: "20px",
                background: "rgba(0,0,0,0.06)", border: "none",
                borderRadius: "50%", width: "32px", height: "32px",
                cursor: "pointer", fontSize: "16px", color: "#5D3A1A",
              }}
            >✕</button>

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "16px",
                background: selectedDance.bg,
                border: `2px solid ${selectedDance.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "30px",
              }}>
                {selectedDance.emoji}
              </div>
              <div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "24px", fontWeight: 700,
                  color: selectedDance.color, marginBottom: "2px",
                }}>
                  {selectedDance.name}
                </h2>
                <p style={{ fontSize: "13px", color: "#8B6452" }}>
                  📍 {selectedDance.region} &nbsp;·&nbsp; 🕰️ {selectedDance.origin}
                </p>
              </div>
            </div>

            {/* Description */}
            <p style={{
              fontSize: "14px", color: "#5D3A1A",
              lineHeight: 1.75, marginBottom: "24px",
            }}>
              {selectedDance.description}
            </p>

            {/* Key Features */}
            <div>
              <h4 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "15px", fontWeight: 700,
                color: selectedDance.color, marginBottom: "12px",
              }}>
                Key Elements
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedDance.keyFeatures.map((f) => (
                  <span key={f} style={{
                    padding: "5px 12px",
                    borderRadius: "20px",
                    background: selectedDance.bg,
                    border: `1.5px solid ${selectedDance.border}`,
                    fontSize: "12px", fontWeight: 500,
                    color: selectedDance.color,
                  }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────────────
export default function FeaturePage() {
  const { id } = useParams();
  const feature = features.find((f) => f.id === id);
  const theme = FEATURE_THEMES[id] || FEATURE_THEMES.mudra;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ padding: "48px 48px 80px", maxWidth: "960px", margin: "0 auto", width: "100%" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px" }}>
          <Link to="/features" style={{
            textDecoration: "none", fontSize: "13px",
            color: "#8B6452", transition: "color 0.2s",
          }}>← All Features</Link>
          <span style={{ color: "#cbb", fontSize: "13px" }}>/</span>
          <span style={{ fontSize: "13px", color: theme.color, fontWeight: 500 }}>{feature?.name}</span>
        </div>

        {/* Feature header card */}
        <div style={{
          background: "#fff", borderRadius: "24px", padding: "40px",
          border: "1.5px solid rgba(0,0,0,0.06)", marginBottom: "32px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "5px",
            background: theme.gradient, borderRadius: "24px 24px 0 0",
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <div style={{
              width: "68px", height: "68px", borderRadius: "18px",
              background: theme.bg, border: `2px solid ${theme.color}30`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px",
            }}>
              {theme.icon}
            </div>
            <div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px", fontWeight: 700,
                color: theme.color, marginBottom: "4px",
              }}>
                {feature?.name}
              </h1>
              <p style={{ fontSize: "14px", color: "#8B6452" }}>NrityaNaad Feature Module</p>
            </div>
          </div>

          <p style={{ fontSize: "15px", color: "#5D3A1A", lineHeight: 1.7, fontWeight: 300 }}>
            Explore India's eight classical dance forms recognised by the Sangeet Natak Akademi —
            filter by region, search by name, and tap any card to learn about its history,
            key elements, and cultural roots.
          </p>
        </div>

        {/* Implementation area */}
        <div style={{
          borderRadius: "24px", padding: "36px 32px",
          border: `1.5px solid ${theme.color}20`,
          background: "#fafafa",
        }}>
          {id === "gallery" ? (
            <DanceGallery theme={theme} />
          ) : (
            <div style={{
              borderRadius: "24px", padding: "60px 40px",
              border: `2px dashed ${theme.color}40`,
              background: theme.bg, textAlign: "center",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚀</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "22px", fontWeight: 700,
                color: theme.color, marginBottom: "10px",
              }}>
                Implementation Area
              </h2>
              <p style={{ fontSize: "14px", color: "#8B6452", fontWeight: 300 }}>
                Drop your feature components and logic right here
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}