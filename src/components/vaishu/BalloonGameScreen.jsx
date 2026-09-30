import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "./GradientButton"
import { ArrowRight } from "lucide-react"

const WORDS = ["You", "are", "a", "Mental"]
const balloons = [
    { id: 1, xPct: 18, topPct: 15, color: "#fb7185" }, // rose-400
    { id: 2, xPct: 39, topPct: 22, color: "#f59e0b" }, // amber-500
    { id: 3, xPct: 61, topPct: 22, color: "#22c55e" }, // green-500
    { id: 4, xPct: 82, topPct: 15, color: "#38bdf8" }, // sky-400
]

export default function BalloonGameScreen({ onNext }) {
    const [popped, setPopped] = useState([])
    const allPopped = popped.length === 4
    const wrapRef = useRef(null)
    const [box, setBox] = useState({ w: 0, h: 0 })
    const [t, setT] = useState(0)
    const [knotPos, setKnotPos] = useState({})
    const knotRefs = useRef(new Map())

    const registerKnot = (id) => (el) => {
        if (el) knotRefs.current.set(id, el)
    }

    const updateKnots = () => {
        const wrapRect = wrapRef.current?.getBoundingClientRect()
        if (!wrapRect) return
        const next = {}
        balloons.forEach((b) => {
            const el = knotRefs.current.get(b.id)
            if (!el) return
            const r = el.getBoundingClientRect()
            next[b.id] = {
                x: r.left - wrapRect.left + r.width / 2,
                y: r.top - wrapRect.top + r.height / 2,
            }
        })
        setKnotPos(next)
    }

    useEffect(() => {
        const r = new ResizeObserver(() => {
            if (!wrapRef.current) return
            setBox({ w: wrapRef.current.clientWidth, h: wrapRef.current.clientHeight })
            updateKnots()
        })
        if (wrapRef.current) r.observe(wrapRef.current)
        return () => r.disconnect()
    }, [])

    useEffect(() => {
        let raf
        const tick = () => {
            setT((v) => (v + 0.025) % (Math.PI * 2))
            updateKnots()
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [])

    useEffect(() => {
        if (allPopped) {
            confetti({
                particleCount: 200,
                spread: 90,
                startVelocity: 40,
                origin: { y: 0.6 },
                ticks: 200,
                colors: ["#FF3CAC", "#FFD700", "#00D4FF", "#BF5FFF", "#FF8C00", "#FF2D78", "#7CFC00", "#FFFFFF", "#F687B3"]
            })
        }
    }, [allPopped])

    const pop = (id) => {
        if (popped.includes(id)) return
        try {
            new Audio("/audio/pop.mp3").play().catch(() => {})
        } catch (_) {}
        setPopped((prev) => [...prev, id])
        confetti({
            particleCount: 50,
            spread: 50,
            startVelocity: 30,
            origin: { y: 0.7 },
            ticks: 110,
            colors: ["#FF3CAC", "#FFD700", "#00D4FF", "#BF5FFF", "#FF8C00", "#FF2D78", "#7CFC00", "#FFFFFF", "#F687B3"]
        })
    }

    const stringPath = (b, idx) => {
        const k = knotPos[b.id]
        if (!k || !box.w || !box.h) return ""
        const startX = k.x
        const startY = k.y
        const sway = Math.sin(t + idx * 1.2) * 16
        const c1x = startX + sway * 0.45
        const c1y = startY + (box.h - startY) * 0.4
        const c2x = box.w * 0.5 + sway * 0.25
        const c2y = box.h * 0.75
        const endX = box.w * 0.5
        const endY = box.h
        return `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`
    }

    return (
        <section className="px-3 md:px-6 py-8 md:py-10">
            <motion.div
                layout
                ref={wrapRef}
                className="relative h-[440px] md:h-[480px] max-h-[52vh] w-full overflow-hidden rounded-3xl backdrop-blur-xl bg-gradient-to-b from-pink-950/40 via-fuchsia-950/35 to-purple-950/40 border border-pink-400/30 shadow-[0_0_30px_rgba(244,114,182,0.15)] flex flex-col items-center justify-between"
            >
                {!allPopped ? (
                    <div className="pt-5 text-pink-100 font-semibold text-xl md:text-2xl tracking-wide drop-shadow-md z-30">
                        Pop all 4 balloons 🎈
                    </div>
                ) : (
                    <div className="pt-5 text-pink-200 font-bold text-2xl md:text-3xl tracking-wider drop-shadow-[0_0_15px_rgba(255,105,180,0.6)] z-30 animate-pulse">
                        Yay! You popped them all! 🎉
                    </div>
                )}

                {balloons.map((b, i) => (
                    <div
                        key={`word-${b.id}`}
                        className="absolute pointer-events-none z-20 flex items-center justify-center"
                        style={{
                            left: `${b.xPct}%`,
                            top: `${b.topPct + 14}%`,
                            transform: "translateX(-50%)",
                        }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{
                                opacity: popped.includes(b.id) ? 1 : 0,
                                scale: popped.includes(b.id) ? 1.2 : 0.5,
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 12 }}
                            className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-fuchsia-300 to-amber-200 drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]"
                        >
                            {WORDS[i]}
                        </motion.span>
                    </div>
                ))}

                <AnimatePresence>
                    {balloons.map((b) => (
                        <Balloon
                            key={b.id}
                            data={b}
                            popped={popped.includes(b.id)}
                            onPop={() => pop(b.id)}
                            registerKnot={registerKnot(b.id)}
                        />
                    ))}
                </AnimatePresence>

                <svg className="pointer-events-none absolute inset-0 z-0" width={box.w} height={box.h}>
                    {balloons.map((b, idx) => {
                        const d = stringPath(b, idx)
                        return d ? (
                            <path
                                key={`str-${b.id}`}
                                d={d}
                                stroke="rgba(255, 255, 255, 0.7)"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                fill="none"
                            />
                        ) : null
                    })}
                    <circle cx={box.w * 0.5} cy={Math.max(0, box.h - 8)} r="6" fill="rgba(255, 255, 255, 0.85)" />
                </svg>
            </motion.div>

            <div className="mt-10 md:mt-14 pb-8 flex justify-center z-30 relative">
                <AnimatePresence>
                    {allPopped && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        ><br></br>
                        <br></br>
                            <GradientButton onClick={onNext}>
                                Next
                                <ArrowRight size={22} className="ml-1" />
                            </GradientButton>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}

function Balloon({ data, onPop, popped, registerKnot }) {
    const { id, xPct, topPct, color } = data

    return (
        <div
            className="absolute z-10 flex flex-col items-center"
            style={{
                left: `${xPct}%`,
                top: `${topPct}%`,
                transform: "translate(-50%, 0)",
            }}
        >
            <motion.button
                onClick={onPop}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{
                    opacity: popped ? 0 : 1,
                    scale: popped ? 1.25 : 1,
                    y: [0, -10, 0],
                }}
                exit={{ opacity: 0, scale: 1.3 }}
                transition={{
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                    y: { repeat: Infinity, duration: 2.8 + id * 0.3, ease: "easeInOut" },
                }}
                className="flex flex-col items-center cursor-pointer focus:outline-none bg-transparent border-none p-0"
                aria-label={`Balloon ${id}`}
            >
                {/* Balloon Body */}
                <div
                    className="w-20 h-26 md:w-24 md:h-32 rounded-[50%_50%_45%_45%/55%_55%_45%_45%] relative shadow-lg"
                    style={{
                        background: `radial-gradient(60% 60% at 35% 35%, rgba(255,255,255,0.7) 0 24%, transparent 25%), linear-gradient(145deg, ${color}, rgba(255,255,255,0.25))`,
                        boxShadow: `0 12px 25px rgba(0,0,0,0.3), inset -6px -10px 18px rgba(0,0,0,0.2), 0 0 15px ${color}66`,
                    }}
                >
                    {/* Gloss shine reflection */}
                    <div className="absolute top-3 left-4 w-4 h-6 rounded-full bg-white/40 blur-[1px] rotate-[-25deg]" />
                </div>

                {/* Knot directly at bottom tip of balloon */}
                <div
                    ref={registerKnot}
                    className="w-3.5 h-3 -mt-0.5 relative z-10"
                    style={{
                        background: color,
                        clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                />
            </motion.button>
        </div>
    )
}
