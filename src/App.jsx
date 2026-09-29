import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import StartScreen from "./components/StartScreen";
import SlideshowScreen from "./components/SlideshowScreen";
import CountdownScreen from "./components/CountdownScreen";
import VaishuSurprisePage from "./components/vaishu/VaishuSurprisePage";
import "./index.css";

// ============================================================
// App — 4-phase state machine
//   "start"     → StartScreen (Let's Start the Celebration)
//   "slideshow" → SlideshowScreen (neon photo box + confetti)
//   "countdown" → CountdownScreen (live timer - unchanged)
//   "birthday"  → VaishuSurprisePage (All interactive screens from vaishu-main)
// ============================================================
export default function App() {
  const [phase, setPhase] = useState("start");

  return (
    <AnimatePresence mode="wait">
      {phase === "start" && (
        <StartScreen key="start" onStart={() => setPhase("slideshow")} />
      )}

      {phase === "slideshow" && (
        <SlideshowScreen key="slideshow" onDone={() => setPhase("countdown")} />
      )}

      {phase === "countdown" && (
        <CountdownScreen
          key="countdown"
          visible={true}
          onCelebration={() => setPhase("birthday")}
        />
      )}

      {phase === "birthday" && <VaishuSurprisePage key="birthday" />}
    </AnimatePresence>
  );
}
