import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: "Investigadores IPN", value: "3+" },
  { label: "NASA JPL 2027 Roadmap", value: "Strategic" },
  { label: "WRC-27 Support", value: "Official" },
  { label: "Enterprise Solutions", value: "10+" }
];

const StatsSection = () => {
  return (
    <div className="bg-[#0a0e27] border-y border-[#00d9ff]/30 py-10 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="text-3xl md:text-4xl font-black text-[#00d9ff] mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-[#c0c0c0] text-[10px] md:text-xs font-mono uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
