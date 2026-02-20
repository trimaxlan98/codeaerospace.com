import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1446776709462-d6b525c57bd3)'
      }} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/90 via-[#0a0e27]/70 to-[#0a0e27]" />

      {/* Grid Pattern — static, no animation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, #00d9ff 1px, transparent 1px),
          linear-gradient(to bottom, #00d9ff 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px'
      }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#00d9ff]/30 rounded-full bg-[#00d9ff]/10 backdrop-blur-md">
            <span className="text-[#00d9ff] font-mono text-xs uppercase tracking-widest">
              {t('hero.badge')}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Co.De Aerospace
          </h1>

          <p className="text-xl md:text-2xl text-[#c0c0c0] mb-8 max-w-3xl mx-auto font-light">
            {t('hero.subtitle')} <span className="text-[#00d9ff] font-medium">{t('hero.subtitleHighlight')}</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/services"
              className="px-8 py-4 bg-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00b8dd] transition-all duration-300 min-w-[200px] shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] active:scale-95 text-center flex items-center justify-center"
            >
              {t('hero.cta1')}
            </Link>

            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border border-[#00d9ff]/50 text-white font-bold rounded-lg hover:bg-[#00d9ff]/10 transition-all duration-300 min-w-[200px] active:scale-95 text-center flex items-center justify-center"
            >
              {t('hero.cta2')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
