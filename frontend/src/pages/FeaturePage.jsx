import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import features from "../data/features.json";
import Navbar from "../components/Navbar";

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

const DANCE_FORMS = [
  { id: 1, name: "Bharatanatyam", region: "Tamil Nadu", category: "Classical", emoji: "💃", origin: "~2nd century BCE", description: "One of the oldest classical dance forms of India, rooted in the Natya Shastra. Known for its fixed upper torso, bent legs, and intricate footwork combined with expressive hand gestures (mudras).", keyFeatures: ["Nritta", "Nritya", "Natya", "Abhinaya"], color: "#C2185B", bg: "rgba(194,24,91,0.08)", border: "rgba(194,24,91,0.25)" },
  { id: 2, name: "Kathak", region: "North India", category: "Classical", emoji: "🌀", origin: "~15th century CE", description: "Originating from the storytelling Kathakas of northern India, Kathak blends Hindu devotional themes with Mughal court aesthetics. Famous for rapid spins (chakkar) and intricate tatkaar footwork.", keyFeatures: ["Tatkaar", "Chakkar", "Thumri", "Abhinaya"], color: "#FF6B00", bg: "rgba(255,107,0,0.08)", border: "rgba(255,107,0,0.25)" },
  { id: 3, name: "Odissi", region: "Odisha", category: "Classical", emoji: "🏛️", origin: "~2nd century BCE", description: "One of the earliest classical dance forms with roots in the Odisha temple tradition. Odissi is lyrical and sculpturesque, with the tribhangi posture (three-body bends) as its hallmark.", keyFeatures: ["Tribhangi", "Chouka", "Mangalacharan", "Abhinaya"], color: "#3949AB", bg: "rgba(57,73,171,0.08)", border: "rgba(57,73,171,0.25)" },
  { id: 4, name: "Kathakali", region: "Kerala", category: "Classical", emoji: "🎭", origin: "~17th century CE", description: "A highly stylised dance-drama from Kerala, Kathakali is known for its elaborate makeup (chutti), vivid costumes, and expressive storytelling drawn from the Mahabharata and Ramayana.", keyFeatures: ["Chutti makeup", "Navarasas", "Mudras", "Padam"], color: "#00897B", bg: "rgba(0,137,123,0.08)", border: "rgba(0,137,123,0.25)" },
  { id: 5, name: "Kuchipudi", region: "Andhra Pradesh", category: "Classical", emoji: "🎶", origin: "~3rd century BCE", description: "From the village of Kuchipudi in Andhra Pradesh, this form is known for its fast rhythmic footwork, graceful movements, and unique tarangam — dancing on the rim of a brass plate.", keyFeatures: ["Tarangam", "Jathi", "Sabdam", "Tillana"], color: "#C2185B", bg: "rgba(194,24,91,0.08)", border: "rgba(194,24,91,0.25)" },
  { id: 6, name: "Manipuri", region: "Manipur", category: "Classical", emoji: "🌸", origin: "~15th century CE", description: "A gentle and lyrical dance form from Manipur, closely tied to Vaishnavism. The Ras Leela performances depicting Radha-Krishna are its most celebrated expressions.", keyFeatures: ["Ras Leela", "Pung Cholom", "Lai Haraoba", "Sankirtana"], color: "#FF6B00", bg: "rgba(255,107,0,0.08)", border: "rgba(255,107,0,0.25)" },
  { id: 7, name: "Mohiniyattam", region: "Kerala", category: "Classical", emoji: "🌊", origin: "~16th century CE", description: "The 'dance of the enchantress' is a graceful, feminine solo form from Kerala with swaying movements evoking ocean waves and palm trees. Performed exclusively by women in traditional white and gold.", keyFeatures: ["Lasya", "Cholkettu", "Tharangu", "Varnam"], color: "#3949AB", bg: "rgba(57,73,171,0.08)", border: "rgba(57,73,171,0.25)" },
  { id: 8, name: "Sattriya", region: "Assam", category: "Classical", emoji: "🪷", origin: "~15th century CE", description: "Founded by the Vaishnavite saint Srimanta Shankardev, Sattriya originated in the sattra monasteries of Assam. It combines dance, music, and drama to narrate episodes from Vaishnavite literature.", keyFeatures: ["Dashavatara", "Chali", "Rajagharia Chali", "Ojapali"], color: "#00897B", bg: "rgba(0,137,123,0.08)", border: "rgba(0,137,123,0.25)" },
];

