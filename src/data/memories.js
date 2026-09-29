// ================================================================
//  memories.js — Birthday Page Content
//  Edit this file to personalise the post-countdown celebration.
//  No component files need to be touched.
// ================================================================

// ── Hero Section ────────────────────────────────────────────────
export const hero = {
  title: "🎉 Happy Birthday! 🎉",
  subtitle: "Today is your special day ❤️",
};

// ── Birthday Wish Card ──────────────────────────────────────────
export const wish = {
  heading: "💌 A Little Message For You",
  // Each string = one paragraph that appears one after another
  paragraphs: [
    "On your special day, I just want you to know how truly special you are to everyone around you.",
    "May your life overflow with happiness, beautiful memories, endless smiles, and everything your heart wishes for.",
    "Keep shining, keep smiling, and always remember how absolutely amazing you are.",
    "Happy Birthday! ❤️",
  ],
};

// ── Memories Section Header ─────────────────────────────────────
export const memoriesSection = {
  heading: "📸 Our Memories",
  subtitle: "Some moments become memories that stay forever. ❤️",
};

// ── Memory Cards (3 photos) ─────────────────────────────────────
// To change photos: put images in /public/images/ then update paths below.
export const memories = [
  {
    image: "/images/photo1.jpg",
    title: "A Beautiful Moment",
    description:
      "Some moments are simple, but they become the most unforgettable memories of our lives.",
    emoji: "❤️",
  },
  {
    image: "/images/photo2.jpg",
    title: "A Special Memory",
    description:
      "Every photograph holds a feeling — a moment frozen in time that warms the heart forever.",
    emoji: "✨",
  },
  {
    image: "/images/photo3.jpg",
    title: "Forever In Our Hearts",
    description:
      "The best moments in life aren't planned — they just happen, and we hold onto them forever.",
    emoji: "🌸",
  },
];

// ── Quotes shown between memory cards ──────────────────────────
export const quotes = [
  "Some memories are too beautiful to be forgotten. ❤️",
  "A photograph captures a moment, but the heart keeps the memory forever.",
];

// ── Final Birthday Section ──────────────────────────────────────
export const final = {
  title: "❤️ Once Again, Happy Birthday! ❤️",
  subtitle:
    "May this new chapter of your life bring you countless reasons to smile.",
  date: "09 • 10 • 2026",
  note: "Made with ❤️ just for you.",
};
