import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const keywords = ["SATELLITE SYSTEMS", "NGSO COMMUNICATIONS", "AI AUTOMATION", "ORBITAL DYNAMICS"];

const HeroSection = () => {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

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
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 mb-8 border border-[#00d9ff]/30 rounded-full bg-[#00d9ff]/10 backdrop-blur-md">
            <span className="text-[#00d9ff] font-mono text-xs uppercase tracking-widest">
              {t('hero.badge')}
            </span>
          </div>

          <motion.h1 
            animate={{ 
              textShadow: [
                "0 0 20px rgba(0,217,255,0.2)",
                "0 0 40px rgba(0,217,255,0.4)",
                "0 0 20px rgba(0,217,255,0.2)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.02 }}
            className="text-6xl md:text-9xl font-black mb-8 leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-[#00d9ff] to-white cursor-default"
          >
            Co.De <br className="md:hidden" /> Aerospace
          </motion.h1>

          <p className="text-xl md:text-2xl text-slate-200 mb-4 max-w-3xl mx-auto font-light leading-relaxed">
            {t('hero.subtitle')} <span className="text-[#00d9ff] font-medium">{t('hero.subtitleHighlight')}</span>
          </p>

          <div className="h-12 mb-10 overflow-hidden flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={keywords[index]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[#00d9ff] font-mono text-sm md:text-lg font-bold tracking-[0.3em] uppercase"
              >
                {keywords[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/services"
              className="px-10 py-4 bg-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00b8dd] transition-all duration-300 min-w-[220px] shadow-[0_0_30px_rgba(0,217,255,0.4)] hover:shadow-[0_0_50px_rgba(0,217,255,0.6)] active:scale-95 text-center flex items-center justify-center"
            >
              {t('hero.cta1')}
            </Link>

            <Link
              to="/contact"
              className="px-10 py-4 bg-transparent border-2 border-[#00d9ff]/50 text-white font-bold rounded-lg hover:bg-[#00d9ff]/10 transition-all duration-300 min-w-[220px] active:scale-95 text-center flex items-center justify-center"
            >
              {t('hero.cta2')}
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
      >
        <span className="text-[10px] font-mono text-[#00d9ff] uppercase tracking-[0.3em] mb-2 block">
          {t('hero.scroll')}
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[#00d9ff] mx-auto opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
