import React from 'react';
import { Compass, BookOpen, Sparkles } from 'lucide-react';
import AmbientAudio from './AmbientAudio';

export default function HeaderNav({
  currentIndex,
  totalPoems,
  currentStage,
  onGoHome,
  onOpenTimeline,
  onOpenHiddenStory,
  hasUnlockedStory
}) {
  const progressPercent = ((currentIndex + 1) / totalPoems) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 pointer-events-none">
      {/* Top thin progress line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#c5a059] to-[#f4f1ea] transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left: Brand / Home Link */}
        <button
          onClick={onGoHome}
          className="group flex items-center gap-3 glass-panel px-4 py-2 rounded-full text-stone-300 hover:text-white transition-all duration-300 hover:border-white/20"
        >
          <BookOpen className="w-4 h-4 text-[#c5a059] transition-transform duration-300 group-hover:scale-110" />
          <span className="font-serif-title font-normal text-sm sm:text-base tracking-wide">
            Echoes
          </span>
        </button>

        {/* Center: Stage & Counter Indicator */}
        <div className="hidden md:flex items-center gap-3 glass-panel px-5 py-2 rounded-full">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: currentStage?.color || '#c5a059' }}
          />
          <span className="text-xs uppercase tracking-widest text-stone-300 font-sans-ui">
            {currentStage?.name}
          </span>
          <span className="text-stone-600">&bull;</span>
          <span className="text-xs tracking-widest font-serif-primary italic text-[#c5a059]">
            {currentIndex + 1} of {totalPoems}
          </span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Sound */}
          <AmbientAudio />

          {/* Hidden Story Button (glows if unlocked or reached end) */}
          <button
            onClick={onOpenHiddenStory}
            title="The Hidden Story"
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-full transition-all duration-500 text-xs uppercase tracking-widest font-sans-ui ${
              hasUnlockedStory
                ? 'bg-[#c5a059]/20 text-[#d4af37] border border-[#c5a059]/50 box-gold-glow'
                : 'glass-panel text-stone-400 hover:text-stone-200 border-white/10'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${hasUnlockedStory ? 'text-[#d4af37] animate-spin' : ''}`} />
            <span className="hidden sm:inline">The Hidden Story</span>
          </button>

          {/* Journey Map Button */}
          <button
            onClick={onOpenTimeline}
            className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-full glass-panel text-stone-300 hover:text-white transition-all duration-300 border-white/10 hover:border-white/20 text-xs uppercase tracking-widest font-sans-ui"
          >
            <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
            <span className="hidden sm:inline">The Journey</span>
          </button>
        </div>
      </div>
    </header>
  );
}
