import React from 'react';
import { Helmet } from 'react-helmet';
import VetHeader from './VetHeader';
import VetFooter from './VetFooter';
import VetHero from './sections/VetHero';
import VetServices from './sections/VetServices';
import VetGrooming from './sections/VetGrooming';
import VetTeam from './sections/VetTeam';
import VetTestimonials from './sections/VetTestimonials';
import VetContact from './sections/VetContact';
import VetDemoBadge from './VetDemoBadge';
import VetWhatsAppFloat from './VetWhatsAppFloat';
import { useLanguage } from '@/context/LanguageContext';

const VetClinicDemo = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t('vetDemo.header.name')} | {t('vetDemo.header.powered')}</title>
      </Helmet>
      <div className="bg-white text-gray-800 font-sans">
        <VetHeader />
        <VetHero />
        <VetServices />
        <VetGrooming />
        <VetTeam />
        <VetTestimonials />
        <VetContact />
        <VetFooter />
        <VetWhatsAppFloat />
        <VetDemoBadge />
      </div>
    </>
  );
};

export default VetClinicDemo;
