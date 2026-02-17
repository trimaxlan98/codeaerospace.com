import React from 'react';
import { Helmet } from 'react-helmet';
import PharmHeader from './PharmHeader';
import PharmFooter from './PharmFooter';
import PharmHero from './sections/PharmHero';
import PharmServices from './sections/PharmServices';
import PharmProducts from './sections/PharmProducts';
import PharmTeam from './sections/PharmTeam';
import PharmTestimonials from './sections/PharmTestimonials';
import PharmContact from './sections/PharmContact';
import PharmDemoBadge from './PharmDemoBadge';
import PharmWhatsAppFloat from './PharmWhatsAppFloat';
import { useLanguage } from '@/context/LanguageContext';

const PharmacyDemo = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('pharmDemo.header.name')} | {t('pharmDemo.header.powered')}</title>
      </Helmet>
      <div className="bg-white text-gray-800 font-sans">
        <PharmHeader />
        <PharmHero />
        <PharmServices />
        <PharmProducts />
        <PharmTeam />
        <PharmTestimonials />
        <PharmContact />
        <PharmFooter />
        <PharmWhatsAppFloat />
        <PharmDemoBadge />
      </div>
    </>
  );
};

export default PharmacyDemo;
