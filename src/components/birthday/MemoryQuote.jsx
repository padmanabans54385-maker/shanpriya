import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./MemoryQuote.module.css";

// ============================================================
// MemoryQuote — elegant animated quote between memory cards
// Props: text (string), emoji (string, optional)
// ============================================================
export default function MemoryQuote({ text, emoji = "✨" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={styles.wrapper}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Top emoji node */}
      <motion.div
        className={styles.emojiNode}
        animate={{ y: [0, -8, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {emoji}
      </motion.div>

      {/* Quote text with decorative lines */}
      <div className={styles.quoteRow}>
        <div className={styles.line} />
        <blockquote className={styles.quote}>"{text}"</blockquote>
        <div className={styles.line} />
      </div>
    </motion.div>
  );
}
