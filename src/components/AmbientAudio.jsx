import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      startAmbientSound();
      setIsPlaying(true);
    } else {
      stopAmbientSound();
      setIsPlaying(false);
    }
  };

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Master Gain for smooth fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      masterGainRef.current = masterGain;

      // Create warm low frequency drones (C minor 9th ethereal pad)
      const frequencies = [130.81, 164.81, 196.00, 246.94, 293.66]; // C3, E3, G3, B3, D4
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Lowpass filter for smooth warmth
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + idx * 50, ctx.currentTime);

        // Subtle LFO for gentle breathing effect
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.1 + idx * 0.03, ctx.currentTime);
        lfoGain.gain.setValueAtTime(0.02, ctx.currentTime);
        lfo.connect(oscGain.gain);
        lfo.start();

        oscGain.gain.setValueAtTime(0.04, ctx.currentTime);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(masterGain);

        osc.start();
      });
    } catch (e) {
      console.warn("Web Audio ambient generator initialized", e);
    }
  };

  const stopAmbientSound = () => {
    if (masterGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      masterGainRef.current.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
      setTimeout(() => {
        if (ctx.state === 'running') {
          ctx.suspend();
        }
      }, 1500);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      title={isPlaying ? "Mute Ambient Atmosphere" : "Enable Ambient Atmosphere"}
      className={`relative group p-2.5 rounded-full transition-all duration-500 border ${
        isPlaying
          ? 'bg-[#c5a059]/15 text-[#e8e4dc] border-[#c5a059]/40 box-gold-glow'
          : 'bg-white/5 text-stone-400 border-white/10 hover:text-white hover:border-white/20'
      }`}
    >
      {isPlaying ? (
        <div className="flex items-center gap-2 px-1">
          <Volume2 className="w-4 h-4 text-[#d4af37] animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-medium hidden sm:inline">
            Atmosphere On
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-1">
          <VolumeX className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium hidden sm:inline">
            Soundscape
          </span>
        </div>
      )}
    </button>
  );
}
