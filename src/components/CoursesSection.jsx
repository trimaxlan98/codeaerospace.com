import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Microscope, Users, Activity, ExternalLink, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

const CoursesSection = () => {
  const { t } = useLanguage();

  const allCourses = [
    {
      id: 'signals',
      title: t('courses.signals.title'),
      desc: t('courses.signals.desc'),
      icon: Activity,
      color: "from-amber-500/20 to-orange-500/20",
      accent: "#f59e0b",
      path: "/courses/signals-systems",
      isNew: true
    },
    {
      id: 'ai',
      title: t('impact.workshops.ai.title'),
      desc: t('impact.workshops.ai.desc'),
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/20",
      accent: "#00d9ff",
      path: "#"
    },
    {
      id: 'control',
      title: t('impact.workshops.control.title'),
      desc: t('impact.workshops.control.desc'),
      icon: Microscope,
      color: "from-purple-500/20 to-blue-500/20",
      accent: "#a855f7",
      path: "#"
    },
    {
      id: 'mechanical',
      title: t('impact.workshops.mechanical.title'),
      desc: t('impact.workshops.mechanical.desc'),
      icon: BookOpen,
      color: "from-cyan-500/20 to-emerald-500/20",
      accent: "#10b981",
      path: "#"
    }
  ];

  return (
    <section id="courses" className="py-24 px-6 bg-[#0a0e27] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] text-xs font-bold uppercase tracking-widest mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Academy
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            {t('courses.title')}
          </h2>
          <p className="text-[#c0c0c0] text-xl max-w-3xl mx-auto leading-relaxed">
            {t('courses.subtitle')}
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allCourses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative h-full p-1 bg-gradient-to-b from-[#1a2847] to-transparent rounded-2xl overflow-hidden">
                <div className="bg-[#1a2847]/40 backdrop-blur-sm p-8 rounded-[14px] h-full flex flex-col border border-white/5 group-hover:border-[#00d9ff]/30 transition-all duration-500">
                  
                  {/* Icon & New Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                      <course.icon className="w-7 h-7" style={{ color: course.accent }} />
                    </div>
                    {course.isNew && (
                      <span className="px-2 py-1 rounded bg-amber-500/20 border border-amber-500/50 text-amber-500 text-[10px] font-bold uppercase tracking-tighter animate-pulse">
                        New
                      </span>
                    )}
                  </div>

                  <h4 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#00d9ff] transition-colors duration-300">
                    {course.title}
                  </h4>
                  <p className="text-[#c0c0c0] text-base mb-8 flex-grow leading-relaxed">
                    {course.desc}
                  </p>

                  <Link 
                    to={course.path}
                    target={course.path.startsWith('http') || course.path.startsWith('/courses') ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="group/btn relative w-full py-4 px-6 bg-transparent border border-[#00d9ff]/40 text-[#00d9ff] font-bold rounded-lg overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#00d9ff] hover:text-[#0a0e27]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {t('courses.view_course')}
                      <ExternalLink className="w-4 h-4" />
                    </span>
                  </Link>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                    <Award className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Hover glow effect */}
              <div 
                className="absolute -inset-2 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 rounded-3xl"
                style={{ backgroundImage: `linear-gradient(to right, ${course.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoursesSection;
