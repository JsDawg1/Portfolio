import React from 'react';

interface ScorePlateProps {
  index: string;
  label: string;
  value: string;
  sub?: string;
  small?: boolean;
  className?: string;
}

export const ScorePlate: React.FC<ScorePlateProps> = ({
  index,
  label,
  value,
  sub,
  small = false,
  className = "",
}) => {
  return (
    <div
      className={`inline-flex items-stretch overflow-hidden rounded-[3px] bg-paper hairline select-none transition-all duration-200 hover:border-ink/40 ${small ? "text-[10px]" : "text-xs"} ${className}`}
      aria-label={`${index}, ${label} ${value}`}
    >
      <span
        className={`plate-num flex items-center justify-center bg-ink text-paper font-semibold ${
          small ? "px-2 text-[11px]" : "px-2.5 text-sm"
        }`}
      >
        {index}
      </span>
      <span className="flex flex-col justify-center px-2.5 py-1.5 leading-none border-l border-hairline">
        <span
          className="font-mono uppercase tracking-[0.14em] text-ink/50"
          style={{ fontSize: small ? 8.5 : 9.5 }}
        >
          {label}
        </span>
        <span className={`plate-num text-ink font-bold ${small ? "text-[12px]" : "text-[14px]"} mt-0.5`}>
          {value}
        </span>
        {sub && (
          <span className="font-mono text-[9px] text-ink/40 mt-0.5 tracking-tight">
            {sub}
          </span>
        )}
      </span>
    </div>
  );
};
