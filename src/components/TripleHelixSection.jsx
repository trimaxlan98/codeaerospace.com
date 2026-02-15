
import React from 'react';
import { motion } from 'framer-motion';
import { Building, Microscope, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const VertexCard = ({ icon: Icon, title, role, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="flex-1 bg-[#1a2847] border border-[#2a3c5f] rounded-xl p-8 hover:border-[#00d9ff]/40 transition-all duration-300 shadow-lg hover:shadow-[#00d9ff]/10 flex flex-col items-center text-center group relative overflow-hidden"
  >
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{ backgroundImage: 'linear-gradient(#00d9ff 1px, transparent 1px), linear-gradient(90deg, #00d9ff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
    />
    <div className="relative z-10">
      <div className="mb-6 p-4 bg-[#0a0e27] rounded-full border border-[#2a3c5f] group-hover:border-[#00d9ff]/50 group-hover:shadow-[0_0_15px_rgba(0,217,255,0.15)] transition-all duration-300 mx-auto w-fit">
        <Icon className="w-8 h-8 text-[#00d9ff] group-hover:scale-110 transition-transform duration-300" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="h-px w-12 bg-[#00d9ff] mb-4 mx-auto" />
      <p className="text-[#00d9ff] text-xs font-mono uppercase tracking-widest mb-4">{role}</p>
      <p className="text-[#c0c0c0] text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const TripleHelixSection = () => {
  const { t } = useLanguage();

  return (
    <section id="triple-helix" className="py-24 px-6 bg-[#0a0e27] relative border-t border-[#1a2847]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#00d9ff]" />
            <span className="text-[#00d9ff] font-mono text-sm uppercase tracking-widest">{t('helix.badge')}</span>
            <div className="h-px w-12 bg-[#00d9ff]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t('helix.title1')} <span className="text-[#00d9ff]">{t('helix.title2')}</span>
          </h2>
          <p className="text-[#c0c0c0] max-w-3xl mx-auto text-lg">{t('helix.subtitle')}</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          <VertexCard icon={Building} title={t('helix.gov.title')} role={t('helix.gov.role')} description={t('helix.gov.desc')} delay={0} />
          <VertexCard icon={Users} title={t('helix.industry.title')} role={t('helix.industry.role')} description={t('helix.industry.desc')} delay={0.2} />
          <VertexCard icon={Microscope} title={t('helix.academic.title')} role={t('helix.academic.role')} description={t('helix.academic.desc')} delay={0.4} />
        </div>
      </div>
    </section>
  );
};

export default TripleHelixSection;
