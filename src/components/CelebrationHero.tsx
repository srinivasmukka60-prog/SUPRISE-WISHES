import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Flame, RotateCcw, Heart, PartyPopper } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';
import { fireCandleBlownConfetti, fireGrandBirthdayConfetti } from '../utils/confetti';

interface CelebrationHeroProps {
  sisterName: string;
}

interface CandleState {
  id: number;
  isLit: boolean;
  color: string;
}

export const CelebrationHero: React.FC<CelebrationHeroProps> = ({ sisterName }) => {
  // 5 glowing candles on the top tier
  const [candles, setCandles] = useState<CandleState[]>([
    { id: 1, isLit: true, color: '#FF69B4' },
    { id: 2, isLit: true, color: '#C8A2FF' },
    { id: 3, isLit: true, color: '#FFD700' },
    { id: 4, isLit: true, color: '#FF85C0' },
    { id: 5, isLit: true, color: '#B37FEB' }
  ]);

  const [wishMade, setWishMade] = useState(false);

  const litCount = candles.filter((c) => c.isLit).length;

  const handleBlowCandle = (id: number, e: React.MouseEvent) => {
    setCandles((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isLit: false } : c))
    );

    musicBox.playBlowSound();
    fireCandleBlownConfetti(e.clientX, e.clientY);

    // Check if that was the last lit candle
    const remainingAfterBlow = candles.filter((c) => c.id !== id && c.isLit).length;
    if (remainingAfterBlow === 0) {
      handleAllBlown();
    }
  };

  const handleBlowAll = (e: React.MouseEvent) => {
    setCandles((prev) => prev.map((c) => ({ ...c, isLit: false })));
    musicBox.playBlowSound();
    fireCandleBlownConfetti(e.clientX, e.clientY);
    handleAllBlown();
  };

  const handleAllBlown = () => {
    setWishMade(true);
    setTimeout(() => {
      musicBox.playFanfare();
      fireGrandBirthdayConfetti();
    }, 400);
  };

  const handleRelight = () => {
    musicBox.playSparkle();
    setCandles((prev) => prev.map((c) => ({ ...c, isLit: true })));
    setWishMade(false);
  };

  return (
    <section className="relative min-h-[78vh] flex flex-col items-center justify-center text-center px-4 py-4 sm:py-6 overflow-hidden">
      {/* Floating Decorative Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Balloon 1: Pink */}
        <div
          className="absolute left-4 sm:left-12 top-20 animate-float"
          style={{ animationDuration: '6s' }}
        >
          <div className="w-16 h-20 sm:w-20 sm:h-24 bg-gradient-to-tr from-pink-500 via-rose-400 to-pink-300 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-[0_10px_25px_rgba(244,114,182,0.4)] relative">
            <div className="absolute top-3 left-3 w-4 h-6 bg-white/40 rounded-full blur-[1px] rotate-[-20deg]" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-pink-600 rounded-b" />
            <div className="absolute -bottom-16 left-1/2 w-[1px] h-16 bg-pink-300/40" />
          </div>
        </div>

        {/* Balloon 2: Lavender */}
        <div
          className="absolute right-6 sm:right-16 top-28 animate-float-reverse"
          style={{ animationDuration: '7s' }}
        >
          <div className="w-16 h-20 sm:w-22 sm:h-26 bg-gradient-to-tr from-purple-500 via-violet-400 to-purple-300 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-[0_10px_25px_rgba(168,85,247,0.4)] relative">
            <div className="absolute top-3 left-3 w-4 h-6 bg-white/40 rounded-full blur-[1px] rotate-[-20deg]" />
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-purple-600 rounded-b" />
            <div className="absolute -bottom-16 left-1/2 w-[1px] h-16 bg-purple-300/40" />
          </div>
        </div>

        {/* Balloon 3: Golden Star Balloon */}
        <div
          className="absolute left-1/4 bottom-12 hidden md:block animate-float"
          style={{ animationDuration: '8s' }}
        >
          <div className="w-14 h-18 bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-200 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-[0_10px_25px_rgba(251,191,36,0.35)] relative">
            <div className="absolute top-2 left-2 w-3 h-5 bg-white/50 rounded-full blur-[1px]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-amber-500 rounded-b" />
            <div className="absolute -bottom-12 left-1/2 w-[1px] h-12 bg-amber-300/40" />
          </div>
        </div>

        {/* Balloon 4: Deep Rose */}
        <div
          className="absolute right-1/4 bottom-16 hidden md:block animate-float-reverse"
          style={{ animationDuration: '7.5s' }}
        >
          <div className="w-14 h-18 bg-gradient-to-tr from-rose-500 via-pink-400 to-rose-300 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-[0_10px_25px_rgba(244,63,94,0.35)] relative">
            <div className="absolute top-2 left-2 w-3 h-5 bg-white/40 rounded-full blur-[1px]" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-rose-600 rounded-b" />
            <div className="absolute -bottom-12 left-1/2 w-[1px] h-12 bg-rose-300/40" />
          </div>
        </div>
      </div>

      {/* Main Birthday Titles */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-400/30 text-pink-200 text-sm sm:text-base font-semibold mb-4 shadow-lg backdrop-blur-md">
          <PartyPopper className="w-4 h-4 text-pink-300" />
          <span>The Most Awaited Celebration</span>
          <Sparkles className="w-4 h-4 text-yellow-300" />
        </div>

        {/* Grand Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-serif-title mb-4">
          <span className="block bg-gradient-to-r from-pink-200 via-white to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(236,72,153,0.7)]">
            HAPPY BIRTHDAY
          </span>
          <span className="block mt-1 bg-gradient-to-r from-pink-400 via-rose-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,105,180,0.9)]">
            {sisterName.toUpperCase()}! 👑
          </span>
        </h1>

        {/* Emotional Subtitle Banner */}
        <p className="text-lg sm:text-2xl md:text-3xl font-bold text-pink-200/90 tracking-wide font-serif-title max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          HAPPY BIRTHDAY TO THE MOST SPECIAL GIRL IN MY WORLD! ❤️
        </p>

        <p className="mt-2 text-sm sm:text-base text-pink-300/70 max-w-xl mx-auto">
          Today is all about celebrating your radiant smile, your pure heart, and the magic you bring into my life.
        </p>
      </motion.div>

      {/* 3D Tiered Birthday Cake with Interactive Candles */}
      <div className="relative z-20 my-10 w-full max-w-md mx-auto">
        {/* Cake Container */}
        <div className="relative flex flex-col items-center">
          {/* Candles Row */}
          <div className="relative z-30 flex justify-center items-end gap-5 sm:gap-7 mb-[-6px]">
            {candles.map((candle) => (
              <div
                key={candle.id}
                onClick={(e) => candle.isLit && handleBlowCandle(candle.id, e)}
                className="group relative flex flex-col items-center cursor-pointer select-none"
                title={candle.isLit ? 'Click to blow out candle' : 'Candle blown out'}
              >
                {/* Flame / Smoke */}
                <div className="h-9 flex items-center justify-center relative">
                  {candle.isLit ? (
                    <div className="relative animate-flame">
                      {/* Inner core */}
                      <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-500 via-yellow-300 to-white shadow-[0_0_12px_#ff9900]" />
                      {/* Outer glow */}
                      <div className="absolute inset-0 rounded-full bg-yellow-400/50 blur-[3px]" />
                    </div>
                  ) : (
                    /* Smoke rising animation */
                    <div className="relative">
                      <div className="w-2.5 h-2.5 bg-gray-400/60 rounded-full animate-smoke" />
                      <div className="w-1.5 h-1.5 bg-gray-300/40 rounded-full animate-smoke" style={{ animationDelay: '0.2s' }} />
                    </div>
                  )}
                </div>

                {/* Wick */}
                <div className="w-0.5 h-2 bg-neutral-700 -mt-1" />

                {/* Candle Body */}
                <div
                  className="w-3.5 sm:w-4 h-12 sm:h-14 rounded-t-sm shadow-md transition-transform group-hover:scale-105"
                  style={{
                    backgroundColor: candle.color,
                    backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 3px, transparent 3px, transparent 6px)'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Tier 1 (Top tier) */}
          <div className="relative z-20 w-44 sm:w-52 h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 border-2 border-pink-100 shadow-[0_8px_20px_rgba(0,0,0,0.3)] flex flex-col justify-between overflow-hidden">
            {/* Strawberry Cream Drip Header */}
            <div className="w-full flex justify-around pt-1">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-4 h-5 bg-white rounded-b-full shadow-inner -mt-1" />
              ))}
            </div>
            {/* Cream ribbon decoration */}
            <div className="pb-2 flex justify-center gap-2">
              <span className="text-xs">🍓</span>
              <span className="text-[10px] text-pink-600 font-bold tracking-widest uppercase">Shruthi</span>
              <span className="text-xs">🍓</span>
            </div>
          </div>

          {/* Tier 2 (Middle tier) */}
          <div className="relative z-10 w-60 sm:w-72 h-16 sm:h-18 -mt-2 rounded-2xl bg-gradient-to-r from-purple-300 via-pink-200 to-purple-300 border-2 border-pink-200 shadow-[0_10px_25px_rgba(0,0,0,0.35)] flex flex-col justify-between overflow-hidden">
            {/* Vanilla & Lavender Drips */}
            <div className="w-full flex justify-around pt-1">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-4 h-6 bg-pink-100 rounded-b-full shadow-inner -mt-1" />
              ))}
            </div>
            <div className="pb-2.5 flex justify-center items-center gap-3 text-xs text-purple-700 font-medium">
              <span>🌸</span>
              <span>✨ Princess Tier ✨</span>
              <span>🌸</span>
            </div>
          </div>

          {/* Tier 3 (Bottom tier) */}
          <div className="relative z-0 w-76 sm:w-92 h-18 sm:h-20 -mt-2 rounded-2xl bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 border-2 border-pink-200 shadow-[0_12px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between overflow-hidden">
            {/* Whipped Cream Piping */}
            <div className="w-full flex justify-around pt-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-4 h-7 bg-white rounded-b-full shadow-inner -mt-1" />
              ))}
            </div>
            <div className="pb-3 flex justify-around text-xs">
              <span>💖</span>
              <span className="font-semibold text-rose-800 text-[11px] tracking-wider uppercase">Endless Love &amp; Happiness</span>
              <span>💖</span>
            </div>
          </div>

          {/* Golden Cake Stand */}
          <div className="w-84 sm:w-100 h-5 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400 rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.5)] border border-amber-300 -mt-1 relative z-0 flex items-center justify-center">
            <div className="w-20 h-4 bg-gradient-to-b from-amber-500 to-amber-600 mx-auto rounded-b-lg -mb-4" />
          </div>
        </div>

        {/* Candle Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {litCount > 0 ? (
            <motion.button
              onClick={handleBlowAll}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_20px_rgba(236,72,153,0.5)] border border-pink-300/50 cursor-pointer flex items-center gap-2 hover:brightness-110 transition-all"
            >
              <Flame className="w-4 h-4 text-yellow-300" />
              <span>Blow Out All Candles ({litCount} Lit) 🎂</span>
            </motion.button>
          ) : (
            <motion.button
              onClick={handleRelight}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-pink-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(245,158,11,0.5)] border border-amber-200/50 cursor-pointer flex items-center gap-2 hover:brightness-110 transition-all"
            >
              <RotateCcw className="w-4 h-4 text-white" />
              <span>Light Candles Again ✨</span>
            </motion.button>
          )}

          <span className="text-xs text-pink-300/80">
            {litCount > 0 ? '👉 Click individual candles or blow all!' : '🎉 Candles blown! Make a wish!'}
          </span>
        </div>

        {/* Wish Granted Banner */}
        <AnimatePresence>
          {wishMade && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-pink-500/25 via-purple-500/25 to-pink-500/25 border border-pink-300/40 backdrop-blur-xl shadow-[0_0_35px_rgba(236,72,153,0.35)] text-center"
            >
              <p className="text-lg font-bold text-pink-200 flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
                <span>Your Birthday Wish Is Sent to the Universe! 🌟</span>
                <Heart className="w-5 h-5 fill-pink-400 text-pink-400" />
              </p>
              <p className="mt-1 text-xs sm:text-sm text-pink-100/90 font-medium">
                May all your dreams come true, may your smiles never fade, and may this year bring you boundless happiness!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Down indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-6 text-xs text-pink-300/70 flex flex-col items-center gap-1 cursor-pointer select-none"
        onClick={() => {
          document.getElementById('letter-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span>Scroll down to read your emotional letter</span>
        <span className="text-base">💌</span>
      </motion.div>
    </section>
  );
};
