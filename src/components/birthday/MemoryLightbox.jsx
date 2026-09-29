import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { memories } from "../../data/memories";
import styles from "./MemoryLightbox.module.css";

// ============================================================
// MemoryLightbox — full-screen cinematic photo viewer
// Props:
//   index   (number)  — currently displayed photo index
//   onClose (fn)
//   onNext  (fn)
//   onPrev  (fn)
// ============================================================
export default function MemoryLightbox({ index, onClose, onNext, onPrev }) {
  if (index === null || index === undefined || !memories[index]) return null;

  const memory = memories[index];
  const [direction, setDirection] = useState(0); // +1 = next, -1 = prev
  const pointerXRef = useRef(null);

  const handleNext = () => {
    setDirection(1);
    if (onNext) onNext();
  };

  const handlePrev = () => {
    setDirection(-1);
    if (onPrev) onPrev();
  };

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  handleNext();
      if (e.key === "ArrowLeft")   handlePrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  // Touch / pointer swipe
  const handlePointerDown = (e) => { pointerXRef.current = e.clientX; };
  const handlePointerUp   = (e) => {
    if (pointerXRef.current === null) return;
    const dx = e.clientX - pointerXRef.current;
    if (dx < -55)      { setDirection(1);  onNext(); }
    else if (dx > 55)  { setDirection(-1); onPrev(); }
    pointerXRef.current = null;
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.95 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, scale: 0.95 }),
  };

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      {/* Modal */}
      <motion.div
        className={styles.modal}
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {/* Close button */}
        <motion.button
          className={styles.closeBtn}
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <X size={20} />
        </motion.button>

        {/* Image area */}
        <div className={styles.imageArea}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={index}
              src={memory.image}
              alt={memory.title}
              className={styles.image}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              draggable={false}
            />
          </AnimatePresence>
        </div>

        {/* Nav arrows */}
        <motion.button
          className={`${styles.navBtn} ${styles.navLeft}`}
          onClick={() => { setDirection(-1); onPrev(); }}
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={28} />
        </motion.button>

        <motion.button
          className={`${styles.navBtn} ${styles.navRight}`}
          onClick={() => { setDirection(1); onNext(); }}
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={28} />
        </motion.button>

        {/* Info strip */}
        <div className={styles.infoStrip}>
          <div className={styles.infoEmoji}>{memory.emoji}</div>
          <div className={styles.infoText}>
            <h3 className={styles.infoTitle}>{memory.title}</h3>
            <p className={styles.infoDesc}>{memory.description}</p>
          </div>
          {/* Dots indicator */}
          <div className={styles.dots}>
            {memories.map((_, i) => (
              <div key={i} className={`${styles.dot} ${i === index ? styles.dotActive : ""}`} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
