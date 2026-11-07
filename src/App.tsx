import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { OpeningScreen } from './components/OpeningScreen';
import { SurpriseIntro } from './components/SurpriseIntro';
import { CelebrationHero } from './components/CelebrationHero';
import { EmotionalLetter } from './components/EmotionalLetter';
import { MemoriesGallery } from './components/MemoriesGallery';
import { SisterReasons } from './components/SisterReasons';
import { SecretSurpriseModal } from './components/SecretSurpriseModal';
import { MusicPlayer } from './components/MusicPlayer';
import { FloatingParticles } from './components/FloatingParticles';
import { Footer } from './components/Footer';

export default function App() {
  // Stages: 'love_quiz' -> 'surprise_intro' -> 'celebration'
  const [stage, setStage] = useState<'love_quiz' | 'surprise_intro' | 'celebration'>('love_quiz');
  const [sisterName, setSisterName] = useState<string>(() => {
    try {
      return localStorage.getItem('shruthi_sister_name') || 'Shruthi';
    } catch {
      return 'Shruthi';
    }
  });
  const [musicStarted, setMusicStarted] = useState(false);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartExperience = () => {
    setStage('love_quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#100720] text-white selection:bg-pink-500 selection:text-white font-body overflow-x-hidden">
      {/* Background Floating Magical Particles */}
      <FloatingParticles />

      {/* Persistent floating music controller (available once user interacts) */}
      {stage !== 'love_quiz' && (
        <MusicPlayer autoPlayStarted={musicStarted} />
      )}

      {/* Screen Sequence */}
      <AnimatePresence mode="wait">
        {/* 1. Playful Opening Screen: "DO YOU LOVE ME? ❤️" */}
        {stage === 'love_quiz' && (
          <motion.div
            key="stage-quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
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
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
          >
            <SurpriseIntro
              sisterName={sisterName}
              onOpen={handleOpenSurprise}
            />
          </motion.div>
        )}

        {/* 3. The Grand Birthday Celebration Experience */}
        {stage === 'celebration' && (
          <motion.main
            key="stage-celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 space-y-12"
          >
            {/* Grand Hero & Interactive 3D Cake with Candles */}
            <CelebrationHero sisterName={sisterName} />

            {/* Emotional Handwritten Letter */}
            <EmotionalLetter sisterName={sisterName} />

            {/* Reasons Why You're Irreplaceable */}
            <SisterReasons sisterName={sisterName} />

            {/* Photo Memories Gallery & Timeline with Real Photo Uploader */}
            <MemoriesGallery sisterName={sisterName} />

            {/* Secret Surprise Section */}
            <SecretSurpriseModal sisterName={sisterName} />

            {/* Footer & Personalization */}
            <Footer
              sisterName={sisterName}
              onUpdateName={handleUpdateName}
              onRestartExperience={handleRestartExperience}
            />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