const REGIONS = ["All Regions", "Tamil Nadu", "North India", "Odisha", "Kerala", "Andhra Pradesh", "Manipur", "Assam"];

const QUIZ_QUESTIONS = [
  { id: 1, question: "Which classical dance form originates from Tamil Nadu?", options: ["Kathak", "Bharatanatyam", "Odissi", "Manipuri"], answer: "Bharatanatyam", explanation: "Bharatanatyam is one of the oldest classical dance forms, originating from Tamil Nadu and rooted in the Natya Shastra." },
  { id: 2, question: "What is the signature posture of Odissi known as?", options: ["Chouka", "Tribhangi", "Tatkaar", "Lasya"], answer: "Tribhangi", explanation: "Tribhangi means 'three bends' — the body bends at the neck, torso, and knee — and is the hallmark posture of Odissi." },
  { id: 3, question: "Kathakali is a dance-drama form from which state?", options: ["Assam", "Odisha", "Kerala", "Manipur"], answer: "Kerala", explanation: "Kathakali originates from Kerala and is known for its elaborate chutti makeup and vivid costumes." },
  { id: 4, question: "Which dance form is famous for the 'tarangam' — dancing on a brass plate?", options: ["Kuchipudi", "Sattriya", "Mohiniyattam", "Kathak"], answer: "Kuchipudi", explanation: "Kuchipudi from Andhra Pradesh uniquely features tarangam where the dancer balances on the rim of a brass plate." },
  { id: 5, question: "Ras Leela is a key performance style of which dance form?", options: ["Bharatanatyam", "Kathakali", "Manipuri", "Odissi"], answer: "Manipuri", explanation: "Ras Leela, depicting the love of Radha and Krishna, is central to Manipuri dance from Manipur." },
  { id: 6, question: "Which saint founded the Sattriya dance form?", options: ["Tukaram", "Srimanta Shankardev", "Mirabai", "Kabir"], answer: "Srimanta Shankardev", explanation: "Sattriya was founded by the Vaishnavite saint Srimanta Shankardev in 15th century Assam." },
  { id: 7, question: "Mohiniyattam is performed exclusively by whom?", options: ["Men", "Children", "Women", "Priests"], answer: "Women", explanation: "Mohiniyattam, the 'dance of the enchantress', is a graceful feminine solo form performed exclusively by women." },
  { id: 8, question: "What does 'Abhinaya' mean in classical dance?", options: ["Footwork", "Expressive storytelling", "Spinning", "Costume"], answer: "Expressive storytelling", explanation: "Abhinaya refers to the art of expression and storytelling through facial expressions, gestures, and body movements." },
  { id: 9, question: "Which dance form blends Hindu devotional themes with Mughal court aesthetics?", options: ["Odissi", "Sattriya", "Kathak", "Kuchipudi"], answer: "Kathak", explanation: "Kathak from North India uniquely blends Hindu devotional storytelling with Mughal court aesthetics and is known for its chakkar spins." },
  { id: 10, question: "How many classical dance forms are recognised by the Sangeet Natak Akademi?", options: ["6", "8", "10", "12"], answer: "8", explanation: "The Sangeet Natak Akademi recognises 8 classical dance forms: Bharatanatyam, Kathak, Odissi, Kathakali, Kuchipudi, Manipuri, Mohiniyattam, and Sattriya." },
];

