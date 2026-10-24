import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Menu, X, Download, Volume2, VolumeX, ExternalLink } from 'lucide-react';

interface NavbarProps {
  isVoiceActive: boolean;
  onToggleVoice: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isVoiceActive, onToggleVoice }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'EXPERIENCE', href: '#internships' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'CERTIFICATIONS', href: '#certifications' },
    { label: 'CONTACT', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'about', 'skills', 'internships', 'projects', 'education', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080808]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center space-x-3 text-white transition-transform hover:scale-105"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00FF87]/20 to-[#00F0FF]/15 border border-[#00FF87]/40 flex items-center justify-center font-kanit font-black text-sm text-[#00FF87] shadow-lg shadow-[#00FF87]/10">
            AJ
          </div>
          <div className="flex flex-col text-left">
            <span className="font-kanit font-bold text-base tracking-wider text-white">
              AYUSH<span className="text-[#00FF87]">.DEV</span>
            </span>
            <span className="text-[10px] font-mono text-gray-400 -mt-1 hidden sm:inline">
              Software Developer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-xs font-kanit font-semibold tracking-[0.2em] transition-colors relative py-1 ${
                  isActive ? 'text-[#00FF87]' : 'text-white/75 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FF87] rounded-full shadow-[0_0_8px_#00FF87]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Voice Tour Toggle */}
          <button
            onClick={onToggleVoice}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:border-[#00FF87]/50 text-xs font-mono text-gray-300 hover:text-white transition-all backdrop-blur-md"
            title="Toggle Voice Tour"
          >
            {isVoiceActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#00FF87] animate-pulse" />
                <span className="text-[#00FF87] font-semibold">VOICE TOUR: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                <span>VOICE TOUR: OFF</span>
              </>
            )}
          </button>

          {/* Resume Download / View Button */}
          <a
            href={portfolioData.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="Ayush_Jawane_Resume.pdf"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full border border-[#00FF87]/40 bg-[#00FF87]/10 hover:bg-[#00FF87]/20 text-[#00FF87] font-kanit font-semibold text-xs tracking-wider transition-all hover:scale-105 shadow-sm shadow-[#00FF87]/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>RESUME (PDF)</span>
          </a>

          {/* Contact CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="rounded-full px-5 py-2 text-xs font-kanit font-bold tracking-[0.18em] text-white uppercase btn-amit-gradient"
          >
            CONTACT ME
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center space-x-2 xl:hidden">
          <button
            onClick={onToggleVoice}
            className="p-2 rounded-lg border border-white/15 bg-white/5 text-[#00FF87]"
            title="Toggle Voice"
          >
            {isVoiceActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-400" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-white/15 bg-white/5 text-white hover:text-[#00FF87] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0a0a]/98 border-b border-white/15 backdrop-blur-2xl px-6 py-6 mt-3 shadow-2xl animate-fadeIn space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-xs font-kanit font-semibold tracking-wider text-gray-200 hover:text-[#00FF87] hover:bg-white/5 transition-all text-left"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col space-y-2.5 pt-2">
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Ayush_Jawane_Resume.pdf"
              className="w-full py-2.5 rounded-xl border border-[#00FF87]/40 bg-[#00FF87]/10 text-[#00FF87] font-kanit font-bold text-xs tracking-wider flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full py-2.5 rounded-xl text-center text-xs font-kanit font-bold tracking-widest text-white uppercase btn-amit-gradient"
            >
              CONTACT ME
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
