
import React from 'react';
import { Helmet } from 'react-helmet';
import TechnicalServicesSection from '@/components/TechnicalServicesSection';

const ServicesPage = () => {
  return (
    <>
      <Helmet>
        <title>Technical Services | Co.De Aerospace</title>
      </Helmet>
      <div className="pt-20">
        <TechnicalServicesSection />
      </div>
    </>
  );
};

export default ServicesPage;
