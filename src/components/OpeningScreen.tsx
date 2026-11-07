import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { fireHeartConfetti } from '../utils/confetti';
import { musicBox } from '../utils/audioSynth';

interface OpeningScreenProps {
  onComplete: () => void;
  sisterName?: string;
}

const FUNNY_MESSAGES = [
  "Think carefully before answering! 🙈",
  "Are you sure? 🥺",
  "Please think again! 😭",
  "My heart is breaking! 💔",
  "Don't do this to me! 😂",
  "One more chance, Shruthi! 🥹",
  "Just press YESSS! ❤️",
  "The NO button is getting tiny! 🔍😆",
  "You can't escape my love! 🥰",
  "Resistance is futile, Sis! 👑💖",
  "Look how huge YES is! Tap it! 🚀💕"
];

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotate: number;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onComplete, sisterName = "Shruthi" }) => {
  const [noCount, setNoCount] = useState(0);
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0 });
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);

  // Cute reaction emojis when clicking NO
  const cuteEmojis = ['🥺', '😭', '😂', '💗', '💕', '🥰', '❤️', '💔', '🥺', '✨'];

  const handleNoClick = () => {
    musicBox.playBoing();
    setNoCount((prev) => prev + 1);

    // Random gentle wiggle / playful bounce
    const randomX = (Math.random() - 0.5) * 60;
    const randomY = (Math.random() - 0.5) * 30;
    setNoButtonOffset({ x: randomX, y: randomY });

    // Spawn 4-6 flying cute emojis on screen
    const newItems: FloatingEmoji[] = [];
    const count = 4;
    for (let i = 0; i < count; i++) {
      newItems.push({
        id: Date.now() + Math.random() * 1000 + i,
        emoji: cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)],
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        rotate: (Math.random() - 0.5) * 40
      });
    }
    setFloatingEmojis((prev) => [...prev.slice(-15), ...newItems]);
  };

  const handleYesClick = () => {
    if (isYesClicked) return;
    setIsYesClicked(true);
    musicBox.playFanfare();
    fireHeartConfetti();

    // Start background music
    musicBox.start();

    // Delay for the joyful celebration message then proceed
    setTimeout(() => {
      onComplete();
    }, 2800);
  };

  // Dynamic scaling for buttons
  // YES grows smoothly with every NO click
  const yesScale = Math.min(1 + noCount * 0.22, 2.8);
  // NO shrinks smoothly but stays accessible (min 0.65)
  const noScale = Math.max(1 - noCount * 0.08, 0.65);

  const currentMessageIndex = Math.min(noCount, FUNNY_MESSAGES.length - 1);
  const currentMessage = FUNNY_MESSAGES[currentMessageIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1b082e] via-[#2d0f48] to-[#120522] p-4 text-white select-none">
      {/* Background sparkling atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/6 left-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/6 right-1/4 w-80 h-80 bg-purple-500/25 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

        {/* Ambient floating hearts & flowers in background */}
        <div className="absolute top-12 left-8 text-2xl animate-float">🌸</div>
        <div className="absolute top-20 right-12 text-3xl animate-float-reverse">💖</div>
        <div className="absolute bottom-16 left-16 text-3xl animate-float">🌺</div>
        <div className="absolute bottom-24 right-10 text-2xl animate-float-reverse">✨</div>
        <div className="absolute top-1/2 left-6 text-xl animate-float">🌷</div>
        <div className="absolute top-1/3 right-8 text-2xl animate-float">💕</div>
      </div>

      {/* Floating spawned cute emojis from NO clicks */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {floatingEmojis.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, scale: 0.5, y: 0 }}
              animate={{ opacity: 0, scale: 1.8, y: -120, rotate: item.rotate }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="absolute text-3xl md:text-4xl"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              {item.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main card */}
      <div className="relative z-30 w-full max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!isYesClicked ? (
            <motion.div
              key="question-box"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-xl border border-pink-400/30 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(236,72,153,0.3)] text-center relative overflow-hidden"
            >
              {/* Decorative crown / badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-sm font-medium mb-4 animate-bounce">
                <Sparkles className="w-4 h-4 text-pink-300" />
                <span>Special Question for {sisterName}</span>
                <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
              </div>

              {/* Header */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-pink-300 via-rose-200 to-purple-200 bg-clip-text text-transparent font-serif-title mb-2">
                Heyyy {sisterName}! 🥺💕
              </h1>

              <div className="my-5">
                <p className="text-2xl sm:text-3xl font-black text-white tracking-wide drop-shadow-[0_0_15px_rgba(255,105,180,0.8)]">
                  DO YOU LOVE ME? ❤️
                </p>
                <motion.p
                  key={noCount}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-pink-200 text-base sm:text-lg font-medium italic min-h-[1.75rem]"
                >
                  {currentMessage}
                </motion.p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 pt-4 pb-2">
                {/* YES BUTTON */}
                <motion.button
                  onClick={handleYesClick}
                  animate={{
                    scale: yesScale,
                    boxShadow: [
                      '0 0 20px rgba(255, 20, 147, 0.6)',
                      '0 0 40px rgba(255, 105, 180, 0.9)',
                      '0 0 20px rgba(255, 20, 147, 0.6)'
                    ]
                  }}
                  transition={{
                    scale: { type: 'spring', stiffness: 350, damping: 20 },
                    boxShadow: { duration: 1.5, repeat: Infinity }
                  }}
                  whileHover={{ scale: yesScale * 1.05 }}
                  whileTap={{ scale: yesScale * 0.95 }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-extrabold text-lg sm:text-xl shadow-lg border border-pink-300/60 cursor-pointer transition-colors hover:brightness-110 flex items-center justify-center gap-2"
                >
                  <Heart className="w-6 h-6 fill-white text-white animate-pulse" />
                  <span>YESSS! ❤️</span>
                </motion.button>

                {/* NO BUTTON */}
                <motion.button
                  onClick={handleNoClick}
                  animate={{
                    scale: noScale,
                    x: noButtonOffset.x,
                    y: noButtonOffset.y
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 15
                  }}
                  whileHover={{ scale: noScale * 0.96 }}
                  whileTap={{ scale: noScale * 0.9 }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-purple-200 font-semibold text-base sm:text-lg border border-purple-300/30 backdrop-blur-md cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>NO 🙈</span>
                </motion.button>
              </div>

              {noCount > 0 && (
                <p className="mt-4 text-xs text-pink-300/70">
                  (Hint: The &apos;YESSS!&apos; button is impossible to resist 😉)
                </p>
              )}
            </motion.div>
          ) : (
            /* Celebration Screen when YES is clicked */
            <motion.div
              key="yay-box"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
              className="bg-white/15 backdrop-blur-2xl border-2 border-pink-400/50 rounded-3xl p-8 sm:p-12 shadow-[0_0_80px_rgba(255,105,180,0.5)] text-center relative overflow-hidden"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ duration: 0.7 }}
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full flex items-center justify-center shadow-[0_0_35px_rgba(255,105,180,0.8)]"
              >
                <Heart className="w-12 h-12 fill-white text-white animate-bounce" />
              </motion.div>

              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-white to-pink-200 mb-4 font-serif-title"
              >
                YAYYYYY! I KNEW YOU LOVED ME! 🥹❤️
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl text-pink-100 font-medium"
              >
                Now, I have a special surprise for you...
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 1.8 }}
                className="h-1 bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500 rounded-full mt-6 mx-auto"
              />

              <p className="mt-4 text-xs tracking-widest text-pink-200/80 uppercase">
                Opening your birthday realm... ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
