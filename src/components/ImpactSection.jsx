import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Award, BookOpen, Microscope, Mail, ExternalLink, Users } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ImpactSection = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const events = [
    {
      id: 1,
      title: t('impact.events.witcom'),
      image: "https://images.unsplash.com/photo-1475721027785-f74dea327912?auto=format&fit=crop&q=80&w=1200",
      category: "WITCOM 2025"
    },
    {
      id: 2,
      title: t('impact.events.nasa'),
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
      category: "NASA Space Apps"
    },
    {
      id: 3,
      title: t('impact.events.ipn'),
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
      category: "IPN Lectures"
    }
  ];

  const workshops = [
    {
      title: t('impact.workshops.ai.title'),
      desc: t('impact.workshops.ai.desc'),
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: t('impact.workshops.control.title'),
      desc: t('impact.workshops.control.desc'),
      icon: Microscope,
      color: "from-purple-500/20 to-blue-500/20"
    },
    {
      title: t('impact.workshops.mechanical.title'),
      desc: t('impact.workshops.mechanical.desc'),
      icon: BookOpen,
      color: "from-cyan-500/20 to-emerald-500/20"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [events.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % events.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);

  const handleConsulting = () => {
    const subject = encodeURIComponent(t('impact.email.consulting_subject'));
    window.location.href = `mailto:contacto@codeaerospace.com?subject=${subject}`;
  };

  const handleEnroll = (workshopName) => {
    const subject = encodeURIComponent(t('impact.email.workshop_subject').replace('{name}', workshopName));
    window.location.href = `mailto:contacto@codeaerospace.com?subject=${subject}`;
  };

  return (
    <section className="py-24 px-6 bg-[#0a0e27] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] text-xs font-bold uppercase tracking-widest mb-6">
            <Award className="w-3.5 h-3.5" />
            Impact & Training
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            {t('impact.title')}
          </h2>
          <p className="text-[#c0c0c0] text-xl max-w-3xl mx-auto leading-relaxed">
            {t('impact.subtitle')}
          </p>
        </motion.div>

        {/* Carousel Section */}
        <div className="mb-32 relative">
          <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-[#1a2847] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img 
                  src={events[currentSlide].image} 
                  alt={events[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="px-3 py-1 bg-[#00d9ff] text-[#0a0e27] text-xs font-bold rounded-full mb-4 inline-block">
                      {events[currentSlide].category}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-bold text-white max-w-2xl">
                      {events[currentSlide].title}
                    </h3>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-[#00d9ff] hover:text-[#0a0e27] transition-all border border-white/10 z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 text-white hover:bg-[#00d9ff] hover:text-[#0a0e27] transition-all border border-white/10 z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {events.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-12 bg-[#00d9ff]' : 'w-4 bg-[#1a2847]'}`}
              />
            ))}
          </div>
        </div>

        {/* Workshops Grid */}
        <div className="mb-32">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            {t('impact.workshops_title')}
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workshops.map((workshop, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-1 bg-gradient-to-b from-[#1a2847] to-transparent rounded-2xl"
              >
                <div className="bg-[#1a2847]/40 p-8 rounded-[14px] h-full flex flex-col border border-white/5 group-hover:border-[#00d9ff]/30 transition-all">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${workshop.color} flex items-center justify-center mb-6`}>
                    <workshop.icon className="w-7 h-7 text-[#00d9ff]" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[#00d9ff] transition-colors">
                    {workshop.title}
                  </h4>
                  <p className="text-[#c0c0c0] text-lg mb-8 flex-grow">
                    {workshop.desc}
                  </p>
                  <button 
                    onClick={() => handleEnroll(workshop.title)}
                    className="w-full py-4 px-6 bg-transparent border border-[#00d9ff]/40 text-[#00d9ff] font-bold rounded-lg hover:bg-[#00d9ff] hover:text-[#0a0e27] transition-all flex items-center justify-center gap-2"
                  >
                    {t('impact.workshops.enroll')}
                    <ExternalLink className="w-4 h-4" />
                  </button>
                  
                  {/* Badge Style Element */}
                  <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Award className="w-12 h-12 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Consulting Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a2847] to-[#0a0e27] border border-[#00d9ff]/30 p-12 text-center"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {t('impact.consulting_title')}
            </h3>
            <p className="text-[#c0c0c0] text-xl max-w-2xl mx-auto mb-10">
              {t('impact.consulting_desc')}
            </p>
            <button 
              onClick={handleConsulting}
              className="inline-flex items-center gap-3 px-10 py-5 bg-[#00d9ff] text-[#0a0e27] font-extrabold text-lg rounded-xl hover:bg-[#00b8dd] hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,217,255,0.3)]"
            >
              <Mail className="w-6 h-6" />
              {t('impact.consulting_cta')}
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ImpactSection;
