import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Briefcase, Calendar, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export const Experience: React.FC = () => {
  const { internships } = portfolioData;

  return (
    <section id="internships" className="py-24 relative bg-[#080808] border-t border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00FF87] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
            <span>03 // WORK HISTORY</span>
          </div>
          <h2 className="font-kanit font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            PROFESSIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF87] to-[#00F0FF]">INTERNSHIPS</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light max-w-xl mt-2">
            Verified corporate internships in Software Engineering and Artificial Intelligence.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00FF87] to-transparent mt-3" />
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {internships.map((intern, index) => (
            <div key={intern.id} className="relative group">
              {/* Timeline Pin/Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#080808] border-2 border-[#00FF87] flex items-center justify-center shadow-[0_0_12px_#00FF87] group-hover:scale-125 transition-transform">
                <div className="w-2 h-2 rounded-full bg-[#00FF87]" />
              </div>

              {/* Experience Card */}
              <div className="bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-[#00FF87]/40 transition-all shadow-xl hover:shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                  <div>
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-[#00FF87] uppercase mb-2">
                      <Building className="w-3 h-3" />
                      <span>{intern.company}</span>
                    </span>
                    <h3 className="font-kanit font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide group-hover:text-[#00FF87] transition-colors">
                      {intern.role}
                    </h3>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                      <Calendar className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>{intern.period}</span>
                    </div>
                    {intern.internshipId && (
                      <span className="text-[11px] font-mono text-purple-400 mt-1 flex items-center space-x-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>ID: {intern.internshipId}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                  {intern.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start space-x-3 text-sm text-gray-300 font-light leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-[#00FF87] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {intern.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
