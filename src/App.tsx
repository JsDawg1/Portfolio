import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Certifications } from './sections/Certifications';
import { Education } from './sections/Education';
import { Photography } from './sections/Photography';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { StickyCTA } from './sections/StickyCTA';
import { CaseOverlay } from './components/CaseOverlay';
import { CustomCursor } from './components/CustomCursor';
import { ProjectCase } from './types';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(null);
  const [terminalMode, setTerminalMode] = useState<boolean>(false);

  // Easter egg: clicking logo 5 times activates terminal mode
  const clickCountRef = useRef(0);
  const resetTimerRef = useRef<number | undefined>(undefined);
  const modeDurationRef = useRef<number | undefined>(undefined);

  const handleLogoClick = useCallback(() => {
    clickCountRef.current += 1;
    window.clearTimeout(resetTimerRef.current);

    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      setTerminalMode(true);
      window.clearTimeout(modeDurationRef.current);
      modeDurationRef.current = window.setTimeout(() => setTerminalMode(false), 6000);
      return;
    }

    resetTimerRef.current = window.setTimeout(() => {
      clickCountRef.current = 0;
    }, 2400);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('terminal-mode', terminalMode);
    return () => document.body.classList.remove('terminal-mode');
  }, [terminalMode]);

  // Smooth scrolling with Lenis
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let animationId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationId = requestAnimationFrame(raf);
    }
    animationId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink transition-colors duration-300 relative selection:bg-pine selection:text-paper">
      {/* Skip Link for Accessibility */}
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:z-[90] focus:top-2 focus:left-2 focus:bg-pine focus:text-paper focus:px-4 focus:py-2 focus:rounded-[3px] font-mono text-xs"
      >
        Skip to projects
      </a>

      {/* Custom Desktop Trailing Cursor */}
      <CustomCursor />

      {/* Main Sticky Navigation */}
      <Header onTerminalToggle={handleLogoClick} />

      {/* Main Page Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onOpenCase={(project) => setSelectedProject(project)} />
        <Certifications />
        <Education />
        <Photography />
        <Contact />
      </main>

      {/* Minimal Industrial Footer with Easter Egg */}
      <Footer onLogoClick={handleLogoClick} />

      {/* Mobile Sticky Call-To-Action */}
      <StickyCTA />

      {/* Detailed Project Investigation Drawer/Modal */}
      {selectedProject && (
        <CaseOverlay
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* CRT Scanline Easter Egg Layer */}
      {terminalMode && (
        <div className="scanlines" aria-hidden="true" />
      )}

      {/* Mobile bottom spacer for sticky CTA */}
      <div className="h-16 sm:hidden" aria-hidden="true" />
    </div>
  );
}
