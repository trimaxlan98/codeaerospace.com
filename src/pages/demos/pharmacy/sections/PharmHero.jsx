import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Phone, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WhatsAppIcon from '../../vet-clinic/WhatsAppIcon';

const PharmHero = () => {
  const { t } = useLanguage();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const waNumber = t('pharmDemo.whatsapp.number');
  const waMsg = encodeURIComponent(t('pharmDemo.whatsapp.defaultMsg'));

  return (
    <section id="pharm-hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-600" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H6v-2h4V7h2v4h4v2h-4v4z'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
              <Heart className="w-3.5 h-3.5" />
              {t('pharmDemo.hero.badge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
          >
            {t('pharmDemo.hero.title1')}{' '}
            <span className="text-blue-300">{t('pharmDemo.hero.title2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl leading-relaxed"
          >
            {t('pharmDemo.hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => scrollTo('pharm-products')}
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl text-center"
            >
              {t('pharmDemo.hero.cta1')}
            </button>
            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1fb855] transition-all duration-300 shadow-xl hover:shadow-2xl text-center flex items-center justify-center gap-2"
            >
              <WhatsAppIcon className="w-5 h-5" />
              {t('pharmDemo.hero.ctaWhatsApp')}
            </a>
            <button
              onClick={() => scrollTo('pharm-services')}
              className="px-8 py-4 border-2 border-white/50 text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300 text-center"
            >
              {t('pharmDemo.hero.cta2')}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-lg"
          >
            {['s1', 's2', 's3'].map(key => (
              <div key={key} className="text-center">
                <p className="text-2xl md:text-3xl font-extrabold text-white">{t(`pharmDemo.hero.stats.${key}`)}</p>
                <p className="text-blue-200 text-xs md:text-sm mt-1">{t(`pharmDemo.hero.stats.${key}Label`)}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <ArrowDown className="w-6 h-6 text-white/60" />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 bg-green-600/90 backdrop-blur-sm py-3"
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 text-white text-sm flex-wrap">
          <Phone className="w-4 h-4 animate-pulse" />
          <span className="font-bold">{t('pharmDemo.hero.delivery')}</span>
          <span className="hidden sm:inline">|</span>
          <span>{t('pharmDemo.hero.deliveryPhone')}</span>
        </div>
      </motion.div>
    </section>
  );
};

export default PharmHero;
