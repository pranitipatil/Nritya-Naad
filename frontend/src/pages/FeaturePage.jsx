import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MudraDetection from "../components/MudraDetection";
import UserStories from "../components/UserStories";
import Navbar from '../components/Navbar';
import features from '../data/features.json';
import IndiaMap from "../features/IndiaMap";
import Academy from "../features/Academy";

const FEATURE_THEMES = {
  mudra: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "🤲" },
  gallery: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🖼️" },
  academy: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🏛️" },
  chatbot: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "💬" },
  stories: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "📖" },
  map: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🗺️" },
  upload: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🎬" },
  danceform: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🎵" },
  quiz: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "❓" },
  event: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "📅" },
  reels: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🎞️" },
  mindmap: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🧠" },
  pitch: { color: "#C2185B", bg: "rgba(194,24,91,0.08)", gradient: "linear-gradient(135deg, #C2185B, #880E4F)", icon: "🎙️" },
  karaoke: { color: "#00897B", bg: "rgba(0,137,123,0.08)", gradient: "linear-gradient(135deg, #00897B, #004D40)", icon: "🎤" },
  visualizer: { color: "#3949AB", bg: "rgba(57,73,171,0.08)", gradient: "linear-gradient(135deg, #3949AB, #1A237E)", icon: "🌊" },
  swaras: { color: "#FF6B00", bg: "rgba(255,107,0,0.08)", gradient: "linear-gradient(135deg, #FF6B00, #E85D04)", icon: "🎶" },
};

const FEATURE_COMPONENTS = {
  map: IndiaMap,
};

export default function FeaturePage() {
  const { id } = useParams();
  const feature = features.find((f) => f.id === id);
  const theme = FEATURE_THEMES[id] || FEATURE_THEMES.mudra;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <div style={{ padding: "48px 48px 80px", maxWidth: "860px", margin: "0 auto", width: "100%" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px" }}>
          <Link to="/features" style={{ textDecoration: "none", fontSize: "13px", color: "#8B6452" }}>
            ← All Features
          </Link>
          <span style={{ color: "#cbb", fontSize: "13px" }}>/</span>
          <span style={{ fontSize: "13px", color: theme.color, fontWeight: 500 }}>
            {feature?.name}
          </span>
        </div>

        {/* Header */}
        <div style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "40px",
          border: "1.5px solid rgba(0,0,0,0.06)",
          marginBottom: "24px",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "5px",
            background: theme.gradient,
            borderRadius: "24px 24px 0 0",
          }} />

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{
              width: "68px", height: "68px",
              borderRadius: "18px",
              background: theme.bg,
              border: `2px solid ${theme.color}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}>
              {theme.icon}
            </div>

            <div>
              <h1 style={{
                fontSize: "32px",
                fontWeight: 700,
                color: theme.color,
              }}>
                {feature?.name}
              </h1>
              <p style={{ fontSize: "14px", color: "#8B6452" }}>
                NrityaNaad Feature Module
              </p>
            </div>
          </div>
        </div>

        {/* Implementation */}
        <div style={{
          borderRadius: "24px",
          padding: "60px 40px",
          border: `2px dashed ${theme.color}40`,
          background: theme.bg,
          textAlign: "center",
        }}>
          {id === "mudra" ? (
            <MudraDetection />
          ) : (
            <>
              <div style={{ fontSize: "48px" }}>🚀</div>
              <h2>Implementation Area</h2>
            </>
          )}
        </div>

        {id === "stories" && (
          <div style={{ marginTop: "32px" }}>
            <UserStories theme={theme} />
          </div>
        )}

      </div>
    </div>
  );
}