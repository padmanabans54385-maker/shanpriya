"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import GradientButton from "./GradientButton"
import { messageScreenHeading, specialMessage, coverImage, coverButtonLabel, mesAudio, messageNextButtonLabel } from "../../data";
import { ArrowRight } from "lucide-react";

export default function MessageScreen({ onNext }) {
    const [flipped, setFlipped] = useState(false);

    // Play mesAudio once when MessageScreen appears
    useEffect(() => {
        const audio = new Audio(mesAudio);
        audio.loop = false;
        audio.play().catch(() => {});

        return () => {
            audio.pause();
            audio.currentTime = 0;
        };
    }, []);

    return (
        <div className="px-4 py-4 sm:py-6 md:py-10 text-center flex flex-col items-center justify-center min-h-[85vh]">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    fontFamily: "'Pacifico', 'Dancing Script', cursive",
                    fontSize: "clamp(22px, 6.5vw, 32px)",
                }}
                className="text-pink-300 drop-shadow-[0_0_20px_rgba(244,114,182,0.6)] mb-4 sm:mb-6 tracking-wide px-2 font-semibold"
            >
                {messageScreenHeading}
            </motion.h2>

            {/* Down card remains stationary in place; top card cover flips open to the left */}
            <div className="relative flex justify-center items-center w-full max-w-5xl min-h-[410px] sm:min-h-[490px] md:min-h-[550px] my-2 overflow-visible">
                <div
                    style={{
                        width: "min(320px, 85vw)",
                        height: "clamp(410px, 120vw, 520px)",
                        borderRadius: "20px",
                    }}
                    className={`card cursor-pointer flex flex-col justify-between select-none relative overflow-hidden ${
                        flipped ? "flipped" : ""
                    }`}
                    onClick={() => setFlipped(!flipped)}
                >
                    {/* Back flap - Left Page inside opened card */}
                    <div className="back w-full h-full rounded-2xl overflow-hidden">
                        <div className="unmirror w-full h-full bg-gradient-to-b from-[#e8dde8] via-[#e2d5e2] to-[#d8cad8] shadow-inner" />
                    </div>

                    {/* Front flap - Top Card Cover (only element that moves when clicked) */}
                    <div className="front w-full h-full rounded-2xl overflow-hidden bg-white p-2.5 flex flex-col items-center justify-center relative z-20">
                        <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
                            <img
                                src={coverImage}
                                alt="Card Cover"
                                className="w-full h-full object-cover rounded-xl"
                            />
                            <div className="absolute left-1/2 bottom-4 sm:bottom-5 -translate-x-1/2">
                                <p
                                    style={{
                                        fontFamily: "'Dancing Script', 'Pacifico', cursive",
                                        fontSize: "clamp(14px, 4vw, 17px)",
                                    }}
                                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-6 py-2 rounded-full shadow-lg tracking-wider whitespace-nowrap"
                                >
                                    {coverButtonLabel}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Message inner body - Down Card (Right Page), visible ONLY when opened so text never peeks outside when closed */}
                    <div className={`w-full h-full p-4 sm:p-5 flex flex-col justify-between rounded-xl transition-opacity duration-300 ${flipped ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                        {/* Scrollable text container with scrollbar placed on slight right */}
                        <div className="card-scroll overflow-y-auto flex-1 pr-1 pl-2 text-slate-800 text-center font-bold">
                            <p
                                style={{
                                    fontFamily: "'Dancing Script', 'Pacifico', cursive",
                                    fontSize: "clamp(14px, 4vw, 18px)",
                                    lineHeight: 1.6,
                                }}
                                className="whitespace-pre-line tracking-wide text-center drop-shadow-sm"
                            >
                                {specialMessage}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Centered Next Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mt-6 mb-4 flex justify-center"
            >
                <GradientButton
                    onClick={() => {
                        setFlipped(false);
                        onNext();
                    }}
                >
                    <span style={{ fontFamily: "'Dancing Script', cursive" }} className="text-xl font-bold">
                        {messageNextButtonLabel}
                    </span>
                    <ArrowRight size={22} className="ml-1" />
                </GradientButton>
            </motion.div>
        </div>
    );
}