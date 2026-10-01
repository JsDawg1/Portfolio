import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolio';
import { Menu, X, Shield, Terminal } from 'lucide-react';

interface HeaderProps {
  onTerminalToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onTerminalToggle }) => {
  const [activeSection, setActiveSection] = useState('top');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Photography', href: '#photography' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = ['top', 'about', 'skills', 'projects', 'certifications', 'education', 'photography', 'contact'];
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 bg-paper/90 backdrop-blur-md transition-all duration-200 ${
      isScrolled ? 'hairline-b shadow-xs' : 'hairline-b'
    }`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-14 flex items-center justify-between">
        {/* Brand / Name */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="font-mono text-[13px] font-bold tracking-[0.08em] min-h-[44px] inline-flex items-center gap-2 group text-ink hover:text-pine transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-pine inline-block group-hover:scale-125 transition-transform" />
            <span>S.U. JAYAHARISH</span>
          </a>

          {/* Coordinates Tag (subtle technical detail) */}
          <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-[2px] font-mono text-[10px] text-ink/45 bg-black/[0.03] hairline select-none">
            {PERSONAL_INFO.coordinates}
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-1.5" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`min-h-[44px] inline-flex items-center px-2.5 sm:px-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-150 relative ${
                  isActive ? 'text-pine font-semibold' : 'text-ink/65 hover:text-ink'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-1 left-2.5 right-2.5 h-[1.5px] bg-pine rounded-full" />
                )}
              </a>
            );
          })}

          {/* Direct CTA */}
          <a
            href="#contact"
            className="ml-3 min-h-[36px] px-3.5 inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.12em] bg-pine text-paper font-semibold rounded-[3px] hover:bg-pine-dark transition-colors duration-200 shadow-xs"
          >
            Get In Touch
          </a>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#contact"
            className="min-h-[36px] px-3 inline-flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.12em] bg-pine text-paper font-semibold rounded-[3px]"
          >
            Contact
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[3px] text-ink/80 hover:text-ink hairline"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden hairline-b bg-paper px-5 py-4 space-y-2 animate-in fade-in duration-150">
          <div className="pb-2 border-b border-hairline flex items-center justify-between text-xs font-mono text-ink/50">
            <span>COORDINATES</span>
            <span>{PERSONAL_INFO.coordinates}</span>
          </div>
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded font-mono text-[12px] uppercase tracking-[0.14em] text-ink/80 hover:bg-black/5 hover:text-pine flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-ink/30 text-xs">›</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
