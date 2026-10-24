import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Play, Pause, Square, SkipForward, SkipBack, Volume2, X } from 'lucide-react';

interface VoiceTourProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const VoiceTour: React.FC<VoiceTourProps> = ({ isOpen, onClose, onNavigateSection }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const steps = portfolioData.voiceTourScript;

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Stop everything when closed
  useEffect(() => {
    if (!isOpen) {
      stopTour();
    } else {
      // Start tour when opened
      playStep(0);
    }
    return () => {
      stopTour();
    };
  }, [isOpen]);

  const speakText = (text: string, onEndCallback: () => void) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const voice =
      voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David'))) ||
      voices.find((v) => v.lang.startsWith('en'));
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      onEndCallback();
    };

    utterance.onerror = (e) => {
      console.warn('Speech error:', e);
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const playStep = (index: number) => {
    if (index >= steps.length) {
      stopTour();
      return;
    }

    setCurrentStepIndex(index);
    const step = steps[index];
    onNavigateSection(step.section);

    speakText(step.text, () => {
      if (index + 1 < steps.length) {
        setTimeout(() => {
          playStep(index + 1);
        }, 1200);
      } else {
        setIsPlaying(false);
      }
    });
  };

  const pauseTour = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        setIsPaused(true);
        setIsPlaying(false);
      }
    }
  };

  const resumeTour = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
        setIsPlaying(true);
      } else {
        playStep(currentStepIndex);
      }
    }
  };

  const stopTour = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      playStep(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      playStep(currentStepIndex - 1);
    }
  };

  if (!isOpen) return null;

  const currentStep = steps[currentStepIndex];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-slideUp">
      <div className="bg-[#0f0f0f]/95 border border-[#00FF87]/40 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.9)] backdrop-blur-2xl p-4 sm:p-5">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-[#00FF87]/15 text-[#00FF87]">
              <Volume2 className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <span className="font-kanit font-bold text-xs tracking-wider text-white uppercase block">
                AUDIO TOUR • STEP {currentStepIndex + 1} OF {steps.length}
              </span>
              <span className="text-[11px] font-mono text-[#00FF87]">
                {currentStep.title}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              stopTour();
              onClose();
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close voice tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Current Spoken Text */}
        <p className="text-xs text-gray-300 font-light leading-relaxed mb-4 line-clamp-2">
          "{currentStep.text}"
        </p>

        {/* Controls Bar */}
        <div className="flex items-center justify-between pt-1">
          {/* Audio Wave Visualizer */}
          <div className="flex items-center space-x-1">
            {[40, 75, 100, 60, 90, 45, 80].map((h, i) => (
              <span
                key={i}
                style={{ height: isPlaying ? `${h}%` : '20%' }}
                className="w-1 bg-[#00FF87] rounded-full transition-all duration-200 h-4 inline-block"
              />
            ))}
            <span className="text-[10px] font-mono text-gray-400 ml-2 uppercase">
              {isPlaying ? 'Speaking' : isPaused ? 'Paused' : 'Idle'}
            </span>
          </div>

          {/* Player Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Previous Step"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            {isPlaying ? (
              <button
                onClick={pauseTour}
                className="px-4 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 text-xs font-mono font-bold flex items-center space-x-1.5 hover:bg-yellow-500/30 transition-all"
              >
                <Pause className="w-3.5 h-3.5" />
                <span>PAUSE</span>
              </button>
            ) : (
              <button
                onClick={resumeTour}
                className="px-4 py-2 rounded-xl bg-[#00FF87]/20 border border-[#00FF87]/50 text-[#00FF87] text-xs font-mono font-bold flex items-center space-x-1.5 hover:bg-[#00FF87]/30 transition-all shadow-md shadow-[#00FF87]/15"
              >
                <Play className="w-3.5 h-3.5" />
                <span>RESUME</span>
              </button>
            )}

            <button
              onClick={stopTour}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-red-400 transition-all"
              title="Stop Tour"
            >
              <Square className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === steps.length - 1}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Next Step"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
