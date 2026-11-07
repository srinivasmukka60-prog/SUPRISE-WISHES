import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Mail, Check, Copy, Printer } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';
import { fireHeartConfetti } from '../utils/confetti';

interface EmotionalLetterProps {
  sisterName: string;
}

export const EmotionalLetter: React.FC<EmotionalLetterProps> = ({ sisterName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const letterParagraphs = [
    `Dear ${sisterName},`,
    "You are not just my sister. You are one of the greatest blessings in my entire life.",
    "We may fight, tease, argue, and annoy each other over the silliest little things, but behind every single fight is a deep, unbreakable love that words can never truly explain.",
    "Your smile makes my world so much brighter. Whenever you are genuinely happy, it fills my heart with peace. If I had the power, I would collect every beautiful moment in this universe and give them all to you—and remove every trace of sadness from your life.",
    "Whenever life becomes difficult, confusing, or heavy, remember this promise: you will never have to face anything alone. I will always stand beside you through every storm and every triumph.",
    "I want to see you achieve every dream you hold in your heart, smile without limits, and live the happiest, most extraordinary life possible.",
    "No matter how old we grow or where life takes us, you will always be my precious sister.",
    `Happy Birthday, ${sisterName}! ❤️`,
    "I LOVE YOU FOREVER, SIS!"
  ];

  const fullLetterText = letterParagraphs.join('\n\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLetterText);
    setCopied(true);
    musicBox.playPop();
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleToggleOpen = (e?: React.MouseEvent) => {
    musicBox.playSparkle();
    if (!isOpen) {
      if (e) {
        fireHeartConfetti(e.clientX, e.clientY);
      } else {
        fireHeartConfetti();
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter-section" className="relative py-4 sm:py-6 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col justify-center min-h-[75vh]">
      {/* If letter is closed: Match "A little note for you" pink popup envelope card */}
      {!isOpen ? (
        <div className="flex flex-col items-center justify-center my-auto">
          {/* Handwritten Title */}
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-handwriting text-pink-100 text-center mb-8 drop-shadow-[0_2px_15px_rgba(244,114,182,0.4)]"
          >
            A little note for you
          </motion.h2>

          {/* Cute Pink Card as shown in user screenshot */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleToggleOpen}
            className="w-full max-w-sm sm:max-w-md rounded-[28px] bg-[#ffd1e3] overflow-hidden shadow-[0_15px_45px_rgba(244,114,182,0.35)] border-2 border-pink-300/60 cursor-pointer select-none transition-all group"
          >
            {/* Top Pink Header Bar with two small hearts */}
            <div className="h-14 bg-[#ff8eb4] flex items-center justify-between px-6">
              <Heart className="w-5 h-5 fill-[#ff1493] text-[#ff1493] drop-shadow-sm" />
              <Heart className="w-5 h-5 fill-[#ff1493] text-[#ff1493] drop-shadow-sm" />
            </div>

            {/* Card Body */}
            <div className="py-8 sm:py-10 px-6 flex flex-col items-center justify-center text-center">
              {/* Center Heart Ribbon Badge */}
              <div className="relative mb-5 flex flex-col items-center">
                {/* Heart Icon */}
                <div className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center">
                  <Heart className="w-14 h-14 fill-[#e60067] text-[#e60067] drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                </div>
                {/* Ribbon tails underneath heart */}
                <div className="flex items-center gap-1 -mt-3 z-0">
                  <div
                    className="w-3.5 h-6 bg-[#b5145b] rounded-b-sm rotate-[20deg] shadow-sm"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
                  />
                  <div
                    className="w-3.5 h-6 bg-[#b5145b] rounded-b-sm -rotate-[20deg] shadow-sm"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}
                  />
                </div>
              </div>

              {/* Tap to open text */}
              <p className="text-base sm:text-lg font-medium text-[#d91b70] tracking-wide group-hover:text-[#b01056] transition-colors flex items-center justify-center gap-1.5">
                <span>Tap to open</span>
                <span className="text-sm">💌</span>
              </p>
            </div>
          </motion.div>
        </div>
      ) : (
        <div>
          {/* Section Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-semibold mb-3">
              <Mail className="w-4 h-4 text-pink-300" />
              <span>Straight From My Heart</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-serif-title bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200 bg-clip-text text-transparent">
              A Letter For My Sister 💌
            </h2>
            <p className="mt-2 text-sm text-pink-300/70">
              Words I might not say every day, but mean with all my heart.
            </p>
          </div>

          {/* Opened Parchment Handwritten Letter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl bg-gradient-to-b from-[#fffbf2] via-[#fff9eb] to-[#fff4dc] text-[#2b1704] p-6 sm:p-12 shadow-[0_15px_60px_rgba(0,0,0,0.6)] border-4 border-[#e8d5b5] overflow-hidden"
          >
            {/* Subtle paper decorative corners */}
            <div className="absolute top-4 left-4 text-amber-600/30 text-2xl select-none">❧</div>
            <div className="absolute top-4 right-4 text-amber-600/30 text-2xl select-none">☙</div>
            <div className="absolute bottom-4 left-4 text-amber-600/30 text-2xl select-none">☙</div>
            <div className="absolute bottom-4 right-4 text-amber-600/30 text-2xl select-none">❧</div>

            {/* Letter Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#e5d0ad] gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#8a5d2a] font-bold">
                  Sisterly Love • Forever Bond
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold font-serif-title text-[#441a05] mt-1">
                  For {sisterName} ❤️
                </h3>
              </div>

              {/* Action Buttons: Copy / Print / Fold */}
              <div className="flex items-center gap-2 print:hidden">
                <button
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-xl bg-[#f0dfc2] hover:bg-[#e4cfad] text-[#5c3710] font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy Letter"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-700" />
                      <span className="text-green-800 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 rounded-xl bg-[#f0dfc2] hover:bg-[#e4cfad] text-[#5c3710] font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Print / Save PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <button
                  onClick={() => handleToggleOpen()}
                  className="px-3 py-1.5 rounded-xl bg-[#f0dfc2] hover:bg-[#e4cfad] text-[#5c3710] font-medium text-xs transition-colors cursor-pointer"
                  title="Close back"
                >
                  Fold ✉️
                </button>
              </div>
            </div>

            {/* Letter Content in Elegant Handwriting */}
            <div className="mt-8 space-y-6 font-handwriting text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[#3a1a09] selection:bg-pink-300 selection:text-black">
              {letterParagraphs.map((para, index) => {
                const isHeading = index === 0;
                const isSignoff = index >= letterParagraphs.length - 2;

                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className={`${
                      isHeading
                        ? 'text-3xl sm:text-4xl md:text-5xl font-bold text-[#6d1326]'
                        : isSignoff
                        ? 'text-3xl sm:text-4xl md:text-5xl font-bold text-[#831843] pt-4'
                        : 'text-2xl sm:text-3xl md:text-[32px]'
                    }`}
                  >
                    {para}
                  </motion.p>
                );
              })}
            </div>

            {/* Wax Seal Stamp on the bottom right */}
            <div className="mt-10 pt-6 border-t border-[#e5d0ad] flex items-center justify-between">
              <div className="text-xs text-[#8a5d2a] font-serif-title italic">
                From your sibling, with all the love in the universe.
              </div>

              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-800 to-red-600 shadow-md border-2 border-amber-300/80 flex items-center justify-center text-amber-200">
                <Heart className="w-7 h-7 fill-amber-200 text-amber-200" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
