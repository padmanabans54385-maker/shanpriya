import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "./GradientButton"
import { NAME } from "../../data"
import { ArrowRight, Flame, WandSparkles } from "lucide-react"

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"];

export default function CakeScreen({ onNext, onDecorate }) {
  const [decorated, setDecorated] = useState(false)
  const [lit, setLit] = useState(false)

  const decorate = () => {
    if (decorated) return
    setDecorated(true)
    setTimeout(() => {
      onDecorate()
    }, 500);
  }

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    setTimeout(() => burst(), 500);
    setTimeout(() => burst(), 1000);
  }

  const burst = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors,
    })
  }

  return (
    <div className="px-4 md:px-6 py-6 md:py-10 text-center relative flex flex-col items-center justify-center min-h-[75vh]">
      {/* Title placed clearly ABOVE the cake */}
      <div className="min-h-[90px] md:min-h-[110px] flex items-center justify-center mb-4 z-20">
        <AnimatePresence>
          {lit && (
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 leading-tight px-4 tracking-wide"
              style={{ filter: "drop-shadow(0 0 25px rgba(255,105,180,0.6))" }}
              initial={{ opacity: 0, y: -20, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Happy Birthday, {NAME}
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* 3D Cake */}
      <div className="relative flex flex-col items-center gap-10 my-6 z-10">
        <div className="relative mb-4">
          <Cake lit={lit} />
        </div>

        {/* Buttons */}
        <AnimatePresence mode="wait">
          {!decorated ? (
            <motion.div
              key="decorate"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={decorate}>
                <WandSparkles size={22} />
                Decorate
              </GradientButton>
            </motion.div>
          ) : !lit ? (
            <motion.div
              key="light"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.3 } }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={lightCandle}>
                <Flame size={22} />
                Light the Candle
              </GradientButton>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, delay: 1.5 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <GradientButton onClick={onNext}>
                Pop the Balloons
                <ArrowRight size={22} className="ml-1" />
              </GradientButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function Cake({ lit }) {
  return (
    <div className="flex flex-col items-center pt-8">
      <div className="cake">
        <div className="plate"></div>
        <div className="layer layer-bottom"></div>
        <div className="layer layer-middle"></div>
        <div className="layer layer-top"></div>
        <div className="icing"></div>
        <div className="drip drip1"></div>
        <div className="drip drip2"></div>
        <div className="drip drip3"></div>
        <div className="candle">
          {lit && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.25, 0.1, 0.25, 1.0],
              }}
              className="flame"
            />
          )}
        </div>
      </div>
    </div>
  )
}
