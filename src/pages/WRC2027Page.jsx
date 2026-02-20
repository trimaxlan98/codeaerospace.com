
import React from 'react';
import { Helmet } from 'react-helmet';
import WRC2027Section from '@/components/WRC2027Section';

const WRC2027Page = () => {
  return (
    <>
      <Helmet>
        <title>WRC-2027 | Co.De Aerospace</title>
      </Helmet>
      <div className="pt-20">
        <WRC2027Section />
      </div>
    </>
  );
};

export default WRC2027Page;
