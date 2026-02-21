
import React from 'react';
import { BookOpen, ExternalLink, Hash, User, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const publications = [
  {
    id: 1,
    title: "Optimized Trajectory Algorithms for Low-Energy Satellite Clusters",
    authors: "Rosas, A., Ordaz, Y., et al.",
    journal: "Journal of Aerospace Information Systems",
    date: "2025-11-14",
    doi: "10.2514/1.I011245",
    abstract: "Propuesta de una nueva clase de algoritmos de optimización multi-objetivo para la coordinación de enjambres de satélites en órbitas bajas, minimizando el consumo de combustible en un 15%."
  },
  {
    id: 2,
    title: "Quantum-Resistant Communication Protocols for Deep Space Networks",
    authors: "Molina, J., et al.",
    journal: "IEEE Transactions on Aerospace and Electronic Systems",
    date: "2025-08-22",
    doi: "10.1109/TAES.2025.321456",
    abstract: "Investigación sobre la implementación de criptografía post-cuántica en enlaces de radiofrecuencia para misiones de exploración a Marte, considerando latencias extremas."
  },
  {
    id: 3,
    title: "Radiation-Hardened Edge Computing for Real-time Space Imagery",
    authors: "Rosas, A., et al.",
    journal: "Acta Astronautica",
    date: "2025-05-10",
    doi: "10.1016/j.actaastro.2025.04.012",
    abstract: "Evaluación de arquitecturas SoC (System on Chip) para el procesamiento de redes neuronales convolucionales en entornos de alta radiación sin pérdida de precisión."
  }
];

const RecentPublications = () => {
  return (
    <div className="p-4 space-y-6">
      {publications.map((pub, index) => (
        <motion.div
          key={pub.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative bg-[#0f172a]/40 border border-slate-800 p-6 rounded-lg hover:bg-slate-800/20 transition-all duration-300"
        >
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                {pub.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-500 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-amber-500/80">
                  <User className="w-3.5 h-3.5" /> {pub.authors}
                </span>
                <span className="flex items-center gap-1.5 text-blue-400/80">
                  <BookOpen className="w-3.5 h-3.5" /> {pub.journal}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {pub.date}
                </span>
              </div>
            </div>
            
            <div className="flex items-start">
              <a 
                href={`https://doi.org/${pub.doi}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-300 rounded transition-colors"
              >
                <Hash className="w-3 h-3" /> DOI: {pub.doi} <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
          
          <div className="pl-4 border-l-2 border-slate-800/50">
            <p className="text-sm text-slate-400 italic leading-relaxed">
              "{pub.abstract}"
            </p>
          </div>
          
          {/* Subtle indicator for interactive state */}
          <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute -top-1 -right-1 w-full h-full bg-cyan-500/10 blur-xl"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default RecentPublications;
