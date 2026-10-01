import React from 'react';
import { CodeCover, ToneType } from '../types';

interface CodeCardProps {
  cover: CodeCover;
  className?: string;
  title?: string;
}

const TONE_CLASSES: Record<ToneType, string> = {
  pl: "text-[#D7E0DA]",
  kw: "text-[#7EF0C9] font-semibold",
  str: "text-[#F2C97D]",
  fn: "text-[#8ECAFC]",
  num: "text-[#F2A9C4]",
  cm: "text-[#5B6B63] italic",
  alert: "text-[#FF7B72] font-semibold",
  pass: "text-[#7EF0C9] font-medium",
};

export const CodeCard: React.FC<CodeCardProps> = ({ cover, className = "", title }) => {
  return (
    <div
      className={`code-card bg-code rounded-md overflow-hidden border border-[#24312B] shadow-lg ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between px-3.5 pt-3 pb-2 border-b border-[#24312B]/60 bg-[#0C110F]">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#34463C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#34463C]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#34463C]" />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-[#5B6B63]">
            {title || cover.lang}
          </span>
        </div>
        <div className="font-mono text-[9px] text-[#5B6B63] tracking-widest uppercase">
          READONLY
        </div>
      </div>
      <pre className="p-3.5 sm:p-4 font-mono text-[11px] leading-[1.65] whitespace-pre overflow-x-auto text-left scrollbar-thin">
        <code>
          {cover.lines.map((line, lineIdx) => (
            <div key={lineIdx} className="hover:bg-white/[0.02] px-1 rounded transition-colors">
              <span className="inline-block w-5 text-right mr-3 text-[#3B4D44] select-none text-[9.5px]">
                {lineIdx + 1}
              </span>
              {line.map((token, tokenIdx) => (
                <span key={tokenIdx} className={TONE_CLASSES[token.tone] || "text-[#D7E0DA]"}>
                  {token.text}
                </span>
              ))}
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};
