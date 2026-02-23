
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Activity, Battery, Wifi, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const generateData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: i,
    doppler: 1200 + Math.random() * 200,
    aptPower: 12 + Math.random() * 8,
    ber: 1e-6 + (Math.random() * 5e-7),
    battery: 13.8 + Math.random() * 0.4
  }));
};

const MissionStatus = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1), {
          time: prevData[prevData.length - 1].time + 1,
          doppler: 1200 + Math.random() * 200,
          aptPower: 12 + Math.random() * 8,
          ber: 1e-6 + (Math.random() * 5e-7),
          battery: 13.8 + Math.random() * 0.4
        }];
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const StatusCard = ({ title, value, unit, icon: Icon, colorClass, delay, isScientific }) => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: delay * 3 }}
      className="bg-[#0f172a]/60 border border-slate-800 p-4 rounded-lg flex flex-col justify-between overflow-hidden"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">{title}</span>
        <Icon className={`w-4 h-4 ${colorClass}`} />
      </div>
      <div className="flex items-baseline gap-1">
        <motion.span 
          key={value}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-xl md:text-2xl font-mono text-slate-100 tabular-nums"
        >
          {isScientific ? value.toExponential(1) : value.toFixed(1)}
        </motion.span>
        <span className="text-xs font-mono text-slate-500 uppercase">{unit}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Telemetry Metrics */}
        <div className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-4">
          <StatusCard 
            title="Compensación Doppler" 
            value={data[data.length - 1].doppler} 
            unit="Hz" 
            icon={Wifi} 
            colorClass="text-cyan-400"
            delay={0.1}
          />
          <StatusCard 
            title="Consumo Sistema APT" 
            value={data[data.length - 1].aptPower} 
            unit="W" 
            icon={Battery} 
            colorClass="text-amber-400"
            delay={0.2}
          />
          <StatusCard 
            title="BER (Bit Error Rate)" 
            value={data[data.length - 1].ber} 
            unit="Rate" 
            icon={Activity} 
            colorClass="text-emerald-400"
            delay={0.3}
            isScientific={true}
          />
          <StatusCard 
            title="Salud de Batería" 
            value={data[data.length - 1].battery} 
            unit="V" 
            icon={Database} 
            colorClass="text-purple-400"
            delay={0.4}
          />
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2 bg-[#0f172a]/60 border border-slate-800 p-6 rounded-lg backdrop-blur-md relative overflow-hidden">
          {/* Scanning Line Effect */}
          <motion.div 
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-[2px] bg-cyan-500/20 z-10 pointer-events-none"
          />
          
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" /> Doppler Shift Analysis (NGSO)
            </h3>
            <span className="text-[10px] font-mono text-emerald-500 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/30 animate-pulse">
              LIVE DATA STREAM
            </span>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorDoppler" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis 
                  domain={['auto', 'auto']} 
                  stroke="#475569" 
                  fontSize={10} 
                  tickFormatter={(val) => `${val}Hz`} 
                  fontFamily="monospace"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderColor: '#1e293b', 
                    color: '#f1f5f9',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}
                  itemStyle={{ color: '#22d3ee' }}
                  formatter={(value, name) => [
                    name === 'doppler' ? `${value.toFixed(2)} Hz` : `${value.toFixed(2)} W`,
                    name === 'doppler' ? 'Doppler' : 'APT Power'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="doppler" 
                  stroke="#06b6d4" 
                  fillOpacity={1} 
                  fill="url(#colorDoppler)" 
                  strokeWidth={2}
                  isAnimationActive={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="aptPower" 
                  stroke="#f59e0b" 
                  strokeWidth={1} 
                  dot={false}
                  strokeDasharray="5 5"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-cyan-500"></div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Shift (Hz)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-amber-500 border-dashed border-t border-amber-500"></div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">APT Power (W)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Analysis Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#0f172a]/60 border border-slate-800 p-6 rounded-lg"
      >
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-[#00d9ff]" /> Análisis de Datos en Tiempo Real
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed text-[#c0c0c0]">
          <div className="space-y-4">
            <p>
              <strong className="text-[#00d9ff]">Monitoreo de Enlace:</strong> La gráfica superior visualiza la estabilidad del enlace RF durante un pase satelital sobre nuestra estación terrena. Se utilizan modelos <span className="font-mono text-cyan-300">SGP4/SDP4</span> para el rastreo orbital de alta fidelidad.
            </p>
            <p>
              <strong className="text-[#00d9ff]">Dinámica de Potencia:</strong> Los picos observados en el consumo de energía corresponden directamente a las correcciones dinámicas de los motores del sistema de posicionamiento automático <span className="font-mono text-amber-300">(APT)</span>.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              <strong className="text-[#00d9ff]">Compensación Doppler:</strong> El flujo de datos en vivo muestra la compensación de frecuencia en tiempo real, crítica para mantener la sincronización en constelaciones <span className="font-mono text-purple-300">NGSO</span>.
            </p>
            <p>
              <strong className="text-[#00d9ff]">Validación de Algoritmo:</strong> Este entorno de pruebas permite validar algoritmos de control de lazo cerrado antes de su integración final en prototipos espaciales funcionales.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MissionStatus;
