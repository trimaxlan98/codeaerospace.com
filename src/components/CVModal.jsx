import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Briefcase, Wrench, Mail, Download } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const CVModal = ({ isOpen, onClose, member }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative bg-[#0f1a2e] border border-[#00d9ff]/30 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-[0_0_60px_rgba(0,217,255,0.15)]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative p-6 pb-4 border-b border-[#1a2847]">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent" />
              <button onClick={onClose} className="absolute top-4 right-4 p-2 text-[#94a3b8] hover:text-white hover:bg-[#1a2847] rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/30 flex items-center justify-center text-[#00d9ff] text-xl font-bold">
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-[#00d9ff] text-sm font-mono uppercase tracking-wider">{member.title}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-[#c0c0c0] text-sm leading-relaxed">{member.bio}</p>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-4 h-4 text-[#00d9ff]" />
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{t('cv.education')}</h4>
                </div>
                <ul className="space-y-2">
                  {member.education.map((edu, idx) => (
                    <li key={idx} className="text-sm text-[#c0c0c0] flex items-start gap-2">
                      <span className="text-[#00d9ff] mt-0.5 shrink-0">›</span><span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-4 h-4 text-[#00d9ff]" />
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{t('cv.experience')}</h4>
                </div>
                <ul className="space-y-2">
                  {member.experience.map((exp, idx) => (
                    <li key={idx} className="text-sm text-[#c0c0c0] flex items-start gap-2">
                      <span className="text-[#00d9ff] mt-0.5 shrink-0">›</span><span>{exp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="w-4 h-4 text-[#00d9ff]" />
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{t('cv.skills')}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 text-xs font-mono bg-[#00d9ff]/10 text-[#00d9ff] border border-[#00d9ff]/20 rounded-full">{skill}</span>
                  ))}
                </div>
              </div>

              {member.email && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Mail className="w-4 h-4 text-[#00d9ff]" />
                    <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{t('cv.contact')}</h4>
                  </div>
                  <a href={`mailto:${member.email}`} className="text-sm text-[#00d9ff] hover:underline">{member.email}</a>
                </div>
              )}

              {member.cvPdf && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Download className="w-4 h-4 text-[#00d9ff]" />
                    <h4 className="text-white font-semibold text-sm uppercase tracking-wider">{t('cv.download')}</h4>
                  </div>
                  <a href={member.cvPdf} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00d9ff] hover:underline">
                    {t('cv.downloadLink')}
                  </a>
                </div>
              )}
            </div>

            <div className="p-6 pt-4 border-t border-[#1a2847]">
              <button onClick={onClose} className="w-full px-6 py-3 bg-[#1a2847] text-white font-medium rounded-lg hover:bg-[#243456] border border-[#2a3c5f] transition-colors text-sm">
                {t('cv.close')}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVModal;
