import React from 'react';
import { PawPrint, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WhatsAppIcon from './WhatsAppIcon';

const VetFooter = () => {
  const { t } = useLanguage();
  const waNumber = t('vetDemo.whatsapp.number');
  const waMsg = encodeURIComponent(t('vetDemo.whatsapp.defaultMsg'));

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-green-900 text-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">{t('vetDemo.header.name')}</span>
            </div>
            <p className="text-green-300 text-sm leading-relaxed mb-4">
              {t('vetDemo.hero.subtitle')}
            </p>
            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#1fb855] transition-colors"
            >
              <WhatsAppIcon className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('vetDemo.header.nav.services')}</h4>
            <ul className="space-y-2">
              {['services', 'grooming', 'team', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(`vet-${id}`)}
                    className="text-green-300 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {t(`vetDemo.header.nav.${id}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('vetDemo.header.nav.contact')}</h4>
            <ul className="space-y-3 text-sm text-green-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                {t('vetDemo.contact.address')}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                {t('vetDemo.contact.phone')}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                {t('vetDemo.contact.email')}
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 flex-shrink-0 text-[#25D366]" />
                <span>+52 1 55 8734 1692</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('vetDemo.contact.hours')}</h4>
            <ul className="space-y-2 text-sm text-green-300">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-400" />
                <div>
                  <p>{t('vetDemo.contact.weekdays')}</p>
                  <p>{t('vetDemo.contact.saturday')}</p>
                  <p>{t('vetDemo.contact.sunday')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-green-400">
          <p>&copy; {new Date().getFullYear()} {t('vetDemo.header.name')}. {t('vetDemo.footer.rights')}</p>
          <p>
            {t('vetDemo.footer.powered')}{' '}
            <a
              href="/#microapps"
              className="text-emerald-400 hover:text-emerald-300 font-semibold"
            >
              Co.De MicroApps
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default VetFooter;
