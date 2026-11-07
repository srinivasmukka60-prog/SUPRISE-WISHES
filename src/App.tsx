import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Cake,
  Mail,
  ListOrdered,
  Image as ImageIcon,
  KeyRound,
  Compass
} from 'lucide-react';

import { OpeningScreen } from './components/OpeningScreen';
import { SurpriseIntro } from './components/SurpriseIntro';
import { CelebrationHero } from './components/CelebrationHero';
import { EmotionalLetter } from './components/EmotionalLetter';
import { CutenessMeter } from './components/CutenessMeter';
import { MemoriesGallery } from './components/MemoriesGallery';
import { SisterReasons } from './components/SisterReasons';
import { SecretSurpriseModal } from './components/SecretSurpriseModal';
import { MusicPlayer } from './components/MusicPlayer';
import { FloatingParticles } from './components/FloatingParticles';
import { Footer } from './components/Footer';
import { musicBox } from './utils/audioSynth';

interface PageDefinition {
  id: string;
  title: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CELEBRATION_PAGES: PageDefinition[] = [
  { id: 'cake', title: 'Interactive Cake & Wishes', shortLabel: 'Cake & Wish', icon: Cake },
  { id: 'letter', title: 'Heartfelt Letter', shortLabel: 'My Letter', icon: Mail },
  { id: 'cuteness', title: 'Measuring Cuteness', shortLabel: 'Cuteness', icon: Sparkles },
  { id: 'reasons', title: 'Why You Are Irreplaceable', shortLabel: '6 Reasons', icon: ListOrdered },
  { id: 'gallery', title: 'Memory Lane & Moments', shortLabel: 'Memories', icon: ImageIcon },
  { id: 'surprise', title: 'Secret Treasure', shortLabel: 'Surprise', icon: KeyRound },
  { id: 'tribute', title: 'Special Dedication & Notes', shortLabel: 'Love Note', icon: Heart }
];

export default function App() {
  // Main stage flow: 'love_quiz' -> 'surprise_intro' -> 'celebration'
  const [stage, setStage] = useState<'love_quiz' | 'surprise_intro' | 'celebration'>('love_quiz');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [sisterName, setSisterName] = useState<string>(() => {
    try {
      return localStorage.getItem('shruthi_sister_name') || 'Shruthi';
    } catch {
      return 'Shruthi';
    }
  });
  const [musicStarted, setMusicStarted] = useState(false);

  // Swipe navigation state
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const totalPages = CELEBRATION_PAGES.length;

  const handleUpdateName = (name: string) => {
    setSisterName(name);
    try {
      localStorage.setItem('shruthi_sister_name', name);
    } catch {
      // Ignore
    }
  };

  const handleLoveQuizComplete = () => {
    setMusicStarted(true);
    setStage('surprise_intro');
  };

  const handleOpenSurprise = () => {
    setStage('celebration');
    setCurrentPage(0);
  };

  const handleRestartExperience = () => {
    setStage('love_quiz');
    setCurrentPage(0);
  };

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev < totalPages - 1) {
        musicBox.playPop();
        setDirection(1);
        return prev + 1;
      }
      return prev;
    });
  }, [totalPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev > 0) {
        musicBox.playPop();
        setDirection(-1);
        return prev - 1;
      }
      return prev;
    });
  }, []);

  const goToPage = useCallback((index: number) => {
    if (index >= 0 && index < totalPages && index !== currentPage) {
      musicBox.playPop();
      setDirection(index > currentPage ? 1 : -1);
      setCurrentPage(index);
    }
  }, [currentPage, totalPages]);

  // Keyboard navigation: Left/Right Arrow keys
  useEffect(() => {
    if (stage !== 'celebration') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not intercept arrow keys if user is typing into an input/textarea
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.getAttribute('contenteditable') === 'true')
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, goToNextPage, goToPrevPage]);

  // Touch swipe support (Mobile friendly)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (stage !== 'celebration') return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (stage !== 'celebration' || touchStartXRef.current === null || touchStartYRef.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchStartXRef.current - touchEndX;
    const diffY = touchStartYRef.current - touchEndY;

    // Trigger page turn if horizontal swipe is prominent and larger than 45px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        // Swiped left -> Next page
        goToNextPage();
      } else {
        // Swiped right -> Previous page
        goToPrevPage();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Prevent accidental outer wheel scroll from disrupting page presentation
  const handleWheel = (e: React.WheelEvent) => {
    // Normal mouse-wheel cannot inadvertently bounce or scroll out of the fixed viewport
  };

  // Framer Motion slide variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <div
      className="fixed inset-0 w-full h-dvh min-h-0 bg-[#100720] text-white selection:bg-pink-500 selection:text-white font-body overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Background Floating Magical Particles */}
      <FloatingParticles />

      {/* Persistent floating music controller (available once user interacts) */}
      {stage !== 'love_quiz' && (
        <MusicPlayer autoPlayStarted={musicStarted} />
      )}

      {/* Stage Flow */}
      <AnimatePresence mode="wait">
        {/* 1. Playful Opening Screen: "DO YOU LOVE ME? ❤️" */}
        {stage === 'love_quiz' && (
          <motion.div
            key="stage-quiz"
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <OpeningScreen
              sisterName={sisterName}
              onComplete={handleLoveQuizComplete}
            />
          </motion.div>
        )}

        {/* 2. Cinematic Entrance: "HEY SHRUTHI! OPEN YOUR SURPRISE 🎁" */}
        {stage === 'surprise_intro' && (
          <motion.div
            key="stage-intro"
            className="w-full h-full"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <SurpriseIntro
              sisterName={sisterName}
              onOpen={handleOpenSurprise}
            />
          </motion.div>
        )}

        {/* 3. The Grand Multi-Page Presentation Experience */}
        {stage === 'celebration' && (
          <div key="stage-celebration" className="relative w-full h-full min-h-0 flex flex-col justify-between overflow-hidden">
            
            {/* Top Presentation Bar: Progress Indicator & Navigation Chips */}
            <header className="relative z-30 flex items-center justify-between gap-2 px-2.5 sm:px-6 py-2 sm:py-3.5 bg-white/5 backdrop-blur-xl border-b border-pink-400/20 text-xs sm:text-sm">
              {/* Left: Birthday Girl Badge & Current Page Title */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 font-semibold text-[11px] sm:text-xs shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="truncate max-w-[100px] sm:max-w-none">{sisterName}'s Day</span>
                </span>
                <span className="hidden md:inline-block text-pink-200/50">|</span>
                <span className="hidden md:inline-block font-serif-title font-medium text-pink-100 truncate text-xs sm:text-sm">
                  {CELEBRATION_PAGES[currentPage].title}
                </span>
              </div>

              {/* Center: Interactive Page Dots / Chips for Desktop & Tablet */}
              <div className="hidden sm:flex items-center gap-1.5 bg-black/25 px-2.5 py-1 rounded-full border border-pink-400/20 shadow-inner">
                {CELEBRATION_PAGES.map((page, idx) => {
                  const PageIcon = page.icon;
                  const isActive = currentPage === idx;
                  return (
                    <button
                      key={page.id}
                      onClick={() => goToPage(idx)}
                      title={page.title}
                      className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.7)] scale-105'
                          : 'text-pink-300/60 hover:text-pink-200 hover:bg-white/10'
                      }`}
                    >
                      <PageIcon className={`w-3 h-3 ${isActive ? 'text-white' : 'text-pink-400/70'}`} />
                      <span className="hidden lg:inline">{page.shortLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right: Modern Page Progress Indicator (e.g. "1 / 6") */}
              <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 text-pink-200 font-bold text-[10px] sm:text-xs shadow-sm">
                  <span className="text-pink-300">Page</span>
                  <span className="text-white text-sm font-extrabold">{currentPage + 1}</span>
                  <span className="text-pink-300/60 font-normal">/</span>
                  <span className="text-pink-300/80">{totalPages}</span>
                </div>
              </div>
            </header>

            {/* Central Viewport Screen (100vw x 100vh minus header and footer bars) */}
            <div className="relative flex-1 min-h-0 w-full overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 w-full h-full flex flex-col overflow-y-auto overflow-x-hidden overscroll-contain p-2 sm:p-4 md:p-6"
                >
                  <div className="m-auto w-full max-w-6xl">
                    {currentPage === 0 && <CelebrationHero sisterName={sisterName} />}
                    {currentPage === 1 && <EmotionalLetter sisterName={sisterName} />}
                    {currentPage === 2 && <CutenessMeter sisterName={sisterName} />}
                    {currentPage === 3 && <SisterReasons sisterName={sisterName} />}
                    {currentPage === 4 && <MemoriesGallery sisterName={sisterName} />}
                    {currentPage === 5 && <SecretSurpriseModal sisterName={sisterName} />}
                    {currentPage === 6 && (
                      <Footer
                        sisterName={sisterName}
                        onUpdateName={handleUpdateName}
                        onRestartExperience={handleRestartExperience}
                      />
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Floating Side Arrow Buttons for Desktop & Tablet */}
              {currentPage > 0 && (
                <button
                  onClick={goToPrevPage}
                  aria-label="Previous Page"
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full items-center justify-center bg-black/40 hover:bg-pink-600/80 text-white/90 border border-pink-400/40 shadow-[0_0_20px_rgba(236,72,153,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
                >
                  <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
                </button>
              )}

              {currentPage < totalPages - 1 && (
                <button
                  onClick={goToNextPage}
                  aria-label="Next Page"
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full items-center justify-center bg-black/40 hover:bg-pink-600/80 text-white/90 border border-pink-400/40 shadow-[0_0_20px_rgba(236,72,153,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
                >
                  <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
                </button>
              )}
            </div>

            {/* Bottom Controls Bar: BACK / NEXT Buttons + Swipe/Keyboard Hints */}
            <footer className="relative z-30 flex items-center justify-between gap-2 px-2.5 sm:px-6 py-2 sm:py-3 bg-white/5 backdrop-blur-xl border-t border-pink-400/20 text-xs">
              {/* Back Button */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className={`flex items-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-xl font-bold tracking-wide transition-all duration-300 shadow-sm cursor-pointer ${
                  currentPage === 0
                    ? 'opacity-30 cursor-not-allowed bg-white/5 text-gray-400 border border-transparent'
                    : 'bg-white/10 hover:bg-white/20 active:scale-95 text-pink-200 border border-pink-400/30 hover:border-pink-300 hover:shadow-[0_0_15px_rgba(244,114,182,0.3)]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>BACK</span>
              </button>

              {/* Navigation Tips / Mobile Swipe Indicator */}
              <div className="flex items-center gap-2 text-pink-300/70 text-[11px] sm:text-xs">
                <span className="hidden sm:inline-flex items-center gap-1">
                  Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-pink-400/30 text-[10px] font-mono">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-pink-400/30 text-[10px] font-mono">→</kbd> keys
                </span>
                <span className="sm:hidden flex items-center gap-1 text-[11px] text-pink-300/80">
                  <span>Swipe to turn</span>
                  <span className="text-pink-400">↔</span>
                </span>
              </div>

              {/* Next Button / Final Page Finish */}
              {currentPage < totalPages - 1 ? (
                <button
                  onClick={goToNextPage}
                  className="flex items-center gap-1.5 px-4 sm:px-6 py-2 rounded-xl font-bold tracking-wide bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.5)] active:scale-95 transition-all duration-300 cursor-pointer border border-pink-300/40"
                >
                  <span>NEXT</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleRestartExperience}
                  className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl font-bold tracking-wide bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-white shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-95 transition-all duration-300 cursor-pointer border border-amber-300/40"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>REPLAY ❤️</span>
                </button>
              )}
            </footer>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
