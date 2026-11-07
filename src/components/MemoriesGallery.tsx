import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Plus, X, ZoomIn, Calendar, Sparkles, Heart, Trash2 } from 'lucide-react';
import { MemoryItem } from '../types';
import { musicBox } from '../utils/audioSynth';

interface MemoriesGalleryProps {
  sisterName: string;
}

// Initial aesthetic sisterhood placeholder memory cards
const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    title: 'Partners in Crime & Joy',
    caption: 'From sharing secrets to laughing until our stomachs hurt. You make life unforgettable.',
    date: 'Forever Memory',
    tag: 'Sisterhood'
  },
  {
    id: 'mem-2',
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80',
    title: 'The Sweetest Smiles',
    caption: 'Your genuine laughter can light up the gloomiest day. Never let anyone dim your sparkle.',
    date: 'Happy Days',
    tag: 'Smiles'
  },
  {
    id: 'mem-3',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    title: 'Celebrations & Milestones',
    caption: 'Watching you grow, achieve, and shine. So proud of everything you are becoming.',
    date: 'Every Year',
    tag: 'Milestone'
  },
  {
    id: 'mem-4',
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    title: 'Late Night Chats & Dreams',
    caption: 'Talking about everything and nothing until 2 AM. My favorite therapist and confidante.',
    date: 'Late Nights',
    tag: 'Secrets'
  }
];

