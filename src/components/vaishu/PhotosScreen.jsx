import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import { Heart, Mail } from "lucide-react"
import GradientButton from "./GradientButton"
import { surprisePhotos as photos, photoScreenHeading, videos, gallAudio, gallAudioDuration, openMessageButtonLabel } from "../../data"

// Card inner styles — shared
const cardSlideStyle = {
  borderRadius: "20px",
  border: "3px solid #f43f8a",
  boxShadow: "0 0 22px 5px rgba(244,63,138,0.6), inset 0 0 10px rgba(244,63,138,0.15)",
  overflow: "hidden",           // THIS clips content to the rounded corners
  background: "linear-gradient(135deg, rgba(244,114,182,0.45), rgba(168,85,247,0.45))",
  width: "100%",
  height: "100%",
  touchAction: "pan-y",
}

const cardInnerStyle = {
  position: "relative",
  height: "100%",
  width: "100%",
  padding: "10px",
  boxSizing: "border-box",
}

const mediaStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "14px",
  display: "block",
}

export default function PhotosScreen({ onNext }) {
  const swiperRef = useRef(null)
  const allMedia = [
    ...photos.map((src) => ({ type: "image", src })),
    ...videos.map((src) => ({ type: "video", src })),
  ]

  // Play gallAudio for duration when PhotosScreen appears
  useEffect(() => {
    let timer;
    const audio = new Audio(gallAudio);
    audio.loop = false;
    audio.play().catch(() => {});

    timer = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, gallAudioDuration);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="photo-screen">
      {/* Heading */}
      <div className="text-center pt-2 pb-1">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="photo-title font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow px-2"
        >
          {photoScreenHeading}
        </motion.h2>
      </div>

      {/* 9:16 Portrait Media Container (Swiper card stack) */}
      <div className="photo-frame-container">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center w-full"
        >
          <Swiper
            className="photo-frame-swiper"
            effect="cards"
            slidesPerView={1}
            spaceBetween={0}
            centeredSlides={true}
            grabCursor={true}
            simulateTouch={true}
            allowTouchMove={true}
            followFinger={true}
            threshold={5}
            touchRatio={1.15}
            resistance={true}
            resistanceRatio={0.75}
            longSwipes={true}
            longSwipesRatio={0.15}
            longSwipesMs={120}
            speed={450}
            loop={true}
            modules={[EffectCards, Autoplay]}
            onSwiper={(sw) => (swiperRef.current = sw)}
          >
            {allMedia.map((item, i) => (
              <SwiperSlide key={i} style={cardSlideStyle}>
                <div style={cardInnerStyle}>
                  {/* Hearts */}
                  <Heart
                    style={{ position: "absolute", top: 14, left: 14, zIndex: 10, color: "#ec4899", fill: "#ec4899", opacity: 0.9, pointerEvents: "none" }}
                    size={20}
                  />
                  <Heart
                    style={{ position: "absolute", top: 14, right: 14, zIndex: 10, color: "#ec4899", fill: "#ec4899", opacity: 0.9, pointerEvents: "none" }}
                    size={20}
                  />

                  {/* Media */}
                  {item.type === "image" ? (
                    <img src={item.src} alt={`Memory ${i + 1}`} style={mediaStyle} />
                  ) : (
                    <video
                      src={item.src}
                      controls
                      playsInline
                      style={mediaStyle}
                      onTouchStart={() => {
                        if (swiperRef.current) swiperRef.current.allowTouchMove = false
                      }}
                      onTouchEnd={() => {
                        if (swiperRef.current) swiperRef.current.allowTouchMove = true
                      }}
                    />
                  )}

                  {/* Subtle shimmer */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "14px",
                      background: "linear-gradient(to top right, transparent, rgba(0,0,0,0.08), rgba(255,209,220,0.08))",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="photo-message-button-container"
      >
        <GradientButton onClick={onNext} className="photo-message-button">
          <Mail size={20} className="mt-0.5" /> {openMessageButtonLabel}
        </GradientButton>
      </motion.div>
    </div>
  )
}

