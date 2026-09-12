import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass, Sparkles } from 'lucide-react';
import { EMOTIONAL_STAGES } from '../data/poems';

export default function PoemViewer({
  poem,
  currentIndex,
  totalPoems,
  onPrev,
  onNext,
  onOpenTimeline,
  mousePos
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Mouse tilt perspective effect
  const tiltX = (mousePos.y - window.innerHeight / 2) * 0.012;
  const tiltY = (mousePos.x - window.innerWidth / 2) * -0.012;

  const currentStage = EMOTIONAL_STAGES.find((s) => s.id === poem.stage);

  // Guarantee instant scroll-to-top on poem change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setImageLoaded(false);
  }, [poem.id]);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 sm:px-8 py-20 z-20 overflow-hidden select-text">
      {/* Background Image with Dark Vignette Overlay & Parallax */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          key={poem.image}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 filter brightness-75 contrast-110"
          style={{
            backgroundImage: `url(${poem.image})`,
            transform: `translate3d(${tiltY * 1.5}px, ${tiltX * 1.5}px, 0px) scale(1.05)`,
          }}
        />

        {/* Heavy Vignette & Dark Overlay for maximum text contrast */}
        <div className="absolute inset-0 bg-vignette" />
        <div className="absolute inset-0 bg-[#0a0a0c]/70 backdrop-blur-[2px]" />
      </div>

      {/* Main Poem Display Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={poem.id}
          initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transformStyle: 'preserve-3d',
          }}
          className="relative z-20 my-auto w-full max-w-3xl flex flex-col items-center text-center py-8"
        >
          {/* Header Metadata: Chapter & Stage */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex items-center gap-3 mb-6 font-sans-ui"
          >
            <span className="text-xs uppercase tracking-[0.35em] text-[#c5a059] font-medium">
              Chapter {poem.id}
            </span>
            <span className="text-stone-600">&bull;</span>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-light">
              {currentStage?.name}
            </span>
          </motion.div>

          {/* Poetic & Elegant Poem Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif-title font-normal text-[#f4f1ea] tracking-tight leading-tight mb-8"
          >
            {poem.title}
          </motion.h2>

          {/* Whisper Hint Badge */}
          {poem.whisper && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-12 max-w-lg"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059] flex-shrink-0" />
              <span className="text-xs font-serif-primary italic text-stone-300 tracking-wide line-clamp-1">
                “{poem.whisper}”
              </span>
            </motion.div>
          )}

          {/* Stanzas & Lines */}
          <div className="w-full flex flex-col items-center gap-8 font-serif-primary text-xl sm:text-2xl md:text-3xl font-light text-[#e8e4dc] leading-relaxed tracking-wide">
            {poem.stanzas.map((stanza, stanzaIdx) => (
              <motion.div
                key={stanzaIdx}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.4,
                  delay: 0.6 + stanzaIdx * 0.25,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center gap-2 max-w-2xl"
              >
                {stanza.map((line, lineIdx) => (
                  <p key={lineIdx} className="hover:text-white transition-colors duration-300">
                    {line}
                  </p>
                ))}
              </motion.div>
            ))}

            {/* Author Signature */}
            {poem.author && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ duration: 1.4, delay: 0.8 + poem.stanzas.length * 0.25 }}
                className="mt-8 text-right font-serif-primary italic text-lg sm:text-xl text-[#c5a059] tracking-wider"
              >
                {poem.author}
              </motion.div>
            )}
          </div>

          {/* Subtle Stage Color Glow Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, delay: 1 }}
            className="w-20 h-[1px] my-12"
            style={{
              background: `linear-gradient(90deg, transparent, ${currentStage?.color || '#c5a059'}, transparent)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom Floating Navigation Controls */}
      <div className="relative z-30 w-full max-w-4xl flex items-center justify-between pointer-events-auto pt-4">
        {/* Previous Poem Button */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            onPrev();
          }}
          disabled={currentIndex === 0}
          className={`group flex items-center gap-3 px-5 py-3 rounded-full glass-panel transition-all duration-300 font-sans-ui text-xs uppercase tracking-widest ${
            currentIndex === 0
              ? 'opacity-30 cursor-not-allowed text-stone-600'
              : 'text-stone-300 hover:text-white hover:border-white/20 hover:scale-[1.03]'
          }`}
        >
          <ChevronLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Center Timeline Quick Link */}
        <button
          onClick={onOpenTimeline}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full glass-card text-stone-400 hover:text-stone-200 transition-all duration-300 text-xs font-sans-ui tracking-widest uppercase hover:border-white/20"
        >
          <Compass className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Stage {currentStage?.name}</span>
        </button>

        {/* Next Poem Button */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            onNext();
          }}
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#f4f1ea] text-[#0a0a0c] font-sans-ui font-medium text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(244,241,234,0.3)] hover:scale-[1.03] active:scale-[0.98]"
        >
          <span>{currentIndex === totalPoems - 1 ? 'Final Page' : 'Next Poem'}</span>
          <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
