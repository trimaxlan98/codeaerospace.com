import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Rocket } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const PharmDemoBadge = () => {
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50 max-w-xs"
    >
      <div className="bg-[#0a0e27] border border-[#00d9ff]/50 rounded-2xl shadow-[0_0_30px_rgba(0,217,255,0.2)] p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#00d9ff]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Rocket className="w-4 h-4 text-[#00d9ff]" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[#00d9ff] font-bold text-xs uppercase tracking-wider">
              {t('pharmDemo.demoBadge.label')}
            </span>
            <p className="text-[#c0c0c0] text-xs mt-0.5 leading-relaxed">
              {t('pharmDemo.demoBadge.tooltip')}
            </p>
          </div>
          <button onClick={() => setDismissed(true)} className="text-[#c0c0c0] hover:text-white flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
        <a
          href="/#microapps"
          className="mt-3 block text-center px-4 py-2 bg-[#00d9ff] text-[#0a0e27] text-xs font-bold rounded-lg hover:bg-[#00b8dd] transition-colors"
        >
          {t('pharmDemo.footer.backToMain')}
        </a>
      </div>
    </motion.div>
  );
};

export default PharmDemoBadge;
