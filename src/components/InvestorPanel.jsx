import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Rocket, Target, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const InvestorPanel = () => {
  const { t } = useLanguage();

  const metrics = [
    { label: t('investor.fund'), value: '$2.5M+', icon: TrendingUp },
    { label: t('investor.apps'), value: '12', icon: Rocket },
    { label: t('investor.goal'), value: '2027', icon: Target },
  ];

  return (
    <section className="py-24 px-6 bg-[#0a0e27] border-t border-[#1a2847]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] text-sm font-bold uppercase tracking-widest mb-6">
            <ShieldCheck className="w-4 h-4" />
            {t('investor.badge')}
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            {t('investor.title1')} <span className="text-[#00d9ff]">{t('investor.title2')}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-2xl bg-[#1a2847] border border-[#2a3c5f] flex flex-col items-center text-center gap-6 group hover:border-[#00d9ff] transition-all duration-300"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#0a0e27] flex items-center justify-center border border-[#00d9ff]/20 group-hover:border-[#00d9ff] transition-colors shadow-lg">
                <metric.icon className="w-10 h-10 text-[#00d9ff]" />
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{metric.value}</div>
                <div className="text-lg font-mono text-[#00d9ff] uppercase tracking-wider">{metric.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-gradient-to-r from-[#00d9ff]/20 via-[#0a0e27] to-[#00d9ff]/20 border-2 border-[#00d9ff]/40 text-center"
        >
          <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
            <span className="text-[#00d9ff]">GARANTÍA STARTUP:</span> {t('investor.startup_guarantee')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestorPanel;
