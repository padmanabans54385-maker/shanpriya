import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  birthdayDate,
  birthdayPersonName,
  headingPrefix,
  headingEmojis,
  countdownSubtitle,
  timerLabels,
  timerSeparator,
  birthdayMessage,
} from "../data";
import styles from "./CountdownScreen.module.css";
import ConfettiEffect from "./ConfettiEffect";
import { fireMassiveCelebration } from "./ConfettiEffect";

// ---- Calculate remaining time ----
function getTimeLeft() {
  const diff = Math.max(0, birthdayDate.getTime() - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    days:    String(Math.floor(s / 86400)).padStart(2, "0"),
    hours:   String(Math.floor((s % 86400) / 3600)).padStart(2, "0"),
    minutes: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
    seconds: String(s % 60).padStart(2, "0"),
    expired: diff === 0,
  };
}

// ---- Individual animated digit ----
function Digit({ value }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        className={styles.digit}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

// ---- One time unit block (digits + label) ----
function TimeUnit({ value, label }) {
  return (
    <div className={styles.unit}>
      <div className={styles.digits}>
        <Digit value={value[0]} />
        <Digit value={value[1]} />
      </div>
      <div className={styles.unitLabel}>{label}</div>
    </div>
  );
}

// ---- Separator dot ----
function Separator() {
  return (
    <motion.div
      className={styles.dot}
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      {timerSeparator}
    </motion.div>
  );
}

// ============================================================
// CountdownScreen — Live countdown matching the reference design
// All text comes from src/data.js
// ============================================================
export default function CountdownScreen({ visible, onCelebration }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const [expired, setExpired] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const expiredRef = useRef(false);
  const bgAudioRef = useRef(null);

  // Pre-load bg.mp3 — plays once on countdown page only, stops on unmount
  useEffect(() => {
    const audio = new Audio("/audio/bg.mp3");
    audio.loop = false;
    bgAudioRef.current = audio;
    return () => {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
    };
  }, []);

  // Fire confetti when screen becomes visible
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setConfetti(true), 400);
      return () => clearTimeout(t);
    }
  }, [visible]);

  // Live countdown tick
  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeLeft();
      setTimeLeft(t);
      if (t.expired && !expiredRef.current) {
        expiredRef.current = true;
        setExpired(true);
        fireMassiveCelebration();
        // Play bg.mp3 once on countdown completion
        if (bgAudioRef.current) {
          bgAudioRef.current.play().catch(() => {});
        }
        // Auto transition after 3s celebration burst — stop audio before navigating
        if (onCelebration) {
          setTimeout(() => {
            if (bgAudioRef.current) {
              bgAudioRef.current.pause();
              bgAudioRef.current.currentTime = 0;
            }
            onCelebration();
          }, 4000);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [onCelebration]);

  if (!visible) return null;

  return (
    <motion.div
      className={styles.screen}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className={styles.bgBlobTL} />
      <div className={styles.bgBlobBR} />

      <ConfettiEffect trigger={confetti} />



      <div className={styles.content}>
        {/* ---- Heading ---- */}
        <motion.div
          className={styles.headingWrap}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <h1 className={styles.heading}>
            {headingPrefix}{" "}
            <span className={styles.namePink}>{birthdayPersonName}</span>{" "}
            {headingEmojis}
          </h1>
          <p className={styles.subHeading}>{countdownSubtitle}</p>
        </motion.div>

        {/* ---- Timer box with pink neon border ---- */}
        <motion.div
          className={styles.timerBox}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: "spring", stiffness: 150 }}
        >
          {expired ? (
            <motion.div
              className={styles.birthdayBang}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div>{birthdayMessage}</div>
              {onCelebration && (
                <button
                  onClick={onCelebration}
                  style={{
                    marginTop: "1.5rem",
                    width: "clamp(280px, 85vw, 360px)",
                    height: "58px",
                    padding: "0 2rem",
                    borderRadius: "9999px",
                    background: "linear-gradient(135deg, #f43f5e, #9333ea)",
                    color: "#fff",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    border: "1px solid rgba(255, 255, 255, 0.35)",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    boxShadow: "0 0 25px rgba(244, 63, 94, 0.5)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  Open Special Wish & Memories ❤️
                </button>
              )}
            </motion.div>
          ) : (
            <div className={styles.timerRow}>
              <TimeUnit value={timeLeft.days}    label={timerLabels.days} />
              <Separator />
              <TimeUnit value={timeLeft.hours}   label={timerLabels.hours} />
              <Separator />
              <TimeUnit value={timeLeft.minutes} label={timerLabels.minutes} />
              <Separator />
              <TimeUnit value={timeLeft.seconds} label={timerLabels.seconds} />
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
