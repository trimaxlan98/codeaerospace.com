import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope, Syringe, Scissors, Heart, Sparkles, Microscope } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const services = [
  { key: 'consult', icon: Stethoscope, color: 'bg-blue-50 text-blue-600' },
  { key: 'vaccines', icon: Syringe, color: 'bg-purple-50 text-purple-600' },
  { key: 'surgery', icon: Scissors, color: 'bg-red-50 text-red-600' },
  { key: 'dental', icon: Heart, color: 'bg-pink-50 text-pink-600' },
  { key: 'grooming', icon: Sparkles, color: 'bg-amber-50 text-amber-600' },
  { key: 'lab', icon: Microscope, color: 'bg-teal-50 text-teal-600' },
];

const VetServices = () => {
  const { t } = useLanguage();

  return (
    <section id="vet-services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
            {t('vetDemo.services.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('vetDemo.services.title')}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('vetDemo.services.subtitle')}
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg border border-gray-100 hover:border-emerald-200 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {t(`vetDemo.services.${service.key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`vetDemo.services.${service.key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VetServices;
