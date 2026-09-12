import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, Heart, BookOpen, ArrowRight } from 'lucide-react';
import { HIDDEN_STORY_NARRATIVE, EMOTIONAL_STAGES } from '../data/poems';

export default function HiddenStory({ onClose, onRestart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 bg-[#0a0a0c]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
    >
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#c5a059]/10 rounded-full blur-[160px]" />
      </div>

      {/* Close button */}
      <div className="relative z-10 max-w-4xl w-full mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c5a059] font-sans-ui">
          <Sparkles className="w-4 h-4 text-[#d4af37] animate-spin" />
          <span>The Overarching Narrative</span>
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-full glass-panel text-stone-400 hover:text-white transition-all duration-300 hover:rotate-90 border-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Narrative Container */}
      <div className="relative z-10 max-w-3xl w-full mx-auto my-auto py-8 text-center flex flex-col items-center">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="text-4xl sm:text-6xl font-serif-title text-[#f4f1ea] font-normal leading-tight mb-4"
        >
          {HIDDEN_STORY_NARRATIVE.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="text-lg font-serif-primary italic text-[#c5a059] mb-12"
        >
          “{HIDDEN_STORY_NARRATIVE.subtitle}”
        </motion.p>

        {/* Golden Emotional Arc Thread Nodes */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, delay: 0.5 }}
          className="w-full flex items-center justify-between my-8 px-4 py-3 glass-panel rounded-full overflow-x-auto scrollbar-none"
        >
          {EMOTIONAL_STAGES.map((stage, idx) => (
            <div key={stage.id} className="flex items-center gap-2 text-[10px] font-sans-ui uppercase tracking-widest text-stone-400 min-w-max px-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.color }} />
              <span>{stage.name}</span>
              {idx < EMOTIONAL_STAGES.length - 1 && (
                <span className="text-stone-600 ml-1">→</span>
              )}
            </div>
          ))}
        </motion.div>

        {/* Narrative Paragraphs */}
        <div className="flex flex-col gap-8 text-lg sm:text-xl font-serif-primary font-light text-stone-300 leading-relaxed text-left sm:text-justify max-w-2xl my-6">
          {HIDDEN_STORY_NARRATIVE.paragraphs.map((para, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 + idx * 0.2 }}
              className="border-l-2 border-[#c5a059]/30 pl-6 hover:border-[#c5a059] transition-colors duration-300"
            >
              {para}
            </motion.p>
          ))}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 2.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => {
              onClose();
              if (onRestart) onRestart();
            }}
            className="px-8 py-4 rounded-full bg-[#f4f1ea] text-[#0a0a0c] font-sans-ui font-medium text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,241,234,0.3)] hover:scale-[1.03] flex items-center gap-3"
          >
            <BookOpen className="w-4 h-4" />
            <span>Revisit the Poems</span>
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center pt-8 border-t border-white/10 text-xs font-sans-ui text-stone-500 uppercase tracking-widest">
        Echoes of What We Never Said &bull; XXI Poems
      </div>
    </motion.div>
  );
}
