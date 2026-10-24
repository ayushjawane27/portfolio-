import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, School, BookOpen } from 'lucide-react';

export const Education: React.FC = () => {
  const { education } = portfolioData;

  return (
    <section id="education" className="py-24 relative bg-[#080808] border-t border-white/5">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#00F0FF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00FF87] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
            <span>05 // ACADEMICS</span>
          </div>
          <h2 className="font-kanit font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            EDUCATION & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF87] to-[#00F0FF]">BACKGROUND</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light max-w-xl mt-2">
            Academic degrees and rigorous curriculum in Artificial Intelligence and Computer Science.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00FF87] to-transparent mt-3" />
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, idx) => (
            <div
              key={edu.id}
              className="bg-[#0c0c0c] border border-white/10 hover:border-[#00FF87]/40 rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#00FF87] group-hover:scale-110 transition-transform">
                    {idx === 0 ? <GraduationCap className="w-6 h-6" /> : <School className="w-6 h-6" />}
                  </div>
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                    <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <h3 className="font-kanit font-bold text-2xl text-white uppercase tracking-wide mb-2 group-hover:text-[#00FF87] transition-colors">
                  {edu.degree}
                </h3>

                <div className="flex items-center space-x-2 text-sm font-mono text-[#00FF87] mb-4">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{edu.institution}</span>
                </div>

                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  {edu.gradeOrFocus}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-400">
                <span className="flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>{idx === 0 ? 'Engineering Degree' : 'Senior Secondary'}</span>
                </span>
                <span className="text-[#00FF87]">Verified Record</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
