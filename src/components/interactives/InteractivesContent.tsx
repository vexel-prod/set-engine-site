
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Box, BarChart3, ShieldAlert, Cpu, Terminal, Zap, HardDrive } from 'lucide-react';
import Simulator from '../Simulator';
import Calculator from '../Calculator';
import RiskMap from '../RiskMap';

function InteractivesContentInner() {
  const searchParams = useSearchParams();
  const [activeTool, setActiveTool] = useState('simulator');
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    const tool = searchParams.get('tool');
    if (tool) {
      handleToolChange(tool);
    }
  }, [searchParams]);

  const handleToolChange = (toolId: string) => {
    setIsInitializing(true);
    setTimeout(() => {
      setActiveTool(toolId);
      setIsInitializing(false);
    }, 600);
  };

  const tools = [
    { 
      id: 'simulator', 
      name: 'Симулятор Проекта', 
      icon: Box, 
      desc: 'Аудит цифровой зрелости', 
      version: 'v4.2.1',
      specs: 'LOGIC_ENGINE_v4' 
    },
    { 
      id: 'calculator', 
      name: 'Калькулятор Бюджета', 
      icon: BarChart3, 
      desc: 'Прогноз затрат и сроков', 
      version: 'v2.1.0',
      specs: 'ECON_MODEL_BETA' 
    },
    { 
      id: 'riskmap', 
      name: 'Карта Рисков', 
      icon: ShieldAlert, 
      desc: 'Анализ критических путей', 
      version: 'v3.0.5',
      specs: 'STOCHASTIC_SIM' 
    },
  ];

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto">
      {/* Simulation Hub Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-12">
        <div className="space-y-4 text-left">
          <div className="flex items-center gap-2 font-mono text-[10px] font-bold text-brand-500 uppercase tracking-[0.3em]">
            <Activity size={14} className="animate-pulse" />
            System_Simulation_Environment
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold uppercase tracking-tighter">
            Interactive <span className="text-zinc-400">Hub</span>
          </h1>
          <p className="text-zinc-500 max-w-lg leading-relaxed">
            Развертывание виртуальных сценариев управления. Выберите модуль для проведения технического или финансового анализа.
          </p>
        </div>
        
        <div className="hidden lg:flex gap-8 font-mono text-[9px] text-zinc-400 uppercase tracking-widest bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800">
           <div className="space-y-1">
              <div className="text-zinc-500">Uptime</div>
              <div className="text-zinc-900 dark:text-zinc-100 font-bold">99.98%</div>
           </div>
           <div className="w-px h-8 bg-zinc-200 dark:border-zinc-800" />
           <div className="space-y-1">
              <div className="text-zinc-500">Latency</div>
              <div className="text-zinc-900 dark:text-zinc-100 font-bold">12ms</div>
           </div>
           <div className="w-px h-8 bg-zinc-200 dark:border-zinc-800" />
           <div className="space-y-1">
              <div className="text-brand-500">Status</div>
              <div className="text-brand-500 font-bold animate-pulse">Ready</div>
           </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Module Navigator */}
        <div className="lg:col-span-1 space-y-4">
          <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-4 ml-2">Available_Modules</div>
          <div className="grid gap-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const isActive = activeTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolChange(tool.id)}
                  className={`relative group flex flex-col items-start p-6 rounded-3xl border transition-all duration-300 text-left overflow-hidden ${
                    isActive 
                      ? 'bg-brand-500 border-brand-500 text-white shadow-xl shadow-brand-500/20' 
                      : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between w-full mb-4">
                    <Icon size={24} className={isActive ? 'text-white' : 'text-brand-500'} />
                    <span className={`font-mono text-[8px] opacity-60`}>{tool.version}</span>
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-tight text-sm mb-1">{tool.name}</h3>
                  <p className={`text-[10px] leading-tight opacity-60`}>{tool.desc}</p>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-white/10 pointer-events-none"
                      initial={false}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* System Specs Sidebar Element */}
          <div className="mt-8 p-6 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 space-y-4 hidden lg:block">
             <div className="flex items-center gap-2 font-mono text-[9px] text-zinc-500 uppercase">
                <Terminal size={12} /> Diagnostic_Output
             </div>
             <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-mono">
                   <span className="text-zinc-400">Active_Thread:</span>
                   <span className="text-zinc-800 dark:text-zinc-200">0x{Math.floor(Math.random()*10000).toString(16).toUpperCase()}</span>
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono">
                   <span className="text-zinc-400">Compute_Load:</span>
                   <div className="w-16 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div animate={{ width: ['20%', '60%', '40%'] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-brand-500" />
                   </div>
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono">
                   <span className="text-zinc-400">Memory:</span>
                   <span className="text-zinc-800 dark:text-zinc-200">2.4 GB/s</span>
                </div>
             </div>
          </div>
        </div>

        {/* Main Simulation Display */}
        <div className="lg:col-span-3">
          <div className="relative h-full rounded-[48px] bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[600px] shadow-inner flex flex-col">
             {/* Bezel UI */}
             <div className="absolute top-0 left-0 right-0 h-10 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 bg-zinc-100/50 dark:bg-zinc-900/50">
                <div className="flex gap-4 items-center">
                   <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      <div className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                   </div>
                   <span className="font-mono text-[8px] text-zinc-400 uppercase">Module_Active: {activeTool.toUpperCase()}</span>
                </div>
                <div className="flex gap-4 items-center font-mono text-[8px] text-zinc-400 uppercase">
                   <span className="flex items-center gap-1"><Zap size={10} className="text-brand-500" /> Accelerated</span>
                   <span className="flex items-center gap-1"><HardDrive size={10} /> Local_Buffer</span>
                </div>
             </div>

             <div className="flex-grow p-8 md:p-12 pt-20">
               <AnimatePresence mode="wait">
                 {isInitializing ? (
                   <motion.div 
                     key="loader"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     className="h-full flex flex-col items-center justify-center space-y-4"
                   >
                     <div className="w-16 h-16 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin" />
                     <div className="font-mono text-[10px] text-brand-500 uppercase animate-pulse">Инициализация модуля {activeTool}...</div>
                   </motion.div>
                 ) : (
                   <motion.div
                     key={activeTool}
                     initial={{ opacity: 0, scale: 0.98, y: 10 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                     className="h-full"
                   >
                     {activeTool === 'simulator' && <Simulator />}
                     {activeTool === 'calculator' && <Calculator />}
                     {activeTool === 'riskmap' && <RiskMap />}
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>

             {/* Footer Bezel */}
             <div className="absolute bottom-0 left-0 right-0 h-12 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                <div className="font-mono text-[8px] text-zinc-500 flex items-center gap-6">
                   <span>SECURE_ENCLAVE: ACTIVE</span>
                   <span>ALGO_VER: 2025.4.b</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-ping" />
                   <span className="font-mono text-[8px] text-brand-500 font-bold uppercase tracking-widest">Live_Sim_Active</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InteractivesContent() {
  return (
    <Suspense fallback={
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-100 dark:border-zinc-800 border-t-brand-500 rounded-full animate-spin" />
        <span className="font-mono text-[10px] text-zinc-400 uppercase">Подключение к ядру СЭТ...</span>
      </div>
    }>
      <InteractivesContentInner />
    </Suspense>
  );
}
