import React from 'react';
import { EDUCATION } from '../data/portfolio';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { ScorePlate } from '../components/ScorePlate';

export const Education: React.FC = () => {
  return (
    <section id="education" className="hairline-t bg-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
        {/* Section Header */}
        <div className="mb-10 text-left">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-3">
            05 / Academic Background
          </p>
          <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-ink leading-tight">
            Education & engineering foundations.
          </h2>
        </div>

        {/* Education Timeline / Grid */}
        <div className="space-y-4 text-left">
          {EDUCATION.map((edu, idx) => (
            <div
              key={idx}
              className="group hairline rounded-md bg-paper p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-ink/40 hover:-translate-y-0.5 transition-all duration-200 shadow-xs"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs font-bold text-pine flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-pine" />
                    ACADEMIC STAGE 0{idx + 1}
                  </span>
                  <span className="text-ink/30">·</span>
                  <span className="font-mono text-xs text-ink/60 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                  <span className="text-ink/30">·</span>
                  <span className="font-mono text-xs text-ink/60 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {edu.location}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl sm:text-2xl text-ink tracking-tight group-hover:text-pine transition-colors">
                  {edu.institution}
                </h3>

                <p className="font-sans text-sm font-medium text-ink/80">
                  {edu.degree}
                </p>

                {/* Minor Specialization Badge */}
                {edu.minor && (
                  <p className="font-mono text-[11px] font-semibold text-pine uppercase tracking-wider flex items-center gap-1.5 pt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-pine shrink-0" />
                    {edu.minor}
                  </p>
                )}

                {/* Key Subjects */}
                {edu.subjects && edu.subjects.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {edu.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-0.5 rounded-[2px] hairline bg-pine/5 text-pine font-mono text-[10px] uppercase tracking-wider"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                )}

                {edu.details && (
                  <p className="text-xs sm:text-sm text-ink/65 font-sans leading-relaxed pt-1">
                    {edu.details}
                  </p>
                )}
              </div>

              {/* Right Side: Score Plate or Distinction */}
              {edu.score && (
                <div className="shrink-0 flex items-center">
                  <ScorePlate
                    index={`#0${idx + 1}`}
                    label="SCORE ACHIEVED"
                    value={edu.score}
                    sub="Distinction"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
