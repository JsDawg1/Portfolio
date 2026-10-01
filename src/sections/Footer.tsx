import React from 'react';
import { PERSONAL_INFO } from '../data/portfolio';
import { ArrowUp, Terminal, Shield } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TryHackMeIcon } from '../components/Icons';

interface FooterProps {
  onLogoClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLogoClick }) => {
  return (
    <footer className="hairline-t bg-paper select-none">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Monogram Easter-Egg Trigger Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={onLogoClick}
            aria-label="S.U. Jaya Harish — Home"
            title="Click 5 times for CRT Terminal Mode"
            className="min-h-[44px] min-w-[44px] font-mono font-bold text-[16px] tracking-[0.08em] cursor-pointer select-none text-ink hover:text-pine transition-colors inline-flex items-center"
          >
            <span>{PERSONAL_INFO.shortName}</span>
            <span className="text-pine font-bold ml-0.5">_</span>
          </button>

          <div className="text-left font-mono text-[11px] text-ink/50 leading-relaxed">
            <p>
              © {new Date().getFullYear()} {PERSONAL_INFO.displayName} · Chennai, Tamil Nadu
            </p>
            <p className="text-[10px] text-ink/40">
              COORDINATES: {PERSONAL_INFO.coordinates} · SOC / BLUE TEAM
            </p>
          </div>
        </div>

        {/* Links & Back to Top */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-[11px] uppercase tracking-[0.14em]">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/65 hover:text-ink transition-colors min-h-[44px] inline-flex items-center gap-1.5"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/65 hover:text-ink transition-colors min-h-[44px] inline-flex items-center gap-1.5"
          >
            <LinkedinIcon className="w-3.5 h-3.5 text-pine" />
            <span>LinkedIn</span>
          </a>

          <a
            href={PERSONAL_INFO.tryhackme}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/65 hover:text-ink transition-colors min-h-[44px] inline-flex items-center gap-1.5"
          >
            <TryHackMeIcon className="w-3.5 h-3.5 text-pine" />
            <span>TryHackMe</span>
          </a>

          <a
            href="#top"
            className="text-ink/65 hover:text-pine transition-colors min-h-[44px] inline-flex items-center gap-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};
