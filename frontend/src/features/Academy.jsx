import { useState } from "react";

const ACADEMIES = [
  {
    id: 1,
    name: "Kalakshetra Foundation",
    city: "Chennai",
    state: "Tamil Nadu",
    artForms: ["Bharatanatyam", "Carnatic Music"],
    description: "Premier institution for Bharatanatyam and Carnatic classical arts, founded by Rukmini Devi Arundale.",
    contact: "+91 44 2491 1169",
    email: "info@kalakshetra.in",
    established: 1936,
    icon: "🏛️",
  },
  {
    id: 2,
    name: "Sangeet Natak Akademi",
    city: "New Delhi",
    state: "Delhi",
    artForms: ["Kathak", "Hindustani Music", "Odissi"],
    description: "India's national academy of music, dance and drama, promoting classical and folk performing arts.",
    contact: "+91 11 2338 7246",
    email: "contact@sangeetnatak.gov.in",
    established: 1952,
    icon: "🎭",
  },
  {
    id: 3,
    name: "Nrityagram Dance Ensemble",
    city: "Hesaraghatta",
    state: "Karnataka",
    artForms: ["Odissi", "Kuchipudi"],
    description: "A residential dance village dedicated to excellence in Indian classical dance forms.",
    contact: "+91 80 2846 6313",
    email: "nrityagram@gmail.com",
    established: 1990,
    icon: "🌿",
  },
  {
    id: 4,
    name: "Gandharva Mahavidyalaya",
    city: "Mumbai",
    state: "Maharashtra",
    artForms: ["Hindustani Music", "Tabla", "Harmonium"],
    description: "One of India's oldest music schools, offering courses in Hindustani classical music.",
    contact: "+91 22 2363 2805",
    email: "info@gandharvamahavidyalaya.com",
    established: 1934,
    icon: "🎵",
  },
  {
    id: 5,
    name: "Manipuri Nartanalaya",
    city: "Kolkata",
    state: "West Bengal",
    artForms: ["Manipuri", "Rabindra Nritya"],
    description: "Dedicated to preserving and propagating Manipuri classical dance traditions.",
    contact: "+91 33 2555 4321",
    email: "nartanalaya@gmail.com",
    established: 1972,
    icon: "💃",
  },
  {
    id: 6,
    name: "Kathak Kendra",
    city: "New Delhi",
    state: "Delhi",
    artForms: ["Kathak"],
    description: "National institution for Kathak dance under Sangeet Natak Akademi, preserving the classical tradition.",
    contact: "+91 11 2338 7235",
    email: "kathakkendra@sangeetnatak.gov.in",
    established: 1964,
    icon: "🪘",
  },
  {
    id: 7,
    name: "Doordarshan Kendra Music Academy",
    city: "Bangalore",
    state: "Karnataka",
    artForms: ["Carnatic Music", "Veena", "Flute"],
    description: "Training in Carnatic classical music with expert faculty and state-of-the-art facilities.",
    contact: "+91 80 2225 0078",
    email: "musicacademy@blr.in",
    established: 1968,
    icon: "🎶",
  },
  {
    id: 8,
    name: "Kerala Kalamandalam",
    city: "Thrissur",
    state: "Kerala",
    artForms: ["Kathakali", "Mohiniyattam", "Koodiyattam"],
    description: "Deemed university dedicated to Kathakali, Mohiniyattam and other Kerala classical art forms.",
    contact: "+91 488 2634 305",
    email: "admin@kalamandalam.org",
    established: 1930,
    icon: "🎨",
  },
];

const ALL_ART_FORMS = [...new Set(ACADEMIES.flatMap((a) => a.artForms))].sort();
const ALL_STATES = [...new Set(ACADEMIES.map((a) => a.state))].sort();

const theme = {
  color: "#3949AB",
  bg: "rgba(57,73,171,0.08)",
  gradient: "linear-gradient(135deg, #3949AB, #1A237E)",
  border: "rgba(57,73,171,0.2)",
};

