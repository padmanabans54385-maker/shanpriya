import { useMemo } from "react";

const EMOJIS = ["❤️", "✨", "💫", "🌸", "⭐", "💖", "🎀", "🌟", "💝", "🎊"];

// Pre-calculates deterministic positions (no re-render jitter)
function makeParticle(i, count) {
  const goldenAngle = 137.508;
  return {
    id: i,
    emoji: EMOJIS[i % EMOJIS.length],
    left: `${((i * goldenAngle) % 100).toFixed(2)}%`,
    top:  `${((i * 53.7 + 7) % 95).toFixed(2)}%`,
    size: 13 + (i % 6) * 3.5,
    duration: `${3.5 + (i % 5) * 0.8}s`,
    delay:    `${((i * 0.37) % 4).toFixed(2)}s`,
    opacity:  0.12 + (i % 5) * 0.08,
  };
}

// ============================================================
// FloatingEmojis — lightweight CSS-animated emoji particles
// Props:
//   count   (number) – how many particles (default 16)
//   zIndex  (number) – stacking order (default 1)
// ============================================================
export default function FloatingEmojis({ count = 16, zIndex = 1 }) {
  const particles = useMemo(
    () => Array.from({ length: count }, (_, i) => makeParticle(i, count)),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex,
      }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: p.top,
            fontSize: p.size,
            opacity: p.opacity,
            animation: `bdayFloat ${p.duration} ease-in-out ${p.delay} infinite`,
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
