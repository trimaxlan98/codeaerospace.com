
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/leadership', label: t('nav.leadership') },
    { path: '/services', label: t('nav.services') },
    { path: '/impact', label: t('nav.impact') },
    { path: '/wrc-2027', label: t('nav.wrc2027') },
    { path: '/microapps', label: t('nav.microapps') },
    { path: '/research', label: t('nav.research') },
    { path: '/contact', label: t('nav.contact') }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#0a0e27]/95 backdrop-blur-md shadow-lg border-b border-[#1a2847]' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center space-x-3 group">
            <img
              src="https://horizons-cdn.hostinger.com/6d36ddf2-44ee-4e42-a8d1-2714e0635bbe/code_transparente-Rguug.png"
              alt="Co.De Aerospace Logo"
              className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-xl font-bold text-white group-hover:text-[#00d9ff] transition-colors duration-300">
              Co.De Aerospace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isMicroApps = link.path === '/microapps';
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-lg font-medium transition-colors duration-300 hover:text-[#00d9ff] ${
                    location.pathname === link.path ? 'text-[#00d9ff]' : 'text-[#c0c0c0]'
                  } ${isMicroApps ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#00d9ff] via-white to-[#00d9ff] bg-[length:200%_auto] animate-gradient-x font-bold' : ''}`}
                >
                  {isMicroApps ? 'MICROAPPS' : link.label}
                  {isMicroApps && (
                    <span className="absolute -top-3 -right-6 flex h-4 w-8">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d9ff] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-8 bg-[#00d9ff] text-[8px] text-[#0a0e27] font-bold items-center justify-center">
                        NEW
                      </span>
                    </span>
                  )}
                </Link>
              );
            })}

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#00d9ff]/30 text-[#00d9ff] hover:bg-[#00d9ff]/10 transition-colors text-xs font-mono uppercase tracking-wider"
              title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
          </nav>

          {/* Mobile: Lang toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2 py-1 rounded border border-[#00d9ff]/30 text-[#00d9ff] text-xs font-mono"
            >
              <Globe className="w-3 h-3" />
              {lang === 'en' ? 'ES' : 'EN'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-[#00d9ff] transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#00d9ff]/20 bg-[#0a0e27]">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-[#00d9ff] bg-[#00d9ff]/10'
                      : 'text-[#c0c0c0] hover:text-[#00d9ff] hover:bg-[#00d9ff]/5'
                  }`}
                >
                  {link.path === '/microapps' ? 'MICROAPPS' : link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
