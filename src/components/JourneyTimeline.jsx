import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight, Compass } from 'lucide-react';
import { EMOTIONAL_STAGES, POEMS } from '../data/poems';

export default function JourneyTimeline({ onClose, onSelectPoem, currentPoemId }) {
  const [hoveredPoem, setHoveredPoem] = useState(null);
  const [activeStageId, setActiveStageId] = useState('all');

  const filteredPoems =
    activeStageId === 'all'
      ? POEMS
      : POEMS.filter((p) => p.stage === activeStageId);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 bg-[#0a0a0c]/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-12 overflow-y-auto overflow-x-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#c5a059]/10 rounded-full blur-[140px]" />
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-[#c5a059]/15 border border-[#c5a059]/30">
            <Compass className="w-5 h-5 text-[#d4af37]" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif-title text-[#f4f1ea] font-normal">
              The Emotional Journey
            </h2>
            <p className="text-xs text-stone-400 font-sans-ui tracking-widest uppercase">
              {POEMS.length} Poems &bull; VIII Chapters of the Soul
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-3 rounded-full glass-panel text-stone-400 hover:text-white transition-all duration-300 hover:rotate-90 border-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Stage Selector Ribbon */}
      <div className="relative z-10 max-w-7xl w-full mx-auto mb-10 overflow-x-auto pb-4 scrollbar-none">
        <div className="flex items-center gap-2 sm:gap-3 min-w-max">
          <button
            onClick={() => setActiveStageId('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-sans-ui uppercase tracking-widest transition-all duration-300 border ${
              activeStageId === 'all'
                ? 'bg-[#f4f1ea] text-[#0a0a0c] border-[#f4f1ea] font-medium shadow-[0_0_20px_rgba(244,241,234,0.2)]'
                : 'glass-panel text-stone-400 border-white/10 hover:text-white'
            }`}
          >
            Full Collection
          </button>
          {EMOTIONAL_STAGES.map((stage) => {
            const count = POEMS.filter((p) => p.stage === stage.id).length;
            const isActive = activeStageId === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageId(stage.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-sans-ui uppercase tracking-widest transition-all duration-300 border ${
                  isActive
                    ? 'bg-white/15 text-white border-[#c5a059] box-gold-glow'
                    : 'glass-panel text-stone-400 border-white/10 hover:text-stone-200'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: stage.color }}
                />
                <span>{stage.name}</span>
                <span className="text-[10px] opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline Stream / Grid */}
      <div className="relative z-10 max-w-7xl w-full mx-auto my-auto py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPoems.map((poem, idx) => {
            const stage = EMOTIONAL_STAGES.find((s) => s.id === poem.stage);
            const isSelected = poem.id === currentPoemId;

            return (
              <motion.div
                key={poem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                onMouseEnter={() => setHoveredPoem(poem)}
                onMouseLeave={() => setHoveredPoem(null)}
                onClick={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                  onSelectPoem(poem.id - 1);
                  onClose();
                }}
                className={`group relative p-6 rounded-2xl cursor-pointer transition-all duration-500 overflow-hidden border ${
                  isSelected
                    ? 'bg-[#c5a059]/15 border-[#c5a059]/60 box-gold-glow'
                    : 'glass-card hover:border-[#c5a059]/40 hover:bg-white/[0.06]'
                }`}
              >
                {/* Background Image Thumbnail snippet on hover */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none filter brightness-50"
                  style={{ backgroundImage: `url(${poem.image})` }}
                />

                {/* Card Content */}
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px]">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase tracking-[0.25em] text-[#c5a059] font-sans-ui font-medium">
                        Chapter {poem.id}
                      </span>
                      <span
                        className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-sans-ui"
                        style={{
                          backgroundColor: `${stage?.color}20`,
                          color: stage?.color,
                          border: `1px solid ${stage?.color}40`,
                        }}
                      >
                        {stage?.name}
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif-title font-normal text-[#f4f1ea] group-hover:text-[#c5a059] transition-colors duration-300 mb-2">
                      {poem.title}
                    </h3>

                    {poem.whisper && (
                      <p className="text-xs font-serif-primary italic text-stone-400 group-hover:text-stone-300 line-clamp-2 transition-colors duration-300">
                        “{poem.whisper}”
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4 text-[11px] font-sans-ui text-stone-500 uppercase tracking-widest group-hover:text-stone-300">
                    <span>{poem.emotion}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#c5a059] transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Quote Footer */}
      <div className="relative z-10 max-w-7xl w-full mx-auto text-center pt-8 border-t border-white/10 text-xs font-serif-primary italic text-stone-400">
        “Every poem is a step on a single emotional journey by Rishusingh.”
      </div>
    </motion.div>
  );
}
