import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { wish } from "../../data/memories";
import styles from "./BirthdayWish.module.css";

// ============================================================
// BirthdayWish — glassmorphism card with paragraph-by-paragraph reveal
// ============================================================
export default function BirthdayWish() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [visibleCount, setVisibleCount] = useState(0);

  // Reveal paragraphs one by one after section enters view
  useEffect(() => {
    if (!isInView) return;
    const timers = wish.paragraphs.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), 500 + i * 1100)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, [isInView]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <FloatingHearts />

      {/* Section heading */}
      <motion.div
        className={styles.headingWrap}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className={styles.heading}>{wish.heading}</h2>
        <div className={styles.headingLine} />
      </motion.div>

      {/* Glassmorphism card */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Quote mark decoration */}
        <div className={styles.quoteMark}>"</div>

        <div className={styles.messageBody}>
          {wish.paragraphs.map((para, i) => (
            <motion.p
              key={i}
              className={`${styles.para} ${i === wish.paragraphs.length - 1 ? styles.paraLast : ""}`}
              initial={{ opacity: 0, y: 16 }}
              animate={visibleCount > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
            >
              {para}
              {/* Blinking cursor on last visible line */}
              {visibleCount === i + 1 && visibleCount < wish.paragraphs.length && (
                <span className={styles.cursor} />
              )}
            </motion.p>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className={styles.cardBottom}>
          {["❤️", "✨", "❤️"].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, delay: i * 0.25, repeat: Infinity }}
            >
              {e}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Small floating hearts in the background of this section
function FloatingHearts() {
  const hearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${(i * 12.5 + 5).toFixed(0)}%`,
    delay: `${(i * 0.4).toFixed(1)}s`,
    duration: `${4 + (i % 3)}s`,
    size: 14 + (i % 4) * 4,
  }));
  return (
    <div aria-hidden="true" className={styles.heartsLayer}>
      {hearts.map((h) => (
        <span
          key={h.id}
          style={{
            position: "absolute",
            left: h.left,
            bottom: "5%",
            fontSize: h.size,
            opacity: 0.18,
            animation: `bdayFloat ${h.duration} ease-in-out ${h.delay} infinite`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
