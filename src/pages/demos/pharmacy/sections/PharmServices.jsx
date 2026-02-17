import React from 'react';
import { motion } from 'framer-motion';
import { Pill, Heart, Thermometer, Baby, Truck, FlaskConical } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const services = [
  { key: 'prescriptions', icon: Pill, color: 'bg-blue-50 text-blue-600' },
  { key: 'otc', icon: Heart, color: 'bg-purple-50 text-purple-600' },
  { key: 'health', icon: Thermometer, color: 'bg-red-50 text-red-600' },
  { key: 'baby', icon: Baby, color: 'bg-pink-50 text-pink-600' },
  { key: 'delivery', icon: Truck, color: 'bg-amber-50 text-amber-600' },
  { key: 'lab', icon: FlaskConical, color: 'bg-teal-50 text-teal-600' },
];

const PharmServices = () => {
  const { t } = useLanguage();

  return (
    <section id="pharm-services" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
            {t('pharmDemo.services.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('pharmDemo.services.title')}
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('pharmDemo.services.subtitle')}
          </p>
        </motion.div>

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
                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {t(`pharmDemo.services.${service.key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`pharmDemo.services.${service.key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PharmServices;
