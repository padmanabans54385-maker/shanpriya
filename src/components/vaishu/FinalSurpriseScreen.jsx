import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "./GradientButton"
import { RotateCw } from "lucide-react"
import { finalScreenHeading, overlayMessage, overlayText, giftGif, surpriseGif, tapGiftHint, replayButtonLabel } from "../../data"

export default function FinalSurpriseScreen({ onReplay }) {
    const [opened, setOpened] = useState(false)

    const fire = () => {
        confetti({
            particleCount: 140,
            angle: 90,
            spread: 180,
            startVelocity: 55,
            gravity: 1.1,
            origin: { y: 0.6 },
            colors: ["#FF3CAC", "#FFD700", "#00D4FF", "#BF5FFF", "#FF8C00", "#FF2D78", "#7CFC00", "#FFFFFF", "#F687B3"]
        });
    }

    return (
        <div className="px-4 py-6 sm:py-10 text-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ fontSize: "clamp(26px, 8vw, 40px)" }}
                className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-4 sm:mb-6 leading-tight px-2"
            >
                {finalScreenHeading}
            </motion.h2>

            <div className="flex flex-col items-center gap-4">
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="group relative hover:scale-105 transition-transform duration-300 active:scale-95 cursor-pointer"
                    onClick={() => {
                        setOpened(true)
                        fire()
                        setTimeout(fire, 350)
                    }}
                >
                    <img
                        src={giftGif}
                        alt="Gift box"
                        style={{ width: "min(240px, 65vw)", borderRadius: "20px" }}
                        className="h-auto object-contain mx-auto drop-shadow-[0_0_25px_rgba(244,114,182,0.5)]"
                    />
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
                    transition={{ duration: 1 }}
                    style={{ fontSize: "clamp(15px, 4vw, 20px)" }}
                    className="text-pretty font-semibold text-pink-200/90 drop-shadow">
                    {tapGiftHint}
                </motion.div>
            </div>

            {/* overlay modal */}
            <AnimatePresence>
                {opened && (
                    <motion.div
                        className="fixed p-3 sm:p-4 md:p-8 inset-0 z-50 grid place-items-center bg-black/85 backdrop-blur-md overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 220 }}
                            className="relative z-10 w-[95%] max-w-3xl sm:max-w-4xl md:max-w-5xl rounded-3xl pt-8 pb-10 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20 px-4 sm:px-12 md:px-16 text-center bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 border-2 border-pink-400/80 shadow-[0_0_60px_rgba(244,114,182,0.5)] flex flex-col items-center justify-center space-y-6 sm:space-y-8 my-auto"
                        >
                            {/* Centered GIF */}
                            <div className="w-full flex justify-center items-center">
                                <img
                                    src={surpriseGif}
                                    alt="Surprise"
                                    style={{ width: "min(260px, 70vw)", borderRadius: "20px" }}
                                    className="h-auto object-contain mx-auto drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] block"
                                />
                            </div>

                            {/* Text message */}
                            <div className="space-y-3 sm:space-y-4 w-full max-w-3xl mx-auto px-1 sm:px-2">
                                <p
                                    style={{ fontSize: "clamp(16px, 4.5vw, 24px)" }}
                                    className="text-pink-300 font-bold tracking-wide drop-shadow-md"
                                >
                                    {overlayText}
                                </p>
                                <p
                                    style={{ fontSize: "clamp(20px, 6vw, 32px)", lineHeight: 1.5 }}
                                    className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 drop-shadow-xl"
                                >
                                    {overlayMessage}
                                </p>
                            </div>

                            {/* Centered Replay Button with ample bottom margin & padding */}
                            <div className="pt-4 sm:pt-6 pb-2 sm:pb-4 flex justify-center w-full">
                                <GradientButton onClick={onReplay}>
                                    <RotateCw size={22} className="mr-2" /> {replayButtonLabel}
                                </GradientButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
