
import React from 'react';
import { motion } from 'framer-motion';
import { Antenna, Radio, Shield, BarChart3, Compass } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-[#1a2847] p-8 rounded-xl border border-[#2a3c5f] hover:border-[#00d9ff] transition-colors duration-300 group h-full flex flex-col"
  >
    <div className="mb-6 inline-block p-4 bg-[#0a0e27] rounded-full border border-[#00d9ff]/30 group-hover:bg-[#00d9ff]/10 group-hover:scale-110 transition-all duration-300">
      <Icon className="w-8 h-8 text-[#00d9ff]" />
    </div>
    
    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#00d9ff] transition-colors">
      {title}
    </h3>
    
    <p className="text-[#c0c0c0] leading-relaxed text-sm flex-grow">
      {description}
    </p>
    
    <div className="mt-6 pt-4 border-t border-[#2a3c5f] group-hover:border-[#00d9ff]/30 transition-colors">
      <span className="text-[#00d9ff] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
        Learn More <span className="transform group-hover:translate-x-1 transition-transform">→</span>
      </span>
    </div>
  </motion.div>
);

const TechnicalServicesSection = () => {
  const services = [
    {
      icon: Antenna,
      title: "Ground Station GS-SW",
      description: "Automation of tracking using SGP4/SDP4 models and real-time Doppler compensation for precise satellite communication links."
    },
    {
      icon: Radio,
      title: "NGSO Communications",
      description: "Advanced modeling for interference mitigation, spectrum coexistence, and frequency allocation optimization for non-geostationary orbits."
    },
    {
      icon: Shield,
      title: "Space Cybersecurity",
      description: "\"Security by Design\" implementation featuring AES-256 encryption for data-links and secure telecommand (TC) authentication protocols."
    },
    {
      icon: BarChart3,
      title: "Mission-Critical Analytics",
      description: "Processing of complex telemetry for satellite health monitoring, payload status verification, and predictive anomaly detection."
    },
    {
      icon: Compass,
      title: "Orbital Consulting",
      description: "Strategic planning for technical sovereignty, regulatory intelligence, and roadmap development for the emerging NewSpace economy."
    }
  ];

  return (
    <section id="services" className="py-24 px-6 bg-[#0a0e27] border-t border-[#1a2847]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Technical <span className="text-[#00d9ff]">Services</span>
          </h2>
          <div className="w-24 h-1 bg-[#00d9ff] mx-auto mb-6" />
          <p className="text-[#c0c0c0] max-w-2xl mx-auto text-lg">
            Engineering solutions designed for the rigors of the space environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalServicesSection;
