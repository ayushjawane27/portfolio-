import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Download, ExternalLink, FileText, CheckCircle2, Eye, ShieldCheck } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { personal } = portfolioData;
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section id="resume" className="py-24 relative bg-[#080808] border-t border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00FF87]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00FF87] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
            <span>07 // CURRICULUM VITAE</span>
          </div>
          <h2 className="font-kanit font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF87] via-[#00F0FF] to-purple-400">RESUME</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light max-w-xl mt-2">
            Verified official resume of Ayush Jawane — Software Developer & AI/ML Engineer.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00FF87] to-transparent mt-3" />
        </div>

        {/* Action Header Card */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 sm:p-8 mb-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="p-4 rounded-2xl bg-[#00FF87]/10 border border-[#00FF87]/30 text-[#00FF87] shrink-0">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-kanit font-bold text-xl sm:text-2xl text-white uppercase tracking-wide">
                  Ayush Jawane — Resume
                </h3>
                <span className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#00FF87]/15 border border-[#00FF87]/40 text-[#00FF87] text-[10px] font-mono">
                  <ShieldCheck className="w-3 h-3" />
                  <span>OFFICIAL PDF</span>
                </span>
              </div>
              <p className="text-xs font-mono text-gray-400 mt-1">
                Updated for Software Engineering & AI/ML Positions • Single-Page Complete Resume
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-kanit font-semibold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 transition-all hover:scale-105"
            >
              <Eye className="w-4 h-4 text-[#00F0FF]" />
              <span>OPEN FULLSCREEN</span>
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Ayush_Jawane_Resume.pdf"
              className="flex-1 md:flex-none px-6 py-3 rounded-full border border-[#00FF87]/50 bg-[#00FF87]/15 hover:bg-[#00FF87]/25 text-[#00FF87] font-kanit font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition-all hover:scale-105 shadow-lg shadow-[#00FF87]/15"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD PDF</span>
            </a>
          </div>
        </div>

        {/* Interactive PDF Document Preview Frame */}
        <div className="bg-[#0c0c0c] border border-white/15 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative">
          {/* Top Window Bar */}
          <div className="bg-[#141414] px-6 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs font-mono text-gray-400 ml-2">
                ayush_jawane_resume.pdf
              </span>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono text-gray-400">
              <span className="flex items-center space-x-1 text-[#00FF87]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Upload</span>
              </span>
            </div>
          </div>

          {/* Embedded PDF iframe */}
          <div className="relative w-full bg-[#1e1e1e] min-h-[750px] sm:min-h-[900px] flex items-center justify-center">
            <iframe
              src="/resume.pdf#view=FitH"
              title="Ayush Jawane Official Resume"
              className="w-full h-[750px] sm:h-[950px] border-none"
              onLoad={() => setIframeLoaded(true)}
            />

            {/* Fallback overlay for mobile devices that do not render inline PDFs */}
            <div className="sm:hidden absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/90 border border-white/15 backdrop-blur-md text-center">
              <p className="text-xs text-gray-300 font-mono mb-2">
                Viewing on mobile? Tap below to view or download:
              </p>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Ayush_Jawane_Resume.pdf"
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#00FF87] text-black font-kanit font-bold text-xs uppercase"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD OFFICIAL RESUME</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
