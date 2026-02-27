import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Bot, Smartphone, Eye, Cpu, Settings, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const ServiceModal = ({ isOpen, onClose, service, t }) => {
  if (!service) return null;
  const Icon = service.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a0e27]/95"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0e27] border-2 border-[#00d9ff] rounded-2xl p-8 z-[101] shadow-[0_0_50px_rgba(0,217,255,0.2)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#c0c0c0] hover:text-[#00d9ff] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#00d9ff]/10 rounded-xl border border-[#00d9ff]/30">
                <Icon className="w-8 h-8 text-[#00d9ff]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h3>
            </div>

            <p className="text-slate-200 text-lg leading-relaxed mb-8">
              {service.details}
            </p>

            {/* Nexo Comercial */}
            {(service.id === 'web' || service.id === 'ai_automation') && (
              <div className="mb-8 p-4 rounded-xl bg-[#00d9ff]/5 border border-[#00d9ff]/20">
                <p className="text-sm text-slate-300 mb-3 italic">
                  {t('services.microappsLink')}
                </p>
                <Link
                  to="/microapps"
                  className="inline-flex items-center gap-2 text-[#00d9ff] text-sm font-bold hover:underline"
                >
                  {t('services.microappsBtn')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00b8dd] transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.3)]"
              >
                {t('hero.cta2')} <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                onClick={onClose}
                className="px-8 py-4 border border-[#00d9ff]/30 text-[#00d9ff] font-bold rounded-lg hover:bg-[#00d9ff]/10 transition-all duration-300"
              >
                {t('cv.close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ServiceCard = ({ id, icon: Icon, title, description, learnMore, delay, onOpen, t }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(0,217,255,0.15)' }}
    onClick={onOpen}
    className="relative bg-gradient-to-br from-[#1a2847] to-[#0a0e27] p-8 rounded-xl border border-[#2a3c5f] hover:border-[#00d9ff] transition-all duration-300 group h-full flex flex-col overflow-hidden will-change-transform cursor-pointer"
  >
    {/* Inner Border Frame */}
    <div className="absolute inset-1 border border-[#00d9ff]/5 rounded-lg pointer-events-none group-hover:border-[#00d9ff]/20 transition-colors" />
    
    {/* Serial Code */}
    <div className="absolute top-4 right-4 font-mono text-[10px] text-[#00d9ff]/40 tracking-widest uppercase">
      {t('services.ui.serial')}-{id.substring(0, 2).toUpperCase()}
    </div>

    <div className="mb-8 inline-block p-4 bg-[#0a0e27] rounded-xl border border-[#00d9ff]/30 group-hover:bg-[#00d9ff]/10 transition-all duration-300">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className="w-10 h-10 text-[#00d9ff] antialiased" />
      </motion.div>
    </div>

    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter group-hover:text-[#00d9ff] transition-colors antialiased">
      {title}
    </h3>
    
    <p className="text-slate-200 text-base leading-relaxed flex-grow antialiased">
      {description}
    </p>

    <div className="mt-8 pt-6 border-t border-[#2a3c5f] group-hover:border-[#00d9ff]/30 transition-colors">
      <button 
        className="text-[#00d9ff] text-sm font-mono font-bold uppercase tracking-widest flex items-center gap-3 group/btn"
      >
        <span className="animate-pulse">_</span> {t('services.ui.command')}
      </button>
    </div>
  </motion.div>
);

const TechnicalServicesSection = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { 
      id: 'web',
      icon: Layout, 
      title: t('services.web.title'), 
      description: t('services.web.desc'),
      details: t('services.web.details')
    },
    { 
      id: 'ai_automation',
      icon: Bot, 
      title: t('services.ai_automation.title'), 
      description: t('services.ai_automation.desc'),
      details: t('services.ai_automation.details')
    },
    { 
      id: 'mobile',
      icon: Smartphone, 
      title: t('services.mobile.title'), 
      description: t('services.mobile.desc'),
      details: t('services.mobile.details')
    },
    { 
      id: 'vr_training',
      icon: Eye, 
      title: t('services.vr_training.title'), 
      description: t('services.vr_training.desc'),
      details: t('services.vr_training.details')
    },
    { 
      id: 'iot_automation',
      icon: Cpu, 
      title: t('services.iot_automation.title'), 
      description: t('services.iot_automation.desc'),
      details: t('services.iot_automation.details')
    },
    { 
      id: 'project_eng',
      icon: Settings, 
      title: t('services.project_eng.title'), 
      description: t('services.project_eng.desc'),
      details: t('services.project_eng.details')
    },
  ];

  return (
    <section id="services" className="py-24 px-6 bg-[#0a0e27] border-t border-[#1a2847] relative antialiased">
      {/* Focal Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#00d9ff]/[0.03] via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t('services.title1')} <span className="text-[#00d9ff]">{t('services.title2')}</span>
          </h2>
          <div className="w-24 h-1 bg-[#00d9ff] mx-auto mb-6" />
          <p className="text-[#c0c0c0] max-w-2xl mx-auto text-lg leading-relaxed">{t('services.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index} 
              {...service} 
              t={t}
              delay={index * 0.1} 
              onOpen={() => setSelectedService(service)}
            />
          ))}
        </div>
      </div>

      <ServiceModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        service={selectedService}
        t={t}
      />
    </section>
  );
};

export default TechnicalServicesSection;
