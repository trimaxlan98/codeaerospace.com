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
    className="bg-[#1a2847] border border-[#00d9ff]/20 p-8 rounded-2xl text-center group hover:border-[#00d9ff] transition-all duration-300 shadow-xl"
  >
    <div className="mb-4 inline-block p-4 bg-[#0a0e27] rounded-full border border-[#00d9ff]/30 group-hover:bg-[#00d9ff]/10 transition-colors">
      <Icon className="w-8 h-8 text-[#00d9ff]" />
    </div>
    <div className="text-5xl font-black text-white mb-2 tracking-tighter">
      <AnimatedNumber value={value} suffix="+" />
    </div>
    <div className="text-[#c0c0c0] text-sm uppercase tracking-widest font-bold">{label}</div>
  </motion.div>
);

const CourseCard = ({ title, desc, delay }) => {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#0a0e27] p-8 rounded-xl border border-[#2a3c5f] hover:border-[#00d9ff] transition-all duration-300 flex flex-col h-full shadow-lg"
    >
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-[#c0c0c0] mb-8 flex-grow leading-relaxed">{desc}</p>
      <button className="flex items-center gap-2 text-[#00d9ff] font-bold hover:underline group">
        {t('impact.workshops.enroll')} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};

const GallerySection = () => {
  const { t } = useLanguage();
  
  // Mapeo manual de nombres para cada archivo en public/gallery/
  // Puedes cambiar el texto a la derecha por el nombre real de la misión.
  const imageMapping = {
    "NASAAPPS_YURI.jpeg": "NASA Space Apps: Sesión de Apertura",
    "20251028_132242.jpg": "Evento Técnico: Demostración de Sistemas",
    "20251105_134338.jpg": "Misión WITCOM: Sesión de Apertura",
    "20251127_154203.jpg": "Taller de Ingeniería: Diseño de Satélites",
    "20260116_112757.jpg": "Ponencia IPN: Futuros Ingenieros",
    "IMG-20240123-WA0024.jpg": "NASA Space Apps: Mentoría Inicial",
    "IMG-20241015-WA0065.jpg": "NASA Space Apps: Desarrollo de Proyectos",
    "IMG-20250311-WA0014.jpg": "Reunión de Investigación: Avances 2025",
    "IMG-20250516-WA0013.jpg": "Presentación de Prototipo: Sistema APT",
    "IMG-20250925-WA0054.jpg": "Galería WITCOM: Panel de Expertos",
    "IMG-20250925-WA0083(1)(1).jpg": "Galería WITCOM: Networking Internacional",
    "IMG-20250925-WA0084.jpg": "Galería WITCOM: Clausura del Evento"
  };

  const galleryFiles = Object.keys(imageMapping);

  const images = galleryFiles.map((file) => ({
    url: `/gallery/${file}`,
    title: imageMapping[file] || t('impact.gallery_title')
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="py-24 px-6 bg-[#0a0e27]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">{t('impact.gallery_title')}</h2>
          <div className="w-24 h-1 bg-[#00d9ff] mx-auto mb-6" />
          <p className="text-[#c0c0c0] max-w-2xl mx-auto text-lg">{t('impact.gallery_desc')}</p>
        </div>

        <div className="relative group max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl border-2 border-[#00d9ff]/30 aspect-video relative bg-[#1a2847]">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-8">
              <h3 className="text-white text-xl md:text-3xl font-bold">{images[currentIndex].title}</h3>
            </div>
          </div>

          <button onClick={prevSlide} className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/70 text-white rounded-full hover:bg-[#00d9ff] hover:text-[#0a0e27] transition-all z-10">
            <ChevronLeft size={28} />
          </button>
          <button onClick={nextSlide} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/70 text-white rounded-full hover:bg-[#00d9ff] hover:text-[#0a0e27] transition-all z-10">
            <ChevronRight size={28} />
          </button>
          
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {images.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${currentIndex === i ? 'bg-[#00d9ff] w-6' : 'bg-[#1a2847]'}`}
              />
            ))}
          </div>
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
    <div className="pt-20 bg-[#0a0e27] min-h-screen antialiased">
      {/* Hero Section */}
      <section className="relative py-32 px-6 bg-[#0a0e27] flex items-center justify-center">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
              {t('impact.title')}
            </h1>
            <p className="text-xl md:text-3xl text-[#c0c0c0] max-w-4xl mx-auto leading-relaxed font-light">
              {t('impact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section (Stats) */}
      <section className="py-24 px-6 bg-[#0f172a] border-y border-[#1a2847]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <MetricCard icon={BookOpen} value="500+" label={t('impact.metrics.hours')} delay={0.1} />
            <MetricCard icon={Users} value="150+" label={t('impact.metrics.engineers')} delay={0.2} />
            <MetricCard icon={Globe} value="10+" label={t('impact.metrics.conferences')} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Training Grid */}
      <section className="py-24 px-6 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight">{t('impact.workshops_title')}</h2>
            <div className="w-24 h-1 bg-[#00d9ff] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CourseCard title={t('impact.workshops.ai.title')} desc={t('impact.workshops.ai.desc')} delay={0.1} />
            <CourseCard title={t('impact.workshops.control.title')} desc={t('impact.workshops.control.desc')} delay={0.2} />
            <CourseCard title={t('impact.workshops.mechanical.title')} desc={t('impact.workshops.mechanical.desc')} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Consulting Block */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2847] to-[#0a0e27] border-2 border-[#00d9ff]/30 p-12 md:p-20 text-center shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Briefcase size={200} className="text-[#00d9ff]" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight uppercase">{t('impact.consulting_title')}</h2>
              <p className="text-[#c0c0c0] text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed">
                {t('impact.consulting_desc')}
              </p>
              <button
                onClick={handleConsultancyClick}
                className="inline-flex items-center gap-4 px-12 py-6 bg-[#00d9ff] text-[#0a0e27] font-extrabold text-xl rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(0,217,255,0.4)] hover:scale-105"
              >
                <Send size={24} />
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
