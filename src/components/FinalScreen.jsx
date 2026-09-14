import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCcw, Compass } from 'lucide-react';
import { resetScroll } from '../utils/scroll';

export default function FinalScreen({ onRestart, onOpenHiddenStory, onOpenTimeline }) {
  const handleRestartClick = () => {
    resetScroll();
    onRestart();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-6 py-16 z-20 text-center select-text"
    >
      {/* Background Soft Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c5a059]/15 rounded-full blur-[180px]" />
      </div>

      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="text-xs uppercase tracking-[0.35em] text-stone-500 font-sans-ui"
      >
        Poem XX &bull; Completion
      </motion.div>

      {/* Main Closing Text */}
      <div className="my-auto max-w-3xl flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 2.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl font-serif-primary italic font-light text-[#f4f1ea] leading-relaxed mb-8 px-4"
        >
          “And perhaps, that was the story all along.”
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.4 }}
          transition={{ duration: 1.8, delay: 1.8 }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent my-8"
        />

        <motion.h3
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 2, delay: 2.2 }}
          className="text-xl sm:text-2xl font-serif-title text-[#c5a059] tracking-wide mb-12"
        >
          Echoes of What We Never Said
        </motion.h3>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 2.8 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            type="button"
            onClick={onOpenHiddenStory}
            className="group px-8 py-4 rounded-full bg-[#c5a059] text-[#0a0a0c] font-sans-ui font-medium text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_35px_rgba(197,160,89,0.5)] hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] cursor-pointer flex items-center gap-3"
          >
            <Sparkles className="w-4 h-4 text-[#0a0a0c]" />
            <span>Read The Hidden Story</span>
          </button>

          <button
            type="button"
            onClick={onOpenTimeline}
            className="px-6 py-4 rounded-full glass-card text-stone-300 hover:text-white font-sans-ui text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2.5 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#c5a059]" />
            <span>The Journey Map</span>
          </button>

          <button
            type="button"
            onClick={handleRestartClick}
            className="px-6 py-4 rounded-full glass-panel text-stone-400 hover:text-white font-sans-ui text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 border-white/10 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart Journey</span>
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, delay: 3.2 }}
        className="text-[11px] font-sans-ui uppercase tracking-widest text-stone-500"
      >
        Thank you for walking between the lines
      </motion.div>
    </motion.div>
  );
}
