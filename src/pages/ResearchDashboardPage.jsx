
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Activity, FileText, Settings, Database, Server, RefreshCcw } from 'lucide-react';
import ResearchLines from '@/components/research/ResearchLines';
import MissionStatus from '@/components/research/MissionStatus';
import RecentPublications from '@/components/research/RecentPublications';

const ResearchDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('status');
  const [utcTime, setUtcTime] = useState(new Date().toUTCString());

  useEffect(() => {
    const timer = setInterval(() => {
      setUtcTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'status', label: 'Telemetría de Misión', icon: Activity },
    { id: 'lines', label: 'Líneas de Investigación', icon: Beaker },
    { id: 'publications', label: 'Publicaciones Recientes', icon: FileText },
  ];

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      {/* Dashboard Header */}
      <div className="mb-12 border-b border-slate-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
            <span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">Sistemas de Investigación Avanzada</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight flex items-center gap-3">
            <Server className="w-8 h-8 text-slate-400" /> Research Dashboard
          </h1>
          <p className="mt-2 text-slate-400 font-mono text-sm">
            Control de misión y repositorio científico de CodeAerospace Lab.
          </p>
        </div>

        <div className="flex flex-col items-end">
          <div className="bg-slate-900/50 border border-slate-800 px-4 py-2 rounded flex items-center gap-3 shadow-inner">
            <RefreshCcw className="w-4 h-4 text-emerald-500 animate-spin-slow" />
            <div className="text-right">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none mb-1">Status: Operational</div>
              <div className="text-xs font-mono text-slate-200 tabular-nums leading-none">{utcTime}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 p-1 bg-slate-900/40 border border-slate-800 rounded-lg w-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2 rounded-md text-sm font-mono transition-all duration-300 ${
                  isActive 
                  ? 'bg-slate-800 text-cyan-400 border border-slate-700 shadow-lg' 
                  : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="min-h-[500px]"
          >
            {activeTab === 'status' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between px-4 gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-cyan-500" /> Estado de Misión / Proyecto
                    </h2>
                    <p className="text-xs text-slate-400 font-mono mt-1">
                      Monitoreo de prototipos funcionales y validación de algoritmos de control para órbitas LEO/NGSO.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                    <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> APT_CTRL_V2</span>
                    <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div> LEO_LINK_X</span>
                  </div>
                </div>
                <MissionStatus />
              </div>
            )}

            {activeTab === 'lines' && (
              <div className="space-y-6">
                <div className="px-4">
                  <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2 mb-2">
                    <Beaker className="w-5 h-5 text-amber-500" /> Líneas de Investigación Activa
                  </h2>
                  <p className="text-sm text-slate-400 font-mono">Formulaciones matemáticas y objetivos técnicos de fase beta.</p>
                </div>
                <ResearchLines />
              </div>
            )}

            {activeTab === 'publications' && (
              <div className="space-y-6">
                <div className="px-4">
                  <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-purple-500" /> Publicaciones Recientes
                  </h2>
                  <p className="text-sm text-slate-400 font-mono">Metadatos académicos y registros DOI de la facultad.</p>
                </div>
                <RecentPublications />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Technical Footer */}
      <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap justify-between items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
        <div className="flex gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Protocol</span>
            <span className="text-xs font-mono text-slate-300">TCP/IP Over RF</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Encryption</span>
            <span className="text-xs font-mono text-slate-300">AES-256-GCM</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">System</span>
            <span className="text-xs font-mono text-slate-300">RTOS v4.2.0-STABLE</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Database className="w-4 h-4 text-slate-500" />
          <Settings className="w-4 h-4 text-slate-500" />
          <div className="h-4 w-[1px] bg-slate-800 mx-2"></div>
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em]">CodeAerospace System v2.0.26</span>
        </div>
      </div>
    </div>
  );
};

export default ResearchDashboardPage;
