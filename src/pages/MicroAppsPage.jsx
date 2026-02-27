
import React from 'react';
import { Helmet } from 'react-helmet';
import MicroAppsSection from '@/components/MicroAppsSection';
import FAQSection from '@/components/FAQSection';

const MicroAppsPage = () => {
  return (
    <>
      <Helmet>
        <title>MicroApps | Co.De Aerospace</title>
      </Helmet>
      <div className="pt-20">
        <MicroAppsSection />
        <FAQSection />
      </div>
    </>
  );
};

export default MicroAppsPage;
