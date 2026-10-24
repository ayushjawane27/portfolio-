import React from 'react';
import { portfolioData } from '../data/portfolioData';
import {
  GraduationCap,
  MapPin,
  Code2,
  Brain,
  Download,
  Languages,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

export const About: React.FC = () => {
  const { personal, softSkills, languages } = portfolioData;

  return (
    <section id="about" className="py-24 relative bg-[#080808] border-t border-white/5">
      {/* Subtle Glows */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-[#00FF87]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00FF87] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
            <span>01 // PROFILE & BACKGROUND</span>
          </div>
          <h2 className="font-kanit font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF87] to-[#00F0FF]">AYUSH</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00FF87] to-transparent mt-3" />
        </div>

        {/* Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Bio Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative overflow-hidden group hover:border-[#00FF87]/30 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF87]/5 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="font-kanit font-bold text-2xl sm:text-3xl text-white uppercase tracking-wider mb-6 flex items-center space-x-3">
              <span className="text-[#00FF87]">#</span>
              <span>Software Developer & AI/ML Engineer</span>
            </h3>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light mb-6">
              {personal.summary}
            </p>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-light mb-8">
              Based in <span className="text-white font-medium">Rau, Indore</span>, I combine clean object-oriented architecture in <span className="text-[#00FF87] font-mono">Java & Spring Boot</span> with modern machine learning methodologies in <span className="text-[#00F0FF] font-mono">Python</span>. Whether building robust REST APIs, optimizing relational schemas in MySQL/PostgreSQL, or developing context-aware NLP models, my objective is delivering scalable, production-grade solutions.
            </p>

            {/* Quick Fact Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#00FF87]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-gray-400 uppercase block">College & Degree</span>
                  <span className="text-xs font-semibold text-white">IPS Academy, Indore (2027)</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#00F0FF]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-gray-400 uppercase block">Location</span>
                  <span className="text-xs font-semibold text-white">Rau, Indore, MP, India</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Ayush_Jawane_Resume.pdf"
                className="px-6 py-3 rounded-full border border-[#00FF87]/50 bg-[#00FF87]/10 hover:bg-[#00FF87]/20 text-[#00FF87] font-kanit font-bold text-xs tracking-widest uppercase flex items-center space-x-2 transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD VERIFIED RESUME</span>
              </a>
            </div>
          </div>

          {/* Right Column: Soft Skills, Languages & Focus (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Core Competencies Box */}
            <div className="bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center space-x-2.5 mb-4">
                <div className="p-2 rounded-xl bg-[#00FF87]/10 text-[#00FF87]">
                  <Code2 className="w-4 h-4" />
                </div>
                <h4 className="font-kanit font-bold text-lg text-white uppercase tracking-wider">
                  Professional Competencies
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {softSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-300 font-mono"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF87] shrink-0" />
                    <span className="truncate">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages Box */}
            <div className="bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center space-x-2.5 mb-4">
                <div className="p-2 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
                  <Languages className="w-4 h-4" />
                </div>
                <h4 className="font-kanit font-bold text-lg text-white uppercase tracking-wider">
                  Languages
                </h4>
              </div>

              <div className="space-y-3">
                {languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <span className="font-kanit font-semibold text-sm text-white">
                      {lang.name}
                    </span>
                    <span className="text-xs font-mono text-[#00F0FF] px-2.5 py-0.5 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Academic Status */}
            <div className="bg-gradient-to-br from-purple-900/20 via-[#0c0c0c] to-black border border-purple-500/20 rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center space-x-2.5 mb-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="font-kanit font-bold text-sm text-purple-300 uppercase tracking-wider">
                  Academic Trajectory
                </span>
              </div>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Currently engaged in advanced study of Neural Networks, Natural Language Processing, Microservice architecture, and enterprise software engineering at IPS Academy, Indore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
