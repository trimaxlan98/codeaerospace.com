import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const teamMembers = [
  { key: 'doc1', initials: 'MG', gradient: 'from-emerald-400 to-teal-500' },
  { key: 'doc2', initials: 'CL', gradient: 'from-blue-400 to-indigo-500' },
  { key: 'doc3', initials: 'AM', gradient: 'from-pink-400 to-rose-500' },
];

const VetTeam = () => {
  const { t } = useLanguage();

  return (
    <section id="vet-team" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
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
            {t('vetDemo.team.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('vetDemo.team.title')}
          </h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('vetDemo.team.subtitle')}
          </p>
        </motion.div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg border border-gray-100 hover:border-emerald-200 transition-all duration-300 group"
            >
              {/* Avatar */}
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform`}>
                <span className="text-2xl font-bold text-white">{member.initials}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {t(`vetDemo.team.${member.key}.name`)}
              </h3>
              <p className="text-emerald-600 font-medium text-sm mb-3">
                {t(`vetDemo.team.${member.key}.role`)}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(`vetDemo.team.${member.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VetTeam;