function Karaoke({ theme }) {
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  const lyrics = [
    { start: 0, end: 4, text: "Vande Mataram" },
    { start: 4, end: 9, text: "Sujalam suphalam" },
    { start: 9, end: 14, text: "Malayaja sheetalam" },
    { start: 14, end: 19, text: "Shasyashyamalam Mataram" },
    { start: 19, end: 24, text: "Vande Mataram" },
    { start: 24, end: 29, text: "Shubhrajyotsna pulakitayaminim" },
    { start: 29, end: 35, text: "Phullakusumita drumadala shobhinim" },
    { start: 35, end: 41, text: "Suhasinim sumadhura bhashinim" },
    { start: 41, end: 48, text: "Sukhadam varadam Mataram" },
    { start: 48, end: 55, text: "Vande Mataram" },
  ];

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (audioUrl) URL.revokeObjectURL(audioUrl);

    const objectUrl = URL.createObjectURL(file);
    setAudioUrl(objectUrl);
    setFileName(file.name);
    setCurrentTime(0);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const activeLineIndex = lyrics.findIndex(
    (line) => currentTime >= line.start && currentTime < line.end
  );

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "28px",
          border: `1.5px solid ${theme.color}20`,
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            color: theme.color,
            marginBottom: "10px",
          }}
        >
          Karaoke Player
        </h3>

        <p style={{ fontSize: "14px", color: "#8B6452", marginBottom: "18px", lineHeight: 1.6 }}>
          Choose your audio file and watch the lyrics highlight as the song plays.
        </p>

        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          style={{
            marginBottom: "18px",
            fontSize: "14px",
            color: "#5D3A1A",
          }}
        />

        {fileName && (
          <p style={{ fontSize: "13px", color: theme.color, marginBottom: "14px", fontWeight: 600 }}>
            Selected file: {fileName}
          </p>
        )}

        {audioUrl && (
          <>
            <audio
              ref={audioRef}
              controls
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              style={{ width: "100%", marginTop: "8px", marginBottom: "22px" }}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            <div style={{ fontSize: "13px", color: "#8B6452", marginBottom: "14px" }}>
              Current time: <strong>{formatTime(currentTime)}</strong>
            </div>

            <div
              style={{
                background: "#faf7f3",
                borderRadius: "16px",
                padding: "22px",
                border: `1px solid ${theme.color}20`,
              }}
            >
              <h4
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "18px",
                  color: theme.color,
                  marginBottom: "16px",
                }}
              >
                Lyrics
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {lyrics.map((line, index) => {
                  const isActive = index === activeLineIndex;
                  const isPast = index < activeLineIndex;

                  return (
                    <div
                      key={index}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "12px",
                        background: isActive ? theme.color : isPast ? theme.bg : "#fff",
                        color: isActive ? "#fff" : "#5D3A1A",
                        fontSize: isActive ? "18px" : "15px",
                        fontWeight: isActive ? 700 : 400,
                        transform: isActive ? "scale(1.02)" : "scale(1)",
                        transition: "all 0.25s ease",
                        border: `1px solid ${isActive ? theme.color : "rgba(0,0,0,0.06)"}`,
                        boxShadow: isActive ? `0 8px 24px ${theme.color}30` : "none",
                      }}
                    >
                      <span style={{ marginRight: "10px", opacity: 0.7, fontSize: "12px" }}>
                        {formatTime(line.start)}
                      </span>
                      {isActive ? "🎤 " : ""}
                      {line.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {!audioUrl && (
          <div
            style={{
              marginTop: "10px",
              padding: "18px",
              borderRadius: "14px",
              background: theme.bg,
              color: "#5D3A1A",
              fontSize: "14px",
            }}
          >
            Click <strong>Choose File</strong> and select your downloaded song.
          </div>
        )}
      </div>
    </div>
  );
}

function Quiz({ theme }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = QUIZ_QUESTIONS[current];

  const handleOption = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === q.answer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current + 1 < QUIZ_QUESTIONS.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
  };

  const optionStyle = (option) => {
    let bg = "#fff", border = "rgba(0,0,0,0.12)", color = "#5D3A1A";
    if (answered) {
      if (option === q.answer) { bg = "rgba(0,137,123,0.12)"; border = "#00897B"; color = "#00897B"; }
      else if (option === selected) { bg = "rgba(194,24,91,0.10)"; border = "#C2185B"; color = "#C2185B"; }
    } else if (selected === option) {
      bg = theme.bg; border = theme.color; color = theme.color;
    }
    return {
      width: "100%",
      padding: "14px 18px",
      borderRadius: "12px",
      border: `1.5px solid ${border}`,
      background: bg,
      color,
      fontSize: "14px",
      fontWeight: 500,
      cursor: answered ? "default" : "pointer",
      textAlign: "left",
      transition: "all 0.2s",
      fontFamily: "'DM Sans', sans-serif"
    };
  };

  if (showResult) {
    const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    const medal = pct === 100 ? "🏆" : pct >= 70 ? "🥈" : pct >= 40 ? "🥉" : "🎭";
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>{medal}</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: theme.color, marginBottom: "8px" }}>
          Quiz Complete!
        </h2>
        <p style={{ fontSize: "15px", color: "#8B6452", marginBottom: "24px" }}>
          You scored <strong style={{ color: theme.color }}>{score}</strong> out of <strong>{QUIZ_QUESTIONS.length}</strong>
        </p>
        <div
          style={{ display: "inline-block", padding: "10px 28px", borderRadius: "24px", background: theme.color, color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          onClick={handleRestart}
        >
          Try Again
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#8B6452", marginBottom: "8px" }}>
          <span>Question {current + 1} of {QUIZ_QUESTIONS.length}</span>
          <span>Score: <strong style={{ color: theme.color }}>{score}</strong></span>
        </div>
        <div style={{ height: "6px", borderRadius: "10px", background: "rgba(0,0,0,0.08)" }}>
          <div style={{ height: "100%", borderRadius: "10px", background: theme.color, width: `${(current / QUIZ_QUESTIONS.length) * 100}%`, transition: "width 0.4s ease" }} />
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: "18px", padding: "28px", border: `1.5px solid ${theme.color}20`, marginBottom: "20px" }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px", fontWeight: 700, color: "#3D1C00", lineHeight: 1.5 }}>
          {q.question}
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
        {q.options.map((option) => (
          <button key={option} onClick={() => handleOption(option)} style={optionStyle(option)}>
            {option}
          </button>
        ))}
      </div>

      {answered && (
        <div style={{ background: selected === q.answer ? "rgba(0,137,123,0.08)" : "rgba(194,24,91,0.08)", borderRadius: "12px", padding: "16px 18px", marginBottom: "20px", border: `1.5px solid ${selected === q.answer ? "#00897B" : "#C2185B"}30` }}>
          <p style={{ fontSize: "13px", color: "#5D3A1A", lineHeight: 1.6 }}>
            <strong style={{ color: selected === q.answer ? "#00897B" : "#C2185B" }}>
              {selected === q.answer ? "✓ Correct! " : "✗ Incorrect. "}
            </strong>
            {q.explanation}
          </p>
        </div>
      )}

      {answered && (
        <div style={{ textAlign: "right" }}>
          <button
            onClick={handleNext}
            style={{ padding: "12px 28px", borderRadius: "24px", background: theme.color, color: "#fff", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            {current + 1 === QUIZ_QUESTIONS.length ? "See Results" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

function DanceGallery({ theme }) {
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedDance, setSelectedDance] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = DANCE_FORMS.filter((d) => {
    const matchReg = selectedRegion === "All Regions" || d.region === selectedRegion;
    const matchSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchReg && matchSearch;
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
            fontFamily: "'DM Sans', sans-serif"
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {REGIONS.map((r) => (
            <button key={r} onClick={() => setSelectedRegion(r)} style={pillStyle(selectedRegion === r)}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <p style={{ fontSize: "13px", color: "#8B6452", marginBottom: "20px" }}>
        Showing <strong style={{ color: theme.color }}>{filtered.length}</strong> dance forms
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" }}>
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
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: dance.color, borderRadius: "18px 18px 0 0" }} />
            <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: dance.bg, border: `1.5px solid ${dance.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "14px" }}>
              {dance.emoji}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 700, color: dance.color, marginBottom: "4px" }}>
              {dance.name}
            </h3>
            <p style={{ fontSize: "12px", color: "#8B6452", marginBottom: "10px", fontWeight: 500 }}>
              📍 {dance.region}
            </p>
            <p style={{ fontSize: "12px", color: "#7B5040", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {dance.description}
            </p>
            <div style={{ marginTop: "14px", fontSize: "12px", color: dance.color, fontWeight: 500 }}>
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

      {selectedDance && (
        <div
          onClick={() => setSelectedDance(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "24px" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: "24px", padding: "40px", maxWidth: "520px", width: "100%", position: "relative", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: `linear-gradient(135deg, ${selectedDance.color}, #004D40)` }} />
            <button
              onClick={() => setSelectedDance(null)}
              style={{ position: "absolute", top: "20px", right: "20px", background: "rgba(0,0,0,0.06)", border: "none", borderRadius: "50%", width: "32px", height: "32px", cursor: "pointer", fontSize: "16px", color: "#5D3A1A" }}
            >
              ✕
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <div style={{ width: "64px", height: "64px", borderRadius: "16px", background: selectedDance.bg, border: `2px solid ${selectedDance.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px" }}>
                {selectedDance.emoji}
              </div>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, color: selectedDance.color, marginBottom: "2px" }}>
                  {selectedDance.name}
                </h2>
                <p style={{ fontSize: "13px", color: "#8B6452" }}>
                  📍 {selectedDance.region} &nbsp;·&nbsp; 🕰️ {selectedDance.origin}
                </p>
              </div>
            </div>

            <p style={{ fontSize: "14px", color: "#5D3A1A", lineHeight: 1.75, marginBottom: "24px" }}>
              {selectedDance.description}
            </p>

            <div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px", fontWeight: 700, color: selectedDance.color, marginBottom: "12px" }}>
                Key Elements
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedDance.keyFeatures.map((f) => (
                  <span
                    key={f}
                    style={{ padding: "5px 12px", borderRadius: "20px", background: selectedDance.bg, border: `1.5px solid ${selectedDance.border}`, fontSize: "12px", fontWeight: 500, color: selectedDance.color }}
                  >
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

export default function FeaturePage() {
  const { id } = useParams();
  const feature = features.find((f) => f.id === id);
  const theme = FEATURE_THEMES[id] || FEATURE_THEMES.mudra;

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ padding: "48px 48px 80px", maxWidth: "960px", margin: "0 auto", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px" }}>
          <Link to="/features" style={{ textDecoration: "none", fontSize: "13px", color: "#8B6452", transition: "color 0.2s" }}>
            ← All Features
          </Link>
          <span style={{ color: "#cbb", fontSize: "13px" }}>/</span>
          <span style={{ fontSize: "13px", color: theme.color, fontWeight: 500 }}>{feature?.name}</span>
        </div>

        <div style={{ background: "#fff", borderRadius: "24px", padding: "40px", border: "1.5px solid rgba(0,0,0,0.06)", marginBottom: "32px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: theme.gradient, borderRadius: "24px 24px 0 0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px" }}>
            <div style={{ width: "68px", height: "68px", borderRadius: "18px", background: theme.bg, border: `2px solid ${theme.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>
              {theme.icon}
            </div>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, color: theme.color, marginBottom: "4px" }}>
                {feature?.name}
              </h1>
              <p style={{ fontSize: "14px", color: "#8B6452" }}>NrityaNaad Feature Module</p>
            </div>
          </div>

          <p style={{ fontSize: "15px", color: "#5D3A1A", lineHeight: 1.7, fontWeight: 300 }}>
            {id === "gallery"
              ? "Explore India's eight classical dance forms — filter by region, search by name, and tap any card to learn about its history, key elements, and cultural roots."
              : id === "quiz"
              ? "Test your knowledge of Indian classical dance and music with 10 curated questions."
              : id === "karaoke"
              ? "Choose an audio file and sing along with synced lyrics."
              : `This is your dedicated workspace for the ${feature?.name} module.`}
          </p>
        </div>

        <div style={{ borderRadius: "24px", padding: "36px 32px", border: `1.5px solid ${theme.color}20`, background: "#fafafa" }}>
          {id === "gallery" ? (
            <DanceGallery theme={theme} />
          ) : id === "quiz" ? (
            <Quiz theme={theme} />
          ) : id === "karaoke" ? (
            <Karaoke theme={theme} />
          ) : id === "stories" ? (
            <div style={{ borderRadius: "24px", padding: "60px 40px", border: `2px dashed ${theme.color}40`, background: theme.bg, textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📖</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: theme.color, marginBottom: "10px" }}>
                User Stories
              </h2>
              <p style={{ fontSize: "14px", color: "#8B6452", fontWeight: 300 }}>Coming soon</p>
            </div>
          ) : (
            <div style={{ borderRadius: "24px", padding: "60px 40px", border: `2px dashed ${theme.color}40`, background: theme.bg, textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚀</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: theme.color, marginBottom: "10px" }}>
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