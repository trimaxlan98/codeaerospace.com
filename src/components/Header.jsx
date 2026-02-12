
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'leadership', 'services', 'wrc-2027', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'services', label: 'Services' },
    { id: 'wrc-2027', label: 'WRC-2027' },
    { id: 'contact', label: 'Contact' }
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
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-[#00d9ff] ${
                  activeSection === link.id ? 'text-[#00d9ff]' : 'text-[#c0c0c0]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-[#00d9ff] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-[#00d9ff]/20 bg-[#0a0e27]">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left px-4 py-2 rounded-lg transition-colors duration-300 ${
                    activeSection === link.id
                      ? 'text-[#00d9ff] bg-[#00d9ff]/10'
                      : 'text-[#c0c0c0] hover:text-[#00d9ff] hover:bg-[#00d9ff]/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
