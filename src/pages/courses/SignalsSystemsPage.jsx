import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Activity, Book, Cpu, LineChart, ArrowLeft, Zap, Layers, Beaker, BarChart2, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import SignalTransformLab from '@/components/courses/signals/SignalTransformLab';
import SymmetryLab from '@/components/courses/signals/SymmetryLab';
import SingularityLab from '@/components/courses/signals/SingularityLab';
import NyquistLab from '@/components/courses/signals/NyquistLab';
import ConvolutionLab from '@/components/courses/signals/ConvolutionLab';

const SignalsSystemsPage = () => {
  const { t } = useLanguage();
  const [activeLab, setActiveLab] = useState(0);

  const labs = [
    {
      id: 0,
      title: "Transformaciones x(at - b)",
      subtitle: "Operaciones de variable",
      icon: Activity,
      component: <SignalTransformLab />,
      description: "Experimenta con el escalamiento y desplazamiento temporal de señales fundamentales."
    },
    {
      id: 1,
      title: "Simetría Par e Impar",
      subtitle: "El Espejo Matemático",
      icon: Beaker,
      component: <SymmetryLab />,
      description: "Descompón cualquier señal en sus componentes de simetría especular y rotacional."
    },
    {
      id: 2,
      title: "Átomos de Señal",
      subtitle: "Genealogía Funcional",
      icon: Zap,
      component: <SingularityLab />,
      description: "Explora la relación entre el impulso, el escalón y la rampa en CT y DT."
    },
    {
      id: 3,
      title: "El Guardián de Nyquist",
      subtitle: "Muestreo vs Aliasing",
      icon: LineChart,
      component: <NyquistLab />,
      description: "Visualiza el criterio de Nyquist y las consecuencias del sub-muestreo en diferentes áreas de la ingeniería."
    },
    {
      id: 4,
      title: "Convolución Gráfica",
      subtitle: "Integral de Superposición",
      icon: BarChart2,
      component: <ConvolutionLab />,
      description: "Visualiza el proceso de convolución mediante el método de 'invertir y desplazar' para señales continuas y discretas."
    }
  ];

  const handleDownloadTemario = () => {
    const link = document.createElement('a');
    link.href = '/courses/signals-systems/temario/Análisis_de_Señales_y_Sistemas.pdf';
    link.download = 'Análisis_de_Señales_y_Sistemas_UPIITA.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Helmet>
        <title>{t('courses.signals.title')} | Co.De Academy</title>
        <meta name="description" content="Domina el análisis de señales y sistemas para aplicaciones aeroespaciales y de comunicaciones." />
      </Helmet>

      <div className="pt-20 bg-[#0a0e27] min-h-screen">
        {/* Header/Hero */}
        <section className="relative py-20 px-6 overflow-hidden border-b border-[#1a2847]">
          <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <Link to="/courses" className="inline-flex items-center gap-2 text-[#00d9ff] hover:underline mb-8 group transition-all">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Volver a Cursos
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight uppercase tracking-tighter"
                >
                  {t('courses.signals.title')}
                </motion.h1>
                <p className="text-lg text-slate-400 max-w-2xl">
                  Laboratorios Virtuales de Experimentación en Tiempo Real.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                 <button 
                    onClick={handleDownloadTemario}
                    className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold flex items-center gap-2 hover:bg-white/10 transition-all"
                 >
                    <Download size={16} className="text-[#00d9ff]" />
                    Descargar Temario
                 </button>
                 <div className="px-4 py-3 rounded-xl bg-[#00d9ff]/10 border border-[#00d9ff]/20 text-[#00d9ff] text-xs font-bold font-mono flex items-center">
                    MOD: 01-05
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lab Navigator (Tabs) */}
        <section className="py-12 px-6 bg-[#0a0e27]">
          <div className="max-w-7xl mx-auto">
            {/* Tab Buttons */}
            <div className="flex flex-wrap gap-2 mb-12 p-1.5 bg-black/40 rounded-2xl border border-white/5 w-fit mx-auto md:mx-0">
               {labs.map((lab) => (
                 <button
                   key={lab.id}
                   onClick={() => setActiveLab(lab.id)}
                   className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-3 ${
                     activeLab === lab.id 
                     ? 'bg-[#00d9ff] text-[#0a0e27] shadow-[0_0_20px_rgba(0,217,255,0.4)]' 
                     : 'text-slate-500 hover:text-white hover:bg-white/5'
                   }`}
                 >
                   <lab.icon size={16} />
                   <span className="hidden sm:inline">Lab 0{lab.id + 1}</span>
                 </button>
               ))}
            </div>

            {/* Lab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
               {/* Context Sidebar */}
               <div className="lg:col-span-1 space-y-8">
                  <motion.div
                    key={`sidebar-${activeLab}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                     <div>
                        <span className="text-[#00d9ff] text-[10px] font-bold uppercase tracking-[0.3em] block mb-2">{labs[activeLab].subtitle}</span>
                        <h2 className="text-3xl font-bold text-white leading-tight mb-4">{labs[activeLab].title}</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {labs[activeLab].description}
                        </p>
                     </div>

                     <div className="space-y-4 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3 text-slate-300">
                           <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                              <Layers size={14} className="text-[#00d9ff]" />
                           </div>
                           <span className="text-xs font-medium">Modelado Matemático</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                           <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                              <Cpu size={14} className="text-[#00d9ff]" />
                           </div>
                           <span className="text-xs font-medium">Procesamiento en Tiempo Real</span>
                        </div>
                     </div>
                  </motion.div>
               </div>

               {/* Active Lab Component */}
               <div className="lg:col-span-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeLab}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {labs[activeLab].component}
                    </motion.div>
                  </AnimatePresence>
               </div>
            </div>
          </div>
        </section>

        {/* Extra resources / syllabus */}
        <section className="py-24 px-6 border-t border-white/5 bg-[#050816]">
           <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                 <div>
                    <h4 className="text-white font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
                       <Book size={18} className="text-[#00d9ff]" /> Contenido del Módulo
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                       <li>• Señales de energía y potencia</li>
                       <li>• Descomposición ortogonal</li>
                       <li>• Sistemas LTI y convolución</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="text-white font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
                       <LineChart size={18} className="text-[#00d9ff]" /> Herramientas
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                       <li>• Laboratorios HTML5/Canvas</li>
                       <li>• Guías de Práctica PDF</li>
                       <li>• Ejercicios Complementarios</li>
                    </ul>
                 </div>
                 <div className="bg-[#00d9ff]/5 p-6 rounded-2xl border border-[#00d9ff]/10">
                    <h4 className="text-[#00d9ff] font-bold mb-2">Próxima Sesión</h4>
                    <p className="text-xs text-slate-400 mb-4 italic">"Análisis de Fourier: Del tiempo a la frecuencia."</p>
                    <button className="w-full py-2 bg-[#00d9ff] text-[#0a0e27] text-xs font-bold rounded-lg">Ver Calendario</button>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </>
  );
};

export default SignalsSystemsPage;
