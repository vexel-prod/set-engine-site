
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  Layers, 
  Activity, 
  Binary, 
  Boxes, 
  FileSearch, 
  HardHat, 
  Settings, 
  ClipboardCheck,
  Zap,
  Cpu
} from 'lucide-react';

const servicesData = [
  { 
    id: 'SRV-001', 
    title: 'Инженерные изыскания', 
    desc: 'Комплексный анализ территории: геодезия, геология и экология.', 
    icon: FileSearch,
    specs: { lod: 'LOD 200', cpu: 'Medium', output: 'GEO_CLOUD' },
    duration: '14-30 days',
    items: ['Топографическая съемка 1:500', 'Бурение и лаб. исследования', 'Экологический мониторинг', 'Гидрометеорология']
  },
  { 
    id: 'SRV-002', 
    title: 'BIM Проектирование', 
    desc: 'Создание высокоточных цифровых двойников зданий и сетей.', 
    icon: Layers,
    specs: { lod: 'LOD 400', cpu: 'Very High', output: 'IFC / RVT' },
    duration: '60+ days',
    items: ['Архитектурные решения', 'Конструктив (КЖ/КМ)', 'Инженерные системы (MEP)', 'Сводная модель коллизий']
  },
  { 
    id: 'SRV-003', 
    title: 'Управление (PMO)', 
    desc: 'Функции технического заказчика и финансовый контроль.', 
    icon: Boxes,
    specs: { lod: '5D_COST', cpu: 'Critical', output: 'BI_REPORT' },
    duration: 'Lifecycle',
    items: ['Управление бюджетом', 'Тендерные процедуры', 'Календарный график (4D)', 'GR и согласования']
  },
  { 
    id: 'SRV-004', 
    title: 'Строительный контроль', 
    desc: 'Цифровая приемка и независимый надзор за качеством.', 
    icon: ClipboardCheck,
    specs: { lod: 'REAL_TIME', cpu: 'High', output: 'LOG_VAULT' },
    duration: 'Construction',
    items: ['Входной контроль', 'Лабораторные испытания', 'Цифровые акты (КС-2)', 'Фотограмметрия']
  },
  { 
    id: 'SRV-005', 
    title: 'Технический аудит', 
    desc: 'Оценка состояния активов и Due Diligence документации.', 
    icon: Binary,
    specs: { lod: 'AS-BUILT', cpu: 'High', output: 'RISK_MATRIX' },
    duration: '10-20 days',
    items: ['Обследование конструкций', 'Аудит исполнительной док-ти', 'Оценка CAPEX/OPEX', 'Энергоаудит']
  },
  { 
    id: 'SRV-006', 
    title: 'Авторский надзор', 
    desc: 'Сопровождение строительства проектной командой.', 
    icon: HardHat,
    specs: { lod: 'ON-SITE', cpu: 'Medium', output: 'JOURNAL_DIGITAL' },
    duration: 'Construction',
    items: ['Контроль проектных решений', 'Оперативные изменения', 'Освидетельствование узлов', 'Технический консалтинг']
  },
];

