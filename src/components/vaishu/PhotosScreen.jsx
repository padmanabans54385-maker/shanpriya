import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import GradientButton from "./GradientButton";
import { surprisePhotos, photoScreenHeading, videos } from "../../data";

export default function PhotosScreen({ onNext }) {
  // Combine photos and videos into unified media items
  const mediaItems = [
    ...surprisePhotos.map((src, i) => ({ type: "image", src, id: `img-${i}` })),
    ...videos.map((src, i) => ({ type: "video", src, id: `vid-${i}` })),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const currentItem = mediaItems[currentIndex];

  return (
    <div className="px-4 md:px-6 py-10 pt-20 text-center">
      <div className="text-center mb-6">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow"
        >
          {photoScreenHeading}
        </motion.h2>
        <p className="text-sm text-rose-100/90 mt-1">(Pathu and Vaishu 😇🫂💙)</p>
      </div>

      <div className="relative flex flex-col items-center justify-center min-h-[440px]">
        {/* Nav Controls */}
        <div className="relative w-[300px] h-[380px] md:w-[360px] md:h-[440px] flex items-center justify-center">
          <button
            onClick={handlePrev}
            className="absolute -left-6 md:-left-12 z-30 p-2 rounded-full bg-pink-500/30 text-white border border-pink-400/50 backdrop-blur-md hover:bg-pink-500/60 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
              transition={{ duration: 0.4 }}
              className="h-full w-full rounded-3xl p-2 bg-gradient-to-br from-pink-400/50 via-rose-400/50 to-purple-400/50 backdrop-blur-sm shadow-2xl"
            >
              <div className="relative h-full w-full rounded-xl overflow-hidden bg-black/40">
                {/* Top corner hearts */}
                <Heart className="absolute top-2 left-2 text-xl z-20 text-pink-500 fill-pink-500 opacity-90" />
                <Heart className="absolute top-2 right-2 text-xl z-20 text-pink-500 fill-pink-500 opacity-90" />

                {currentItem.type === "image" ? (
                  <img
                    src={currentItem.src}
                    alt={`Memory ${currentIndex + 1}`}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  <video
                    src={currentItem.src}
                    controls
                    playsInline
                    className="h-full w-full rounded-2xl object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-black/10 to-pink-100/10 pointer-events-none rounded-2xl" />
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={handleNext}
            className="absolute -right-6 md:-right-12 z-30 p-2 rounded-full bg-pink-500/30 text-white border border-pink-400/50 backdrop-blur-md hover:bg-pink-500/60 transition-all"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Counter Indicator */}
        <div className="mt-4 text-xs text-pink-300 font-semibold tracking-widest uppercase">
          {currentIndex + 1} / {mediaItems.length}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="mt-8 flex justify-center"
      >
        <GradientButton onClick={onNext}>
          <Mail size={20} className="mt-0.5" /> Open My Message
        </GradientButton>
      </motion.div>
    </div>
  );
}
