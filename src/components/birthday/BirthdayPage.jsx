import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BirthdayHero from "./BirthdayHero";
import BirthdayWish from "./BirthdayWish";
import MemoryTimeline from "./MemoryTimeline";
import FinalMessage from "./FinalMessage";
import MemoryLightbox from "./MemoryLightbox";
import MusicPlayer from "./MusicPlayer";
import styles from "./BirthdayPage.module.css";

export default function BirthdayPage() {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.main
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* 1. Fullscreen Celebration Hero */}
      <BirthdayHero />

      {/* 2. Glassmorphism Birthday Wish Card */}
      <BirthdayWish />

      {/* 3. Memories Photo Timeline & Lightbox trigger */}
      <MemoryTimeline onOpenLightbox={handleOpenLightbox} />

      {/* 4. Final Birthday Message & Replay Button */}
      <FinalMessage onReplay={handleReplay} />

      {/* Lightbox Modal when photo clicked */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <MemoryLightbox
            index={lightboxIndex}
            onClose={handleCloseLightbox}
            onNext={() => setLightboxIndex((prev) => (prev + 1) % 3)}
            onPrev={() => setLightboxIndex((prev) => (prev - 1 + 3) % 3)}
          />
        )}
      </AnimatePresence>

      {/* Ambient Music Toggle Button */}
      <MusicPlayer />
    </motion.main>
  );
}
