import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

import LoaderScreen from "./LoaderScreen"
import IntroScreen from "./IntroScreen"
import CakeScreen from "./CakeScreen"
import BalloonGameScreen from "./BalloonGameScreen"
import PhotosScreen from "./PhotosScreen"
import MessageScreen from "./MessageScreen"
import FinalSurpriseScreen from "./FinalSurpriseScreen"
import Decoration from "./Decoration"
import FloatingHearts from "./FloatingHearts"
import BackgroundMusic from "./BackgroundMusic"

export default function VaishuSurprisePage() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [decorationsOn, setDecorationsOn] = useState(false)
  const [musicOn, setMusicOn] = useState(false)

  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} onStartMusic={() => setMusicOn(true)} />,
    <CakeScreen key="cake" onNext={() => setCurrentScreen(3)} onDecorate={() => setDecorationsOn(true)} />,
    <BalloonGameScreen key="balloons" onNext={() => setCurrentScreen(4)} />,
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(5)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(6)} />,
    <FinalSurpriseScreen key="final" onReplay={() => setCurrentScreen(1)} />,
  ]

  return (
    <main className="min-h-screen bg-gradient-to-tr from-rose-950/40 via-black to-rose-950/40 overflow-hidden relative text-white">
      {/* Background gradients */}
      <div
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 60%, rgba(255, 99, 165, 0.5), transparent 40%)",
        }}
      />
      <div
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 30%, rgba(99, 102, 241, 0.5), transparent 40%)",
        }}
      />
      <div
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(228, 193, 255, 0.4), transparent 40%)",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            className={`w-full ${currentScreen === 4 ? "max-w-7xl" : "max-w-3xl md:max-w-4xl"}`}
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>

        {decorationsOn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute -top-2 inset-x-0 mx-auto max-w-2xl"
          >
            <Decoration />
          </motion.div>
        )}
      </div>

      <FloatingHearts />
      <BackgroundMusic shouldPlay={musicOn} />

    </main>
  )
}
