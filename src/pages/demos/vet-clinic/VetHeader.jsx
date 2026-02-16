import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, PawPrint } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const VetHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'vet-hero', label: t('vetDemo.header.nav.home') },
    { id: 'vet-services', label: t('vetDemo.header.nav.services') },
    { id: 'vet-grooming', label: t('vetDemo.header.nav.grooming') },
    { id: 'vet-team', label: t('vetDemo.header.nav.team') },
    { id: 'vet-testimonials', label: t('vetDemo.header.nav.testimonials') },
    { id: 'vet-contact', label: t('vetDemo.header.nav.contact') },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button onClick={() => scrollToSection('vet-hero')} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
              {t('vetDemo.header.name')}
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-emerald-300 text-emerald-600 hover:bg-emerald-50 transition-colors text-xs font-mono uppercase"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <Link
              to="/#microapps"
              onClick={() => window.location.href = '/#microapps'}
              className="text-xs text-gray-400 hover:text-emerald-600 transition-colors"
            >
              {t('vetDemo.header.powered')}
            </Link>
          </nav>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2 py-1 rounded border border-emerald-300 text-emerald-600 text-xs font-mono"
            >
              <Globe className="w-3 h-3" />
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left px-4 py-3 rounded-lg text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <Link
                to="/#microapps"
                onClick={() => window.location.href = '/#microapps'}
                className="px-4 py-3 text-sm text-gray-400 hover:text-emerald-600"
              >
                {t('vetDemo.header.powered')}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default VetHeader;
