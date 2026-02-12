
import React from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ image, title, description }) => {
  const handleLearnMore = () => {
    // Placeholder for future functionality
  };

  return (
    <motion.div
      className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer h-[400px] border border-slate-800"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27] via-[#0a0e27]/90 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white z-10">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-[#00d9ff] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[#c0c0c0] mb-6 leading-relaxed">
          {description}
        </p>
        <button
          onClick={handleLearnMore}
          className="self-start px-6 py-2 bg-[#00d9ff] text-[#0a0e27] font-semibold rounded-lg hover:bg-[#00b8dd] transition-all duration-300 shadow-md hover:shadow-cyan-500/20"
        >
          Learn More
        </button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
