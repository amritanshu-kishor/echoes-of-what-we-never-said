import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { POEMS } from '../data/poems';

export default function LandingHero({ onBeginJourney, onOpenTimeline, mousePos }) {
  // Compute subtle tilt transform from mouse position
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const mouseX = mousePos?.x ?? windowWidth / 2;
  const mouseY = mousePos?.y ?? windowHeight / 2;

  const tiltX = (mouseY - windowHeight / 2) * 0.015;
  const tiltY = (mouseX - windowWidth / 2) * -0.015;

  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center px-6 py-12 z-20 pointer-events-auto">
      {/* Subtle top branding mark */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl flex justify-between items-center text-xs tracking-[0.25em] text-stone-500 uppercase font-sans-ui"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-ping" />
          A Digital Poetry Book
        </span>
        <span>{POEMS.length} Poems &bull; VIII Chapters</span>
      </motion.div>

      {/* Main Mysterious Hero Centerpiece */}
      <div className="my-auto text-center max-w-4xl flex flex-col items-center w-full">
        {/* 3D Tilted Visual Content */}
        <motion.div
          style={{
            transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transformStyle: 'preserve-3d',
          }}
          className="flex flex-col items-center transition-transform duration-300 ease-out pointer-events-none"
        >
          {/* Author Tag */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 2, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.4em] text-[#c5a059] mb-4 font-sans-ui font-medium"
          >
            Poems by Rishusingh
          </motion.span>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 2.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl font-serif-title font-normal tracking-tight text-[#f4f1ea] leading-[1.1] mb-8"
          >
            Echoes of What We <br />
            <span className="italic font-light text-[#c5a059] text-gold-glow">
              Never Said
            </span>
          </motion.h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059] to-transparent my-6"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 1.8, delay: 1.2 }}
            className="text-lg sm:text-2xl font-serif-primary font-light italic text-stone-300 max-w-2xl leading-relaxed mb-12 px-4"
          >
            “A collection of things that were felt, <br className="hidden sm:inline" />
            but perhaps never said.”
          </motion.p>
        </motion.div>

        {/* CTA Buttons - Outside 3D tilt box for 100% reliable hit testing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1.6 }}
          className="relative z-30 flex flex-col sm:flex-row items-center gap-5 pointer-events-auto"
        >
          <button
            type="button"
            onClick={onBeginJourney}
            className="group relative px-9 py-4 rounded-full bg-[#f4f1ea] text-[#0a0a0c] font-sans-ui font-medium text-xs tracking-widest uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(244,241,234,0.35)] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] cursor-pointer flex items-center gap-3 z-30"
          >
            <span className="relative z-10">Begin the Journey</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={onOpenTimeline}
            className="group px-7 py-4 rounded-full glass-card text-stone-300 hover:text-white font-sans-ui font-medium text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2.5 hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] cursor-pointer z-30"
          >
            <Compass className="w-4 h-4 text-[#c5a059] transition-transform duration-500 group-hover:rotate-45" />
            <span>The Journey Map</span>
          </button>
        </motion.div>
      </div>

      {/* Subtle Bottom Footer Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, delay: 2 }}
        className="w-full max-w-5xl flex justify-between items-center text-[11px] tracking-widest text-stone-500 uppercase font-sans-ui"
      >
        <span>Scroll or press → to navigate</span>
        <span className="italic font-serif-primary text-stone-400">
          "Perhaps the poems were never separate."
        </span>
      </motion.div>
    </div>
  );
}
