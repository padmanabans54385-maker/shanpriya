import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Heart, ZoomIn } from "lucide-react";
import styles from "./MemoryCard.module.css";

// ============================================================
// MemoryCard — individual photo story chapter
// Props:
//   memory    ({ image, title, description, emoji })
//   index     (number) — 0-based; even = image-left, odd = image-right
//   onImageClick (fn) — opens lightbox
// ============================================================
export default function MemoryCard({ memory, index, onImageClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <motion.article
      ref={ref}
      className={`${styles.card} ${isEven ? styles.cardEven : styles.cardOdd}`}
      initial={{ opacity: 0, y: 70 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Image side ── */}
      <motion.div
        className={styles.imageWrap}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        onClick={onImageClick}
        role="button"
        tabIndex={0}
        aria-label={`View ${memory.title} full screen`}
        onKeyDown={(e) => e.key === "Enter" && onImageClick()}
      >
        <motion.img
          src={memory.image}
          alt={memory.title}
          className={styles.image}
          initial={{ scale: 1.08, filter: "blur(4px)" }}
          animate={isInView ? { scale: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 1.1, ease: "easeOut" }}
          draggable={false}
        />

        {/* Overlay on hover */}
        <div className={styles.imageOverlay}>
          <div className={styles.zoomHint}>
            <ZoomIn size={22} />
            <span>View Full</span>
          </div>
        </div>

        {/* Corner glow */}
        <div className={styles.imageGlow} />
      </motion.div>

      {/* ── Text side ── */}
      <motion.div
        className={styles.textSide}
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Chapter emoji */}
        <motion.div
          className={styles.chapterEmoji}
          animate={{ y: [0, -8, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {memory.emoji}
        </motion.div>

        {/* Chapter label */}
        <span className={styles.chapterLabel}>Memory #{index + 1}</span>

        {/* Title */}
        <h3 className={styles.title}>{memory.title}</h3>

        {/* Decorative line */}
        <div className={styles.titleUnderline} />

        {/* Description */}
        <p className={styles.description}>{memory.description}</p>

        {/* Heart row */}
        <div className={styles.heartRow}>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.2, delay: i * 0.3, repeat: Infinity }}
            >
              <Heart
                size={16}
                fill="#ff2d78"
                color="#ff2d78"
                style={{ filter: "drop-shadow(0 0 4px #ff2d78)" }}
              />
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}
