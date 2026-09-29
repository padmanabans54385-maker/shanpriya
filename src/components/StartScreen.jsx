import { motion } from "framer-motion";
import { startTitle, startButtonLabel } from "../data";
import styles from "./StartScreen.module.css";

// ============================================================
// StartScreen — Opening screen
// All text comes from src/data.js
// Props: onStart (fn)
// ============================================================
export default function StartScreen({ onStart }) {
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

      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {startTitle}
        </motion.h1>

        <motion.button
          className={styles.startBtn}
          onClick={onStart}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.5, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {startButtonLabel}
        </motion.button>
      </div>
    </motion.div>
  );
}
