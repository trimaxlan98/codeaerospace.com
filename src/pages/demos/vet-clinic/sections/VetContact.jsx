import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WhatsAppIcon from '../WhatsAppIcon';

const VetContact = () => {
  const { t } = useLanguage();
  const waNumber = t('vetDemo.whatsapp.number');
  const waMsg = encodeURIComponent(t('vetDemo.whatsapp.defaultMsg'));

  return (
    <section id="vet-contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
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
            {t('vetDemo.contact.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('vetDemo.contact.title')}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Address */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{t('vetDemo.contact.badge')}</h4>
                <p className="text-gray-600">{t('vetDemo.contact.address')}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{t('vetDemo.contact.phone')}</h4>
                <p className="text-gray-600">{t('vetDemo.contact.email')}</p>
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-5 bg-[#25D366]/5 rounded-xl border-2 border-[#25D366]/20 hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <WhatsAppIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{t('vetDemo.contact.whatsapp')}</h4>
                <p className="text-gray-600">{t('vetDemo.contact.whatsappDesc')}</p>
                <p className="text-[#25D366] font-semibold text-sm mt-1">+52 1 55 8734 1692</p>
              </div>
            </a>

            {/* Hours */}
            <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{t('vetDemo.contact.hours')}</h4>
                <p className="text-gray-600">{t('vetDemo.contact.weekdays')}</p>
                <p className="text-gray-600">{t('vetDemo.contact.saturday')}</p>
                <p className="text-gray-600">{t('vetDemo.contact.sunday')}</p>
              </div>
            </div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gray-100 rounded-2xl h-full min-h-[320px] md:min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-emerald-600" />
                </div>
                <p className="text-gray-500 font-medium">{t('vetDemo.contact.address')}</p>
                <p className="text-gray-400 text-sm mt-2">Google Maps</p>
              </div>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Emergency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-7 h-7 text-red-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-red-800 mb-1">{t('vetDemo.contact.emergency')}</h4>
              <p className="text-red-600 text-lg font-semibold">{t('vetDemo.contact.emergencyPhone')}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-700 font-bold text-sm uppercase tracking-wider">24/7</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VetContact;
