import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, ShieldCheck, CheckCircle2, Trophy, BookMarked } from 'lucide-react';

export const Certifications: React.FC = () => {
  const { certifications } = portfolioData;

  const getIcon = (id: string) => {
    switch (id) {
      case 'hp-life':
        return <Award className="w-6 h-6 text-[#00FF87]" />;
      case 'rdbms-postgres':
        return <ShieldCheck className="w-6 h-6 text-[#00F0FF]" />;
      case 'division-quiz':
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      default:
        return <BookMarked className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="certifications" className="py-24 relative bg-[#080808] border-t border-white/5">
      {/* Background Accent */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00FF87] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
            <span>06 // CREDENTIALS</span>
          </div>
          <h2 className="font-kanit font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            CERTIFICATIONS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF87] to-[#00F0FF]">AWARDS</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light max-w-xl mt-2">
            Verified technical training courses and academic recognitions.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00FF87] to-transparent mt-3" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="bg-[#0c0c0c] border border-white/10 hover:border-[#00FF87]/40 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                    {getIcon(cert.id)}
                  </div>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00FF87] uppercase">
                    {cert.badge}
                  </span>
                </div>

                <h3 className="font-kanit font-bold text-xl text-white uppercase tracking-wide mb-2 group-hover:text-[#00FF87] transition-colors">
                  {cert.title}
                </h3>

                <p className="text-gray-400 text-sm font-mono leading-relaxed">
                  {cert.issuer}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-gray-500">
                <span className="flex items-center space-x-1.5 text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF87]" />
                  <span>Credential Verified</span>
                </span>
                <span className="text-[#00FF87]">Ayush Jawane</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
