
import React from 'react';
import { Helmet } from 'react-helmet';
import MicroAppsSection from '@/components/MicroAppsSection';

const MicroAppsPage = () => {
  return (
    <>
      <Helmet>
        <title>MicroApps | Co.De Aerospace</title>
      </Helmet>
      <div className="pt-20">
        <MicroAppsSection />
      </div>
    </>
  );
};

export default MicroAppsPage;
