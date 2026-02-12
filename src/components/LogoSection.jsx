
import React from 'react';
import { motion } from 'framer-motion';

const LogoSection = () => {
  return (
    <div className="w-full flex justify-center items-center py-12 bg-slate-950 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative"
      >
        <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full" />
        <img 
          src="https://horizons-cdn.hostinger.com/6d36ddf2-44ee-4e42-a8d1-2714e0635bbe/5c832d4b34a01eec5c181c48a934433d.png" 
          alt="Co.De Aerospace Logo" 
          className="relative w-[200px] md:w-[250px] lg:w-[300px] h-auto drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default LogoSection;
