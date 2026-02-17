import React from 'react';
import { Pill, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WhatsAppIcon from '../vet-clinic/WhatsAppIcon';

const PharmFooter = () => {
  const { t } = useLanguage();
  const waNumber = t('pharmDemo.whatsapp.number');
  const waMsg = encodeURIComponent(t('pharmDemo.whatsapp.defaultMsg'));

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-blue-900 text-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                <Pill className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">{t('pharmDemo.header.name')}</span>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed mb-4">
              {t('pharmDemo.hero.subtitle')}
            </p>
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

          <div>
            <h4 className="text-white font-semibold mb-4">{t('pharmDemo.header.nav.services')}</h4>
            <ul className="space-y-2">
              {['services', 'products', 'team', 'contact'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(`pharm-${id}`)}
                    className="text-blue-300 hover:text-blue-400 text-sm transition-colors"
                  >
                    {t(`pharmDemo.header.nav.${id}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('pharmDemo.header.nav.contact')}</h4>
            <ul className="space-y-3 text-sm text-blue-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                {t('pharmDemo.contact.address')}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-blue-400" />
                {t('pharmDemo.contact.phone')}
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-blue-400" />
                {t('pharmDemo.contact.email')}
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4 flex-shrink-0 text-[#25D366]" />
                <span>+52 1 55 8734 1692</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t('pharmDemo.contact.hours')}</h4>
            <ul className="space-y-2 text-sm text-blue-300">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <div>
                  <p>{t('pharmDemo.contact.weekdays')}</p>
                  <p>{t('pharmDemo.contact.saturday')}</p>
                  <p>{t('pharmDemo.contact.sunday')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-400">
          <p>&copy; {new Date().getFullYear()} {t('pharmDemo.header.name')}. {t('pharmDemo.footer.rights')}</p>
          <p>
            {t('pharmDemo.footer.powered')}{' '}
            <a
              href="/#microapps"
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Co.De MicroApps
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PharmFooter;
