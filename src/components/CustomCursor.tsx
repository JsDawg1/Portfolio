import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'drag' | 'code'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer and no reduced motion
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check target element type
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, textarea, select');
      const dragTarget = target.closest('[data-cursor="drag"], .carousel-track');
      const codeTarget = target.closest('.code-card, code, pre');

      if (dragTarget) {
        setCursorState('drag');
      } else if (interactive) {
        setCursorState('hover');
      } else if (codeTarget) {
        setCursorState('code');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  // Smooth trailing element with requestAnimationFrame
  useEffect(() => {
    if (!isEnabled) return;
    let animationFrameId: number;

    const animateTrailing = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.22,
        y: prev.y + (pos.y - prev.y) * 0.22,
      }));
      animationFrameId = requestAnimationFrame(animateTrailing);
    };

    animationFrameId = requestAnimationFrame(animateTrailing);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos, isEnabled]);

  if (!isEnabled || !isVisible) return null;

  const isHovered = cursorState === 'hover';
  const isDrag = cursorState === 'drag';

  return (
    <>
      {/* Central precise dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-pine pointer-events-none z-[99999] transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0) scale(${isHovered ? 0 : 1})`,
        }}
      />

      {/* Trailing soft boundary ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[99998] transition-[width,height,background-color,border-color] duration-200 flex items-center justify-center font-mono text-[9px] uppercase tracking-wider ${
          isHovered
            ? 'w-10 h-10 border-pine/80 bg-pine/10 text-pine -translate-x-5 -translate-y-5'
            : isDrag
            ? 'w-14 h-14 border-pine/90 bg-pine/15 text-paper font-semibold -translate-x-7 -translate-y-7'
            : 'w-7 h-7 border-ink/25 bg-transparent -translate-x-3.5 -translate-y-3.5'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) ${
            isHovered ? 'translate(-50%, -50%)' : isDrag ? 'translate(-50%, -50%)' : 'translate(-50%, -50%)'
          }`,
        }}
      >
        {isDrag && <span className="text-[#FAFAF8] drop-shadow-sm select-none">DRAG</span>}
      </div>
    </>
  );
};
