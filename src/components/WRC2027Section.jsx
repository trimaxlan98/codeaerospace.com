
import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Globe, Satellite } from 'lucide-react';
import ITUResourcePanel from '@/components/ITUResourcePanel';

const ServiceCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="group relative p-8 bg-[#1a2847]/50 backdrop-blur-sm border border-[#2a3c5f] rounded-xl hover:border-[#00d9ff]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00d9ff]/10"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/5 to-[#1a2847]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
    
    <div className="relative z-10">
      <div className="mb-6 inline-flex p-3 rounded-lg bg-[#0a0e27] border border-[#2a3c5f] group-hover:border-[#00d9ff]/30 transition-colors duration-300">
        <Icon className="w-8 h-8 text-[#00d9ff]" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#00d9ff] transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-[#c0c0c0] leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
        {description}
      </p>
    </div>
  </motion.div>
);

const WRC2027Section = () => {
  const services = [
    {
      icon: Radio,
      title: "Interference Mitigation",
      description: "Advanced modeling for NGSO constellations, ensuring compliance with ITU equivalent power flux-density (epfd) limits to protect GSO networks."
    },
    {
      icon: Globe,
      title: "Spectrum Consultancy",
      description: "Strategic technical consultancy for radio-frequency allocation, navigating the complex regulatory landscape of international compliance."
    },
    {
      icon: Satellite,
      title: "Next-Gen Payload R&D",
      description: "Research and development of adaptive payloads designed for orbital assets, maximizing spectral efficiency in crowded LEO environments."
    }
  ];

  return (
    <section id="wrc-2027" className="py-24 px-6 bg-[#0a0e27] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1a2847]/40 via-[#0a0e27] to-[#0a0e27] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Strategic Support for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] to-blue-500">ITU WRC-2027</span>
            </h2>
            <p className="text-lg text-[#c0c0c0] max-w-3xl mx-auto leading-relaxed">
              As the global inflection point for orbital frequency bands approaches, we empower nations and organizations to achieve <span className="text-[#00d9ff] font-semibold">Technological Sovereignty</span> while ensuring <span className="text-[#00d9ff] font-semibold">Spectrum Coexistence</span>.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>

        <ITUResourcePanel />
      </div>
    </section>
  );
};

export default WRC2027Section;
