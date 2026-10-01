import React, { useEffect, useState } from 'react';
import { ProjectCase } from '../types';
import { ScorePlate } from './ScorePlate';
import { CodeCard } from './CodeCard';
import { X, ShieldCheck, CheckCircle2, Terminal, ArrowRight, ExternalLink } from 'lucide-react';

interface CaseOverlayProps {
  project: ProjectCase | null;
  onClose: () => void;
}

export const CaseOverlay: React.FC<CaseOverlayProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'steps' | 'telemetry'>('overview');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-overlay-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-paper text-ink rounded-lg shadow-2xl hairline overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 hairline-b bg-paper/95 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <ScorePlate index={project.num} label="PROJECT LAB" value={project.category} small />
            <span className="hidden sm:inline-block font-mono text-[11px] text-ink/40 tracking-wider">
              {project.period}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-[3px] text-ink/65 hover:text-ink hover:bg-black/5 hairline transition-colors"
              aria-label="Close project view"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-8 text-left">
          {/* Main Title & Subtitle */}
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-2">
              {project.scope}
            </p>
            <h2 id="case-overlay-title" className="font-display font-extrabold text-2xl sm:text-3xl text-ink tracking-tight">
              {project.title}
            </h2>
            <p className="mt-2 text-base text-ink/75 leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-[2px] font-mono text-[10.5px] uppercase tracking-wider bg-black/5 text-ink/80 hairline"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex border-b border-hairline gap-2 pt-2">
            {[
              { id: 'overview', label: 'Lab Overview & Findings' },
              { id: 'steps', label: 'Execution & Investigation Phases' },
              { id: 'telemetry', label: 'Code & Audit Telemetry' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2.5 px-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors relative cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-pine font-semibold'
                    : 'text-ink/50 hover:text-ink'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-pine" />
                )}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-[#F6F6F2] p-4 sm:p-5 rounded hairline">
                <h3 className="font-mono text-xs uppercase tracking-wider text-pine font-semibold mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> Lab Objective & Execution Context
                </h3>
                <p className="text-sm leading-relaxed text-ink/80">
                  {project.summary}
                </p>
              </div>

              <div>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink/50 mb-3">
                  Key Technical Activities & Results
                </h3>
                <ul className="space-y-2.5">
                  {project.keyHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <CheckCircle2 className="w-4 h-4 text-pine shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {project.verificationMetrics.map((vm, idx) => (
                  <div key={idx} className="p-3.5 rounded hairline bg-paper">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-ink/45">
                      {vm.label}
                    </span>
                    <span className="block font-mono text-[12px] font-semibold text-ink mt-1">
                      {vm.detail}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Investigation Phases */}
          {activeTab === 'steps' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {project.investigationSteps.map((step, idx) => (
                <div key={idx} className="p-4 rounded hairline bg-paper space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-pine flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-pine/10 text-pine inline-flex items-center justify-center text-[10px]">
                        0{idx + 1}
                      </span>
                      {step.phase}
                    </span>
                    <div className="flex gap-1.5">
                      {step.tools.map((t) => (
                        <span key={t} className="font-mono text-[9.5px] px-1.5 py-0.5 bg-black/5 text-ink/70 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-ink/75">{step.description}</p>
                  <div className="pt-1 space-y-1">
                    {step.outcomes.map((o, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2 font-mono text-[11px] text-ink/70">
                        <span className="text-pine font-bold">›</span>
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Code & Telemetry Audit */}
          {activeTab === 'telemetry' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <p className="text-sm text-ink/70 font-sans">
                Sample command syntax, rule definitions, and audit verifications executed during this project:
              </p>
              <CodeCard cover={project.coverCode} title={project.coverCode.lang.toUpperCase()} />
              <div className="p-3.5 rounded bg-[#101513] text-[#7EF0C9] font-mono text-[11px] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5" />
                  Audit log state: Verified against laboratory threat profile
                </span>
                <span className="text-[#8ECAFC] text-[10px] uppercase tracking-wider">
                  Integrity: Intact
                </span>
              </div>
            </div>
          )}

          {/* Defensive Impact Quote */}
          <div className="p-4 border-l-2 border-pine bg-paper-sub text-sm leading-relaxed text-ink/80 italic">
            <strong>Defensive Takeaway:</strong> {project.defensiveImpact}
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="px-5 sm:px-8 py-3.5 hairline-t bg-paper flex items-center justify-between text-xs font-mono">
          <span className="text-ink/50">
            Case Reference: #{project.id}
          </span>
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-pine text-paper font-semibold hover:bg-pine-dark transition-colors"
          >
            <span>Inquire About This Implementation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
