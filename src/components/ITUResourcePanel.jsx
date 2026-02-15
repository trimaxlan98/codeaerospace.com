
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ITUResourcePanel = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-16 w-full"
    >
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0a0e27] to-[#1a2847] border border-[#1a2847] shadow-2xl group hover:border-[#00d9ff]/50 transition-all duration-500">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent opacity-50" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 gap-6 backdrop-blur-sm rounded-lg">
          <div className="flex items-start gap-6">
            <div className="hidden sm:flex p-4 bg-[#00d9ff]/10 rounded-full border border-[#00d9ff]/30 shadow-[0_0_15px_rgba(0,217,255,0.2)]">
              <Globe className="w-8 h-8 text-[#00d9ff]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#00d9ff]/10 text-[#00d9ff] border border-[#00d9ff]/20 rounded">
                  {t('wrc.ituBadge')}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('wrc.ituTitle')}</h3>
              <p className="text-[#c0c0c0] max-w-xl text-sm leading-relaxed">{t('wrc.ituDesc')}</p>
            </div>
          </div>

          <a
            href="https://www.itu.int/wrc-27/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00b8dd] transition-all duration-300 shadow-lg hover:shadow-[#00d9ff]/25 shrink-0 active:scale-95"
          >
            {t('wrc.ituBtn')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ITUResourcePanel;
