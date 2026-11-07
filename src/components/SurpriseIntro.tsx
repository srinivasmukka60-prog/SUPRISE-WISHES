import React from 'react';
import { motion } from 'motion/react';
import { Gift, Sparkles, Crown } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';
import { fireGrandBirthdayConfetti } from '../utils/confetti';

interface SurpriseIntroProps {
  sisterName: string;
  onOpen: () => void;
}

export const SurpriseIntro: React.FC<SurpriseIntroProps> = ({ sisterName, onOpen }) => {
  const handleOpenClick = () => {
    musicBox.playSparkle();
    fireGrandBirthdayConfetti();
    musicBox.start();
    onOpen();
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-gradient-to-b from-[#140624] via-[#21093c] to-[#120520] text-white">
      {/* Ambient background glows */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-pink-500/20 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute w-[400px] h-[400px] rounded-full bg-purple-600/25 blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '1.2s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-xl w-full text-center p-8 sm:p-12 rounded-3xl bg-white/10 backdrop-blur-2xl border border-pink-400/30 shadow-[0_0_60px_rgba(219,39,119,0.35)]"
      >
        {/* Crown & Princess Tag */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-pink-500/30 border border-pink-300/40 text-pink-200 text-sm font-semibold mb-6 shadow-sm"
        >
          <Crown className="w-4 h-4 text-amber-300" />
          <span>Heyyy, Birthday Princess! 👑❤️</span>
        </motion.div>

        {/* Greeting Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black font-serif-title tracking-tight bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_25px_rgba(244,114,182,0.6)]"
        >
          HEY {sisterName.toUpperCase()}! ❤️
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-lg sm:text-xl text-pink-100/90 font-medium mb-8 max-w-md mx-auto leading-relaxed"
        >
          Someone has prepared something truly magical and full of love, just for you...
        </motion.p>

        {/* Big Glowing Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring' }}
          className="relative inline-block"
        >
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 blur-lg"
          />

          <motion.button
            onClick={handleOpenClick}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="relative px-8 sm:px-12 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-extrabold text-xl sm:text-2xl shadow-2xl border border-pink-200/50 flex items-center gap-3 cursor-pointer group"
          >
            <Gift className="w-7 h-7 text-yellow-200 group-hover:rotate-12 transition-transform duration-300" />
            <span>OPEN YOUR SURPRISE 🎁</span>
            <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 text-xs text-pink-200/60 tracking-wider"
        >
          Turn on your sound for the best experience 🎶
        </motion.p>
      </motion.div>
    </div>
  );
};
