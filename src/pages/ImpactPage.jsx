import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Award, Users, Globe, BookOpen, Briefcase, Send, ChevronRight, ChevronLeft } from 'lucide-react';

const AnimatedNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const numericValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const controls = animate(0, numericValue, {
      duration: 2,
      onUpdate(value) {
        node.textContent = Math.round(value) + suffix;
      },
    });

    return () => controls.stop();
  }, [numericValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const MetricCard = ({ icon: Icon, value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-[#1a2847]/40 border border-[#00d9ff]/40 p-10 rounded-2xl text-center group hover:border-[#00d9ff] transition-all duration-300 shadow-2xl backdrop-blur-md relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
    <div className="mb-6 inline-block p-5 bg-[#0a0e27] rounded-full border border-[#00d9ff]/30 group-hover:bg-[#00d9ff]/20 transition-all relative">
      <div className="absolute inset-0 bg-[#00d9ff]/15 blur-xl rounded-full group-hover:bg-[#00d9ff]/30 transition-all" />
      <Icon className="w-10 h-10 text-[#00d9ff] relative z-10" />
    </div>
    <div className="text-6xl font-black text-white mb-3 tracking-tighter">
      <AnimatedNumber value={value} suffix="+" />
    </div>
    <div className="text-[#c0c0c0] text-sm uppercase tracking-[0.2em] font-black">{label}</div>
  </motion.div>
);

const CourseCard = ({ title, desc, delay }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#050816] p-8 rounded-r-xl border border-[#2a3c5f] border-l-4 border-l-[#00d9ff] hover:border-[#00d9ff] transition-all duration-300 flex flex-col h-full shadow-2xl group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d9ff]/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-[#00d9ff]/10 transition-colors" />
      <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{title}</h3>
      <p className="text-[#c0c0c0] text-lg mb-8 flex-grow leading-relaxed font-light">{desc}</p>
      <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#00d9ff] text-[#0a0e27] font-black rounded-lg border-2 border-[#00d9ff] hover:bg-transparent hover:text-[#00d9ff] transition-all duration-300 uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(0,217,255,0.3)]">
        {t('impact.workshops.enroll')} <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const GallerySection = () => {
  const { t } = useLanguage();
  
  const images = [
    { url: "/gallery/NASAAPPS_YURI.jpeg", title: t('impact.gallery.img1') },
    { url: "/gallery/20251028_132242.jpg", title: t('impact.gallery.img2') },
    { url: "/gallery/20251105_134338.jpg", title: t('impact.gallery.img3') },
    { url: "/gallery/20251127_154203.jpg", title: t('impact.gallery.img4') },
    { url: "/gallery/20260116_112757.jpg", title: t('impact.gallery.img5') },
    { url: "/gallery/IMG-20240123-WA0024.jpg", title: t('impact.gallery.img6') },
    { url: "/gallery/IMG-20241015-WA0065.jpg", title: t('impact.gallery.img7') },
    { url: "/gallery/IMG-20250311-WA0014.jpg", title: t('impact.gallery.img8') },
    { url: "/gallery/IMG-20250516-WA0013.jpg", title: t('impact.gallery.img9') },
    { url: "/gallery/IMG-20250925-WA0054.jpg", title: t('impact.gallery.img10') },
    { url: "/gallery/IMG-20250925-WA0083(1)(1).jpg", title: t('impact.gallery.img11') },
    { url: "/gallery/IMG-20250925-WA0084.jpg", title: t('impact.gallery.img12') }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setProgress(0);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setProgress(0);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / 40), 100));
    }, 100);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [nextSlide]);

  return (
    <section className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative group max-w-5xl mx-auto shadow-[0_0_50px_rgba(0,217,255,0.15)] rounded-2xl overflow-hidden border border-[#00d9ff]/20">
          <div className="overflow-hidden aspect-video relative bg-[#1a2847]">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8">
              <motion.h3 
                key={`title-${currentIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-xl md:text-3xl font-bold tracking-tight"
              >
                {images[currentIndex].title}
              </motion.h3>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
              <motion.div 
                className="h-full bg-[#00d9ff] shadow-[0_0_10px_#00d9ff]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </div>

          {/* Navigation Buttons */}
          <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-[#00d9ff] hover:text-[#0a0e27] transition-all z-10 opacity-0 group-hover:opacity-100 backdrop-blur-sm">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-[#00d9ff] hover:text-[#0a0e27] transition-all z-10 opacity-0 group-hover:opacity-100 backdrop-blur-sm">
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8 flex-wrap">
          {images.map((_, i) => (
            <button 
              key={i} 
              onClick={() => { setCurrentIndex(i); setProgress(0); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === i ? 'bg-[#00d9ff] w-8' : 'bg-[#1a2847] w-3 hover:bg-[#00d9ff]/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const ImpactPage = () => {
  const { t } = useLanguage();

  const handleConsultancyClick = () => {
    const subject = encodeURIComponent("[Consultoría/Capacitación] Solicitud de información");
    const body = encodeURIComponent("Hola equipo de Co.De Aerospace,\n\nMe gustaría solicitar información sobre sus servicios de consultoría y capacitación.\n\nSaludos.");
    window.location.href = `mailto:contacto@codeaerospace.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-20 bg-[#0a0e27] min-h-screen antialiased relative overflow-hidden">
      {/* Dynamic Technical Grid */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27] via-transparent to-[#0a0e27] pointer-events-none" />
      
      {/* Hero Section: Cinematographic Layout */}
      <section className="relative pt-24 pb-12 px-6 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,rgba(0,217,255,0.1)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-[0.1em] uppercase leading-tight text-transparent [-webkit-text-stroke:1px_rgba(0,217,255,0.6)] drop-shadow-[0_0_15px_rgba(0,217,255,0.2)] mb-6">
              {t('impact.title')}
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light tracking-wide px-6"
            >
              {t('impact.subtitle')}
            </motion.p>
          </motion.div>
        </div>

        {/* Gallery Integrated into Hero Flow */}
        <div className="w-full relative z-10 -mt-4">
          <GallerySection />
        </div>
      </section>

      {/* Metrics Section (Stats) with Scroll Reveal */}
      <section className="py-24 px-6 relative border-y border-[#00d9ff]/10 bg-[#0a0e27]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <MetricCard icon={BookOpen} value="500+" label={t('impact.metrics.hours')} delay={0.1} />
            <MetricCard icon={Users} value="150+" label={t('impact.metrics.engineers')} delay={0.2} />
            <MetricCard icon={Globe} value="10+" label={t('impact.metrics.conferences')} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Training Grid */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-white/90 mb-6 uppercase tracking-[0.2em]"
            >
              {t('impact.workshops_title')}
            </motion.h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#00d9ff] to-transparent mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <CourseCard title={t('impact.workshops.ai.title')} desc={t('impact.workshops.ai.desc')} delay={0.1} />
            <CourseCard title={t('impact.workshops.control.title')} desc={t('impact.workshops.control.desc')} delay={0.2} />
            <CourseCard title={t('impact.workshops.mechanical.title')} desc={t('impact.workshops.mechanical.desc')} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Consulting Block */}
      <section className="py-48 px-6 bg-[#050816]/80 relative overflow-hidden border-t border-[#00d9ff]/10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative group overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#00d9ff]/10 to-transparent border border-[#00d9ff]/20 p-16 md:p-32 text-center shadow-[0_0_100px_rgba(0,217,255,0.05)] backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Briefcase size={400} className="text-[#00d9ff]" />
            </div>
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-7xl font-black text-white/90 mb-10 tracking-[0.2em] uppercase"
              >
                {t('impact.consulting_title')}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                viewport={{ once: true }}
                className="text-white/70 text-2xl md:text-3xl mb-16 max-w-5xl mx-auto leading-relaxed font-light"
              >
                {t('impact.consulting_desc')}
              </motion.p>
              <button
                onClick={handleConsultancyClick}
                className="inline-flex items-center gap-6 px-16 py-8 bg-[#00d9ff] text-[#0a0e27] font-black text-2xl rounded-2xl hover:bg-white hover:shadow-[0_0_60px_rgba(0,217,255,0.4)] transition-all duration-500 hover:scale-105 group"
              >
                <Send size={28} className="group-hover:rotate-12 transition-transform" />
                {t('impact.consulting_cta')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImpactPage;
