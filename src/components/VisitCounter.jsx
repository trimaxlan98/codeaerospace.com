import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const VisitCounter = () => {
  const [visits, setVisits] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const stored = localStorage.getItem('codeaerospace_visits');
    const lastVisit = localStorage.getItem('codeaerospace_last_visit');
    const now = Date.now();
    let count = stored ? parseInt(stored, 10) : 0;

    const thirtyMin = 30 * 60 * 1000;
    if (!lastVisit || (now - parseInt(lastVisit, 10)) > thirtyMin) {
      count += 1;
      localStorage.setItem('codeaerospace_visits', count.toString());
      localStorage.setItem('codeaerospace_last_visit', now.toString());
    }

    setVisits(count);
  }, []);

  return (
    <div className="mt-4 inline-flex items-center gap-3 px-4 py-2.5 bg-[#1a2847]/60 border border-[#2a3c5f] rounded-lg">
      <div className="p-1.5 bg-[#00d9ff]/10 rounded-md">
        <Eye className="w-4 h-4 text-[#00d9ff]" />
      </div>
      <div>
        <p className="text-[10px] text-[#64748b] uppercase tracking-wider font-mono leading-none mb-0.5">
          {t('visits.label')}
        </p>
        <p className="text-sm text-white font-bold leading-none">
          {visits} {visits !== 1 ? t('visits.times') : t('visits.time')}
        </p>
      </div>
    </div>
  );
};

export default VisitCounter;
