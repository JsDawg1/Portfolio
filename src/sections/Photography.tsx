import React, { useState, useRef, useEffect } from 'react';
import { PHOTOGRAPHY_ITEMS } from '../data/photography';
import { PhotoItem } from '../types';
import { PhotographyLightbox } from '../components/PhotographyLightbox';
import { Camera, ChevronLeft, ChevronRight, Maximize2, Sliders, Info } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Photography: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState<PhotoItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = PHOTOGRAPHY_ITEMS.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Keyboard navigation for carousel when in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxPhoto) return; // Lightbox handles its own keys
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (container) container.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxPhoto]);

  return (
    <section id="photography" className="hairline-t bg-paper overflow-hidden select-none">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-20" ref={containerRef} tabIndex={0}>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 text-left">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-pine" />
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/45">
                06 / Creative Pursuits · Visual Frame Study
              </p>
            </div>
            <h2 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl text-ink leading-tight">
              Photography & spatial compositions.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink/70 font-sans max-w-xl">
              Exploring architectural geometry, contrast, and visual rhythm through manual optics. Click any frame for camera telemetry and full-screen inspection.
            </p>
          </div>

          {/* Carousel Navigation Buttons & Indicators */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-ink/60 tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="min-h-[44px] min-w-[44px] rounded-[3px] hairline bg-paper hover:bg-black/5 hover:text-pine flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous frame"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="min-h-[44px] min-w-[44px] rounded-[3px] hairline bg-paper hover:bg-black/5 hover:text-pine flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next frame"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Framework Container */}
        <div
          className="relative w-full py-4 overflow-hidden carousel-track"
          data-cursor="drag"
        >
          {/* Main Visual Carousel Cards Row */}
          <div className="flex items-center justify-center min-h-[380px] sm:min-h-[440px] relative">
            {PHOTOGRAPHY_ITEMS.map((item, idx) => {
              // Calculate relative offset from active item
              let offset = idx - activeIndex;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              const isCenter = offset === 0;
              const isAdjacent = Math.abs(offset) === 1;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={item.id}
                  className={`absolute rounded-lg overflow-hidden hairline bg-[#101513] text-[#FAFAF8] shadow-2xl cursor-pointer transition-all duration-300 ${
                    isCenter ? 'z-20 border-[#24312B]' : 'z-10 opacity-60 hover:opacity-85'
                  }`}
                  style={{
                    width: 'min(85vw, 420px)',
                    height: '380px',
                  }}
                  animate={{
                    x: offset * 320,
                    scale: isCenter ? 1 : isAdjacent ? 0.88 : 0.78,
                    rotateY: offset * -10,
                    opacity: isCenter ? 1 : isAdjacent ? 0.65 : 0.25,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 26,
                  }}
                  onClick={() => {
                    if (isCenter) {
                      setLightboxPhoto(item);
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                >
                  {/* Top Bar with EXIF Metadata */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#0C110F] border-b border-[#24312B] text-[10px] font-mono text-[#5B6B63]">
                    <span className="flex items-center gap-1.5 text-[#7EF0C9]">
                      <Camera className="w-3 h-3 text-pine" />
                      FRAME {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[#8ECAFC] uppercase">{item.aspectRatio}</span>
                  </div>

                  {/* Photograph / Placeholder Body */}
                  <div className="relative h-[255px] bg-[#0E1210] flex flex-col items-center justify-center p-6 overflow-hidden group">
                    {item.imageSrc ? (
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-full h-full object-cover rounded transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      // Exquisite Camera Viewfinder Framing
                      <div className="w-full h-full border border-dashed border-[#24312B] rounded flex flex-col items-center justify-center p-4 relative text-center">
                        {/* Crosshairs */}
                        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[#7EF0C9]/50" />
                        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[#7EF0C9]/50" />
                        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[#7EF0C9]/50" />
                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[#7EF0C9]/50" />

                        <div className="w-10 h-10 rounded-full border border-[#7EF0C9]/30 flex items-center justify-center mb-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7EF0C9]" />
                        </div>

                        <h4 className="font-display font-bold text-lg text-white tracking-tight">
                          {item.title}
                        </h4>
                        <p className="font-sans text-[11px] text-white/50 max-w-[240px] mt-1 leading-snug">
                          {item.subtitle}
                        </p>

                        <div className="absolute bottom-2 font-mono text-[9px] text-[#7EF0C9]/70 tracking-widest uppercase">
                          OPTICAL SENSOR PREVIEW
                        </div>
                      </div>
                    )}

                    {/* Expand icon on hover */}
                    <div className="absolute top-3 right-3 p-1.5 rounded bg-black/60 backdrop-blur-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Telemetry Bar */}
                  <div className="p-3 bg-[#0A0E0C] border-t border-[#24312B] flex items-center justify-between font-mono text-[10px] text-[#D7E0DA]">
                    <span>{item.focalLength} · {item.aperture}</span>
                    <span className="text-[#5B6B63]">{item.shutter} · ISO {item.iso}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Integration Instructions Callout */}
        <div className="mt-8 p-4 rounded bg-paper hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-ink/70 text-left">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-pine shrink-0" />
            <span>
              <strong>Gallery Active:</strong> {total} frames loaded from <code className="text-pine font-semibold">public/photos/</code> — drop more images anytime to expand the gallery.
            </span>
          </div>
          <span className="text-ink/40 text-[11px]">
            DRAGGABLE &amp; TOUCH-SWIPE ENABLED
          </span>
        </div>

        {/* Lightbox Modal */}
        {lightboxPhoto && (
          <PhotographyLightbox
            photo={lightboxPhoto}
            photos={PHOTOGRAPHY_ITEMS}
            onClose={() => setLightboxPhoto(null)}
            onNext={() => {
              const currentIdx = PHOTOGRAPHY_ITEMS.findIndex((p) => p.id === lightboxPhoto.id);
              const nextIdx = (currentIdx + 1) % total;
              setLightboxPhoto(PHOTOGRAPHY_ITEMS[nextIdx]);
              setActiveIndex(nextIdx);
            }}
            onPrev={() => {
              const currentIdx = PHOTOGRAPHY_ITEMS.findIndex((p) => p.id === lightboxPhoto.id);
              const prevIdx = (currentIdx - 1 + total) % total;
              setLightboxPhoto(PHOTOGRAPHY_ITEMS[prevIdx]);
              setActiveIndex(prevIdx);
            }}
          />
        )}
      </div>
    </section>
  );
};
