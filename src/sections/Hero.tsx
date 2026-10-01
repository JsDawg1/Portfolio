import React from 'react';
import { PERSONAL_INFO, HIGHLIGHT_STATS } from '../data/portfolio';
import { HeroTerminal } from '../components/HeroTerminal';
import { ScorePlate } from '../components/ScorePlate';
import { ArrowDown, Shield, Terminal, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

export const Hero: React.FC = () => {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 sm:pt-16 pb-14 sm:pb-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12 items-start">
        {/* Left Column: Information & CTAs */}
        <div className="flex flex-col justify-start text-left">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-pine animate-pulse" />
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/50">
              Cybersecurity · SOC / Blue Team · Chennai, IN
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="font-display font-extrabold tracking-[-0.035em] leading-[1.04] text-[2.5rem] sm:text-5xl lg:text-[3.9rem] text-ink">
            Defending systems through rigorous <span className="text-pine inline-block">telemetry</span> and security monitoring.
          </h1>

          {/* Bio paragraph */}
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink/75 max-w-xl font-sans">
            Computer Science graduate and CompTIA Security+ certified defender. Specialized in Blue Team operations, network security, host firewall policy design, and hands-on vulnerability assessments across controlled laboratory environments.
          </p>

          {/* Industrial Metric Plates (ScorePlates) */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 max-w-xl">
            {HIGHLIGHT_STATS.map((stat) => (
              <ScorePlate
                key={stat.index}
                index={stat.index}
                label={stat.label}
                value={stat.value}
                sub={stat.sub}
                small
              />
            ))}
          </div>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="min-h-[48px] px-6 inline-flex items-center justify-center gap-2 bg-pine text-paper font-display font-semibold tracking-tight rounded-[3px] hover:bg-pine-dark transition-all duration-200 shadow-sm cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-5 inline-flex items-center justify-center gap-2 bg-paper text-ink font-mono text-[12px] uppercase tracking-wider rounded-[3px] hairline hover:border-ink/50 hover:bg-black/[0.02] transition-all duration-200"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-ink/40" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] px-4 inline-flex items-center justify-center gap-1.5 text-ink/60 hover:text-ink font-mono text-[11px] uppercase tracking-wider transition-colors"
            >
              <LinkedinIcon className="w-4 h-4 text-pine" />
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Coordinate Detail */}
          <div className="mt-8 pt-4 border-t border-hairline flex items-center gap-3 text-xs font-mono text-ink/40">
            <span className="font-semibold text-ink/60">RADAR LOCK:</span>
            <span>{PERSONAL_INFO.coordinates}</span>
            <span className="text-ink/20">|</span>
            <span className="text-pine">STATUS: OPERATIONAL</span>
          </div>
        </div>

        {/* Right Column: Interactive Terminal Simulation */}
        <div className="w-full lg:sticky lg:top-24">
          <HeroTerminal />
        </div>
      </div>
    </section>
  );
};
