import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Download,
  Send,
  CheckCircle,
  Copy,
  ExternalLink,
} from 'lucide-react';

export const Contact: React.FC = () => {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Trigger honest mailto client with pre-filled content
    const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#080808] border-t border-white/5">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#00FF87]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-[#00FF87] uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87]" />
            <span>07 // REACH OUT</span>
          </div>
          <h2 className="font-kanit font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF87] via-[#00F0FF] to-purple-400">TOUCH</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base font-light max-w-xl mt-2">
            Open for software engineering positions, internships, and high-impact developer opportunities.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-[#00FF87] to-transparent mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Email Card */}
            <div className="bg-[#0c0c0c] border border-white/10 hover:border-[#00FF87]/40 rounded-3xl p-6 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-[#00FF87]/10 text-[#00FF87]">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={() => copyToClipboard(personal.email)}
                  className="flex items-center space-x-1 text-[11px] font-mono text-gray-400 hover:text-[#00FF87] transition-colors"
                  title="Copy email to clipboard"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                Primary Email
              </span>
              <a
                href={`mailto:${personal.email}`}
                className="font-kanit font-bold text-lg text-white hover:text-[#00FF87] transition-colors break-all"
              >
                {personal.email}
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-[#0c0c0c] border border-white/10 hover:border-[#00F0FF]/40 rounded-3xl p-6 transition-all group">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-2xl bg-[#00F0FF]/10 text-[#00F0FF]">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-gray-400">
                  Call or WhatsApp
                </span>
              </div>

              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                Phone Number
              </span>
              <a
                href={`tel:${personal.phone}`}
                className="font-kanit font-bold text-lg text-white hover:text-[#00F0FF] transition-colors"
              >
                {personal.phone}
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-[#0c0c0c] border border-white/10 rounded-3xl p-6 transition-all">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 w-fit mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block">
                Location & Coordinates
              </span>
              <p className="font-kanit font-semibold text-base text-white">
                {personal.location}
              </p>
            </div>

            {/* Social Links Bar */}
            <div className="flex items-center gap-3">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-[#00FF87]/50 text-gray-300 hover:text-white flex items-center justify-center space-x-2 transition-all group"
              >
                <Linkedin className="w-4 h-4 text-[#00FF87]" />
                <span className="font-kanit font-bold text-xs uppercase tracking-wider">LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-[#00F0FF]/50 text-gray-300 hover:text-white flex items-center justify-center space-x-2 transition-all group"
              >
                <Github className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-kanit font-bold text-xs uppercase tracking-wider">GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Resume Button */}
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Ayush_Jawane_Resume.pdf"
              className="w-full py-4 rounded-2xl border border-[#00FF87]/40 bg-[#00FF87]/10 hover:bg-[#00FF87]/20 text-[#00FF87] font-kanit font-bold text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] shadow-lg shadow-[#00FF87]/15"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD VERIFIED RESUME (PDF)</span>
            </a>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl relative">
            <h3 className="font-kanit font-bold text-2xl text-white uppercase tracking-wider mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs font-mono text-gray-400 mb-8">
              Fill in the form to start an email thread with Ayush immediately.
            </p>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#00FF87]/10 border border-[#00FF87]/40 text-center animate-fadeIn">
                <CheckCircle className="w-12 h-12 text-[#00FF87] mx-auto mb-3" />
                <h4 className="font-kanit font-bold text-xl text-white uppercase mb-1">
                  Email Client Initiated!
                </h4>
                <p className="text-xs font-mono text-gray-300">
                  Your email client has opened with the message pre-filled for ayush.jawane27@gmail.com.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 rounded-xl bg-white/10 text-white text-xs font-mono hover:bg-white/20 transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-sm font-light transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-sm font-light transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Software Engineering Opportunity / Project Discussion"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-sm font-light transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Ayush, we reviewed your projects and would like to discuss..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-[#00FF87] focus:outline-none text-white text-sm font-light transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-xs font-kanit font-bold tracking-[0.2em] text-white uppercase btn-amit-gradient flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT MESSAGE TO AYUSH</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
