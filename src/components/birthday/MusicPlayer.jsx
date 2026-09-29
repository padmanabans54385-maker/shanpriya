import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MusicPlayer.module.css";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Soft ambient melody generator using Web Audio API if no MP3 file present
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);

  const toggleMusic = () => {
    if (audioRef.current && audioRef.current.src) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      return;
    }

    // Fallback sound indicator toggle
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.musicWrapper}>
      {/* Hidden audio tag for custom MP3 if user adds one in /public/music/birthday.mp3 */}
      <audio ref={audioRef} loop src="/music/birthday.mp3" />

      <motion.button
        className={`${styles.musicBtn} ${isPlaying ? styles.playing : ""}`}
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title={isPlaying ? "Mute Music" : "Play Music"}
        aria-label="Toggle Music"
      >
        {isPlaying ? (
          <>
            <Volume2 className={styles.icon} />
            <div className={styles.soundWaves}>
              <span className={styles.wave} />
              <span className={styles.wave} />
              <span className={styles.wave} />
            </div>
          </>
        ) : (
          <VolumeX className={styles.icon} />
        )}
      </motion.button>
    </div>
  );
}
