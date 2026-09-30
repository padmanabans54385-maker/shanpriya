import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectCards } from "swiper/modules"
import "swiper/css"
import "swiper/css/effect-cards"
import { Heart, Mail } from "lucide-react"
import GradientButton from "./GradientButton"
import { surprisePhotos as photos, photoScreenHeading, videos } from "../../data"

// Card inner styles — shared
const cardSlideStyle = {
  borderRadius: "22px",
  border: "3px solid #f43f8a",
  boxShadow: "0 0 22px 5px rgba(244,63,138,0.6), inset 0 0 10px rgba(244,63,138,0.15)",
  overflow: "hidden",           // THIS clips content to the rounded corners
  background: "linear-gradient(135deg, rgba(244,114,182,0.45), rgba(168,85,247,0.45))",
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

  // Play gall.mp3 for 15 seconds when PhotosScreen appears
  useEffect(() => {
    let timer;
    const audio = new Audio("/audio/gall.mp3");
    audio.loop = false;
    audio.play().catch(() => {});

    timer = setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 15000);

    return () => {
      clearTimeout(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="px-4 md:px-6 py-10 pt-20">
      {/* Heading */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow"
        >
          {photoScreenHeading}
        </motion.h2>

      </div>

      {/* Swiper card stack */}
      <br></br>
      <br></br>
      <div className="flex justify-center">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Swiper
            effect="cards"
            grabCursor
            loop
            modules={[EffectCards, Autoplay]}
            onSwiper={(sw) => (swiperRef.current = sw)}
            className="w-[280px] h-[370px] md:w-[340px] md:h-[430px]"
          >
            {allMedia.map((item, i) => (
              <SwiperSlide key={i} style={cardSlideStyle}>
                <div style={cardInnerStyle}>
                  {/* Hearts */}
                  <Heart
                    style={{ position: "absolute", top: 14, left: 14, zIndex: 10, color: "#ec4899", fill: "#ec4899", opacity: 0.9 }}
                    size={20}
                  />
                  <Heart
                    style={{ position: "absolute", top: 14, right: 14, zIndex: 10, color: "#ec4899", fill: "#ec4899", opacity: 0.9 }}
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
      <br></br>
      <br></br>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="mt-16 pb-6 flex justify-center"
      >
        <GradientButton onClick={onNext}>
          <Mail size={20} className="mt-0.5" /> Open My Message
        </GradientButton>
      </motion.div>
    </div>
  )
}
