import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { SisterReason } from '../types';
import { musicBox } from '../utils/audioSynth';

interface SisterReasonsProps {
  sisterName: string;
}

const REASONS: SisterReason[] = [
  {
    id: 1,
    emoji: '☀️',
    title: 'Your Radiant Energy',
    description: 'You have a rare gift of lighting up any room you walk into. Even on the darkest days, your energy brings sunshine.'
  },
  {
    id: 2,
    emoji: '🛡️',
    title: 'Always Having My Back',
    description: 'Even when we argue like cat and dog, the moment someone else steps up, you are my fiercest protector and supporter.'
  },
  {
    id: 3,
    emoji: '😂',
    title: 'Our Secret Inside Jokes',
    description: 'We can make each other burst out laughing with just a single glance across a crowded room. Nobody understands me quite like you.'
  },
  {
    id: 4,
    emoji: '💖',
    title: 'Your Golden Heart',
    description: 'You care so deeply about the people around you. Your kindness, empathy, and loyalty make you one of a kind.'
  },
  {
    id: 5,
    emoji: '🌟',
    title: 'Your Boundless Dreams',
    description: 'Watching you chase what you believe in inspires me every single day. The sky is not the limit—you belong among the stars.'
  },
  {
    id: 6,
    emoji: '👑',
    title: 'Forever My Princess',
    description: 'No matter how much time passes or how old we get, you will forever hold the most special place in my world.'
  }
];

export const SisterReasons: React.FC<SisterReasonsProps> = ({ sisterName }) => {
  const [flippedIds, setFlippedIds] = useState<number[]>([]);

  const toggleFlip = (id: number) => {
    musicBox.playPop();
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative py-4 sm:py-6 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col justify-center">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-semibold mb-3">
          <Sparkles className="w-4 h-4 text-pink-300" />
          <span>Little Reminders</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-serif-title bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200 bg-clip-text text-transparent">
          Why You Are Irreplaceable, {sisterName} 💖
        </h2>
        <p className="mt-2 text-sm text-pink-300/80">
          Tap each card to reveal what makes you so special to me.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {REASONS.map((reason) => {
          const isFlipped = flippedIds.includes(reason.id);

          return (
            <motion.div
              key={reason.id}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleFlip(reason.id)}
              className="relative h-56 rounded-3xl cursor-pointer select-none [perspective:1000px]"
            >
              <div
                className={`w-full h-full rounded-3xl transition-transform duration-500 [transform-style:preserve-3d] shadow-lg ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front of card */}
                <div className="absolute inset-0 w-full h-full rounded-3xl p-6 bg-gradient-to-br from-white/10 via-white/5 to-pink-500/10 backdrop-blur-xl border border-pink-400/30 flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500/30 to-purple-500/30 border border-pink-300/40 flex items-center justify-center text-3xl mb-3 shadow-inner">
                    {reason.emoji}
                  </div>
                  <h3 className="text-lg font-bold font-serif-title text-pink-100 mb-1">
                    {reason.title}
                  </h3>
                  <span className="text-xs text-pink-300/70 mt-3 inline-flex items-center gap-1 font-medium">
                    <span>Tap to reveal</span>
                    <Sparkles className="w-3 h-3 text-pink-400" />
                  </span>
                </div>

                {/* Back of card */}
                <div className="absolute inset-0 w-full h-full rounded-3xl p-6 bg-gradient-to-br from-pink-900/60 via-purple-900/60 to-[#1e0a33] backdrop-blur-2xl border-2 border-pink-400/50 flex flex-col justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <div className="flex justify-center mb-2">
                    <Heart className="w-5 h-5 fill-pink-400 text-pink-400" />
                  </div>
                  <p className="text-sm text-pink-100 font-medium leading-relaxed">
                    {reason.description}
                  </p>
                  <span className="text-[11px] text-pink-300/60 mt-3 italic">
                    Tap to flip back
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
