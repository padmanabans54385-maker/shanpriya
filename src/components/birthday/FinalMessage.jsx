import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { final } from "../../data/memories";
import styles from "./FinalMessage.module.css";

export default function FinalMessage({ onReplay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleReplay = () => {
    // Fire celebratory confetti burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.7 },
      colors: ["#ec4899", "#f43f5e", "#fb7185", "#f472b6", "#a855f7", "#eab308"],
    });

    if (onReplay) {
      onReplay();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer ref={ref} className={styles.footer}>
      <div className={styles.glowBg} />

      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className={styles.sparkleBadge}
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className={styles.sparkleIcon} />
        </motion.div>

        <h2 className={styles.title}>{final.title}</h2>
        <p className={styles.subtitle}>{final.subtitle}</p>

        {final.date && <div className={styles.dateBadge}>{final.date}</div>}

        <motion.button
          className={styles.replayBtn}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(244, 63, 94, 0.6)" }}
          whileTap={{ scale: 0.97 }}
          onClick={handleReplay}
        >
          <RotateCcw className={styles.btnIcon} />
          <span>Replay Celebration 🎉</span>
        </motion.button>

        <div className={styles.divider} />

        <p className={styles.note}>
          <Heart className={styles.heartIcon} />
          <span>{final.note}</span>
        </p>
      </motion.div>
    </footer>
  );
}
