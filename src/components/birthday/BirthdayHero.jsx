import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import confetti from "canvas-confetti";
import { hero } from "../../data/memories";
import FloatingEmojis from "./FloatingEmojis";
import styles from "./BirthdayHero.module.css";

function fireCelebration() {
  const opt = { zIndex: 9999, startVelocity: 45, spread: 360, ticks: 80 };
  confetti({ ...opt, particleCount: 90, origin: { x: 0.1, y: 0.5 }, angle: 60 });
  confetti({ ...opt, particleCount: 90, origin: { x: 0.9, y: 0.5 }, angle: 120 });
  confetti({ ...opt, particleCount: 60, origin: { x: 0.5, y: 0.2 }, shapes: ["star"], colors: ["#ff2d78","#ffea00","#bf5fff","#fff"] });
}

// ============================================================
// BirthdayHero — full-screen opening celebration section
// ============================================================
export default function BirthdayHero() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    // Staggered confetti bursts
    fireCelebration();
    setTimeout(fireCelebration, 900);
    setTimeout(fireCelebration, 1900);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Background glow blobs */}
      <div className={styles.blobTL} />
      <div className={styles.blobBR} />
      <div className={styles.blobCenter} />

      {/* Floating emoji particles */}
      <FloatingEmojis count={20} zIndex={2} />

      {/* Main content */}
      <div className={styles.content}>
        {/* Cake emoji with heartbeat */}
        <motion.div
          className={styles.cakeEmoji}
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 12 }}
        >
          🎂
        </motion.div>

        {/* Main title */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, scale: 0.7, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.title}
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        />

        {/* Subtitle */}
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          {hero.subtitle}
        </motion.p>

        {/* Heart row */}
        <motion.div
          className={styles.heartRow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          {["❤️", "🌟", "❤️", "🌟", "❤️"].map((h, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0], scale: [1, 1.25, 1] }}
              transition={{ duration: 1.8, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {h}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span className={styles.scrollText}>Scroll to see more</span>
        <ChevronDown className={styles.chevron} size={22} />
      </motion.div>
    </section>
  );
}
