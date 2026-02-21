
import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { motion } from 'framer-motion';
import { Cpu, Zap, Radio, Orbit } from 'lucide-react';

const researchLines = [
  {
    id: 1,
    title: "Propulsión Iónica de Baja Potencia",
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    equation: "F = \frac{\dot{m} v_e}{2} + (p_e - p_a) A_e",
    description: "Modelado dinámico de empuje para satélites de baja órbita (LEO) mediante magnetohidrodinámica.",
    tags: ["LEO", "Plasma", "Eficiencia"]
  },
  {
    id: 2,
    title: "Latencia en Redes Espaciales",
    icon: <Radio className="w-5 h-5 text-amber-400" />,
    equation: "L(d) = \frac{d}{c} + \sum_{i=1}^{n} T_{hop,i}",
    description: "Optimización de protocolos de transporte para comunicaciones de larga distancia interplanetaria.",
    tags: ["SDN", "RF", "QoS"]
  },
  {
    id: 3,
    title: "Navegación Autónoma por Púlsares",
    icon: <Orbit className="w-5 h-5 text-purple-400" />,
    equation: "\Delta 	au = \frac{1}{c} \mathbf{n} \cdot \mathbf{r} + \mathcal{O}(c^{-2})",
    description: "Algoritmos de posicionamiento tri-dimensional utilizando señales de radiofrecuencia estelar.",
    tags: ["Deep Space", "XNAV", "SLAM"]
  },
  {
    id: 4,
    title: "Arquitecturas de Computación In-Orbit",
    icon: <Cpu className="w-5 h-5 text-emerald-400" />,
    equation: "P_{comp} = \alpha C f V_{dd}^2 + I_{leak} V_{dd}",
    description: "Sistemas embebidos tolerantes a radiación para el procesamiento de imágenes en tiempo real.",
    tags: ["FPGA", "Edge AI", "Rad-Hard"]
  }
];

const ResearchLines = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {researchLines.map((line) => (
        <motion.div
          key={line.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ borderColor: 'rgba(34, 211, 238, 0.4)' }}
          className="bg-[#0f172a]/80 border border-slate-800 p-6 rounded-lg shadow-xl backdrop-blur-sm transition-all duration-300"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-slate-900 rounded-md border border-slate-700">
              {line.icon}
            </div>
            <h3 className="text-lg font-semibold text-slate-100 font-sans tracking-tight">
              {line.title}
            </h3>
          </div>
          
          <div className="bg-slate-900/50 p-4 rounded-md mb-4 border border-slate-800/50 flex justify-center items-center overflow-x-auto">
            <div className="text-cyan-200/90 text-sm md:text-base font-mono">
              <BlockMath math={line.equation} />
            </div>
          </div>
          
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">
            {line.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {line.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-slate-800 text-[10px] font-mono text-slate-500 uppercase tracking-widest rounded">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ResearchLines;
