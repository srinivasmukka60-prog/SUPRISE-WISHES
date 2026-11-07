import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Mail, Check, Copy, Printer } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';

interface EmotionalLetterProps {
  sisterName: string;
}

export const EmotionalLetter: React.FC<EmotionalLetterProps> = ({ sisterName }) => {
  const [isOpen, setIsOpen] = useState(true);
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

  const handleToggleOpen = () => {
    musicBox.playSparkle();
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter-section" className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
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

      {/* Envelope / Letter Container */}
      <div className="relative">
        {/* If letter is closed: Envelope with Wax Seal */}
        {!isOpen ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg mx-auto p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#2f1147] via-[#240b38] to-[#1a072b] border-2 border-pink-400/40 shadow-[0_0_50px_rgba(236,72,153,0.3)] text-center flex flex-col items-center justify-center cursor-pointer hover:border-pink-300 transition-all group"
            onClick={handleToggleOpen}
          >
            {/* Wax Seal Button */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-700 via-red-600 to-rose-500 shadow-[0_0_30px_rgba(225,29,72,0.8)] border-4 border-amber-300 flex items-center justify-center text-amber-200 mb-6 relative"
            >
              <Heart className="w-10 h-10 fill-amber-200 text-amber-200" />
              <div className="absolute inset-0 rounded-full border border-red-900/40" />
            </motion.div>

            <h3 className="text-2xl font-bold font-serif-title text-pink-100 mb-2">
              To My Beloved Sister {sisterName}
            </h3>
            <p className="text-sm text-pink-300/80 mb-6">
              Sealed with unconditional love. Click the wax seal to open.
            </p>

            <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-500/30 border border-pink-400 text-white font-semibold text-sm group-hover:bg-pink-500/50 transition-colors">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Break Seal &amp; Read Letter 💌</span>
            </span>
          </motion.div>
        ) : (
          /* Opened Parchment Handwritten Letter */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl bg-gradient-to-b from-[#fffbf2] via-[#fff9eb] to-[#fff4dc] text-[#2b1704] p-6 sm:p-12 shadow-[0_15px_60px_rgba(0,0,0,0.6)] border-4 border-[#e8d5b5] overflow-hidden"
          >
            {/* Subtle paper decorative corners & lines */}
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
                  onClick={handleToggleOpen}
                  className="px-3 py-1.5 rounded-xl bg-[#f0dfc2] hover:bg-[#e4cfad] text-[#5c3710] font-medium text-xs transition-colors cursor-pointer"
                  title="Fold back into envelope"
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
        )}
      </div>
    </section>
  );
};
