import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

// ---- Dual-cannon burst ----
function fireCannons() {
  const defaults = { zIndex: 9999 };
  confetti({ ...defaults, particleCount: 70, angle: 60,  spread: 60, origin: { x: 0,   y: 0.6 } });
  confetti({ ...defaults, particleCount: 70, angle: 120, spread: 60, origin: { x: 1,   y: 0.6 } });
  confetti({ ...defaults, particleCount: 45, spread: 90, origin: { x: 0.5, y: 0.35 }, startVelocity: 38 });
}

// ---- Exported: massive celebration (used on birthday reveal) ----
export function fireMassiveCelebration() {
  const duration = 5000;
  const end = Date.now() + duration;

  const interval = setInterval(() => {
    if (Date.now() > end) { clearInterval(interval); return; }
    const count = 80 * ((end - Date.now()) / duration);
    confetti({ particleCount: count, origin: { x: Math.random(), y: Math.random() - 0.2 }, zIndex: 9999, colors: ["#ff2d78", "#bf5fff", "#ffea00", "#00d4ff", "#ff8c00"] });
    confetti({ particleCount: count, origin: { x: Math.random(), y: Math.random() - 0.2 }, zIndex: 9999, shapes: ["star"], colors: ["#ffea00", "#ff2d78", "#fff"] });
  }, 250);
}

// ---- Exported: single immediate blast (for per-photo use) ----
export function fireBlast() {
  fireCannons();
  setTimeout(fireCannons, 600);
}

// ============================================================
// ConfettiEffect Component
// Props:
//   trigger (bool) — flip to true to fire; resets when flipped back
// ============================================================
export default function ConfettiEffect({ trigger }) {
  const fired = useRef(false);

  useEffect(() => {
    if (trigger && !fired.current) {
      fired.current = true;
      fireCannons();
      setTimeout(fireCannons, 650);
      setTimeout(fireCannons, 1400);
    }
    if (!trigger) fired.current = false;
  }, [trigger]);

  return null;
}
