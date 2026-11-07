import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, AlertTriangle, Heart, RefreshCw } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';
import { fireCandleBlownConfetti } from '../utils/confetti';

interface CutenessMeterProps {
  sisterName: string;
}

export const CutenessMeter: React.FC<CutenessMeterProps> = ({ sisterName }) => {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState('Calculating cuteness...');
  const [isFinished, setIsFinished] = useState(false);

  const startCalculation = () => {
    setPercent(0);
    setIsFinished(false);
    setStatus('Calculating cuteness...');

    let current = 0;
    const interval = setInterval(() => {
      // Speed up or step up randomly
      const increment = Math.floor(Math.random() * 4) + 2;
      current += increment;

      if (current >= 120) {
        current = 120;
        setPercent(120);
        setIsFinished(true);
        setStatus('⚠️ WARNING: TOO CUTE TO HANDLE');
        clearInterval(interval);
        musicBox.playFanfare();
        fireCandleBlownConfetti();
      } else {
        setPercent(current);
        if (current < 40) {
          setStatus('Detecting sisterly charm...');
        } else if (current < 80) {
          setStatus('Measuring cuteness...');
        } else if (current < 100) {
          setStatus('Almost exceeding normal human levels...');
        } else {
          setStatus('LIMIT EXCEEDED! 🚨');
        }
      }
    }, 60);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startCalculation();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-8 sm:py-12 px-4 max-w-xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
      {/* Background Soft Glow */}
      <div className="absolute w-80 h-80 rounded-full bg-pink-500/15 blur-3xl pointer-events-none" />

      {/* Outer Card Styled to match screenshot */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg p-8 sm:p-10 rounded-[32px] bg-[#1a0a24]/80 backdrop-blur-xl border border-pink-500/30 shadow-[0_0_50px_rgba(236,72,153,0.25)] text-center flex flex-col items-center justify-center select-none"
      >
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-medium text-pink-100 tracking-wide mb-3">
          Measuring {sisterName}&apos;s cuteness...
        </h3>

        {/* Big percentage display */}
        <div className="my-3">
          <motion.span
            key={percent}
            className="text-5xl sm:text-6xl font-black tracking-tight text-[#ff5da2] drop-shadow-[0_0_20px_rgba(255,93,162,0.6)] font-body"
          >
            {percent}%
          </motion.span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#3d123b]/80 h-5 sm:h-6 rounded-full p-1 my-5 overflow-hidden border border-pink-400/30 shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#ff3388] via-[#ff5da2] to-[#ff2a9d] shadow-[0_0_15px_rgba(255,51,136,0.9)]"
            style={{ width: `${Math.min(100, (percent / 120) * 100)}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Status Message / Warning */}
        <div className="min-h-[32px] flex items-center justify-center">
          {isFinished ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.05, 1], opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="inline-flex items-center gap-2 text-amber-300 font-extrabold text-sm sm:text-base tracking-wider"
            >
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-[#ff94c2]">⚠️ WARNING: TOO CUTE TO HANDLE</span>
            </motion.div>
          ) : (
            <span className="text-pink-300/80 text-sm font-medium animate-pulse">
              {status}
            </span>
          )}
        </div>

        {/* Small recalculate button */}
        {isFinished && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => {
              musicBox.playPop();
              startCalculation();
            }}
            className="mt-6 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-pink-200 text-xs font-semibold cursor-pointer transition-all hover:scale-105 active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recalculate Cuteness</span>
          </motion.button>
        )}
      </motion.div>
    </section>
  );
};

