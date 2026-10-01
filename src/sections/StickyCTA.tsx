import React, { useEffect, useState } from 'react';
import { ArrowRight, Mail } from 'lucide-react';

export const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero (e.g. 400px) and hide near bottom contact section
      const scrolled = window.scrollY > 400;
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        // If contact is in view, hide sticky bar
        setIsVisible(scrolled && rect.top > window.innerHeight * 0.7);
      } else {
        setIsVisible(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 inset-x-0 z-30 p-3 bg-paper/95 backdrop-blur-md hairline-t sm:hidden transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <a
        href="#contact"
        className="flex items-center justify-center min-h-[48px] w-full bg-pine text-paper font-display font-semibold tracking-tight rounded-[3px] active:bg-pine-dark gap-2 shadow-md"
      >
        <Mail className="w-4 h-4" />
        <span>Initiate Contact</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </a>
    </div>
  );
};
