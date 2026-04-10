// src/components/GuessDanceForm.jsx
import React, { useState } from 'react';

// 1. IMPORT YOUR IMAGES HERE! 
// This tells Vite exactly where to find them to bundle them perfectly.
import bhartImg from '../assets/bhart.jpeg';
import kathakImg from '../assets/kathak-dance.png';
import oddisiImg from '../assets/oddisi.jpeg';

const GuessDanceForm = ({ theme }) => {
const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const danceData = [
    {
      id: 1,
      name: "Bharatanatyam",
      emoji: "🪷",
      image: bhartImg, // Uses the imported variable
      description: "Originating from Tamil Nadu, known for fixed upper torso, bent legs, and intricate footwork",
      options: ["Bharatanatyam", "Kathak", "Odissi", "Kuchipudi"],
      facts: "One of the oldest classical dance forms of India, dating back to 1000 BCE"
    },
    {
      id: 2,
      name: "Kathak",
      emoji: "💫",
      image: kathakImg, // Uses the imported variable
      description: "North Indian dance form known for fast footwork (tatkar) and spectacular spins (chakkars)",
      options: ["Bharatanatyam", "Kathak", "Odissi", "Manipuri"],
      facts: "Derived from the word 'Katha' meaning story, dancers used to narrate mythological stories"
    },
    {
      id: 3,
      name: "Odissi",
      emoji: "🌊",
      image: oddisiImg, // Uses the imported variable
      description: "Characterized by the 'Tribhangi' posture - body bent at neck, waist, and knee",
      options: ["Kathakali", "Odissi", "Mohiniyattam", "Kuchipudi"],
      facts: "Originated in the temples of Odisha, known for its graceful and lyrical movements"
    },
    {
      id: 4,
      name: "Kathakali",
      emoji: "🎭",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Kathakali_male_actor.jpg",
      description: "Kerala's dance-drama known for elaborate makeup, costumes, and exaggerated expressions",
      options: ["Kathakali", "Yakshagana", "Therukoothu", "Bhangra"],
      facts: "Features distinctive green makeup for heroic characters and red for evil characters"
    },
    {
      id: 5,
      name: "Kuchipudi",
      emoji: "🏺",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/29/Kuchipudi_dance.jpg",
      description: "Andhra Pradesh dance form known for brass plate balancing and fast rhythms",
      options: ["Bharatanatyam", "Kuchipudi", "Odissi", "Kathak"],
      facts: "Originally performed only by men, now women also perform this vibrant dance"
    },
    {
      id: 6,
      name: "Manipuri",
      emoji: "🌸",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Manipuri_Dance.jpg",
      description: "Graceful Manipuri dance with rounded movements and flowing costumes",
      options: ["Manipuri", "Sattriya", "Mohiniyattam", "Kathakali"],
      facts: "Known for its unique rounded movements, unlike the sharp lines of other classical dances"
    },
    {
      id: 7,
      name: "Mohiniyattam",
      emoji: "✨",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Mohiniyattam_Performance.jpg",
      description: "Kerala's graceful dance of the enchantress with gentle swaying movements",
      options: ["Bharatanatyam", "Mohiniyattam", "Kathak", "Odissi"],
      facts: "Named after Mohini, the female avatar of Lord Vishnu, known for its lasya (graceful) style"
    },
    {
      id: 8,
      name: "Sattriya",
      emoji: "🥁",
      image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Sattriya_Dance_Performance.jpg",
      description: "Assam's monastery dance with vigorous footwork and unique musical instruments",
      options: ["Sattriya", "Bihu", "Jhumur", "Odissi"],
      facts: "Originated in the 15th century in the Sattras (monasteries) of Assam"
    }
  ];

  const handleAnswer = (selected) => {
    if (showFeedback) return;
    
    setSelectedOption(selected);
    const correct = selected === danceData[currentIndex].name;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentIndex + 1 < danceData.length) {
        setCurrentIndex(currentIndex + 1);
        setShowFeedback(false);
        setSelectedOption(null);
        setShowAnswer(false);
        setImageFailed(false); 
      } else {
        setGameCompleted(true);
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowFeedback(false);
    setIsCorrect(false);
    setSelectedOption(null);
    setGameCompleted(false);
    setShowAnswer(false);
    setImageFailed(false);
  };

  const revealAnswer = () => {
    setShowAnswer(true);
  };

  if (gameCompleted) {
    const percentage = (score / danceData.length) * 100;
    let message = "";
    if (percentage === 100) message = "🏆 PERFECT! You're a true dance connoisseur! 🏆";
    else if (percentage >= 80) message = "🌟 Excellent! You know your dance forms well! 🌟";
    else if (percentage >= 60) message = "👍 Good job! Keep exploring Indian classical dances! 👍";
    else if (percentage >= 40) message = "📚 Nice try! Learn more about these beautiful art forms! 📚";
    else message = "💪 Great start! Each dance form has a unique story to tell! 💪";

    return (
      <div style={styles.container}>
        <div style={styles.resultContainer}>
          <div style={{...styles.resultIcon, background: theme.bg, color: theme.color}}>🏆</div>
          <h2 style={{...styles.resultTitle, color: theme.color}}>Challenge Complete!</h2>
          <div style={styles.scoreCircle}>
            <div style={{...styles.scoreNumber, color: theme.color}}>{score}</div>
            <div style={styles.scoreTotal}>/{danceData.length}</div>
          </div>
          <div style={styles.percentageBar}>
            <div style={{...styles.percentageFill, width: `${percentage}%`, background: theme.color}}></div>
          </div>
          <p style={styles.resultMessage}>{message}</p>
          
          <div style={styles.resultStats}>
            <div style={styles.resultStat}>
              <span>✅ Correct</span>
              <strong style={{color: theme.color}}>{score}</strong>
            </div>
            <div style={styles.resultStat}>
              <span>❌ Incorrect</span>
              <strong style={{color: theme.color}}>{danceData.length - score}</strong>
            </div>
            <div style={styles.resultStat}>
              <span>📊 Accuracy</span>
              <strong style={{color: theme.color}}>{Math.round(percentage)}%</strong>
            </div>
          </div>
          
          <button onClick={resetGame} style={{...styles.playAgainBtn, background: theme.color}}>🔄 Play Again</button>
        </div>
      </div>
    );
  }

  const currentDance = danceData[currentIndex];
  const progress = ((currentIndex + 1) / danceData.length) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{...styles.iconWrapper, background: theme.bg, color: theme.color}}>💃</div>
        <h2 style={{...styles.title, color: theme.color}}>Guess the Dance Form</h2>
        <p style={styles.description}>Identify the Indian classical dance form</p>
      </div>

      <div style={styles.progressSection}>
        <div style={styles.progressHeader}>
          <span>Question {currentIndex + 1} of {danceData.length}</span>
          <span style={{...styles.scoreBadge, background: theme.bg, color: theme.color}}>🎯 Score: {score}</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{...styles.progressFill, width: `${progress}%`, background: theme.color}}></div>
        </div>
      </div>

      <div style={styles.imageContainer}>
        {!imageFailed ? (
          <img 
            src={currentDance.image} 
            alt="Dance form"
            style={styles.danceImage}
            onError={() => setImageFailed(true)} 
          />
        ) : (
          <div style={{...styles.emojiFallback, background: theme.bg}}>
            <span style={styles.massiveEmoji}>{currentDance.emoji}</span>
          </div>
        )}
        <div style={styles.imageOverlay}>
          <span style={styles.imageHint}>🔍 Identify this dance form</span>
        </div>
      </div>

      <div style={{...styles.descriptionBox, borderLeftColor: theme.color}}>
        <strong>💡 Hint:</strong> {currentDance.description}
      </div>

      <div style={styles.optionsGrid}>
        {currentDance.options.map((option, idx) => {
          let optionStyle = {...styles.optionBtn};
          
          if (showFeedback) {
            if (option === currentDance.name) {
              optionStyle = {...optionStyle, ...styles.correctOption};
            } else if (option === selectedOption && option !== currentDance.name) {
              optionStyle = {...optionStyle, ...styles.wrongOption};
            } else {
              optionStyle = {...optionStyle, ...styles.disabledOption};
            }
          }
          
          return (
            <button
              key={idx}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback}
              style={optionStyle}
              onMouseEnter={(e) => {
                if (!showFeedback) {
                  e.currentTarget.style.borderColor = theme.color;
                  e.currentTarget.style.transform = 'translateX(5px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!showFeedback) {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateX(0)';
                }
              }}
            >
              <span style={styles.optionLetter}>{String.fromCharCode(65 + idx)}.</span>
              {option}
              {showFeedback && option === currentDance.name && <span style={styles.optionIcon}>✓</span>}
              {showFeedback && option === selectedOption && option !== currentDance.name && <span style={styles.optionIcon}>✗</span>}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div style={{...styles.feedbackBox, background: isCorrect ? '#d1fae5' : '#fee2e2'}}>
          <div style={styles.feedbackIcon}>{isCorrect ? '🎉' : '😔'}</div>
          <div style={styles.feedbackContent}>
            <strong>{isCorrect ? 'Correct!' : 'Incorrect!'}</strong>
            <p>{isCorrect 
              ? `Great job! ${currentDance.name} is correct. ${currentDance.facts}` 
              : `The correct answer is ${currentDance.name}. ${currentDance.facts}`}
            </p>
          </div>
        </div>
      )}

      {!showFeedback && !showAnswer && (
        <button onClick={revealAnswer} style={{...styles.revealBtn, borderColor: theme.color, color: theme.color}}>
          🔍 Reveal Answer
        </button>
      )}

      {showAnswer && !showFeedback && (
        <div style={{...styles.answerBox, background: theme.bg, borderColor: theme.color}}>
          <strong>Answer: {currentDance.name}</strong>
          <p>{currentDance.facts}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    background: '#fff',
    borderRadius: '24px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
  },
  header: { textAlign: 'center', marginBottom: '2rem' },
  iconWrapper: { width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1rem' },
  title: { fontSize: '1.8rem', fontWeight: 700, fontFamily: "'Playfair Display', serif", marginBottom: '0.5rem' },
  description: { color: '#8B6452', fontSize: '0.95rem' },
  progressSection: { marginBottom: '1.5rem' },
  progressHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#8B6452' },
  scoreBadge: { padding: '0.25rem 0.75rem', borderRadius: '20px', fontWeight: 'bold' },
  progressBar: { height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' },
  progressFill: { height: '100%', transition: 'width 0.3s ease' },
  
  imageContainer: { position: 'relative', borderRadius: '16px', overflow: 'hidden', marginBottom: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' },
  danceImage: { width: '100%', height: '100%', objectFit: 'contain', display: 'block' },
  emojiFallback: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' },
  massiveEmoji: { fontSize: '120px', filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.1))' },
  
  imageOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', padding: '2rem 1rem 1rem', textAlign: 'center' },
  imageHint: { color: 'white', fontSize: '0.9rem', fontWeight: 'bold' },
  descriptionBox: { background: '#fdf8f5', padding: '1rem', borderRadius: '12px', borderLeft: '4px solid', marginBottom: '1.5rem', fontSize: '0.9rem', color: '#4a5568' },
  optionsGrid: { display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' },
  optionBtn: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '2px solid #e2e8f0', borderRadius: '12px', background: 'white', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.95rem', textAlign: 'left' },
  optionLetter: { fontWeight: 'bold', minWidth: '30px' },
  correctOption: { background: '#d1fae5', borderColor: '#10b981', cursor: 'default' },
  wrongOption: { background: '#fee2e2', borderColor: '#ef4444', cursor: 'default' },
  disabledOption: { opacity: 0.6, cursor: 'default' },
  optionIcon: { marginLeft: 'auto', fontSize: '1.2rem' },
  feedbackBox: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' },
  feedbackIcon: { fontSize: '2rem' },
  feedbackContent: { flex: 1, fontSize: '0.9rem', lineHeight: '1.5' },
  revealBtn: { width: '100%', padding: '0.8rem', background: 'white', border: '2px solid', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' },
  answerBox: { padding: '1rem', borderRadius: '12px', border: '2px solid', fontSize: '0.9rem', lineHeight: '1.5' },
  resultContainer: { textAlign: 'center' },
  resultIcon: { width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', margin: '0 auto 1rem' },
  resultTitle: { fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: "'Playfair Display', serif" },
  scoreCircle: { display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '1rem' },
  scoreNumber: { fontSize: '4rem', fontWeight: 'bold' },
  scoreTotal: { fontSize: '1.5rem', color: '#8B6452' },
  percentageBar: { height: '10px', background: '#f0f0f0', borderRadius: '5px', marginBottom: '1.5rem', overflow: 'hidden' },
  percentageFill: { height: '100%', transition: 'width 0.5s ease' },
  resultMessage: { fontSize: '1rem', color: '#4a5568', marginBottom: '1.5rem' },
  resultStats: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' },
  resultStat: { background: '#fdf8f5', padding: '0.8rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  playAgainBtn: { width: '100%', padding: '0.8rem', border: 'none', borderRadius: '12px', color: 'white', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'transform 0.2s' }
};

export default GuessDanceForm;