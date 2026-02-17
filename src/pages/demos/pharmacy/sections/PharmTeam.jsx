import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const teamMembers = [
  { key: 'pharm1', initials: 'RL', gradient: 'from-blue-400 to-indigo-500' },
  { key: 'pharm2', initials: 'SM', gradient: 'from-teal-400 to-cyan-500' },
  { key: 'pharm3', initials: 'JP', gradient: 'from-purple-400 to-pink-500' },
];

const PharmTeam = () => {
  const { t } = useLanguage();

  return (
    <section id="pharm-team" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
            {t('pharmDemo.team.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('pharmDemo.team.title')}
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t('pharmDemo.team.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300 group"
            >
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-105 transition-transform`}>
                <span className="text-2xl font-bold text-white">{member.initials}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {t(`pharmDemo.team.${member.key}.name`)}
              </h3>
              <p className="text-blue-600 font-medium text-sm mb-3">
                {t(`pharmDemo.team.${member.key}.role`)}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t(`pharmDemo.team.${member.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PharmTeam;
