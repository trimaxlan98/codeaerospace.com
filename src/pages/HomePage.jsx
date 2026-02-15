
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/HeroSection';
import LeadershipSection from '@/components/LeadershipSection';
import TechnicalServicesSection from '@/components/TechnicalServicesSection';
import WRC2027Section from '@/components/WRC2027Section';
import TripleHelixSection from '@/components/TripleHelixSection';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Co.De Aerospace | Research-Driven Engineering for NewSpace</title>
        <meta name="description" content="Co.De Aerospace provides advanced engineering solutions for the NewSpace economy, including ground station software, space cybersecurity, and mission analytics." />
      </Helmet>

      <div className="bg-[#0a0e27]">
        <HeroSection />
        <LeadershipSection />
        <TechnicalServicesSection />
        <WRC2027Section />
        <TripleHelixSection />

        {/* Contact Section */}
        <section id="contact" className="relative py-24 px-6 overflow-hidden bg-[#0a0e27]">
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  {t('contact.title1')} <span className="text-[#00d9ff]">Co.De Aerospace</span>
                </h2>
                <div className="w-24 h-1 bg-[#00d9ff] mx-auto mb-6" />
                <p className="text-lg text-[#c0c0c0] max-w-2xl mx-auto">{t('contact.subtitle')}</p>
              </div>
              <ContactForm />
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
