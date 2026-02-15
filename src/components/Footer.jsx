
import React, { useState } from 'react';
import VisitCounter from './VisitCounter';
import { useLanguage } from '@/context/LanguageContext';

const PolicyModal = ({ isOpen, onClose, title, children, closeText }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0f1a2e] border border-[#00d9ff]/30 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-[0_0_60px_rgba(0,217,255,0.15)]">
        <div className="relative p-6 border-b border-[#1a2847]">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button onClick={onClose} className="absolute top-4 right-4 text-[#94a3b8] hover:text-white text-xl">✕</button>
        </div>
        <div className="p-6 text-sm text-[#c0c0c0] leading-relaxed space-y-4">{children}</div>
        <div className="p-6 pt-2 border-t border-[#1a2847]">
          <button onClick={onClose} className="w-full px-6 py-3 bg-[#1a2847] text-white font-medium rounded-lg hover:bg-[#243456] border border-[#2a3c5f] transition-colors text-sm">{closeText}</button>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0a0e27] text-[#c0c0c0] relative border-t border-[#1a2847]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-3">Co.De Aerospace</h3>
            <p className="text-sm text-[#94a3b8] mb-2 leading-relaxed">{t('footer.tagline')}</p>
            <VisitCounter />
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-[#00d9ff] transition-colors">{t('footer.groundStations')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-[#00d9ff] transition-colors">{t('footer.cybersecurity')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-[#00d9ff] transition-colors">{t('footer.missionAnalytics')}</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-[#00d9ff] transition-colors">{t('footer.orbitalConsulting')}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('leadership')} className="hover:text-[#00d9ff] transition-colors">{t('nav.leadership')}</button></li>
              <li><button onClick={() => scrollToSection('triple-helix')} className="hover:text-[#00d9ff] transition-colors">{t('footer.methodology')}</button></li>
              <li><button onClick={() => scrollToSection('contact')} className="hover:text-[#00d9ff] transition-colors">{t('nav.contact')}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('wrc-2027')} className="hover:text-[#00d9ff] transition-colors">WRC-2027 Portal</button></li>
              <li><a href="https://www.itu.int" target="_blank" rel="noopener noreferrer" className="hover:text-[#00d9ff] transition-colors">ITU Official Site</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a2847] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#64748b]">© {new Date().getFullYear()} Co.De Aerospace. {t('footer.rights')}</p>
          <div className="flex gap-6 text-xs text-[#64748b]">
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-[#00d9ff] transition-colors cursor-pointer">{t('footer.privacy')}</button>
            <button onClick={() => setTermsOpen(true)} className="hover:text-[#00d9ff] transition-colors cursor-pointer">{t('footer.terms')}</button>
          </div>
        </div>
      </div>

      <PolicyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} title={t('footer.privacy')} closeText={t('footer.close')}>
        <p><strong className="text-white">Last updated:</strong> January 2026</p>
        <p>Co.De Aerospace ("we", "us", or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit our website.</p>
        <p><strong className="text-white">Information We Collect</strong></p>
        <p>We collect information you voluntarily provide through our contact form, including your organization name, email address, and message content. We also collect anonymous usage data such as page visit counts stored locally in your browser.</p>
        <p><strong className="text-white">How We Use Information</strong></p>
        <p>We use the information you provide solely to respond to your inquiries and to improve our services. We do not sell, trade, or share your personal information with third parties.</p>
        <p><strong className="text-white">Data Storage</strong></p>
        <p>Visit counter data is stored locally on your device using browser localStorage. Contact form submissions are processed via email and are not stored in external databases.</p>
        <p><strong className="text-white">Contact</strong></p>
        <p>For questions about this policy, contact us at <a href="mailto:contact@codeaerospace.com" className="text-[#00d9ff] hover:underline">contact@codeaerospace.com</a></p>
      </PolicyModal>

      <PolicyModal isOpen={termsOpen} onClose={() => setTermsOpen(false)} title={t('footer.terms')} closeText={t('footer.close')}>
        <p><strong className="text-white">Last updated:</strong> January 2026</p>
        <p>By accessing and using the Co.De Aerospace website, you agree to the following terms and conditions.</p>
        <p><strong className="text-white">Use of Website</strong></p>
        <p>This website is provided for informational purposes about Co.De Aerospace's services and capabilities. All content is proprietary and protected by intellectual property laws.</p>
        <p><strong className="text-white">Intellectual Property</strong></p>
        <p>All content, designs, logos, and materials on this website are the property of Co.De Aerospace. Unauthorized reproduction, distribution, or use is prohibited.</p>
        <p><strong className="text-white">Limitation of Liability</strong></p>
        <p>Co.De Aerospace provides this website "as is" without warranties of any kind. We are not liable for any damages arising from the use of this website.</p>
        <p><strong className="text-white">Contact</strong></p>
        <p>For questions about these terms, contact us at <a href="mailto:contact@codeaerospace.com" className="text-[#00d9ff] hover:underline">contact@codeaerospace.com</a></p>
      </PolicyModal>
    </footer>
  );
};

export default Footer;
