import React, { useEffect } from 'react';
import { PhotoItem } from '../types';
import { X, ChevronLeft, ChevronRight, Camera, Sliders } from 'lucide-react';

interface PhotographyLightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PhotographyLightbox: React.FC<PhotographyLightboxProps> = ({
  photo,
  photos,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    if (photo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose, onNext, onPrev]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 text-[#FAFAF8] backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header */}
      <div
        className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#7EF0C9] flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-pine" />
            DARKROOM / FRAME {currentIndex + 1} OF {photos.length}
          </span>
          <span className="text-white/20">|</span>
          <span className="font-mono text-xs text-white/60 tracking-wider">
            {photo.aspectRatio}
          </span>
        </div>

        <button
          onClick={onClose}
          className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-[3px] border border-white/20 text-white/70 hover:text-white hover:border-white/50 transition-colors"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Display Area */}
      <div
        className="relative flex-1 flex items-center justify-center p-4 sm:p-12 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 z-20 cursor-pointer"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={onNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 min-h-[48px] min-w-[48px] rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 z-20 cursor-pointer"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Viewport Frame */}
        <div className="max-w-4xl max-h-[70vh] w-full flex flex-col items-center justify-center">
          {photo.imageSrc ? (
            <img
              src={photo.imageSrc}
              alt={photo.title}
              className="max-h-[70vh] max-w-full object-contain rounded shadow-2xl"
            />
          ) : (
            // High-end darkroom placeholder frame with camera crosshairs & technical markings
            <div className="w-full aspect-[4/3] max-w-2xl bg-[#0E1210] border border-[#24312B] rounded-lg relative flex flex-col items-center justify-center p-8 overflow-hidden shadow-2xl">
              {/* Corner framing brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#7EF0C9]/40" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#7EF0C9]/40" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#7EF0C9]/40" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#7EF0C9]/40" />

              {/* Viewfinder Center Crosshair */}
              <div className="relative flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full border border-dashed border-[#7EF0C9]/30 flex items-center justify-center text-[#7EF0C9]/60">
                  <div className="w-2 h-2 rounded-full bg-[#7EF0C9]" />
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7EF0C9]">
                    INTENDED IMAGE SLOT
                  </span>
                  <h3 className="font-display font-extrabold text-2xl text-white tracking-tight mt-1">
                    {photo.title}
                  </h3>
                  <p className="font-sans text-xs text-white/60 max-w-md mt-1">
                    {photo.subtitle}
                  </p>
                </div>

                <div className="font-mono text-[11px] text-[#8ECAFC] bg-white/[0.04] px-4 py-2 rounded border border-white/10 max-w-md">
                  Drop image file into <code className="text-[#F2C97D]">/public/photos/</code> and link in <code className="text-[#F2C97D]">photography.ts</code>
                </div>
              </div>

              {/* Bottom rule of thirds guide line */}
              <div className="absolute inset-x-8 bottom-12 border-b border-dashed border-white/5 pointer-events-none" />
            </div>
          )}
        </div>
      </div>

      {/* Camera EXIF & Telemetry Bottom Bar */}
      <div
        className="px-6 py-4 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-0.5 text-left">
          <p className="font-sans font-semibold text-sm text-white">{photo.title}</p>
          <p className="text-white/50 text-[11px] font-sans">{photo.caption}</p>
        </div>

        {/* Technical telemetry pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 border border-white/10 text-white/90">
            <Sliders className="w-3 h-3 text-[#7EF0C9]" />
            <span>FOCAL: {photo.focalLength}</span>
          </span>
          <span className="px-2.5 py-1 rounded bg-white/10 border border-white/10 text-white/90">
            APERTURE: {photo.aperture}
          </span>
          <span className="px-2.5 py-1 rounded bg-white/10 border border-white/10 text-white/90">
            SHUTTER: {photo.shutter}
          </span>
          <span className="px-2.5 py-1 rounded bg-white/10 border border-white/10 text-white/90">
            ISO: {photo.iso}
          </span>
        </div>
      </div>
    </div>
  );
};
