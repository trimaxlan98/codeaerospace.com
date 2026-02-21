
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
    latency: 200 + Math.random() * 50,
    power: 80 + Math.random() * 20,
    signal: 90 + Math.random() * 10
  }));
};

const MissionStatus = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1), {
          time: prevData[prevData.length - 1].time + 1,
          latency: 200 + Math.random() * 50,
          power: 80 + Math.random() * 20,
          signal: 90 + Math.random() * 10
        }];
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const StatusCard = ({ title, value, unit, icon: Icon, colorClass }) => (
    <div className="bg-[#0f172a]/60 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
      <div className="flex justify-between items-start mb-2">
        <span className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">{title}</span>
        <Icon className={`w-4 h-4 ${colorClass}`} />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-mono text-slate-100 tabular-nums">
          {value.toFixed(1)}
        </span>
        <span className="text-xs font-mono text-slate-500 uppercase">{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* Telemetry Metrics */}
      <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        <StatusCard 
          title="Latencia de Enlace" 
          value={data[data.length - 1].latency} 
          unit="ms" 
          icon={Wifi} 
          colorClass="text-cyan-400" 
        />
        <StatusCard 
          title="Consumo de Red" 
          value={data[data.length - 1].power} 
          unit="W" 
          icon={Battery} 
          colorClass="text-amber-400" 
        />
        <StatusCard 
          title="Tasa de Error" 
          value={data[data.length - 1].signal / 100} 
          unit="BER" 
          icon={Activity} 
          colorClass="text-emerald-400" 
        />
        <StatusCard 
          title="Almacenamiento" 
          value={74.2} 
          unit="GB" 
          icon={Database} 
          colorClass="text-purple-400" 
        />
      </div>

      {/* Latency Visualization */}
      <div className="lg:col-span-2 bg-[#0f172a]/60 border border-slate-800 p-6 rounded-lg backdrop-blur-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-500" /> Monitor de Telemetría Satelital
          </h3>
          <span className="text-[10px] font-mono text-emerald-500 px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/30 animate-pulse">
            LIVE FEED
          </span>
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="time" 
                hide 
              />
              <YAxis 
                domain={['auto', 'auto']} 
                stroke="#475569" 
                fontSize={10} 
                tickFormatter={(val) => `${val}`} 
                fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
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
              />
              <Area 
                type="monotone" 
                dataKey="latency" 
                stroke="#06b6d4" 
                fillOpacity={1} 
                fill="url(#colorLatency)" 
                strokeWidth={2}
                isAnimationActive={false}
              />
              <Line 
                type="monotone" 
                dataKey="power" 
                stroke="#f59e0b" 
                strokeWidth={1} 
                dot={false}
                strokeDasharray="5 5"
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-cyan-500"></div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-nowrap whitespace-nowrap">Señal Satelital (ms)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-amber-500 border-dashed border-t border-amber-500"></div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-nowrap whitespace-nowrap">Energía Crítica (W)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionStatus;
