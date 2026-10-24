import React, { useState } from 'react';
import { portfolioData, FAQItem } from '../data/portfolioData';
import {
  MessageSquare,
  X,
  Search,
  Volume2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Download,
  Mail,
} from 'lucide-react';

export const FAQAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const { faq, personal } = portfolioData;

  const filteredFaq = faq.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const speakAnswer = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-[#00FF87] to-[#00F0FF] text-black shadow-[0_10px_30px_rgba(0,255,135,0.4)] hover:scale-110 transition-transform flex items-center justify-center group"
        title="Open Portfolio Assistant"
        aria-label="Portfolio FAQ Assistant"
      >
        <Sparkles className="w-5 h-5 text-black group-hover:rotate-12 transition-transform" />
      </button>

      {/* Floating Assistant Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-md bg-[#0f0f0f]/98 border border-[#00FF87]/40 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl p-6 animate-slideUp">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#00FF87]/20 border border-[#00FF87]/50 flex items-center justify-center text-[#00FF87]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-kanit font-bold text-sm tracking-wider text-white uppercase">
                  PORTFOLIO FAQ ASSISTANT
                </h3>
                <span className="text-[10px] font-mono text-[#00FF87]">
                  Grounded in Ayush's Real Resume
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
                setIsOpen(false);
              }}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills, projects, college, internships..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00FF87] font-light"
            />
          </div>

          {/* Quick Filter Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {['Skills', 'Projects', 'Experience', 'Education', 'Resume'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchQuery(cat)}
                className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#00FF87]/15 text-gray-400 hover:text-[#00FF87] border border-white/5 transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
            {filteredFaq.length > 0 ? (
              filteredFaq.map((item, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <div
                    key={index}
                    className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpandedIndex(isExpanded ? null : index)}
                      className="w-full p-3.5 text-left flex items-center justify-between text-xs font-kanit font-semibold text-white tracking-wide"
                    >
                      <span className="pr-2">{item.question}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-[#00FF87] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-3.5 pb-3.5 pt-1 text-xs text-gray-300 font-light leading-relaxed border-t border-white/5">
                        <p className="mb-3">{item.answer}</p>
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <button
                            onClick={() => speakAnswer(item.answer)}
                            className="flex items-center space-x-1.5 text-[11px] font-mono text-[#00FF87] hover:underline"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Read Aloud</span>
                          </button>
                          <span className="text-[10px] font-mono text-gray-400">
                            Category: {item.category}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-center text-xs font-mono text-gray-400 py-6">
                No matching answers. Try searching for "Java", "Projects", or "InternPe".
              </p>
            )}
          </div>

          {/* Footer Quick Links */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Ayush_Jawane_Resume.pdf"
              className="text-[#00FF87] hover:underline flex items-center space-x-1"
            >
              <Download className="w-3 h-3" />
              <span>Resume PDF</span>
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-gray-400 hover:text-white flex items-center space-x-1"
            >
              <Mail className="w-3 h-3" />
              <span>Direct Email</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
