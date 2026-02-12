
import React from 'react';
import { motion } from 'framer-motion';

const HeroImage = () => {
  return (
    <div className="relative w-full max-w-[320px] md:max-w-[450px] lg:max-w-[500px] aspect-square flex items-center justify-center mx-auto">
      {/* Central atmospheric glow */}
      <div className="absolute inset-4 bg-cyan-900/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Orbital Path Line - Static */}
      <div className="absolute inset-0 border border-cyan-500/10 rounded-full scale-100" />
      
      {/* Inner Orbital Path - Static */}
      <div className="absolute inset-0 border border-cyan-500/5 rounded-full scale-75" />

      {/* Rotating Container for Satellite */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
           <svg 
             xmlns="http://www.w3.org/2000/svg" 
             width="32" 
             height="32" 
             viewBox="0 0 24 24" 
             fill="none" 
             stroke="currentColor" 
             strokeWidth="1.5" 
             strokeLinecap="round" 
             strokeLinejoin="round"
           >
              <path d="M13 7l4 4L2 22h-2v-2l11-11z" />
              <path d="m13 7 2-2a2 2 0 0 1 2.83 0l1.41 1.41a2 2 0 0 1 0 2.83l-2 2" />
              <path d="M13 7 9 3 5 7l4 4" />
              <path d="m17 11 4 4-4 4-4-4" />
           </svg>
        </div>
      </motion.div>

      {/* Counter-rotating particles */}
      <motion.div
        className="absolute inset-8 border border-slate-700/20 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-slate-500/50 rounded-full blur-[1px]" />
        <div className="absolute top-0 right-1/2 w-1.5 h-1.5 bg-cyan-500/30 rounded-full blur-[0.5px]" />
      </motion.div>

      {/* Logo Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 flex items-center justify-center p-8"
      >
        <img 
          src="https://horizons-cdn.hostinger.com/6d36ddf2-44ee-4e42-a8d1-2714e0635bbe/5c832d4b34a01eec5c181c48a934433d.png" 
          alt="Co.De Aerospace Logo" 
          className="w-[200px] md:w-[250px] lg:w-[300px] h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default HeroImage;
