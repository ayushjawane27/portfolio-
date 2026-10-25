import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import {
  Download,
  ArrowRight,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  MapPin,
  GraduationCap,
  Terminal,
} from 'lucide-react';

interface HeroProps {
  isVoiceActive: boolean;
  onToggleVoice: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ isVoiceActive, onToggleVoice, onNavigateSection }) => {
  // Avatar states: 'idle' | 'blink' | 'talking'
  const [avatarState, setAvatarState] = useState<'idle' | 'blink' | 'talking'>('idle');
  const [speechBubbleText, setSpeechBubbleText] = useState<string>(
    "Hi! I'm Ayush Jawane. Welcome to my portfolio! Click the voice tour or ask me anything."
  );
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const cardRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speakingIntervalRef = useRef<any>(null);

  // Blinking loop: random interval between 3 and 6 seconds
  useEffect(() => {
    let blinkTimeout: any;

    const scheduleNextBlink = () => {
      const delay = Math.floor(Math.random() * 3000) + 3000;
      blinkTimeout = setTimeout(() => {
        setAvatarState((prev) => {
          if (prev === 'idle') {
            setTimeout(() => {
              setAvatarState((curr) => (curr === 'blink' ? 'idle' : curr));
            }, 180);
            return 'blink';
          }
          return prev;
        });
        scheduleNextBlink();
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Sync avatar talking animation with SpeechSynthesis
  useEffect(() => {
    const checkSpeaking = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          if (!speakingIntervalRef.current) {
            speakingIntervalRef.current = setInterval(() => {
              setAvatarState((prev) => (prev === 'talking' ? 'idle' : 'talking'));
            }, 190);
          }
        } else {
          if (speakingIntervalRef.current) {
            clearInterval(speakingIntervalRef.current);
            speakingIntervalRef.current = null;
            setAvatarState('idle');
          }
        }
      }
    };

    const interval = setInterval(checkSpeaking, 100);
    return () => {
      clearInterval(interval);
      if (speakingIntervalRef.current) {
        clearInterval(speakingIntervalRef.current);
      }
    };
  }, []);

  // Web Speech API for voice recognition input
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          handleVoiceQuery(transcript);
        };

        recognitionRef.current = recognition;
      } else {
        setSpeechSupported(false);
      }
    }
  }, []);

  const handleVoiceQuery = (query: string) => {
    let responseText = '';
    let targetSection = '';

    if (query.includes('skill') || query.includes('tech') || query.includes('language') || query.includes('java')) {
      responseText = "My core skills include Java, Spring Boot, Microservices, REST APIs, Python, and SQL, plus React and AI/ML workflows.";
      targetSection = 'skills';
    } else if (query.includes('project') || query.includes('work') || query.includes('built')) {
      responseText = "I've built 4 major projects: AI Chat Processor, Predictive Model Evaluation System, Divya-Yatri, and the Trial Equity Backtesting Platform.";
      targetSection = 'projects';
    } else if (query.includes('intern') || query.includes('experience') || query.includes('job')) {
      responseText = "I interned as a Software Developer Intern at InternPe building an NLP chatbot, and as an AI/ML Intern at MaincraftsTechnology.";
      targetSection = 'internships';
    } else if (query.includes('college') || query.includes('education') || query.includes('study') || query.includes('degree')) {
      responseText = "I am pursuing B.Tech in AI & Machine Learning Engineering at IPS Academy, Indore, graduating in 2027.";
      targetSection = 'education';
    } else if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('phone')) {
      responseText = "You can reach me at ayush.jawane27@gmail.com, or phone at +91-9826647678. I am actively looking for software engineering roles.";
      targetSection = 'contact';
    } else if (query.includes('resume') || query.includes('cv')) {
      responseText = "You can download my verified resume PDF using the button right here or the navigation bar.";
      window.open(portfolioData.personal.resumeUrl, '_blank');
    } else {
      responseText = `You asked: "${query}". Ayush is a Java Full Stack & AI/ML Developer from Indore. Let me show you his portfolio!`;
    }

    speakText(responseText);
    if (targetSection) {
      setTimeout(() => onNavigateSection(targetSection), 1200);
    }
  };

  const speakText = (text: string) => {
    setSpeechBubbleText(text);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const naturalVoice =
        voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David'))) ||
        voices.find((v) => v.lang.startsWith('en'));
      if (naturalVoice) utterance.voice = naturalVoice;

      utterance.onend = () => setAvatarState('idle');
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 3D Card mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({ x: -(y / 20), y: x / 20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Select image frame based on state
  // const avatarImageSrc =
  //   avatarState === 'blink'
  //     ? '/assets/images/ayush_blink.jpg'
  //     : avatarState === 'talking'
  //     ? '/assets/images/ayush_talking.jpg'
  //     : '/assets/images/ayush_idle.jpg';

  const avatarImageSrc = '/assets/images/ayush.jpeg'; // Using a single image for simplicity

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#080808]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#00FF87]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF87] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00FF87]"></span>
              </span>
              <span className="text-xs font-mono tracking-wider text-gray-300 uppercase">
                Available for Software Engineering Roles
              </span>
            </div>

            {/* Giant Heading matching amitmanmode.me */}
            <h1 className="font-kanit font-black text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95] mb-4">
              AYUSH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF87] via-[#00F0FF] to-purple-400">
                JAWANE
              </span>
            </h1>

            {/* Subtitle / Role */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-0.5 w-8 bg-[#00FF87]" />
              <h2 className="font-kanit font-bold text-lg sm:text-xl md:text-2xl tracking-[0.2em] text-gray-200 uppercase">
                SOFTWARE DEVELOPER <span className="text-[#00FF87]">|</span> JAVA FULL STACK
              </h2>
            </div>

            {/* Bio Tagline */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-light">
              Pursuing B.Tech in Artificial Intelligence & Machine Learning at <span className="text-white font-medium">IPS Academy, Indore</span> (2027). Building scalable enterprise backend systems with <span className="text-[#00FF87] font-mono">Java</span> & <span className="text-[#00F0FF] font-mono">Spring Boot</span>, and progressing toward AI/ML production pipelines.
            </p>

            {/* Resume-grounded Feature Pills */}
            <div className="flex flex-wrap gap-2.5 mb-9">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <GraduationCap className="w-3.5 h-3.5 text-[#00FF87]" />
                <span>B.Tech AI/ML • 2027</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <MapPin className="w-3.5 h-3.5 text-[#00F0FF]" />
                <span>Rau, Indore, MP</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>InternPe & Maincrafts Alum</span>
              </div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>4 Featured Projects</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-9">
              <button
                onClick={() => onNavigateSection('projects')}
                className="rounded-full px-8 py-3.5 text-xs font-kanit font-bold tracking-[0.2em] text-white uppercase btn-amit-gradient flex items-center space-x-2 group"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Ayush_Jawane_Resume.pdf"
                className="px-7 py-3.5 rounded-full border border-[#00FF87]/50 bg-[#00FF87]/10 hover:bg-[#00FF87]/20 text-[#00FF87] font-kanit font-bold text-xs tracking-[0.2em] uppercase flex items-center space-x-2 transition-all hover:scale-105 shadow-lg shadow-[#00FF87]/15"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD RESUME</span>
              </a>

              <button
                onClick={onToggleVoice}
                className="px-5 py-3.5 rounded-full border border-white/15 bg-white/5 hover:border-white/30 text-gray-300 hover:text-white font-mono text-xs flex items-center space-x-2 transition-all"
              >
                {isVoiceActive ? (
                  <>
                    <Volume2 className="w-4 h-4 text-[#00FF87] animate-pulse" />
                    <span>AUDIO TOUR: ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-gray-400" />
                    <span>AUDIO TOUR</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Icons & Direct Contact Links */}
            <div className="flex items-center space-x-4 pt-2 border-t border-white/10 w-full">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Connect:</span>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-[#00FF87] hover:border-[#00FF87]/40 transition-all hover:scale-110"
                aria-label="Ayush Jawane LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-[#00FF87] hover:border-[#00FF87]/40 transition-all hover:scale-110"
                aria-label="Ayush Jawane GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-[#00FF87] hover:border-[#00FF87]/40 transition-all hover:scale-110"
                aria-label="Email Ayush Jawane"
              >
                <Mail className="w-4 h-4" />
              </a>
              <span className="text-xs font-mono text-gray-500 hidden sm:inline">
                {portfolioData.personal.email}
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Talking Character Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Dynamic Speech Bubble */}
            <div className="w-full max-w-md mb-4 bg-gradient-to-r from-[#121212]/95 to-[#1a1a1a]/95 border border-white/15 rounded-2xl p-4 shadow-2xl backdrop-blur-xl relative">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-[#00FF87]/15 border border-[#00FF87]/30 text-[#00FF87] mt-0.5 shrink-0">
                  <Volume2 className="w-4 h-4 animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-kanit font-bold text-xs tracking-wider text-[#00FF87] uppercase">
                      AYUSH • LIVE AI AVATAR
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
                      {avatarState === 'talking' ? 'Speaking...' : 'Ready'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-200 font-light leading-relaxed">
                    "{speechBubbleText}"
                  </p>
                </div>
              </div>
              {/* Bubble Triangle Pointer */}
              <div className="absolute -bottom-2 left-12 w-4 h-4 bg-[#141414] border-r border-b border-white/15 rotate-45 transform" />
            </div>

            {/* Character Card with 3D Tilt */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-md rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-[#00FF87]/20 shadow-[0_20px_60px_rgba(0,0,0,0.9)] group"
            >
              <div className="relative rounded-[22px] bg-[#0c0c0c] overflow-hidden border border-white/10">
                {/* Character Photo Frame with rim light */}
                <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-gray-900 to-[#080808] flex items-center justify-center overflow-hidden">
                  <img
                    src={avatarImageSrc}
                    alt="Ayush Jawane - Software Developer"
                    className="w-full h-full object-cover object-top filter contrast-[1.04] brightness-[1.02] transition-opacity duration-75"
                    loading="eager"
                  />

                  {/* Gradient Vignette overlay for cinematic blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0c0c0c]/40 via-transparent to-transparent" />

                  {/* Top Status Bar inside image */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono text-gray-300">
                      HUMAN TALKING AVATAR
                    </span>
                    <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#00FF87]/40 text-[10px] font-mono text-[#00FF87]">
                      <span className="w-2 h-2 rounded-full bg-[#00FF87] animate-pulse" />
                      <span>{avatarState === 'talking' ? 'VOICE SYNC' : 'IDLE'}</span>
                    </div>
                  </div>

                  {/* Bottom Controls Bar inside photo */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                    <div className="flex flex-col">
                      <span className="font-kanit font-bold text-sm tracking-wider text-white uppercase">
                        Ayush Jawane
                      </span>
                      <span className="text-[11px] font-mono text-[#00FF87]">
                        Java Full Stack Developer
                      </span>
                    </div>

                    {/* Microphone Interaction Button */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={toggleMic}
                        disabled={!speechSupported}
                        className={`p-3 rounded-full border transition-all shadow-lg flex items-center justify-center ${
                          isListening
                            ? 'bg-red-500/90 border-red-400 text-white animate-bounce'
                            : 'bg-white/10 hover:bg-[#00FF87]/20 border-white/20 hover:border-[#00FF87]/50 text-white hover:text-[#00FF87]'
                        }`}
                        title={
                          speechSupported
                            ? isListening
                              ? 'Listening... Click to stop'
                              : 'Click and speak a question to Ayush'
                            : 'Speech Recognition not supported in this browser'
                        }
                      >
                        {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() =>
                          speakText(
                            "Hi, I'm Ayush Jawane! I'm a Java Full Stack Developer from Indore with hands-on experience in Spring Boot, Microservices, and AI/ML workflows."
                          )
                        }
                        className="p-3 rounded-full bg-[#00FF87]/15 hover:bg-[#00FF87]/25 border border-[#00FF87]/40 text-[#00FF87] transition-all"
                        title="Introduce Ayush"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Voice Interaction Guide Footer */}
                <div className="p-3 bg-black/80 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span className="truncate">Ask: "What are your skills?" or "Projects"</span>
                  <span className="text-[#00FF87] uppercase ml-2 text-[10px] font-semibold">Web Speech API</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Animated Scroll Indicator matching amitmanmode.me */}
      <div className="relative w-full flex flex-col items-center justify-center pt-8 z-10">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            onNavigateSection('about');
          }}
          className="group flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
        >
          <span className="text-[10px] font-kanit font-semibold tracking-[0.3em] text-gray-400 group-hover:text-[#00FF87] transition-colors uppercase mb-2">
            SCROLL
          </span>
          <div className="w-[1.5px] h-10 bg-white/20 relative overflow-hidden rounded-full">
            <div className="w-full h-4 bg-gradient-to-b from-[#00FF87] to-transparent animate-scrollLine" />
          </div>
        </a>
      </div>
    </section>
  );
};
