
import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { motion } from 'framer-motion';
import { Cpu, Zap, Radio, Orbit } from 'lucide-react';

const researchLines = [
  {
    id: 1,
    title: "Control de Sistemas Dinámicos y APT",
    icon: <Orbit className="w-5 h-5 text-[#00d9ff]" />,
    equation: "G(s) = \\frac{K}{Js^2 + Bs + K}",
    description: "Diseño e implementación de sistemas de posicionamiento y rastreo automático (APT) para satélites de órbita baja.",
    tags: ["Control", "Sistemas Dinámicos", "APT"]
  },
  {
    id: 2,
    title: "Comunicaciones NGSO y Coexistencia",
    icon: <Radio className="w-5 h-5 text-[#00d9ff]" />,
    equation: "epfd = 10 \\log_{10} \\sum_{i=1}^{N} 10^{\\frac{G_i + P_i - L_i}{10}}",
    description: "Modelado de interferencia y cumplimiento de límites de densidad de flujo de potencia equivalente (epfd) según la UIT.",
    tags: ["NGSO", "WRC-27", "Spectrum"]
  },
  {
    id: 3,
    title: "Agentes de IA y Automatización",
    icon: <Cpu className="w-5 h-5 text-[#00d9ff]" />,
    equation: "\\mathcal{L}(\\theta) = \\mathbb{E}_{\\pi} [\\sum r_t]",
    description: "Orquestación de sistemas multi-agente para la automatización de flujos de trabajo técnicos y análisis de telemetría.",
    tags: ["AI Agents", "LangChain", "Autonomía"]
  },
  {
    id: 4,
    title: "Análisis Térmico-Estructural y Propulsión",
    icon: <Zap className="w-5 h-5 text-[#00d9ff]" />,
    equation: "F = \\dot{m} v_e + (p_e - p_a) A_e",
    description: "Desarrollo de bancos de prueba y simulación por elementos finitos (FEA) para sistemas de propulsión y soporte mecánico.",
    tags: ["FEA", "Propulsión", "Termodinámica"]
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