export default function Academy() {
  const [search, setSearch] = useState("");
  const [artFilter, setArtFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("All");

  const filtered = ACADEMIES.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase());
    const matchArt = artFilter === "All" || a.artForms.includes(artFilter);
    const matchState = stateFilter === "All" || a.state === stateFilter;
    return matchSearch && matchArt && matchState;
  });

  return (
    <div>
      {/* Intro */}
      <p style={{ fontSize: "15px", color: "#5D3A1A", lineHeight: 1.7, marginBottom: "32px", fontWeight: 300 }}>
        Discover renowned academies across India offering training in classical dance and music traditions.
        Filter by art form or state to find the right institution for your journey.
      </p>

      {/* Filters */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        marginBottom: "32px",
        padding: "20px 24px",
        background: "#fff",
        borderRadius: "16px",
        border: "1.5px solid rgba(0,0,0,0.06)",
      }}>
        <input
          type="text"
          placeholder="Search academy or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: "1 1 200px",
            padding: "10px 16px",
            borderRadius: "10px",
            border: `1.5px solid ${theme.border}`,
            fontSize: "14px",
            color: "#3D1C00",
            outline: "none",
            background: theme.bg,
          }}
        />

        <select
          value={artFilter}
          onChange={(e) => setArtFilter(e.target.value)}
          style={{
            flex: "1 1 160px",
            padding: "10px 14px",
            borderRadius: "10px",
            border: `1.5px solid ${theme.border}`,
            fontSize: "14px",
            color: "#3D1C00",
            background: theme.bg,
            cursor: "pointer",
          }}
        >
          <option value="All">All Art Forms</option>
          {ALL_ART_FORMS.map((af) => (
            <option key={af} value={af}>{af}</option>
          ))}
        </select>

        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          style={{
            flex: "1 1 140px",
            padding: "10px 14px",
            borderRadius: "10px",
            border: `1.5px solid ${theme.border}`,
            fontSize: "14px",
            color: "#3D1C00",
            background: theme.bg,
            cursor: "pointer",
          }}
        >
          <option value="All">All States</option>
          {ALL_STATES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Count */}
      <p style={{ fontSize: "13px", color: "#8B6452", marginBottom: "20px" }}>
        Showing <strong style={{ color: theme.color }}>{filtered.length}</strong> of {ACADEMIES.length} academies
      </p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 24px",
          borderRadius: "16px",
          background: theme.bg,
          border: `2px dashed ${theme.border}`,
        }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
          <p style={{ color: "#8B6452", fontSize: "15px" }}>No academies match your filters. Try adjusting your search.</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {filtered.map((academy) => (
            <AcademyCard key={academy.id} academy={academy} />
          ))}
        </div>
      )}
    </div>
  );
}

function AcademyCard({ academy }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "24px",
        border: `1.5px solid ${hovered ? theme.color : theme.border}`,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 40px ${theme.border}` : "none",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "4px",
        background: theme.gradient,
        borderRadius: "20px 20px 0 0",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "14px" }}>
        <div style={{
          width: "48px", height: "48px",
          borderRadius: "12px",
          background: theme.bg,
          border: `1.5px solid ${theme.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          flexShrink: 0,
        }}>
          {academy.icon}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "16px",
            fontWeight: 700,
            color: theme.color,
            marginBottom: "3px",
            lineHeight: 1.3,
          }}>
            {academy.name}
          </h3>
          <p style={{ fontSize: "12px", color: "#8B6452" }}>
            📍 {academy.city}, {academy.state} · Est. {academy.established}
          </p>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: "13px",
        color: "#5D3A1A",
        lineHeight: 1.6,
        marginBottom: "14px",
        fontWeight: 300,
      }}>
        {academy.description}
      </p>

      {/* Art form tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {academy.artForms.map((af) => (
          <span key={af} style={{
            padding: "3px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 500,
            color: theme.color,
            background: theme.bg,
            border: `1px solid ${theme.border}`,
          }}>
            {af}
          </span>
        ))}
      </div>

      {/* Contact */}
      <div style={{
        borderTop: "1px solid rgba(0,0,0,0.06)",
        paddingTop: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}>
        <a href={`tel:${academy.contact}`} style={{
          fontSize: "12px",
          color: "#5D3A1A",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          📞 {academy.contact}
        </a>
        <a href={`mailto:${academy.email}`} style={{
          fontSize: "12px",
          color: theme.color,
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}>
          ✉️ {academy.email}
        </a>
      </div>
    </div>
  );
}
