import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, Star, Crown } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';
import { fireGrandBirthdayConfetti } from '../utils/confetti';

interface SecretSurpriseModalProps {
  sisterName: string;
}

export const SecretSurpriseModal: React.FC<SecretSurpriseModalProps> = ({ sisterName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    musicBox.playSparkle();
    musicBox.playFanfare();
    fireGrandBirthdayConfetti();
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <section className="relative py-8 sm:py-12 px-4 text-center flex flex-col justify-center min-h-[60vh]">
      {/* Decorative Aurora Glow behind button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-48 bg-gradient-to-r from-pink-600/30 via-purple-600/30 to-pink-600/30 blur-3xl rounded-full animate-pulse-glow" />
      </div>

      <div className="relative z-10 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-semibold mb-4">
          <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
          <span>The Hidden Treasure</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold font-serif-title text-pink-100 mb-4">
          One Final Blessing For You ✨
        </h3>

        <p className="text-sm sm:text-base text-pink-200/80 mb-8 max-w-md mx-auto">
          Before you go, there is one last secret message from the deepest corner of my heart.
        </p>

        {/* Glowing Secret Button */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1],
            boxShadow: [
              '0 0 25px rgba(236,72,153,0.5)',
              '0 0 50px rgba(236,72,153,0.85)',
              '0 0 25px rgba(236,72,153,0.5)'
            ]
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-block rounded-2xl"
        >
          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="px-8 sm:px-12 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-lg sm:text-xl border-2 border-pink-200/60 shadow-2xl flex items-center justify-center gap-3 cursor-pointer group hover:brightness-110 transition-all"
          >
            <Heart className="w-6 h-6 fill-rose-300 text-rose-300 group-hover:scale-125 transition-transform" />
            <span>{sisterName.toUpperCase()}, ONE LAST SURPRISE... 💗</span>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </motion.button>
        </motion.div>
      </div>

      {/* Full-Screen Darkened Cinematic Secret Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-[#080210]/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            {/* Celestial Floating Constellations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-gradient-to-tr from-pink-600/20 to-purple-600/20 rounded-full blur-[120px] animate-pulse-glow" />
              <div className="absolute bottom-10 right-10 text-4xl animate-float">✨</div>
              <div className="absolute top-12 left-10 text-3xl animate-float-reverse">💖</div>
              <div className="absolute top-1/2 right-12 text-3xl animate-float">🌸</div>
              <div className="absolute bottom-20 left-16 text-4xl animate-float-reverse">👑</div>
            </div>

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-2xl w-full p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-white/10 via-purple-900/30 to-black/60 border-2 border-pink-400/50 shadow-[0_0_80px_rgba(244,114,182,0.4)] text-center text-white overflow-hidden my-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Glowing Heart Crown Emblem */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.25, 1] }}
                transition={{ duration: 0.7 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-pink-500 via-rose-400 to-purple-500 p-0.5 shadow-[0_0_40px_rgba(244,114,182,0.8)] flex items-center justify-center relative"
              >
                <div className="w-full h-full rounded-full bg-[#18072b] flex items-center justify-center">
                  <Crown className="w-10 h-10 text-amber-300" />
                </div>
              </motion.div>

              <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-pink-300">
                A Sacred Promise to You
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-serif-title text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200 mt-2 mb-6">
                You Are Irreplaceable, {sisterName}. ❤️
              </h2>

              {/* Emotional Secret Message Paragraphs */}
              <div className="space-y-5 text-base sm:text-lg md:text-xl text-pink-100/90 leading-relaxed font-serif-title italic">
                <p>
                  &ldquo;No matter where life takes us, no matter how much we grow up, you will always be my little piece of pure happiness.&rdquo;
                </p>

                <p className="text-pink-200 font-semibold text-lg sm:text-xl md:text-2xl not-italic bg-gradient-to-r from-pink-300 via-rose-200 to-purple-200 bg-clip-text text-transparent">
                  &ldquo;I cannot promise that every single day will be perfect, but I promise you will never have to face life alone.&rdquo;
                </p>

                <p>
                  &ldquo;You will always have someone who cares, supports you, protects you, and celebrates your happiness. Never stop smiling. You deserve the entire universe.&rdquo;
                </p>
              </div>

              {/* Signoff */}
              <div className="mt-8 pt-6 border-t border-pink-400/30">
                <p className="text-2xl sm:text-3xl font-black font-handwriting text-pink-300">
                  I LOVE YOU, SIS! FOREVER &amp; ALWAYS ❤️
                </p>
              </div>

              {/* Action */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleClose}
                  className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-pink-300/40 text-pink-200 font-semibold text-sm transition-all cursor-pointer"
                >
                  Keep This in My Heart 💖
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
