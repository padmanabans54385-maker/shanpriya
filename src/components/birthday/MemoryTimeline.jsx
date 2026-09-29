import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { memories, quotes, memoriesSection } from "../../data/memories";
import MemoryCard from "./MemoryCard";
import MemoryQuote from "./MemoryQuote";
import FloatingEmojis from "./FloatingEmojis";
import styles from "./MemoryTimeline.module.css";

const QUOTE_EMOJIS = ["❤️", "🌸"];

// ============================================================
// MemoryTimeline — vertical cinematic memory story
// Props: onPhotoClick(index fn) — opens lightbox
// ============================================================
export default function MemoryTimeline({ onOpenLightbox, onPhotoClick }) {
  const handlePhotoClick = onOpenLightbox || onPhotoClick;
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className={styles.section}>
      <FloatingEmojis count={12} zIndex={1} />

      {/* Section header */}
      <motion.div
        ref={headerRef}
        className={styles.header}
        initial={{ opacity: 0, y: 40 }}
        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className={styles.heading}>{memoriesSection.heading}</h2>
        <p className={styles.subtitle}>{memoriesSection.subtitle}</p>
        <div className={styles.headingDivider} />
      </motion.div>

      {/* Memory story — interleaved cards and quotes */}
      <div className={styles.timeline}>
        {memories.map((memory, i) => (
          <div key={i} className={styles.chapter}>
            <MemoryCard
              memory={memory}
              index={i}
              onImageClick={() => handlePhotoClick && handlePhotoClick(i)}
            />

            {/* Quote between cards (not after last) */}
            {i < memories.length - 1 && (
              <MemoryQuote
                text={quotes[i] || quotes[0]}
                emoji={QUOTE_EMOJIS[i % QUOTE_EMOJIS.length]}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
