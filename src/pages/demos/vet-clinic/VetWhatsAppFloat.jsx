import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import WhatsAppIcon from './WhatsAppIcon';

const VetWhatsAppFloat = () => {
  const { t } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  const waNumber = t('vetDemo.whatsapp.number');
  const waMsg = encodeURIComponent(t('vetDemo.whatsapp.defaultMsg'));

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) {
      const tip = setTimeout(() => setShowTooltip(true), 3000);
      return () => clearTimeout(tip);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-20 right-4 z-40"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute bottom-16 right-0 bg-white rounded-xl shadow-xl border border-gray-200 p-3 pr-8 max-w-[220px]"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="text-sm text-gray-700 font-medium leading-snug">
              {t('vetDemo.whatsapp.floatingLabel')}
            </p>
            {/* Arrow */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-gray-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <a
        href={`https://wa.me/${waNumber}?text=${waMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        onClick={() => setShowTooltip(false)}
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </a>

      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping pointer-events-none" style={{ animationDuration: '3s' }} />
    </motion.div>
  );
};

export default VetWhatsAppFloat;
