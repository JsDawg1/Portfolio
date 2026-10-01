import React, { useState } from 'react';
import { SKILL_GROUPS } from '../data/portfolio';
import { Terminal, Shield, Cpu, Code2, Check, Filter } from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...SKILL_GROUPS.map((g) => g.category)];

  const displayedGroups = selectedCategory === 'All'
    ? SKILL_GROUPS
    : SKILL_GROUPS.filter((g) => g.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Security Tools':
        return <Terminal className="w-4 h-4 text-pine" />;
      case 'Security Disciplines':
        return <Shield className="w-4 h-4 text-pine" />;
      case 'Programming Languages':
        return <Code2 className="w-4 h-4 text-pine" />;
      case 'Operating Systems':
        return <Cpu className="w-4 h-4 text-pine" />;
      default:
        return <Shield className="w-4 h-4 text-pine" />;
    }
  };

  return (
    <section id="skills" className="hairline-t bg-paper">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8 text-left">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45 mb-3">
              02 / Technical Arsenal
            </p>
            <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-ink leading-tight">
              Tools, protocols & defensive competencies.
            </h2>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[38px] px-3 rounded-[3px] font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-pine text-paper font-semibold shadow-xs'
                    : 'bg-paper text-ink/65 hairline hover:text-ink hover:border-ink/40'
                }`}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid gap-6 md:grid-cols-2 text-left">
          {displayedGroups.map((group, groupIdx) => (
            <div
              key={group.category}
              className="group hairline rounded-md bg-paper p-5 sm:p-6 flex flex-col justify-between hover:border-ink/40 hover:-translate-y-0.5 transition-all duration-200 shadow-xs"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(group.category)}
                    <h3 className="font-mono text-xs uppercase tracking-[0.14em] font-bold text-ink">
                      {group.category}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-ink/40 tabular-nums">
                    {group.skills.length} ITEMS
                  </span>
                </div>

                <p className="text-xs text-ink/60 font-sans mb-5 leading-relaxed">
                  {group.description}
                </p>

                {/* Skills Badges Grid */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] font-mono text-[12px] tracking-tight transition-all duration-150 ${
                        skill.highlight
                          ? 'bg-[#F2F4F2] text-ink font-semibold border border-pine/30 hover:border-pine'
                          : 'bg-paper hairline text-ink/80 hover:text-ink hover:border-ink/40'
                      }`}
                    >
                      <Check className="w-3 h-3 text-pine shrink-0" />
                      <span>{skill.name}</span>
                      {skill.level && (
                        <span className="ml-1 text-[9.5px] uppercase tracking-wider text-ink/40 font-normal">
                          [{skill.level}]
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Index */}
              <div className="mt-6 pt-3 border-t border-hairline/60 flex items-center justify-between text-[10px] font-mono text-ink/40">
                <span>SECTION ID: SEC-SKILL-0{groupIdx + 1}</span>
                <span className="text-pine">AUTHENTICATED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
