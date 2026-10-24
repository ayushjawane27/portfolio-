import React, { useState } from 'react';
import { portfolioData, Project } from '../data/portfolioData';
import {
  ExternalLink,
  Github,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  X,
  CheckCircle,
  ArrowUpRight,
} from 'lucide-react';

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai-ml' | 'fullstack' | 'backend'>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 relative bg-[#080808] border-t border-white/5">
      {/* Background Accent */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00FF87]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00FF87] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
            <span>04 // PORTFOLIO WORK</span>
          </div>
          <h2 className="font-kanit font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF87] via-[#00F0FF] to-purple-400">PROJECTS</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light max-w-2xl mt-2">
            Engineered using modern Java, Python, REST APIs, and Machine Learning algorithms.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00FF87] to-transparent mt-3" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {[
            { key: 'all', label: 'ALL PROJECTS (4)' },
            { key: 'ai-ml', label: 'AI & MACHINE LEARNING' },
            { key: 'fullstack', label: 'FULL STACK WEB' },
            { key: 'backend', label: 'FINANCIAL & BACKEND' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`px-4 py-2 rounded-xl text-xs font-kanit font-semibold tracking-wider uppercase transition-all ${
                activeFilter === tab.key
                  ? 'bg-[#00FF87]/20 border border-[#00FF87] text-[#00FF87] shadow-lg shadow-[#00FF87]/10'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="bg-[#0c0c0c] border border-white/10 hover:border-[#00FF87]/50 rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.9)] group relative overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#00FF87] uppercase tracking-wider">
                  0{index + 1} // {project.category.toUpperCase()}
                </span>
                <span className="text-[11px] font-mono text-gray-400">
                  Ayush Jawane
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-4">
                <h3 className="font-kanit font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide group-hover:text-[#00FF87] transition-colors flex items-center justify-between">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#00FF87] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                <span className="text-xs font-mono text-[#00F0FF] block mt-1">
                  {project.subtitle}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm font-light leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Key Deliverable Bullets */}
              <ul className="space-y-2.5 mb-6 text-xs text-gray-400 font-light">
                {project.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] shrink-0 mt-1.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Metrics Badge */}
              {project.metrics && (
                <div className="mb-6 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-2.5 text-xs font-mono text-gray-300">
                  <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span className="truncate">{project.metrics}</span>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-[10px] font-mono text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-kanit font-bold tracking-widest text-[#00FF87] hover:underline uppercase flex items-center space-x-1"
                >
                  <span>VIEW DETAILS</span>
                </button>

                <div className="flex items-center space-x-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 text-gray-300 hover:text-white transition-all"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0f0f0f] border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="mb-4">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/30 uppercase">
                {selectedProject.category.toUpperCase()}
              </span>
              <h3 className="font-kanit font-black text-3xl sm:text-4xl text-white uppercase tracking-tight mt-3">
                {selectedProject.title}
              </h3>
              <p className="text-sm font-mono text-[#00F0FF] mt-1">
                {selectedProject.subtitle}
              </p>
            </div>

            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            <h4 className="font-kanit font-bold text-sm tracking-widest text-white uppercase mb-3">
              Key Engineering Accomplishments:
            </h4>
            <ul className="space-y-3 mb-6">
              {selectedProject.bullets.map((b, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-gray-300 font-light">
                  <CheckCircle className="w-4 h-4 text-[#00FF87] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {selectedProject.metrics && (
              <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-[11px] font-mono text-gray-400 uppercase block mb-1">
                  Validated Performance Metric
                </span>
                <span className="text-sm font-mono text-yellow-400 font-semibold">
                  {selectedProject.metrics}
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-gray-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <a
                href={selectedProject.githubUrl || portfolioData.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full btn-amit-gradient text-white text-xs font-kanit font-bold tracking-widest uppercase flex items-center space-x-2"
              >
                <Github className="w-4 h-4" />
                <span>OPEN GITHUB PROFILE</span>
              </a>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
