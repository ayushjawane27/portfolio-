import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { VoiceTour } from './components/VoiceTour';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { ResumeSection } from './components/ResumeSection';
import { Contact } from './components/Contact';
import { FAQAssistant } from './components/FAQAssistant';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState<boolean>(false);

  // Custom cursor follower
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleVoice = () => {
    setIsVoiceActive((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#00FF87]/30 selection:text-white relative">
      {/* Custom Desktop Cursor */}
      <div
        className="fixed pointer-events-none z-[9999] hidden lg:block -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-150 ${
            isPointer
              ? 'w-10 h-10 border-2 border-[#00FF87] bg-[#00FF87]/15 scale-125'
              : 'w-4 h-4 bg-[#00FF87]/70 border border-[#00FF87]'
          }`}
        />
      </div>

      {/* Navigation Bar */}
      <Navbar
        isVoiceActive={isVoiceActive}
        onToggleVoice={handleToggleVoice}
      />

      {/* Hero Section */}
      <Hero
        isVoiceActive={isVoiceActive}
        onToggleVoice={handleToggleVoice}
        onNavigateSection={handleNavigateSection}
      />

      {/* Voice Tour Floating Bar */}
      <VoiceTour
        isOpen={isVoiceActive}
        onClose={() => setIsVoiceActive(false)}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Sections */}
      <main>
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
        <ResumeSection />
        <Contact />
      </main>

      {/* Floating Resume FAQ Assistant */}
      <FAQAssistant />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
