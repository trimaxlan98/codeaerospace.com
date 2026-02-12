import React from 'react';
import { motion } from 'framer-motion';
const HeroSection = () => {
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1446776709462-d6b525c57bd3)'
    }} />

      {/* Gradient Overlay for Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/90 via-[#0a0e27]/70 to-[#0a0e27]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
      backgroundImage: `
            linear-gradient(to right, #00d9ff 1px, transparent 1px),
            linear-gradient(to bottom, #00d9ff 1px, transparent 1px)
          `,
      backgroundSize: '50px 50px'
    }} />

      {/* Animated Particles/Stars (Simplified) */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#00d9ff] rounded-full blur-[2px]" animate={{
        opacity: [0.2, 1, 0.2]
      }} transition={{
        duration: 3,
        repeat: Infinity
      }} />
        <motion.div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full blur-[1px]" animate={{
        opacity: [0.1, 0.8, 0.1]
      }} transition={{
        duration: 4,
        repeat: Infinity,
        delay: 1
      }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
           <div className="inline-block px-4 py-1.5 mb-6 border border-[#00d9ff]/30 rounded-full bg-[#00d9ff]/10 backdrop-blur-md">
            <span className="text-[#00d9ff] font-mono text-xs uppercase tracking-widest">Advanced Space Systems for NGSO
          </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Co.De Aerospace
          </h1>
          
          <p className="text-xl md:text-2xl text-[#c0c0c0] mb-8 max-w-3xl mx-auto font-light">
            Research-Driven Engineering for the <span className="text-[#00d9ff] font-medium">NewSpace Economy</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button onClick={() => {
            const element = document.getElementById('services');
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }} className="px-8 py-4 bg-[#00d9ff] text-[#0a0e27] font-bold rounded-lg hover:bg-[#00b8dd] transition-all duration-300 min-w-[200px] shadow-[0_0_20px_rgba(0,217,255,0.3)] hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              Explore Solutions
            </motion.button>
            
            <motion.button onClick={() => {
            const element = document.getElementById('contact');
            if (element) {
              element.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }} className="px-8 py-4 bg-transparent border border-[#00d9ff]/50 text-white font-bold rounded-lg hover:bg-[#00d9ff]/10 transition-all duration-300 min-w-[200px]" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              Contact Us
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>;
};
export default HeroSection;