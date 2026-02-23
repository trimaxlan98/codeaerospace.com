import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Bot, Smartphone, Cpu, Settings, Code, Server, Box, Layers, Terminal } from 'lucide-react';

const technologies = [
  { name: 'React', icon: Layout },
  { name: 'Python', icon: Code },
  { name: 'TensorFlow', icon: Bot },
  { name: 'SolidWorks', icon: Settings },
  { name: 'Docker', icon: Box },
  { name: 'Node.js', icon: Server },
  { name: 'ROS2', icon: Layers }
];

const TechStack = () => {
  return (
    <section className="py-24 px-6 bg-[#0a0e27]">
      <div className="container mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-[#00d9ff]">Technology Frontier</span>
          </h2>
          <div className="w-24 h-1 bg-[#00d9ff] mx-auto" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center gap-4 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-2xl border border-[#2a3c5f] bg-[#1a2847]/40 group-hover:border-[#00d9ff] group-hover:bg-[#00d9ff]/10 group-hover:shadow-[0_0_30px_rgba(0,217,255,0.2)] transition-all duration-300">
                <tech.icon className="w-8 h-8 md:w-10 md:h-10 text-[#c0c0c0] group-hover:text-[#00d9ff] transition-colors duration-300" />
              </div>
              <span className="text-[#c0c0c0] text-xs font-mono uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
