
import React from 'react';
import { Helmet } from 'react-helmet';
import ContactForm from '@/components/ContactForm';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Contact | Co.De Aerospace</title>
      </Helmet>
      <div className="pt-32 pb-24 bg-[#0a0e27]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
      </div>
    </>
  );
};

export default ContactPage;
