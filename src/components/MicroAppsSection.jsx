import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Palette, Code2, Rocket, Headphones, ShoppingBag, BarChart3, Cpu, Check, Zap, ExternalLink, PawPrint } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const stepIcons = [Search, Palette, Code2, Rocket, Headphones];

const StepCard = ({ index, icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="relative flex flex-col items-center text-center group"
  >
    {/* Connector line */}
    {index < 4 && (
      <div className="hidden lg:block absolute top-10 left-[60%] w-[calc(100%-20%)] h-[2px] bg-gradient-to-r from-[#00d9ff]/50 to-[#00d9ff]/10" />
    )}
    {/* Step number badge */}
    <div className="relative z-10 mb-4">
      <div className="w-20 h-20 rounded-full bg-[#0a0e27] border-2 border-[#00d9ff]/40 flex items-center justify-center group-hover:border-[#00d9ff] group-hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all duration-300">
        <Icon className="w-8 h-8 text-[#00d9ff]" />
      </div>
      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#00d9ff] text-[#0a0e27] text-xs font-bold flex items-center justify-center">
        {index + 1}
      </span>
    </div>
    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00d9ff] transition-colors">{title}</h3>
    <p className="text-[#c0c0c0] text-sm leading-relaxed max-w-[220px]">{description}</p>
  </motion.div>
);

const PricingCard = ({ name, price, features, isPopular, popularLabel, oneTimeLabel, cta, delay, onCta }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`relative rounded-2xl p-8 flex flex-col h-full transition-all duration-300 ${
      isPopular
        ? 'bg-gradient-to-b from-[#00d9ff]/10 to-[#1a2847] border-2 border-[#00d9ff] shadow-[0_0_30px_rgba(0,217,255,0.15)]'
        : 'bg-[#1a2847] border border-[#2a3c5f] hover:border-[#00d9ff]/50'
    }`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00d9ff] text-[#0a0e27] text-xs font-bold rounded-full uppercase tracking-wider">
        {popularLabel}
      </div>
    )}
    <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
    <div className="mb-6">
      <span className="text-4xl font-extrabold text-[#00d9ff]">{price}</span>
      <span className="text-[#c0c0c0] text-sm ml-1">MXN</span>
      <p className="text-[#c0c0c0] text-xs mt-1">{oneTimeLabel}</p>
    </div>
    <ul className="space-y-3 mb-8 flex-grow">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3 text-sm">
          <Check className="w-4 h-4 text-[#00d9ff] mt-0.5 flex-shrink-0" />
          <span className="text-[#c0c0c0]">{feature}</span>
        </li>
      ))}
    </ul>
    <button
      onClick={onCta}
      className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
        isPopular
          ? 'bg-[#00d9ff] text-[#0a0e27] hover:bg-[#00b8dd] shadow-lg hover:shadow-cyan-500/25'
          : 'border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff]/10'
      }`}
    >
      {cta}
    </button>
  </motion.div>
);

const MicroAppsSection = () => {
  const { t } = useLanguage();

  const steps = [
    { icon: stepIcons[0], title: t('microapps.step1.title'), description: t('microapps.step1.desc') },
    { icon: stepIcons[1], title: t('microapps.step2.title'), description: t('microapps.step2.desc') },
    { icon: stepIcons[2], title: t('microapps.step3.title'), description: t('microapps.step3.desc') },
    { icon: stepIcons[3], title: t('microapps.step4.title'), description: t('microapps.step4.desc') },
    { icon: stepIcons[4], title: t('microapps.step5.title'), description: t('microapps.step5.desc') },
  ];

  const packages = [
    {
      name: t('microapps.basic.name'),
      price: t('microapps.basic.price'),
      features: [t('microapps.basic.f1'), t('microapps.basic.f2'), t('microapps.basic.f3'), t('microapps.basic.f4'), t('microapps.basic.f5')],
      isPopular: false,
    },
    {
      name: t('microapps.pro.name'),
      price: t('microapps.pro.price'),
      features: [t('microapps.pro.f1'), t('microapps.pro.f2'), t('microapps.pro.f3'), t('microapps.pro.f4'), t('microapps.pro.f5')],
      isPopular: true,
    },
    {
      name: t('microapps.premium.name'),
      price: t('microapps.premium.price'),
      features: [t('microapps.premium.f1'), t('microapps.premium.f2'), t('microapps.premium.f3'), t('microapps.premium.f4'), t('microapps.premium.f5')],
      isPopular: false,
    },
  ];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="microapps" className="py-24 px-6 bg-[#0a0e27] border-t border-[#1a2847]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] text-xs font-bold uppercase tracking-widest mb-6">
            <Zap className="w-3.5 h-3.5" />
            {t('microapps.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t('microapps.title1')} <span className="text-[#00d9ff]">{t('microapps.title2')}</span>
          </h2>
          <div className="w-24 h-1 bg-[#00d9ff] mx-auto mb-6" />
          <p className="text-[#c0c0c0] max-w-2xl mx-auto text-lg">{t('microapps.subtitle')}</p>
        </motion.div>

        {/* 5 Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 mb-24">
          {steps.map((step, i) => (
            <StepCard key={i} index={i} {...step} delay={i * 0.1} />
          ))}
        </div>

        {/* Demo Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24 relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a2847] via-[#0f2027] to-[#1a2847] border border-[#00d9ff]/30 p-8 md:p-12"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGQ5ZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                <PawPrint className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-center md:text-left">
                <span className="inline-block px-3 py-1 bg-[#00d9ff]/10 border border-[#00d9ff]/30 rounded-full text-[#00d9ff] text-xs font-bold uppercase tracking-wider mb-2">
                  {t('microapps.demoLabel')}
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  VetCare Clinic Demo
                </h3>
                <p className="text-[#c0c0c0] text-sm mt-1 max-w-md">
                  {t('microapps.demoDesc')}
                </p>
              </div>
            </div>
            <Link
              to="/demo/veterinaria"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00b8dd] transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)] whitespace-nowrap"
            >
              {t('microapps.demoLabel')}
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        {/* Packages Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t('microapps.packages')}
          </h3>
          <div className="w-16 h-1 bg-[#00d9ff] mx-auto" />
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg, i) => (
            <PricingCard
              key={i}
              {...pkg}
              popularLabel={t('microapps.popular')}
              oneTimeLabel={t('microapps.oneTime')}
              cta={t('microapps.cta')}
              delay={i * 0.15}
              onCta={scrollToContact}
            />
          ))}
        </div>

        {/* Monthly Maintenance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a2847] to-[#0a0e27] border border-[#2a3c5f] p-8 text-center"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGQ5ZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Headphones className="w-6 h-6 text-[#00d9ff]" />
              <h4 className="text-xl font-bold text-white">{t('microapps.maintenance')}</h4>
            </div>
            <div className="mb-3">
              <span className="text-3xl font-extrabold text-[#00d9ff]">$500</span>
              <span className="text-[#c0c0c0] text-sm ml-1">MXN{t('microapps.monthly')}</span>
            </div>
            <p className="text-[#c0c0c0] text-sm max-w-md mx-auto">{t('microapps.maintenanceDesc')}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MicroAppsSection;
