import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Pill, Heart, Sparkles, Shield, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import PharmOrderForm from './PharmOrderForm';

const categoryItems = [
  { key: 'medicines', icon: Pill },
  { key: 'vitamins', icon: Sparkles },
  { key: 'personal', icon: Heart },
  { key: 'medical', icon: Shield },
];

const PharmProducts = () => {
  const { t, lang } = useLanguage();

  return (
    <section id="pharm-products" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-4">
            <ShoppingBag className="w-3.5 h-3.5" />
            {t('pharmDemo.products.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('pharmDemo.products.title')}
          </h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('pharmDemo.products.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Categories */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('pharmDemo.products.categories.title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categoryItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3 group-hover:bg-blue-100 transition-colors">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">{t(`pharmDemo.products.categories.${item.key}`)}</h4>
                    <p className="text-blue-600 font-semibold text-lg">{t(`pharmDemo.products.categories.${item.key}Price`)}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                {[
                  { en: 'Licensed & certified pharmacy', es: 'Farmacia licenciada y certificada' },
                  { en: 'Prescription verification', es: 'Verificacion de recetas medicas' },
                  { en: 'Home delivery available', es: 'Envio a domicilio disponible' },
                  { en: 'Generic & brand name options', es: 'Opciones genericas y de marca' },
                  { en: 'Competitive pricing', es: 'Precios competitivos' },
                  { en: 'Pharmaceutical consultation', es: 'Consulta farmaceutica incluida' },
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span>{lang === 'es' ? feat.es : feat.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Order Form */}
          <div>
            <PharmOrderForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PharmProducts;
