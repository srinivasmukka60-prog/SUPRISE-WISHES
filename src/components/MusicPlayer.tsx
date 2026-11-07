import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Upload, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';
import { musicBox } from '../utils/audioSynth';

interface MusicPlayerProps {
  autoPlayStarted?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayStarted = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [audioSource, setAudioSource] = useState<'synth' | 'custom'>('synth');
  const [customFileName, setCustomFileName] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Check if /assets/music/birthday.mp3 exists on mount
  useEffect(() => {
    const testAudio = new Audio('/assets/music/birthday.mp3');
    testAudio.addEventListener('canplaythrough', () => {
      // Custom audio file found in assets!
      setAudioSource('custom');
      setCustomFileName('birthday.mp3');
    });
    testAudio.addEventListener('error', () => {
      // Graceful fallback: stick with synthesized pure Web Audio music box
      setAudioSource('synth');
    });
  }, []);

  // Update volume
  useEffect(() => {
    const effectiveVol = isMuted ? 0 : volume;
    musicBox.setVolume(effectiveVol);
    if (audioRef.current) {
      audioRef.current.volume = effectiveVol;
    }
  }, [volume, isMuted]);

  // Synchronize playback if started externally
  useEffect(() => {
    if (autoPlayStarted) {
      startPlayback();
    }
  }, [autoPlayStarted]);

  const startPlayback = () => {
    setIsPlaying(true);
    if (audioSource === 'custom' && audioRef.current) {
      audioRef.current.play().catch(() => {
        // If autoplay blocked or file fail, fallback to synth
        musicBox.start();
      });
    } else {
      musicBox.start();
    }
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    musicBox.stop();
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
      setAudioSource('custom');
      setCustomFileName(file.name);
      setIsPlaying(true);
      musicBox.stop();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-40 max-w-xs transition-all">
      <audio ref={audioRef} loop src="/assets/music/birthday.mp3" />

      {/* Main Pill */}
      <div className="flex items-center gap-2 p-2 px-3 rounded-full bg-white/10 backdrop-blur-xl border border-pink-400/30 shadow-[0_0_20px_rgba(236,72,153,0.3)] text-white text-xs select-none">
        {/* Animated Music Indicator */}
        <button
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-transform shadow-md"
          title={isPlaying ? 'Pause Music' : 'Play Music'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-white text-white" />
          ) : (
            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
          )}
        </button>

        {/* Status text */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 cursor-pointer pr-1 flex items-center gap-1.5"
        >
          <div className="flex flex-col">
            <span className="font-semibold text-pink-200 truncate max-w-[110px]">
              {customFileName ? customFileName : 'Romantic Music Box'}
            </span>
            <span className="text-[10px] text-pink-300/80">
              {isPlaying ? 'Now Playing 🎵' : 'Paused 🎶'}
            </span>
          </div>
        </div>

        {/* Volume/Mute button */}
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-white/10 text-pink-200 transition-colors cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-red-300" />
          ) : (
            <Volume2 className="w-4 h-4 text-pink-300" />
          )}
        </button>

        {/* Expand toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full hover:bg-white/10 text-pink-300/80 cursor-pointer"
        >
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expanded Controls Drawer */}
      {isExpanded && (
        <div className="mt-2 p-3.5 rounded-2xl bg-[#1b082e]/90 backdrop-blur-2xl border border-pink-400/30 shadow-xl text-xs space-y-3 animate-in fade-in slide-in-from-top-2">
          {/* Volume slider */}
          <div>
            <div className="flex justify-between text-[11px] text-pink-200 mb-1">
              <span>Volume</span>
              <span>{isMuted ? '0%' : `${Math.round(volume * 100)}%`}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          {/* Sound Source Switcher */}
          <div className="pt-2 border-t border-pink-300/20 flex flex-col gap-2">
            <span className="text-[11px] text-pink-300 font-medium">Music Source:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setAudioSource('synth');
                  setCustomFileName(null);
                  if (audioRef.current) audioRef.current.pause();
                  if (isPlaying) musicBox.start();
                }}
                className={`flex-1 py-1 px-2 rounded-lg text-center transition-all cursor-pointer ${
                  audioSource === 'synth'
                    ? 'bg-pink-600 text-white font-medium shadow'
                    : 'bg-white/5 hover:bg-white/10 text-pink-200'
                }`}
              >
                Music Box ✨
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`flex-1 py-1 px-2 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
                  audioSource === 'custom'
                    ? 'bg-pink-600 text-white font-medium shadow'
                    : 'bg-white/5 hover:bg-white/10 text-pink-200'
                }`}
              >
                <Upload className="w-3 h-3" />
                <span>Upload MP3</span>
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          <div className="text-[10px] text-pink-300/60 leading-tight">
            💡 Or drop <code className="text-pink-300 bg-white/10 px-1 rounded">birthday.mp3</code> into <code className="text-pink-300">/public/assets/music/</code>
          </div>
        </div>
      )}
    </div>
  );
};
