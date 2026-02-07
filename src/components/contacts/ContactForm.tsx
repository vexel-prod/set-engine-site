
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, MapPin, Globe, Clock, ShieldCheck, Cpu } from 'lucide-react';
import { useAppContext } from '../AppContext';

export default function ContactForm() {
  const { techMode } = useAppContext();
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('ru-RU', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('success'), 2000);
  };

  return (
    <div className="space-y-16 py-8">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden rounded-[40px] bg-zinc-950 p-12 text-left border border-zinc-800">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Cpu size={240} className="text-brand-500" />
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-brand-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
            </span>
            Communication Node: Active
          </div>
          <h1 className="font-display text-6xl font-bold uppercase tracking-tighter text-white md:text-7xl">
            Связь с <span className="text-zinc-600">Центром</span>
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">
            Инициируйте сессию взаимодействия для аудита вашего объекта или получения технической консультации.
          </p>
        </div>
      </section>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Left Column: Stats & Info */}
        <div className="space-y-6 lg:col-span-1">
          {/* Status Panel */}
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-8 space-y-6">
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              System_Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 flex items-center gap-2"><Clock size={14} /> Время MSK</span>
                <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">{currentTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 flex items-center gap-2"><ShieldCheck size={14} /> Шифрование</span>
                <span className="text-[10px] font-mono font-bold text-brand-500 uppercase">AES-256 Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-zinc-500 flex items-center gap-2"><Globe size={14} /> Пинг</span>
                <span className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100">14 ms</span>
              </div>
            </div>

            <div className="pt-4">
              <div className="rounded-2xl bg-zinc-900 p-4 border border-zinc-800">
                <div className="text-[9px] font-mono text-emerald-500 mb-1">● ONLINE</div>
                <div className="text-xs text-zinc-300 font-medium">Дежурный инженер доступен для экспресс-аудита</div>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="grid grid-cols-2 gap-4">
            <a href="mailto:info@set-energy.tech" className="flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-500 transition-colors group">
              <Mail className="w-6 h-6 mb-3 text-zinc-400 group-hover:text-brand-500 transition-colors" />
              <span className="text-[10px] font-mono uppercase tracking-widest">Email</span>
            </a>
            <a href="tel:+74950000000" className="flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-500 transition-colors group">
              <Phone className="w-6 h-6 mb-3 text-zinc-400 group-hover:text-brand-500 transition-colors" />
              <span className="text-[10px] font-mono uppercase tracking-widest">Call</span>
            </a>
          </div>

          {/* Location Visual */}
          <div className="relative aspect-square rounded-[40px] bg-black border border-zinc-800 overflow-hidden group">
             {/* Fake Radar/Map Grid */}
             <div className="absolute inset-0 opacity-20 tech-grid" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                   <motion.div 
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 -m-4 rounded-full border border-brand-500/50"
                   />
                   <div className="h-4 w-4 rounded-full bg-brand-500 shadow-[0_0_15px_rgba(20,184,166,1)]" />
                </div>
             </div>
             <div className="absolute bottom-6 left-6 right-6 space-y-1">
                <div className="text-[9px] font-mono text-zinc-500">LAT: 55.719488</div>
                <div className="text-[9px] font-mono text-zinc-500">LNG: 37.828236</div>
                <div className="text-xs font-bold text-white uppercase tracking-tight">Москва, Вешняковская, 31</div>
             </div>
          </div>
        </div>

        {/* Right Column: Terminal Form */}
        <div className="lg:col-span-2">
          <div className="h-full rounded-[48px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Terminal Header */}
            <div className="bg-zinc-100 dark:bg-zinc-900 px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-800" />
                <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-800" />
              </div>
              <div className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Session ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
            </div>

            <div className="p-10 flex-grow">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-8"
                  >
                    <div className="relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 -m-6 border border-dashed border-emerald-500/30 rounded-full"
                      />
                      <div className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center text-white text-5xl shadow-2xl shadow-emerald-500/40 rotate-12">
                        ✓
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-3xl font-display font-bold uppercase tracking-tight">Пакет данных передан</h2>
                      <p className="text-zinc-500 text-sm max-w-sm mx-auto leading-relaxed">
                        Запрос успешно верифицирован и поставлен в очередь на обработку дежурным инженером. Ожидайте подтверждения.
                      </p>
                    </div>
                    <button 
                      onClick={() => setStatus('idle')} 
                      className="px-8 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-[10px] font-mono uppercase font-bold tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                    >
                      Новая сессия
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-widest ml-1">Identity</label>
                        <input 
                          required 
                          className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 p-4 font-display text-xl focus:border-brand-500 outline-none transition-colors placeholder:text-zinc-100 dark:placeholder:text-zinc-800" 
                          placeholder="ИМЯ_КЛИЕНТА" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-widest ml-1">Contact_Line</label>
                        <input 
                          required 
                          className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 p-4 font-display text-xl focus:border-brand-500 outline-none transition-colors placeholder:text-zinc-100 dark:placeholder:text-zinc-800" 
                          placeholder="TELEPHONE_OR_EMAIL" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-widest ml-1">Objective</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                        {['Аудит', 'BIM', 'Изыскания', 'Тендер', 'Другое'].map((tag) => (
                          <button 
                            key={tag}
                            type="button"
                            className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-[10px] font-mono uppercase hover:border-brand-500 hover:text-brand-500 transition-all text-left"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase text-zinc-400 tracking-widest ml-1">Message_Body</label>
                      <textarea 
                        className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 min-h-[150px] outline-none focus:border-brand-500 transition-colors text-sm" 
                        placeholder="Опишите техническую задачу или вопрос..."
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        disabled={status === 'sending'}
                        className="w-full py-6 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-3xl transition-all shadow-xl shadow-brand-500/20 group relative overflow-hidden"
                      >
                        {status === 'sending' ? (
                          <span className="flex items-center justify-center gap-3">
                            <span className="animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white" />
                            ОТПРАВКА_ПАКЕТА...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2 tracking-[0.2em] text-xs uppercase">
                            Инициировать Контакт
                            <MessageSquare size={16} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
            
            {/* Terminal Footer */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 px-8 py-6 border-t border-zinc-200 dark:border-zinc-800">
               <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                  <span className="flex items-center gap-2"><div className="w-1 h-1 bg-brand-500 rounded-full" /> IP_LOGGING: ACTIVE</span>
                  <span>© SET_CONTROL_CENTER_v1.0.4</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