export default function ServicesContent() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-24 py-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <section className="relative flex flex-col items-start gap-8 border-l-4 border-brand-500 pl-8 md:pl-12">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-brand-500">
            <Activity size={14} className="animate-pulse" />
            Service_Inventory_Matrix_v2.5
          </div>
          <h1 className="font-display text-7xl font-bold uppercase tracking-tighter leading-none md:text-8xl">
            Наши <br />
            <span className="text-zinc-300 dark:text-zinc-800">Системные</span> <br />
            Модули
          </h1>
        </motion.div>
        <p className="text-xl text-zinc-500 max-w-2xl leading-relaxed">
          Мы предлагаем дискретные и комплексные инженерные решения, оцифрованные по стандарту СЭТ. Каждый модуль гарантирует консистентность данных на протяжении всего жизненного цикла объекта.
        </p>
      </section>

      {/* Services Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {servicesData.map((s, i) => {
          const isExpanded = expandedId === s.id;
          const Icon = s.icon;
          
          return (
            <motion.div 
              key={s.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group relative flex flex-col rounded-[40px] border transition-all duration-500 overflow-hidden ${
                isExpanded 
                ? 'lg:col-span-2 bg-zinc-900 border-brand-500 shadow-2xl shadow-brand-500/10 text-white' 
                : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-700 shadow-sm'
              }`}
            >
              {/* Decorative Tech Elements */}
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={120} />
              </div>

              <div className="p-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl ${isExpanded ? 'bg-brand-500 text-white' : 'bg-zinc-100 dark:bg-zinc-900 text-brand-500'}`}>
                    <Icon size={24} />
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">{s.id}</div>
                    <div className="flex items-center gap-2 mt-1">
                       <div className={`w-1.5 h-1.5 rounded-full ${isExpanded ? 'bg-emerald-400 animate-pulse' : 'bg-brand-500/30'}`} />
                       <span className="font-mono text-[8px] text-zinc-500 uppercase">Status: Ready</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-grow">
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight group-hover:text-brand-500 transition-colors">
                    {s.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isExpanded ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {s.desc}
                  </p>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-12 pt-12 border-t border-zinc-800"
                    >
                      <div className="grid md:grid-cols-2 gap-12">
                         <div className="space-y-6">
                            <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                               <Settings size={12} /> Work_Scope_Protocol
                            </h4>
                            <ul className="grid gap-3">
                               {s.items.map((item, idx) => (
                                 <li key={idx} className="flex items-center gap-3 text-xs text-zinc-300 font-medium">
                                    <div className="w-1 h-1 bg-brand-500 rounded-full" />
                                    {item}
                                 </li>
                               ))}
                            </ul>
                         </div>
                         <div className="space-y-6">
                            <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                               <Cpu size={12} /> Execution_Specs
                            </h4>
                            <div className="grid gap-4">
                               {Object.entries(s.specs).map(([key, val]) => (
                                 <div key={key} className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                                    <span className="text-[9px] font-mono text-zinc-500 uppercase">{key}</span>
                                    <span className="text-[10px] font-mono font-bold text-brand-500">{val}</span>
                                 </div>
                               ))}
                               <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                                  <span className="text-[9px] font-mono text-zinc-500 uppercase">SLA_Time</span>
                                  <span className="text-[10px] font-mono font-bold text-zinc-300">{s.duration}</span>
                               </div>
                            </div>
                         </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-12 flex items-center gap-4">
                  <button 
                    onClick={() => setExpandedId(isExpanded ? null : s.id)}
                    className={`flex-grow py-4 rounded-2xl font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all border ${
                      isExpanded 
                      ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20' 
                      : 'bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-brand-500 hover:text-brand-500'
                    }`}
                  >
                    {isExpanded ? 'Close_Module' : 'Inspect_Module'}
                  </button>
                  {!isExpanded && (
                     <div className="flex -space-x-2">
                        {[1, 2, 3].map(j => (
                           <div key={j} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                              <img src={`https://i.pravatar.cc/100?img=${i + j + 10}`} alt="expert" className="grayscale" />
                           </div>
                        ))}
                     </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Performance Footer Banner */}
      <section className="p-12 rounded-[48px] bg-brand-500 text-white relative overflow-hidden group">
         <div className="absolute inset-0 opacity-10 tech-grid" />
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="space-y-4">
               <h2 className="font-display text-4xl font-bold uppercase tracking-tighter">Нужен кастомный пайплайн?</h2>
               <p className="text-white/80 max-w-lg">Мы можем собрать уникальный стек инженерных услуг под специфику вашего энергетического или промышленного объекта.</p>
            </div>
            <a href="#/contacts" className="px-10 py-5 bg-zinc-950 text-white rounded-3xl font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-brand-500 transition-all flex items-center gap-3">
               Конфигурировать Решение <Zap size={16} />
            </a>
         </div>
      </section>
    </div>
  );
}
