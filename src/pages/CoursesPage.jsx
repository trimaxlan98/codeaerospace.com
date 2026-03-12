import React from 'react';
import { Helmet } from 'react-helmet';
import CoursesSection from '@/components/CoursesSection';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const CoursesPage = () => {
  return (
    <>
      <Helmet>
        <title>Cursos | Co.De Aerospace Academy</title>
        <meta name="description" content="Programas especializados en ingeniería y tecnología espacial. Formación de alto nivel en señales, sistemas, IA y control." />
      </Helmet>

      <div className="pt-20 bg-[#0a0e27] min-h-screen">
        {/* Hero Section for Courses */}
        <section className="py-20 px-6 bg-gradient-to-b from-[#1a2847]/40 to-[#0a0e27] border-b border-[#1a2847]">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#00d9ff]/10 border border-[#00d9ff]/20 mb-8"
            >
              <BookOpen className="w-10 h-10 text-[#00d9ff]" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tighter"
            >
              Co.De <span className="text-[#00d9ff]">Academy</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Impulsando la soberanía tecnológica a través de la formación técnica de excelencia en el sector aeroespacial.
            </motion.p>
          </div>
        </section>

        <CoursesSection />
        
        {/* Bottom spacer */}
        <div className="py-20" />
      </div>
    </>
  );
};

export default CoursesPage;
