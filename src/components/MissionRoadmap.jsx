import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Zap, Orbit, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const RoadmapItem = ({ year, title, description, icon: Icon, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-16">
      {/* Dot */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0a0e27] border-2 border-[#00d9ff] shadow-[0_0_20px_rgba(0,217,255,0.4)] z-10 md:absolute md:left-1/2 md:-translate-x-1/2 transition-transform duration-300 group-hover:scale-125 group-hover:shadow-[0_0_30px_rgba(0,217,255,0.6)]">
        <Icon className="w-7 h-7 text-[#00d9ff] drop-shadow-[0_0_8px_rgba(0,217,255,0.8)]" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="w-[calc(100%-4rem)] md:w-[45%] p-8 rounded-2xl bg-[#1a2847]/40 border border-[#2a3c5f] group-hover:border-[#00d9ff]/50 transition-all shadow-xl"
      >
        <div className="text-[#00d9ff] font-mono font-bold text-3xl mb-2">{year}</div>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-300 text-lg leading-relaxed">{description}</p>
      </motion.div>
    </div>
  );
};

const MissionRoadmap = () => {
  const { t } = useLanguage();

  const items = [
    { year: '2024', icon: Rocket, title: t('roadmap.y2024.title'), description: t('roadmap.y2024.desc') },
    { year: '2025', icon: Zap, title: t('roadmap.y2025.title'), description: t('roadmap.y2025.desc') },
    { year: '2026', icon: Orbit, title: t('roadmap.y2026.title'), description: t('roadmap.y2026.desc') },
    { year: '2027', icon: Globe, title: t('roadmap.y2027.title'), description: t('roadmap.y2027.desc') },
  ];

  return (
    <section className="py-24 px-6 bg-[#0a0e27] relative overflow-hidden border-t border-[#1a2847]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('roadmap.title')}
          </h2>
          <div className="w-32 h-1 bg-[#00d9ff] mx-auto" />
        </motion.div>

        <div className="relative">
          {/* Vertical Line with Animation */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-7 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00d9ff]/0 via-[#00d9ff]/50 to-[#00d9ff]/0 md:-translate-x-1/2 origin-top" 
          />

          <div className="space-y-4">
            {items.map((item, index) => (
              <RoadmapItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionRoadmap;
