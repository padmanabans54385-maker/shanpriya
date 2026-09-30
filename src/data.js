// ╔══════════════════════════════════════════════════════════════╗
// ║              data.js  —  YOUR BIRTHDAY WEBSITE               ║
// ║         Edit ONLY this file to customise everything.         ║
// ║         No other file needs to be touched.                   ║
// ╚══════════════════════════════════════════════════════════════╝
//
// ┌─────────────────────────────────────────────────────────────┐
// │  HOW TO ADD YOUR PHOTOS                                     │
// │                                                             │
// │  Step 1 — Open the folder:  birthday\public\images\         │
// │  Step 2 — Copy your photos into that folder                 │
// │  Step 3 — Name them anything you like, e.g.                 │
// │             me.jpg, us.jpg, party.jpg                       │
// │  Step 4 — Update the `photos` array below with the names    │
// │             e.g.  "/images/me.jpg"                          │
// │                                                             │
// │  ✅ Supported formats: .jpg  .jpeg  .png  .webp             │
// │  ✅ You can add more than 3 photos — just add more lines    │
// │  ✅ You can use fewer photos — just remove lines            │
// └─────────────────────────────────────────────────────────────┘
//
// ┌─────────────────────────────────────────────────────────────┐
// │  HOW TO SET THE BIRTHDAY DATE                               │
// │                                                             │
// │  Change the date inside new Date("...")                     │
// │  Format:  YYYY-MM-DD                                        │
// │                                                             │
// │  Examples:                                                  │
// │    new Date("2026-10-09T00:00:00")  → 9 Oct 2026 midnight  │
// │    new Date("2026-12-25T08:00:00")  → 25 Dec 2026, 8 AM   │
// └─────────────────────────────────────────────────────────────┘

// ================================================================
//  🗓️  STEP 1 — SET THE BIRTHDAY DATE
// ================================================================

export const birthdayDate = new Date("2026-09-30T00:00:00");
//                                    ^^^^ ^^  ^^  ^^^^^^^^
//                                    Year Mo  Day  HH:MM:SS

// ================================================================
//  📸  STEP 2 — SET YOUR PHOTOS
//  Put images in the folder:  birthday\public\images\
//  Then write the filename below with a "/" in front.
// ================================================================

export const photos = [
  "/gallery/1.jpg",  
  "/gallery/2.jpg",   
  "/gallery/3.jpg",  
  "/gallery/4.jpeg", 
  "/gallery/5.jpg" 
];

// How many seconds each photo is shown (1000 = 1 second)
export const photoDuration = 4000;  // ← 4000 = 4 seconds

// ================================================================
//  ✏️  STEP 3 — CUSTOMIZE ALL TEXT
// ================================================================

// ── Screen 1: Start Screen ──────────────────────────────────────

// Big title on the opening screen
export const startTitle = "🎉 A Surprise Wait for you 🎉";

// Label on the big gradient button
export const startButtonLabel = "Start";

// ── Screen 2: Photo Slideshow ───────────────────────────────────

// Button label that appears after all photos have been shown
export const goToCountdownLabel = "Go to Countdown";

// Accessibility label for photos (screen readers)
export const photoAltPrefix = "Memory";

// ── Screen 3: Countdown Page ────────────────────────────────────

// 🎂 The birthday person's name — shown in PINK in the heading
export const birthdayPersonName = "Lusu";

// Text BEFORE the name in the heading
export const headingPrefix = "🎂 Advance Happy Birthday";

// Emojis shown AFTER the name
export const headingEmojis = "😍 💙";

// Smaller italic text below the heading
export const countdownSubtitle =
  "(When Countdown Reach Zero the Surprise Gift Will be Open 🎁)";

// Labels under each number in the timer
export const timerLabels = {
  days:    "DAYS",
  hours:   "HOURS",
  minutes: "MINUTES",
  seconds: "SECONDS",
};

// Symbol shown between timer units (e.g. "."  or  ":"  or  "•")
export const timerSeparator = ".";

// Message shown when the countdown hits ZERO 🎉
export const birthdayMessage = "🎉 Happy Birthday ! 🎉";

// ================================================================
//  🌐  STEP 4 — PAGE META  (browser tab title & description)
// ================================================================

export const pageTitle = "Shanmuga Priya";

export const pageDescription =
  "A special birthday surprise countdown for 09 October 2026.";

// ================================================================
//  🎉 VAISHU SURPRISE SCREENS CONTENT (POST-COUNTDOWN)
// ================================================================

export const firstHeading = "A Mental was born today, 22 years ago!";
export const firstSubtext = "Yes, it’s YOU 😂 ! A little surprise awaits...";

export const NAME = "la Shan!";

export const photoScreenHeading = "Some Sweet Moments With You";

export const surprisePhotos = [
  "/images/1.jpg",
  "/images/2.jpg",
  "/images/3.jpg",
  "/images/4.jpg",
  "/images/5.jpg",
  "/images/6.jpg",
  "/images/7.jpg",
  "/images/8.jpg",
  "/images/9.jpg",
  "/images/10.jpg",
  "/images/11.jpg",
  "/images/12.jpg"
];

export const videos = [
  "/videos/1.mp4",
  "/videos/2.mp4"
];

export const messageScreenHeading = "A Special Message";

export const specialMessage = `Happy Birthday la Shan 💙🎂✨
Eppavum happy ah iru 💗... Inga MCA la enakku kedaicha best friend neethaan 🤗💞

Innum konjam munnadiye pesi irundha nalla irundhirukkum la… 😅❤️ Nee enakku eppavum oru nalla friend. Apo apo nee oru maathiri pannitu enna neraya tension aakiduva 😂😭… Aana enna irundhaalum, unna maathiri oru ponna friend ah kedaichadhukku I’m very lucky da 💗

Thanks for coming into my life! ✨ Next year la irundhu unoda career la nalla focus pannu. Kandippa unakku oru beautiful life irukkum da ❤️🌸

Onnoda odamba nalla pathukko la ❤️ Correct-ah time-ku sapdu 🍛, apram nalla thoongu 😴💤 Romba neram mulichittu irukaadha… apram idhu pinnadi problem aagalam la 🥺. Naan sonna kelu nu namburen 🤗. Namma health-ah vida edhuvum mukkiyam illa la ❤️. So, stay healthy and happy forever! 🥰🌸💙

Naan paathadhula romba strong-aana ponnu nee dhaan la 💪🏻❤️ Adhe maathiri eppavum iru… Yedhu nadandhaalum strong ah face pannu. ✨

Unakkaaga eppavum support-ku naan iruppen… Ennanaalum, “naan irukken” nu ninaichuko. 💙

Apram, kalyanathukku koopda marandhuraadha! 😂💍 Naan un marriage-ku dhaan waiting la! 🤣❤️

Nee edukura decisions la eppavum nalla yosichu, correct-a iru. 🌷✨ Apram college mudichu pona apram ennai marandhuraadha 😂… Touch-la irundhuko, okay va? 🤝💗

Once again, Happy Birthday la Eruma! 😂🐃💙🎂
Eppavum ippadiye happy ah, strong ah, jolly ah iru! 🥰✨
Have a beautiful year ahead, Priya! 💗🎉`;

export const finalScreenHeading = "One Last Thing...";
export const overlayText = "Lots of love for you 💙";
export const overlayMessage = "Once again, Happy Birthday la Lusu! Hope you loved your surprise.";
export const backgroundMusic = "/audio/bg.mp3";
