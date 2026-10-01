import React from 'react';
import { PROJECTS } from '../data/portfolio';
import { ProjectCase } from '../types';
import { CodeCard } from '../components/CodeCard';
import { ScorePlate } from '../components/ScorePlate';
import { ArrowUpRight, ShieldCheck, Terminal, Layers, CheckCircle2 } from 'lucide-react';

interface ProjectsProps {
  onOpenCase: (project: ProjectCase) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onOpenCase }) => {
  return (
    <section id="projects" className="hairline-t bg-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-left">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-3">
              03 / Controlled Lab Implementations
            </p>
            <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-ink leading-tight">
              Two defensive security engineering cases.
            </h2>
          </div>
          <div className="font-mono text-xs text-ink/50">
            [CLICK CARDS FOR DEEP DIVE AUDIT]
          </div>
        </div>

        {/* Project Cards List */}
        <div className="space-y-12">
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              className="group hairline rounded-lg bg-paper overflow-hidden flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:border-ink/40 text-left cursor-pointer"
              onClick={() => onOpenCase(project)}
            >
              {/* Card Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between px-5 sm:px-8 py-4 hairline-b bg-paper-sub/60">
                <div className="flex items-center gap-3">
                  <ScorePlate index={project.num} label="DEFENSE CASE" value={project.category} small />
                  <span className="font-mono text-xs text-ink/50">
                    {project.period}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-2 sm:mt-0 font-mono text-[11px] uppercase tracking-wider text-pine font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>Open Deep Dive</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Body 2-Column Layout */}
              <div className="p-5 sm:p-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
                {/* Left: Project Details */}
                <div className="space-y-5">
                  <div>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-ink tracking-tight group-hover:text-pine transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm sm:text-base text-ink/75 leading-relaxed mt-2">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-ink/70 leading-relaxed font-sans">
                    {project.summary}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 pt-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40 block mb-1">
                      Key Highlights & Defensive Activities
                    </span>
                    {project.keyHighlights.slice(0, 3).map((hl, hlIdx) => (
                      <div key={hlIdx} className="flex items-start gap-2 text-xs sm:text-sm text-ink/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-pine shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Technology Badges */}
                  <div className="pt-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/40 block mb-2">
                      Environment & Utilities
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-[2px] font-mono text-[11px] uppercase tracking-wide bg-paper hairline text-ink/80 group-hover:border-ink/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Code / Telemetry Preview */}
                <div className="w-full">
                  <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-ink/40">
                    <span>EXECUTION TELEMETRY</span>
                    <span className="text-pine font-medium">VERIFIED ARTIFACT</span>
                  </div>
                  <CodeCard cover={project.coverCode} title={project.coverCode.lang.toUpperCase()} />
                  <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-ink/50 px-1">
                    <span>Target: {project.verificationMetrics[0]?.detail.slice(0, 35)}...</span>
                    <span className="text-pine underline decoration-pine/30">Inspect Logs →</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="px-5 sm:px-8 py-3.5 hairline-t bg-paper flex items-center justify-between text-xs font-mono text-ink/50">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-pine" />
                  Verified Lab Case #{project.id}
                </span>
                <span className="text-ink/70 group-hover:text-pine transition-colors font-medium">
                  Click to inspect full audit trace & metrics →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
