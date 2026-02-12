
import React from 'react';

const Footer = () => {
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
  };

  return (
    <footer className="bg-[#0a0e27] text-[#c0c0c0] relative border-t border-[#1a2847]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-3">Co.De Aerospace</h3>
            <p className="text-sm text-[#94a3b8] mb-4 leading-relaxed">
              Research-Driven Engineering for the NewSpace Economy.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-[#00d9ff] transition-colors">Ground Stations</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-[#00d9ff] transition-colors">Cybersecurity</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-[#00d9ff] transition-colors">Mission Analytics</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-[#00d9ff] transition-colors">Orbital Consulting</button></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('leadership')} className="hover:text-[#00d9ff] transition-colors">Leadership</button></li>
              <li><button onClick={() => scrollToSection('triple-helix')} className="hover:text-[#00d9ff] transition-colors">Methodology</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-[#00d9ff] transition-colors">Contact</button></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('wrc-2027')} className="hover:text-[#00d9ff] transition-colors">WRC-2027 Portal</button></li>
              <li><a href="https://www.itu.int" target="_blank" rel="noopener noreferrer" className="hover:text-[#00d9ff] transition-colors">ITU Official Site</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1a2847] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#64748b]">
            © {new Date().getFullYear()} Co.De Aerospace. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[#64748b]">
             <span>Privacy Policy</span>
             <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
