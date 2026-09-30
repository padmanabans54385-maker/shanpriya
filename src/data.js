// ╔══════════════════════════════════════════════════════════════╗
// ║              data.js  —  YOUR BIRTHDAY WEBSITE               ║
// ║         Edit ONLY this file to customise everything.         ║
// ║         No other file needs to be touched.                   ║
// ╚══════════════════════════════════════════════════════════════╝

// ================================================================
//  🗓️  STEP 1 — SET THE BIRTHDAY DATE
// ================================================================

export const birthdayDate = new Date("2026-10-09T00:00:00");

// ================================================================
//  📸  IMAGES, VIDEOS, GIFS & AUDIO ASSETS
// ================================================================

// Photo slideshow images
export const photos = [
  "/gallery/1.jpg",  
  "/gallery/2.jpg",   
  "/gallery/3.jpg",  
  "/gallery/4.jpeg", 
  "/gallery/5.jpg" 
];

// Surprise photo gallery images
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

// Videos
export const videos = [
  "/videos/1.mp4",
  "/videos/2.mp4"
];

// Cover image for card in MessageScreen
export const coverImage = "/images/cover.webp";

// 🎨 GIFs
export const introGif = "/gifs/intro.gif";
export const giftGif = "/gifs/gift.gif";
export const surpriseGif = "/gifs/surprise.gif";

// 🎵 AUDIOS
export const bgAudio = "/audio/bg.mp3";
export const wishAudio = "/audio/wish.mp3";
export const popAudio = "/audio/pop.mp3";
export const gallAudio = "/audio/gall.mp3";
export const mesAudio = "/audio/mes.mp3";

// Legacy export for background music
export const backgroundMusic = bgAudio;

// ⏱️ TIMERS & DURATIONS
export const photoDuration = 4000;      // 4 seconds per photo in slideshow
export const gallAudioDuration = 20000; // 15 seconds play duration for gall.mp3

// ================================================================
//  ✏️  CUSTOMIZE ALL TEXTS & BUTTON LABELS
// ================================================================

// ── Screen 1: Start Screen ──────────────────────────────────────
export const startTitle = "🎉 A Surprise Wait for you 🎉";
export const startButtonLabel = "Start";

// ── Screen 2: Photo Slideshow ───────────────────────────────────
export const goToCountdownLabel = "Go to Countdown";
export const photoAltPrefix = "Memory";

// ── Screen 3: Countdown Page ────────────────────────────────────
export const birthdayPersonName = "Lusu";
export const headingPrefix = "🎂 Advance Happy Birthday";
export const headingEmojis = "😍 💙";
export const countdownSubtitle = "(When Countdown Reach Zero the Surprise Gift Will be Open 🎁)";
export const timerLabels = {
  days:    "DAYS",
  hours:   "HOURS",
  minutes: "MINUTES",
  seconds: "SECONDS",
};
export const timerSeparator = ".";
export const birthdayMessage = "🎉 Happy Birthday ! 🎉";
export const openWishButtonLabel = "Open Special Wish & Memories ❤️";

// ── Screen 4: Loader Screen ─────────────────────────────────────
export const loaderHeading = "Crafting your special moment...";

// ── Screen 5: Intro Screen ──────────────────────────────────────
export const firstHeading = "A Mental was born today, 22 years ago!";
export const firstSubtext = "Yes, it’s YOU 😂 ! A little surprise awaits...";
export const introButtonLabel = "Start the surprise";

// ── Screen 6: Cake Screen ───────────────────────────────────────
export const NAME = "la Shan!";
export const cakeHeadingPrefix = "Happy Birthday, ";
export const decorateButtonLabel = "Decorate";
export const lightCandleButtonLabel = "Light the Candle";
export const popBalloonsButtonLabel = "Pop the Balloons";

// ── Screen 7: Balloon Game Screen ───────────────────────────────
export const balloonWords = ["Treat", "Mukkiyam", "la", "Eruma"];
export const balloonScreenHeading = "Pop all 4 balloons 🎈";
export const allPoppedMessage = "Yay! You popped them all! 😂😂";
export const balloonNextButtonLabel = "Next";

// ── Screen 8: Photos Screen ─────────────────────────────────────
export const photoScreenHeading = "Some Sweet Moments With You";
export const openMessageButtonLabel = "Open My Message";

// ── Screen 9: Message Screen ────────────────────────────────────
export const messageScreenHeading = "A Special Message";
export const coverButtonLabel = "Tap to Open";
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
export const messageNextButtonLabel = "Next";

// ── Screen 10: Final Surprise Screen ────────────────────────────
export const finalScreenHeading = "One Last Thing...";
export const tapGiftHint = "Tap the gift 🎁";
export const overlayText = "Lots of love for you 💙";
export const overlayMessage = "Once again, Happy Birthday la Lusu! Hope you loved your surprise.";
export const replayButtonLabel = "Replay";

// ================================================================
//  🌐  PAGE META  (browser tab title & description)
// ================================================================
export const pageTitle = "Shanmuga Priya";
export const pageDescription = "A special birthday surprise countdown for 09 October 2026.";