const TIMELINE_EVENTS = [
  {
    year: 'Chapter 1',
    title: 'The Miracle Arrived',
    description: 'The world became 1000x sweeter and noisier the day you were born.',
    emoji: '👶'
  },
  {
    year: 'Chapter 2',
    title: 'Silly Fights & Stolen Clothes',
    description: 'Arguing over the TV remote and snacks, then laughing together 5 minutes later.',
    emoji: '🧸'
  },
  {
    year: 'Chapter 3',
    title: 'Unstoppable Partners',
    description: 'Navigating life, growing up, sharing dreams, and having each other’s back no matter what.',
    emoji: '🌸'
  },
  {
    year: 'Chapter 4',
    title: 'Today & Always',
    description: 'Celebrating your birthday today, and promising you a lifetime of love and support.',
    emoji: '👑'
  }
];

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({ sisterName }) => {
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('shruthi_birthday_memories');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return DEFAULT_MEMORIES;
  });

  const [activePhoto, setActivePhoto] = useState<MemoryItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  // Persist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('shruthi_birthday_memories', JSON.stringify(memories));
    } catch {
      // storage quota or disabled
    }
  }, [memories]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl) return;

    const newMem: MemoryItem = {
      id: `mem-${Date.now()}`,
      url: newImageUrl,
      title: newTitle || `Special Memory with ${sisterName}`,
      caption: newCaption || 'A moment frozen in time, filled with love and laughter.',
      date: newDate || 'Special Day',
      tag: 'Real Memory',
      isCustom: true
    };

    setMemories([newMem, ...memories]);
    musicBox.playPop();
    setIsUploadOpen(false);
    setNewImageUrl('');
    setNewTitle('');
    setNewCaption('');
    setNewDate('');
  };

  const handleDeleteMemory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemories(memories.filter((m) => m.id !== id));
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-semibold mb-3">
          <ImageIcon className="w-4 h-4 text-pink-300" />
          <span>Treasured Moments</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-serif-title bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200 bg-clip-text text-transparent">
          Our Beautiful Memories 📸
        </h2>
        <p className="mt-2 text-sm sm:text-base text-pink-300/80 max-w-xl mx-auto">
          Every photo tells a story of the laughter, warmth, and bond we share. You can also upload our real pictures here!
        </p>

        {/* Add Real Photo Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              musicBox.playPop();
              setIsUploadOpen(true);
            }}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-sm shadow-[0_0_25px_rgba(236,72,153,0.4)] border border-pink-300/50 cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Our Real Pictures 💖</span>
          </button>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {memories.map((mem, index) => (
          <motion.div
            key={mem.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => {
              musicBox.playSparkle();
              setActivePhoto(mem);
            }}
            className="group relative rounded-2xl bg-white/10 backdrop-blur-md border border-pink-400/30 overflow-hidden shadow-xl cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container with Polaroid style */}
            <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-black/40">
              <img
                src={mem.url}
                alt={mem.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />

              {/* Tag / Badge */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-pink-200 border border-pink-300/30 flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 fill-pink-400 text-pink-400" />
                <span>{mem.tag || 'Memory'}</span>
              </div>

              {/* Delete button for custom items */}
              {mem.isCustom && (
                <button
                  onClick={(e) => handleDeleteMemory(mem.id, e)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                  title="Remove this photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Hover Zoom overlay */}
              <div className="absolute inset-0 bg-pink-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-2.5 rounded-full bg-black/60 text-white shadow-lg backdrop-blur-sm">
                  <ZoomIn className="w-5 h-5 text-pink-200" />
                </span>
              </div>
            </div>

            {/* Polaroid caption area */}
            <div className="p-4 flex flex-col justify-between flex-grow bg-gradient-to-b from-white/5 to-white/10">
              <div>
                <h4 className="font-bold text-pink-100 text-base group-hover:text-pink-300 transition-colors line-clamp-1">
                  {mem.title}
                </h4>
                <p className="mt-1 text-xs text-pink-200/80 line-clamp-2 leading-relaxed">
                  {mem.caption}
                </p>
              </div>

              {mem.date && (
                <div className="mt-3 pt-2 border-t border-pink-300/15 flex items-center gap-1.5 text-[11px] text-pink-300/60">
                  <Calendar className="w-3 h-3" />
                  <span>{mem.date}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Memory Timeline: "Our Journey Together" */}
      <div className="mt-20 pt-10 border-t border-pink-400/20">
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif-title text-pink-200">
            Timeline of Our Journey 🌟
          </h3>
          <p className="text-xs sm:text-sm text-pink-300/70 mt-1">
            Through every age and chapter, our sibling bond only grows deeper.
          </p>
        </div>

        <div className="relative border-l-2 border-pink-400/30 ml-4 sm:ml-32 md:ml-44 space-y-8 pb-4">
          {TIMELINE_EVENTS.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              className="relative pl-6 sm:pl-8"
            >
              {/* Dot on the timeline */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 border-2 border-white flex items-center justify-center text-sm shadow-[0_0_15px_rgba(236,72,153,0.6)]">
                {event.emoji}
              </div>

              {/* Event card */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-pink-400/25 max-w-xl shadow-lg">
                <span className="text-[11px] uppercase tracking-wider text-pink-400 font-bold">
                  {event.year}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {event.title}
                </h4>
                <p className="text-xs sm:text-sm text-pink-200/80 mt-1 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#1b082e] border border-pink-400/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(236,72,153,0.5)] cursor-default"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-video sm:aspect-[16/10] bg-black">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-gradient-to-t from-[#140624] to-[#1b082e]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-serif-title text-pink-100">
                    {activePhoto.title}
                  </h3>
                  {activePhoto.date && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300">
                      {activePhoto.date}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base text-pink-200/90 leading-relaxed">
                  {activePhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Custom Photo Modal */}
      <AnimatePresence>
        {isUploadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsUploadOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#1e0a33] border border-pink-400/40 rounded-3xl p-6 shadow-2xl cursor-default text-white"
            >
              <div className="flex items-center justify-between pb-3 border-b border-pink-300/20 mb-4">
                <h3 className="text-lg font-bold font-serif-title text-pink-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <span>Add Real Picture with {sisterName}</span>
                </h3>
                <button
                  onClick={() => setIsUploadOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-pink-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMemory} className="space-y-4">
                {/* Image upload preview */}
                <div>
                  <label className="block text-xs font-semibold text-pink-200 mb-1.5">
                    Select Image (from phone/computer) *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileUpload}
                    className="w-full text-xs text-pink-200 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-500 cursor-pointer"
                  />
                  {newImageUrl && (
                    <div className="mt-3 relative aspect-video rounded-xl overflow-hidden border border-pink-400/30">
                      <img src={newImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pink-200 mb-1">
                    Memory Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Diwalii night, Sister trip, Silly selfie"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-pink-300/30 text-white text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pink-200 mb-1">
                    Sweet Caption
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Write a sweet memory or inside joke..."
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-pink-300/30 text-white text-xs focus:outline-none focus:border-pink-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-pink-200 mb-1">
                    Date / Year (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Summer 2023, Birthday 2024"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 border border-pink-300/30 text-white text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!newImageUrl}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-lg hover:brightness-110 disabled:opacity-50 cursor-pointer"
                  >
                    Save to Memories 💖
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
