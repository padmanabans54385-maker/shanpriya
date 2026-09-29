import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "./GradientButton"
import { RotateCw } from "lucide-react"
import { finalScreenHeading, overlayMessage, overlayText } from "../../data"

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
            colors: ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"]
        });
    }

    return (
        <div className="px-4 md:px-6 py-10 text-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-6 leading-tight"
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
                        src="/gifs/gift.gif"
                        alt="Gift box"
                        className="h-48 w-48 md:h-56 md:w-56 object-contain mx-auto drop-shadow-[0_0_25px_rgba(244,114,182,0.5)]"
                    />
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
                    transition={{ duration: 1 }}
                    className="text-pretty text-xl md:text-2xl font-semibold text-pink-200/90 drop-shadow">
                    Tap the gift 🎁
                </motion.div>
            </div>

            {/* overlay modal */}
            <AnimatePresence>
                {opened && (
                    <motion.div
                        className="fixed p-4 md:p-8 inset-0 z-50 grid place-items-center bg-black/85 backdrop-blur-md overflow-y-auto"
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
                            className="relative z-10 w-[95%] max-w-3xl sm:max-w-4xl md:max-w-5xl rounded-3xl pt-10 pb-14 sm:pt-14 sm:pb-16 md:pt-16 md:pb-20 px-6 sm:px-12 md:px-16 text-center bg-gradient-to-br from-pink-950 via-purple-950 to-indigo-950 border-2 border-pink-400/80 shadow-[0_0_60px_rgba(244,114,182,0.5)] flex flex-col items-center justify-center space-y-8 my-auto"
                        >
                            {/* Centered GIF */}
                            <div className="w-full flex justify-center items-center">
                                <img
                                    src="/gifs/surprise.gif"
                                    alt="Surprise"
                                    className="w-52 sm:w-64 md:w-80 h-auto object-contain mx-auto drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] block"
                                />
                            </div>

                            {/* Text message */}
                            <div className="space-y-4 w-full max-w-3xl mx-auto px-2">
                                <p className="text-xl sm:text-2xl md:text-3xl text-pink-300 font-bold tracking-wide drop-shadow-md">
                                    {overlayText}
                                </p>
                                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-purple-100 to-pink-200 drop-shadow-xl leading-relaxed">
                                    {overlayMessage}
                                </p>
                            </div>

                            {/* Centered Replay Button with ample bottom margin & padding */}
                            <div className="pt-6 pb-4 flex justify-center w-full">
                                <GradientButton onClick={onReplay}>
                                    <RotateCw size={22} className="mr-2" /> Replay
                                </GradientButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
