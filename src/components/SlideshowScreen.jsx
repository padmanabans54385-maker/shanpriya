import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { photos, photoDuration, goToCountdownLabel, photoAltPrefix } from "../data";
import ConfettiEffect, { fireBlast } from "./ConfettiEffect";
import styles from "./SlideshowScreen.module.css";

// ============================================================
// SlideshowScreen — Pink neon-bordered photo box
// Fires a confetti blast every time a new photo appears.
// After all photos are shown, "Go to Countdown" button appears.
// All text/config comes from src/data.js
// Props: onDone (fn)
// ============================================================
export default function SlideshowScreen({ onDone }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  // confettiKey changes on every photo so ConfettiEffect re-fires
  const [confettiKey, setConfettiKey] = useState(0);

  // Fire confetti on first photo (mount)
  useEffect(() => {
    const t = setTimeout(() => fireBlast(), 300);
    return () => clearTimeout(t);
  }, []);

  // Cycle photos — fire confetti on each new photo
  useEffect(() => {
    if (done) return;
    const timer = setTimeout(() => {
      if (currentIndex < photos.length - 1) {
        setCurrentIndex((i) => i + 1);
        setConfettiKey((k) => k + 1); // triggers confetti re-fire
        fireBlast();                   // immediate blast on photo change
      } else {
        setDone(true);
        fireBlast();                   // final blast when slideshow ends
      }
    }, photoDuration);
    return () => clearTimeout(timer);
  }, [currentIndex, done]);

  return (
    <motion.div
      className={styles.screen}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.bgBlobTL} />
      <div className={styles.bgBlobBR} />

      <div className={styles.center}>
        {/* Pink neon bordered portrait photo box */}
        <motion.div
          className={styles.photoBox}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 150 }}
        >
          <AnimatePresence mode="crossfade">
            <motion.img
              key={currentIndex}
              src={photos[currentIndex]}
              alt={`${photoAltPrefix} ${currentIndex + 1}`}
              className={styles.photo}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65 }}
              draggable={false}
            />
          </AnimatePresence>
        </motion.div>

        {/* "Go to Countdown" button — appears after all photos shown */}
        <AnimatePresence>
          {done && (
            <motion.button
              className={styles.goBtn}
              onClick={onDone}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
            >
              {goToCountdownLabel}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
