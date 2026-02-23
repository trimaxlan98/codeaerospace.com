
import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/HeroSection';
import TripleHelixSection from '@/components/TripleHelixSection';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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

        <TripleHelixSection />

        {/* Quick Access Section */}
        <section className="py-24 px-6 bg-[#0a0e27]/50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Leadership Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl border border-[#00d9ff]/20 bg-[#161b33]/40 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{t('nav.leadership')}</h3>
                <p className="text-[#c0c0c0] mb-6">
                  {t('leadership.subtitle')}
                </p>
                <Link to="/leadership" className="text-[#00d9ff] font-medium flex items-center gap-2 hover:underline">
                  {t('services.learnMore')} <ArrowRight size={18} />
                </Link>
              </motion.div>

              {/* Services Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl border border-[#00d9ff]/20 bg-[#161b33]/40 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-bold text-white mb-4">{t('nav.services')}</h3>
                <p className="text-[#c0c0c0] mb-6">
                  {t('services.subtitle')}
                </p>
                <Link to="/services" className="text-[#00d9ff] font-medium flex items-center gap-2 hover:underline">
                  {t('services.learnMore')} <ArrowRight size={18} />
                </Link>
              </motion.div>

              {/* MicroApps Card */}
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 rounded-2xl border-2 border-[#00d9ff] bg-gradient-to-br from-[#1a2847] to-[#0a0e27] shadow-[0_0_20px_rgba(0,217,255,0.2)] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00d9ff]/10 rounded-bl-full -mr-10 -mt-10 transition-all group-hover:bg-[#00d9ff]/20" />
                <h3 className="text-2xl font-bold text-white mb-4">{t('nav.microapps')}</h3>
                <p className="text-[#00d9ff] font-semibold text-sm mb-2 uppercase tracking-wider">
                  {t('microapps.fundingTitle')}
                </p>
                <p className="text-[#c0c0c0] mb-6">
                  {t('microapps.subtitle')}
                </p>
                <Link to="/microapps" className="inline-flex items-center gap-2 px-6 py-2 bg-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00b8dd] transition-all duration-300">
                  {t('services.learnMore')} <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-24 px-6 text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              {t('contact.title1')} <span className="text-[#00d9ff]">Co.De Aerospace</span>
            </h2>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00b8dd] transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.3)]"
            >
              {t('hero.cta2')}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
