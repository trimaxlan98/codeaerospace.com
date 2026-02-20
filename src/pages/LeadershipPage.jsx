
import React from 'react';
import { Helmet } from 'react-helmet';
import LeadershipSection from '@/components/LeadershipSection';
import { motion } from 'framer-motion';

const LeadershipPage = () => {
  return (
    <>
      <Helmet>
        <title>Leadership | Co.De Aerospace</title>
      </Helmet>
      <div className="pt-20">
        <LeadershipSection />
      </div>
    </>
  );
};

export default LeadershipPage;
