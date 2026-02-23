
import React from 'react';
import { BookOpen, ExternalLink, Hash, User, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const publications = [
  {
    id: 1,
    title: "Machine Learning-Driven Cyberdefense for Dynamic Anti-jamming Strategies in Ku and Ka Band Satellite Links",
    authors: "Rosas, A., Ordaz, Y., Molina, J., et al.",
    journal: "Springer NAture Link",
    date: "2025-10-31",
    doi: "10.1007/978-3-032-09735-4_15",
    abstract: "Novel machine learning-driven cyberdefense architecture that utilizes distributed intelligence across space and ground segments for dynamic anti-jamming."
  },
  {
    id: 2,
    title: "Radiofrequency and optical satellite link budgeting calculator",
    authors: "Rosas, A., et al.",
    journal: "Journal of Physics: Conference Series",
    date: "2023-11-19",
    doi: "10.1088/1742-6596/2804/1/012004",
    abstract: "Construction of a web application that includes the link budget calculation process for both radio and optical satellite systems."
  },
  {
    id: 3,
    title: "Design of a Scientific Experiment Aboard a 3U CubeSat for the Detection of Pollutant Particles Using Infrared Spectrometry",
    authors: "Rosas, A., Molina, J., et al.",
    journal: "International Astronautical Federation (IAF)",
    date: "2024-10-18",
    doi: "10.52202/078365-0120",
    abstract: "The project incorporates a scientific experiment based on Fourier-transform infrared spectrometry, a method for obtaining the emission or absorption spectrum, subsequently analyzed using a mathematical algorithm."
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
