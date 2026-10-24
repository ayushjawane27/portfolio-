import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import {
  Code,
  Server,
  Layout,
  Database,
  Wrench,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

type SkillCategory = 'all' | 'programming' | 'backend' | 'frontend' | 'database' | 'tools' | 'competencies';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const { skills } = portfolioData;

  const categories = [
    { key: 'all', label: 'ALL SKILLS', icon: Layers },
    { key: 'programming', label: 'LANGUAGES', icon: Code },
    { key: 'backend', label: 'BACKEND & APIS', icon: Server },
    { key: 'frontend', label: 'FRONTEND', icon: Layout },
    { key: 'database', label: 'DATABASES', icon: Database },
    { key: 'tools', label: 'TOOLS & IDES', icon: Wrench },
    { key: 'competencies', label: 'CORE CONCEPTS', icon: Cpu },
  ];

  const getAllSkills = () => {
    return [
      ...skills.programming.map((s) => ({ ...s, group: 'Languages' })),
      ...skills.backend.map((s) => ({ ...s, group: 'Backend' })),
      ...skills.frontend.map((s) => ({ ...s, group: 'Frontend' })),
      ...skills.database.map((s) => ({ ...s, group: 'Databases' })),
      ...skills.tools.map((s) => ({ ...s, group: 'Tools' })),
      ...skills.competencies.map((s) => ({ ...s, group: 'Core Concepts' })),
    ];
  };

  const getFilteredSkills = () => {
    if (activeCategory === 'all') return getAllSkills();
    return skills[activeCategory].map((s) => ({ ...s, group: activeCategory }));
  };

  const displayedSkills = getFilteredSkills();

  return (
    <section id="skills" className="py-24 relative bg-[#080808] border-t border-white/5">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00FF87] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
            <span>02 // CAPABILITIES</span>
          </div>
          <h2 className="font-kanit font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF87] via-[#00F0FF] to-purple-400">SKILLS</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light max-w-xl mt-2">
            Grounded directly in Ayush's verified resume and engineering project deliverables.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00FF87] to-transparent mt-3" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key as SkillCategory)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-kanit font-semibold tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-[#00FF87]/20 border border-[#00FF87] text-[#00FF87] shadow-lg shadow-[#00FF87]/10'
                    : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedSkills.map((skill, index) => (
            <div
              key={`${skill.name}-${index}`}
              className="bg-[#0c0c0c] border border-white/10 hover:border-[#00FF87]/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,255,135,0.08)] group relative overflow-hidden"
            >
              {/* Top Row: Name & Level Badge */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-kanit font-bold text-xl text-white tracking-wide group-hover:text-[#00FF87] transition-colors">
                  {skill.name}
                </h3>
                <span
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                    skill.level === 'Advanced'
                      ? 'bg-[#00FF87]/15 text-[#00FF87] border-[#00FF87]/40'
                      : 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/40'
                  }`}
                >
                  {skill.level}
                </span>
              </div>

              {/* Group category indicator */}
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">
                {skill.group}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-xs font-light leading-relaxed">
                {skill.desc}
              </p>

              {/* Bottom Subtle Bar */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-400 flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-[#00FF87]" />
                  <span>Production Verified</span>
                </span>
                <span className="text-[10px] font-mono text-[#00FF87]/70 opacity-0 group-hover:opacity-100 transition-opacity">
                  Ayush Jawane
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
