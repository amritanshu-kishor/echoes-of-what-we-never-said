import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { POEMS, EMOTIONAL_STAGES } from './data/poems';
import ParticleBackground from './components/ParticleBackground';
import HeaderNav from './components/HeaderNav';
import LandingHero from './components/LandingHero';
import PoemViewer from './components/PoemViewer';
import JourneyTimeline from './components/JourneyTimeline';
import HiddenStory from './components/HiddenStory';
import FinalScreen from './components/FinalScreen';
import { resetScroll } from './utils/scroll';

export default function App() {
  const [viewState, setViewState] = useState('landing'); // 'landing' | 'reading' | 'final'
  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showHiddenStory, setShowHiddenStory] = useState(false);
  const [hasUnlockedStory, setHasUnlockedStory] = useState(false);

  // Smooth mouse position tracking for tilt & parallax
  const [mousePos, setMousePos] = useState(() => ({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 600,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 400,
  }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Force scroll position to top whenever view or active poem index changes
  useEffect(() => {
    resetScroll();
  }, [currentPoemIndex, viewState]);

  // View Navigation Handlers
  const handleBeginJourney = useCallback(() => {
    resetScroll();
    setCurrentPoemIndex(0);
    setViewState('reading');
  }, []);

  const handleNext = useCallback(() => {
    resetScroll();
    if (currentPoemIndex < POEMS.length - 1) {
      setCurrentPoemIndex((prev) => prev + 1);
    } else {
      setHasUnlockedStory(true);
      setViewState('final');
    }
  }, [currentPoemIndex]);

  const handlePrev = useCallback(() => {
    resetScroll();
    if (currentPoemIndex > 0) {
      setCurrentPoemIndex((prev) => prev - 1);
    } else {
      setViewState('landing');
    }
  }, [currentPoemIndex]);

  const handleSelectPoem = useCallback((index) => {
    resetScroll();
    setCurrentPoemIndex(index);
    setViewState('reading');
  }, []);

  const handleRestart = useCallback(() => {
    resetScroll();
    setCurrentPoemIndex(0);
    setViewState('landing');
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showTimeline || showHiddenStory) {
        if (e.key === 'Escape') {
          setShowTimeline(false);
          setShowHiddenStory(false);
        }
        return;
      }

      if (viewState === 'reading') {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault();
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewState, showTimeline, showHiddenStory, handleNext, handlePrev]);

  const currentPoem = POEMS[currentPoemIndex];
  const currentStage = EMOTIONAL_STAGES.find((s) => s.id === currentPoem?.stage);

  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-[#e8e4dc] overflow-x-hidden font-sans selection:bg-[#c5a059]/30">
      {/* Film Grain Texture Overlay */}
      <div className="film-grain" />

      {/* Interactive Particle Canvas */}
      <ParticleBackground mousePos={mousePos} intensity={viewState === 'landing' ? 1.2 : 0.8} />

      {/* Floating Header Navigation (active during reading & final view) */}
      {viewState !== 'landing' && (
        <HeaderNav
          currentIndex={currentPoemIndex}
          totalPoems={POEMS.length}
          currentStage={currentStage}
          onGoHome={() => {
            resetScroll();
            setViewState('landing');
          }}
          onOpenTimeline={() => setShowTimeline(true)}
          onOpenHiddenStory={() => setShowHiddenStory(true)}
          hasUnlockedStory={hasUnlockedStory}
        />
      )}

      {/* Main Screen Transition Area */}
      <main className="relative z-20 min-h-screen pointer-events-auto">
        <AnimatePresence mode="wait">
          {viewState === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(6px)' }}
              transition={{ duration: 1.2 }}
            >
              <LandingHero
                onBeginJourney={handleBeginJourney}
                onOpenTimeline={() => setShowTimeline(true)}
                mousePos={mousePos}
              />
            </motion.div>
          )}

          {viewState === 'reading' && (
            <motion.div
              key="reading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <PoemViewer
                poem={currentPoem}
                currentIndex={currentPoemIndex}
                totalPoems={POEMS.length}
                onPrev={handlePrev}
                onNext={handleNext}
                onOpenTimeline={() => setShowTimeline(true)}
                mousePos={mousePos}
              />
            </motion.div>
          )}

          {viewState === 'final' && (
            <motion.div
              key="final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <FinalScreen
                onRestart={handleRestart}
                onOpenHiddenStory={() => setShowHiddenStory(true)}
                onOpenTimeline={() => setShowTimeline(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals & Overlays */}
      <AnimatePresence>
        {showTimeline && (
          <JourneyTimeline
            onClose={() => setShowTimeline(false)}
            onSelectPoem={handleSelectPoem}
            currentPoemId={currentPoem?.id}
          />
        )}

        {showHiddenStory && (
          <HiddenStory
            onClose={() => setShowHiddenStory(false)}
            onRestart={() => {
              resetScroll();
              setViewState('reading');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
