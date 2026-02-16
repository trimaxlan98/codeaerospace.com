import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bath, Scissors, Hand, Star, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import VetAppointmentForm from './VetAppointmentForm';

const pricingItems = [
  { key: 'bath', nameKey: 'bath', priceKey: 'bathPrice', icon: Bath },
  { key: 'full', nameKey: 'full', priceKey: 'fullPrice', icon: Scissors },
  { key: 'nails', nameKey: 'nails', priceKey: 'nailsPrice', icon: Hand },
  { key: 'spa', nameKey: 'spa', priceKey: 'spaPrice', icon: Star },
];

const VetGrooming = () => {
  const { t, lang } = useLanguage();

  return (
    <section id="vet-grooming" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {t('vetDemo.grooming.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('vetDemo.grooming.title')}
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('vetDemo.grooming.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Pricing */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('vetDemo.grooming.pricing.title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pricingItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-3 group-hover:bg-amber-100 transition-colors">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{t(`vetDemo.grooming.pricing.${item.nameKey}`)}</h4>
                    <p className="text-emerald-600 font-semibold text-lg">{t(`vetDemo.grooming.pricing.${item.priceKey}`)}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Grooming features */}
            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                {[
                  { en: 'Professional hypoallergenic products', es: 'Productos profesionales hipoalergenicos' },
                  { en: 'Breed-specific styling cuts', es: 'Cortes de estilo por raza' },
                  { en: 'Ear cleaning included', es: 'Limpieza de oidos incluida' },
                  { en: 'Anti-flea & tick treatment', es: 'Tratamiento antipulgas y garrapatas' },
                  { en: 'Gentle & stress-free handling', es: 'Manejo gentil y sin estres' },
                  { en: 'Before & after photo sent via WhatsApp', es: 'Foto antes y despues enviada por WhatsApp' },
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{lang === 'es' ? feat.es : feat.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Appointment Form */}
          <div>
            <VetAppointmentForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VetGrooming;
