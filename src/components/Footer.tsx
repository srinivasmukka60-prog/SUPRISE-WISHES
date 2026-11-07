import React, { useState } from 'react';
import { Heart, RotateCcw, Edit2, Check } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';

interface FooterProps {
  sisterName: string;
  onUpdateName: (newName: string) => void;
  onRestartExperience: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  sisterName,
  onUpdateName,
  onRestartExperience
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(sisterName);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
      setIsEditing(false);
      musicBox.playPop();
    }
  };

  return (
    <footer className="relative z-10 py-12 px-4 border-t border-pink-400/20 text-center text-xs text-pink-300/70">
      <div className="max-w-md mx-auto space-y-4">
        {/* Heart message */}
        <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-pink-200">
          <span>Crafted with endless love for</span>
          {isEditing ? (
            <form onSubmit={handleSaveName} className="inline-flex items-center gap-1">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="px-2 py-0.5 rounded bg-white/20 border border-pink-400 text-white font-bold text-xs w-28 focus:outline-none"
                autoFocus
              />
              <button type="submit" className="p-1 rounded bg-pink-500 text-white">
                <Check className="w-3 h-3" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1 font-bold text-pink-300 hover:text-white underline decoration-pink-400/60 decoration-dashed cursor-pointer"
              title="Click to customize name"
            >
              <span>{sisterName}</span>
              <Edit2 className="w-3 h-3 text-pink-400" />
            </button>
          )}
          <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
        </p>

        <p className="text-pink-300/60">
          May your special day be wrapped in laughter, sprinkled with dreams, and crowned with unforgettable memories.
        </p>

        {/* Re-play opening sequence button */}
        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => {
              musicBox.playPop();
              onRestartExperience();
            }}
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-pink-200 border border-pink-400/25 flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-pink-400" />
            <span>Play Love Quiz Again 🥺</span>
          </button>
        </div>

        <p className="text-[11px] text-pink-400/40 pt-2">
          Happy Birthday, Shruthi! Best Sister in the Universe ❤️
        </p>
      </div>
    </footer>
  );
};
