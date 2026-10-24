import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, Mail, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-kanit font-black text-2xl tracking-tight text-white uppercase">
              AYUSH <span className="text-[#00FF87]">JAWANE</span>
            </span>
            <span className="text-xs font-mono text-gray-400 mt-1">
              Software Developer | Java Full Stack | AI/ML Enthusiast
            </span>
            <span className="text-[11px] font-mono text-gray-500 mt-0.5">
              IPS Academy, Indore • Class of 2027
            </span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center space-x-3">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#00FF87] hover:border-[#00FF87]/40 transition-all hover:scale-110"
              aria-label="Ayush Jawane LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#00F0FF] hover:border-[#00F0FF]/40 transition-all hover:scale-110"
              aria-label="Ayush Jawane GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#00FF87] hover:border-[#00FF87]/40 transition-all hover:scale-110"
              aria-label="Email Ayush Jawane"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Ayush_Jawane_Resume.pdf"
              className="px-4 py-3 rounded-2xl bg-[#00FF87]/10 border border-[#00FF87]/30 text-[#00FF87] hover:bg-[#00FF87]/20 transition-all text-xs font-kanit font-bold tracking-wider flex items-center space-x-1.5"
              title="Download Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </a>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-xs font-mono text-gray-500">
          <div className="text-center sm:text-left">
            <span>© {new Date().getFullYear()} Ayush Jawane. Built to match amitmanmode.me design excellence.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#00FF87]/40 text-gray-300 hover:text-[#00FF87] transition-all"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
