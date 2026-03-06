import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useSpring, useTransform, animate, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Award, Users, Globe, BookOpen, Briefcase, Send, ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';

const AnimatedNumber = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const numericValue = value ? parseInt(value.toString().replace(/\D/g, '')) : 0;

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
    <div className="text-[#c0c0c0] text-sm uppercase tracking-wide font-black">{label}</div>
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
      <p className="text-slate-300 text-lg mb-8 flex-grow leading-relaxed font-normal opacity-90 tracking-wide">{desc}</p>
      <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#00d9ff] text-[#0a0e27] font-black rounded-lg border-2 border-[#00d9ff] hover:bg-transparent hover:text-[#00d9ff] transition-all duration-300 uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(0,217,255,0.3)]">
        {t('impact.workshops.enroll')} <ChevronRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const GallerySection = () => {
  const { t } = useLanguage();

  const images = [
    { url: "/gallery/NASAAPPS_YURI.jpeg", title: t('Organización Nasa Space Apps Boca del Río') },
    { url: "/gallery/20251028_132242.jpg", title: t('Conferencias de Ciberseguridad Espacial') },
    { url: "/gallery/20251105_134338.jpg", title: t('Participación en Congresos Nacionales') },
    { url: "/gallery/20251127_154203.jpg", title: t('Divulgación Cietífica en Instituciones') },
    { url: "/gallery/20260116_112757.jpg", title: t('Defensa de Investigaciones Científicas') },
    { url: "/gallery/IMG-20240123-WA0024.jpg", title: t('Entrevistas Televisivas') },
    { url: "/gallery/IMG-20241015-WA0065.jpg", title: t('Participación en Congresos Internacionales') },
    { url: "/gallery/IMG-20250311-WA0014.jpg", title: t('Reuniones con Instituciones Gubernamentales') },
    { url: "/gallery/IMG-20250516-WA0013.jpg", title: t('Difusión Científica en Instituciones Públicas') },
    { url: "/gallery/IMG-20250925-WA0054.jpg", title: t('Conferencias en MexSat') },
    { url: "/gallery/IMG-20250925-WA0084.jpg", title: t('Apoyo a Estrategías Gubernamentales') }
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
    const timer = setInterval(nextSlide, 8000);
    const progressTimer = setInterval(() => {
      setProgress((prev) => Math.min(prev + (100 / 80), 100));
    }, 100);
    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [nextSlide]);

  const heroRef = React.useRef(null);

  const scrollPastHero = () => {
    if (heroRef.current) {
      const bottom = heroRef.current.getBoundingClientRect().bottom + window.scrollY;
      window.scrollTo({ top: bottom, behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="w-full relative" style={{ height: `calc(95vh - 80px)`, minHeight: '600px' }}>

      {/* ── Slides ── */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex].url}
          alt={images[currentIndex].title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center center' }}
        />
      </AnimatePresence>

      {/* ── Overlay layers ── */}
      {/* Top vignette — ties image into navbar */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/70 via-transparent to-transparent pointer-events-none" />
      {/* Bottom gradient — legibility for title + stats */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27]/95 via-[#0a0e27]/40 to-transparent pointer-events-none" />

      {/* ── Thin progress bar (top) ── */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 z-20">
        <motion.div
          className="h-full bg-[#00d9ff]/50"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>

      {/* ── Main title + subtitle — bottom-left ── */}
      <div className="absolute left-8 md:left-16 right-8 md:right-[38%] z-10 bottom-36 md:bottom-44">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-serif font-light tracking-[0.08em] uppercase leading-[1.05] text-white mb-3 md:mb-4"
            style={{ textShadow: '0 0 20px rgba(0,240,255,0.12), 0 0 60px rgba(0,240,255,0.05)' }}
          >
            {t('impact.title')}
          </h1>
          <p className="text-sm md:text-base text-white/60 font-light tracking-[0.18em] italic">
            {t('impact.subtitle')}
          </p>
        </motion.div>
      </div>

      {/* ── Slide image caption — bottom strip ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 pb-14 md:pb-16 pt-6"
        style={{ background: 'linear-gradient(to top, rgba(10,14,39,0.9) 60%, transparent)' }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={`caption-${currentIndex}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/80 text-base md:text-lg font-light tracking-wide max-w-2xl"
          >
            {images[currentIndex].title}
          </motion.p>
        </AnimatePresence>
        {/* Slide counter */}
        <span className="absolute right-8 md:right-16 bottom-14 md:bottom-16 text-white/30 text-[10px] font-mono tracking-[0.2em]">
          {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Navigation arrows ── */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/35 text-white rounded-full hover:bg-[#00d9ff]/15 hover:border-[#00d9ff]/40 border border-white/12 transition-all duration-300 z-20 backdrop-blur-sm"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-black/35 text-white rounded-full hover:bg-[#00d9ff]/15 hover:border-[#00d9ff]/40 border border-white/12 transition-all duration-300 z-20 backdrop-blur-sm"
      >
        <ChevronRight size={22} />
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bottom-8">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrentIndex(i); setProgress(0); }}
            className={`h-[3px] rounded-full transition-all duration-300 ${
              currentIndex === i ? 'bg-[#00d9ff] w-6' : 'bg-white/25 w-3 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollPastHero}
        className="absolute right-8 md:right-16 bottom-6 text-center cursor-pointer z-20 flex flex-col items-center gap-0.5"
      >
        <span className="text-[10px] font-mono text-[#00d9ff] uppercase tracking-[0.3em]">scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-[#00d9ff] opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const LogoRibbon = () => (
  <div className="w-full py-12 border-y border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden mt-12">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="text-xl md:text-2xl font-black text-white tracking-widest uppercase border border-white/20 px-4 py-1 rounded italic">IPN</div>
        <div className="text-xl md:text-2xl font-black text-white tracking-widest uppercase flex items-center gap-3">
          <Globe className="w-6 h-6 text-[#00d9ff]" /> NASA Space Apps
        </div>
        <div className="text-xl md:text-2xl font-black text-white tracking-widest uppercase border-b-2 border-[#00d9ff]/40 px-2">WITCOM</div>
        <div className="text-xl md:text-2xl font-black text-white tracking-widest uppercase flex flex-col items-center leading-tight border border-[#00d9ff]/30 px-4 py-1 rounded">
          <span>IAC</span>
          <span className="text-[10px] md:text-xs font-mono text-[#00d9ff]/70 tracking-widest normal-case">IAF</span>
        </div>
      </div>
    </div>
  </div>
);

const ImpactPage = () => {
  const { t } = useLanguage();

  const handleConsultancyClick = () => {
    const subject = encodeURIComponent("[Consultoría/Capacitación] Solicitud de información");
    const body = encodeURIComponent("Hola equipo de Co.De Aerospace,\n\nMe gustaría solicitar información sobre sus servicios de consultoría y capacitación.\n\nSaludos.");
    window.location.href = `mailto:contacto@codeaerospace.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-20 bg-[#0a0e27] min-h-screen antialiased relative overflow-x-hidden">
      {/* Background grid — below hero */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Full-screen Hero Carousel + Logo Ribbon */}
      <div className="w-full relative z-10">
        <GallerySection />
        <LogoRibbon />
      </div>

      {/* Metrics Section (Stats) with Scroll Reveal */}
      <section className="py-24 px-6 relative border-y border-[#00d9ff]/10 bg-[#0a0e27]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto relative">
          {/* Status Nominal Window */}
          <div className="absolute -top-16 right-0 flex items-center gap-2 bg-[#050816]/60 backdrop-blur-md border border-[#00d9ff]/20 px-4 py-2 rounded-lg z-10 shadow-[0_0_20px_rgba(0,217,255,0.1)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-[10px] md:text-xs uppercase font-bold text-green-400 tracking-widest font-mono">Status: Nominal</span>
          </div>

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
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="relative group overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#00d9ff]/10 to-transparent border border-[#00d9ff]/20 p-10 md:p-14 text-center shadow-[0_0_100px_rgba(0,217,255,0.05)] backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Briefcase size={120} className="text-[#00d9ff]" />
            </div>
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-black text-white/90 mb-10 tracking-[0.2em] uppercase"
              >
                {t('impact.consulting_title')}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.7 }}
                viewport={{ once: true }}
                className="text-white/70 text-xl md:text-2xl mb-16 max-w-2xl mx-auto leading-relaxed font-light"
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
