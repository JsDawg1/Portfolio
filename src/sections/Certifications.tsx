import React from 'react';
import { CERTIFICATIONS } from '../data/portfolio';
import { Award, ShieldCheck, Cloud, CheckCircle, ExternalLink } from 'lucide-react';
import { ScorePlate } from '../components/ScorePlate';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="hairline-t bg-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-3">
            04 / Verified Credentials
          </p>
          <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-ink leading-tight">
            Industry security & cloud certifications.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink/70 font-sans max-w-xl">
            Formal credentials validating cybersecurity foundations, network defense posture, and enterprise cloud infrastructure architecture.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid gap-6 md:grid-cols-2 text-left">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="group hairline rounded-lg bg-paper p-6 sm:p-8 flex flex-col justify-between hover:border-ink/40 hover:-translate-y-0.5 transition-all duration-200 shadow-xs"
            >
              <div>
                {/* Top Badge and Dates */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-hairline">
                  <div className="flex items-center gap-2.5">
                    <ScorePlate
                      index={cert.num}
                      label={cert.organization.toUpperCase()}
                      value={cert.badgeCode}
                      small
                    />
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-ink/60 font-medium block">
                      {cert.date}
                    </span>
                    {cert.version && (
                      <span className="font-mono text-[10px] text-pine uppercase tracking-wider block">
                        VER: {cert.version}
                      </span>
                    )}
                  </div>
                </div>

                {/* Cert Title & Organization */}
                <h3 className="font-display font-extrabold text-2xl text-ink tracking-tight group-hover:text-pine transition-colors">
                  {cert.name}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-ink/50 mt-1">
                  Issued by {cert.organization}
                </p>

                <p className="mt-4 text-sm text-ink/75 font-sans leading-relaxed">
                  {cert.description}
                </p>

                {/* Focus Areas List */}
                <div className="mt-5 space-y-2 pt-3 border-t border-hairline/60">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45 block mb-1">
                    Validated Competency Domains
                  </span>
                  {cert.credentialFocus.map((domain, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs font-mono text-ink/80">
                      <span className="text-pine font-bold mt-0.5">›</span>
                      <span>{domain}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Status Tag */}
              <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between font-mono text-[11px]">
                <span className="flex items-center gap-1.5 text-pine font-medium">
                  <ShieldCheck className="w-4 h-4 text-pine" />
                  AUTHENTICATED RECORD
                </span>
                <span className="text-ink/40 text-[10px] uppercase tracking-wider">
                  ACTIVE STANDING
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
