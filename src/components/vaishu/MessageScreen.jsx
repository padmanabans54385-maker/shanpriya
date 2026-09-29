"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import GradientButton from "./GradientButton"
import { messageScreenHeading, specialMessage } from "@/data";
import { ArrowRight } from "lucide-react";

export default function MessageScreen({ onNext }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="px-4 md:px-6 py-6 md:py-10 text-center flex flex-col items-center justify-center min-h-[85vh]">
            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ fontFamily: "'Pacifico', 'Dancing Script', cursive" }}
                className="text-4xl md:text-6xl text-pink-300 drop-shadow-[0_0_20px_rgba(244,114,182,0.6)] mb-6 tracking-wide"
            >
                {messageScreenHeading}
            </motion.h2>

            {/* Down card remains stationary in place; top card cover flips open to the left */}
            <div className="relative flex justify-center items-center w-full max-w-5xl min-h-[460px] sm:min-h-[510px] md:min-h-[550px] my-2 overflow-visible">
                <div
                    className={`card w-[295px] h-[440px] sm:w-[340px] sm:h-[490px] md:w-[380px] md:h-[520px] cursor-pointer flex flex-col justify-between rounded-xl select-none relative overflow-hidden ${
                        flipped ? "flipped" : ""
                    }`}
                    onClick={() => setFlipped(!flipped)}
                >
                    {/* Back flap - Left Page inside opened card */}
                    <div className="back w-full h-full rounded-xl overflow-hidden">
                        <div className="unmirror w-full h-full bg-gradient-to-b from-[#e8dde8] via-[#e2d5e2] to-[#d8cad8] shadow-inner" />
                    </div>

                    {/* Front flap - Top Card Cover (only element that moves when clicked) */}
                    <div className="front w-full h-full rounded-xl overflow-hidden bg-white p-2.5 flex flex-col items-center justify-center relative z-20">
                        <div className="relative w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                                src="/images/cover.webp"
                                alt="Card Cover"
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute left-1/2 bottom-5 -translate-x-1/2">
                                <p
                                    style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}
                                    className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold px-7 py-2 rounded-full shadow-lg text-lg sm:text-xl tracking-wider whitespace-nowrap"
                                >
                                    Tap to Open
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Message inner body - Down Card (Right Page), visible ONLY when opened so text never peeks outside when closed */}
                    <div className={`w-full h-full p-4 sm:p-5 md:p-6 flex flex-col justify-between rounded-lg transition-opacity duration-300 ${flipped ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                        {/* Scrollable text container with scrollbar placed on slight right */}
                        <div className="card-scroll overflow-y-auto flex-1 pr-1.5 pl-3 sm:pl-4 text-slate-800 text-base sm:text-lg md:text-xl text-center font-bold leading-relaxed">
                            <p
                                style={{ fontFamily: "'Dancing Script', 'Pacifico', cursive" }}
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
                        Next
                    </span>
                    <ArrowRight size={22} className="ml-1" />
                </GradientButton>
            </motion.div>
        </div>
    );
}