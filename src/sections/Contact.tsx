import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolio';
import { Mail, Phone, MapPin, Copy, Check, Send, ArrowUpRight, Compass } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TryHackMeIcon } from '../components/Icons';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roleType: 'SOC Analyst / Blue Team Opportunity',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const generateMailto = () => {
    const subject = encodeURIComponent(`Inquiry: ${formData.roleType} — via Portfolio`);
    const body = encodeURIComponent(
      `Hello Jaya Harish,\n\nName: ${formData.name || 'N/A'}\nEmail: ${formData.email || 'N/A'}\nTopic: ${formData.roleType}\n\nMessage:\n${formData.message}\n`
    );
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.location.href = generateMailto();
  };

  return (
    <section id="contact" className="hairline-t bg-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start text-left">
          {/* Left Column: Direct Credentials & Coordinates */}
          <div className="space-y-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-3">
                07 / Communication Channel
              </p>
              <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-ink leading-tight">
                Initiate contact for defensive security & SOC roles.
              </h2>
              <p className="mt-4 text-ink/70 leading-relaxed font-sans max-w-md">
                Open to discuss SOC Analyst, Blue Team operations, vulnerability identification, or network engineering opportunities.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3 font-mono text-sm pt-2">
              {/* Email Card with Copy Button */}
              <div className="p-3.5 rounded hairline bg-paper flex items-center justify-between group hover:border-ink/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-pine/10 flex items-center justify-center text-pine">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-ink/40">Direct Email</span>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="font-medium text-ink hover:text-pine transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-2.5 py-1.5 rounded-[2px] hairline text-xs text-ink/70 hover:text-ink hover:bg-black/5 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-pine" />
                      <span className="text-pine font-semibold text-[11px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-ink/40" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-3.5 rounded hairline bg-paper flex items-center justify-between group hover:border-ink/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-pine/10 flex items-center justify-center text-pine">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-ink/40">Telephone</span>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="font-medium text-ink hover:text-pine transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-ink/40 uppercase">INDIA (+91)</span>
              </div>

              {/* Location & Coordinates Card */}
              <div className="p-3.5 rounded hairline bg-paper flex items-center justify-between group hover:border-ink/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-pine/10 flex items-center justify-center text-pine">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-ink/40">Geographic Base</span>
                    <span className="font-medium text-ink">{PERSONAL_INFO.location}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-pine uppercase font-semibold">CHENNAI</span>
              </div>
            </div>

            {/* Social & Code Profiles */}
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[3px] hairline bg-paper text-ink font-mono text-[11px] uppercase tracking-wider hover:border-ink/50 hover:bg-black/[0.02] flex items-center gap-2 transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-ink/40" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[3px] hairline bg-paper text-ink font-mono text-[11px] uppercase tracking-wider hover:border-ink/50 hover:bg-black/[0.02] flex items-center gap-2 transition-all"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-pine" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-ink/40" />
              </a>

              <a
                href={PERSONAL_INFO.tryhackme}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[3px] hairline bg-paper text-ink font-mono text-[11px] uppercase tracking-wider hover:border-ink/50 hover:bg-black/[0.02] flex items-center gap-2 transition-all"
              >
                <TryHackMeIcon className="w-3.5 h-3.5 text-pine" />
                <span>TryHackMe</span>
                <ArrowUpRight className="w-3 h-3 text-ink/40" />
              </a>
            </div>

            {/* Radar Coordinates Box */}
            <div className="p-3 rounded bg-paper-sub hairline font-mono text-[11px] text-ink/50 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-pine" />
                COORDINATES: {PERSONAL_INFO.coordinates}
              </span>
              <span className="text-pine font-medium">FIXED</span>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Dispatch Form */}
          <div className="p-6 sm:p-8 rounded-lg hairline bg-paper shadow-sm">
            <h3 className="font-display font-extrabold text-xl text-ink tracking-tight mb-2">
              Transmit Direct Dispatch
            </h3>
            <p className="text-xs text-ink/60 font-sans mb-6">
              Complete the fields below to launch a pre-formatted email directly to Jaya Harish.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="field">
                <input
                  id="name"
                  type="text"
                  required
                  placeholder=" "
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <label htmlFor="name">Your Name / Organization</label>
              </div>

              <div className="field">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder=" "
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <label htmlFor="email">Your Email Address</label>
              </div>

              <div className="field">
                <select
                  id="roleType"
                  value={formData.roleType}
                  onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
                  className="filled"
                >
                  <option value="SOC Analyst / Blue Team Opportunity">SOC Analyst / Blue Team Opportunity</option>
                  <option value="Network Security Lab Consultation">Network Security Lab Consultation</option>
                  <option value="Vulnerability Assessment Project">Vulnerability Assessment Project</option>
                  <option value="General Professional Discussion">General Professional Discussion</option>
                </select>
                <label htmlFor="roleType">Inquiry Classification</label>
              </div>

              <div className="field">
                <textarea
                  id="message"
                  required
                  placeholder=" "
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <label htmlFor="message">Message / Scope / Opportunity Details</label>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="submit"
                  className="min-h-[48px] px-6 rounded-[3px] bg-pine text-paper font-display font-semibold tracking-tight hover:bg-pine-dark transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Dispatch</span>
                </button>

                <a
                  href={generateMailto()}
                  className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink/55 hover:text-pine transition-colors min-h-[44px] inline-flex items-center justify-center"
                >
                  or open mail client directly →
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
