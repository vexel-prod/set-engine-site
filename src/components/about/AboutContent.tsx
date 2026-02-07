
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Shield, Target, Zap, Cpu, Users, Award, Database, Fingerprint } from 'lucide-react';
import { companyData } from '../../data/company';

const stats = [
  { label: 'Verified Projects', value: '140+', icon: Database },
  { label: 'Team Experts', value: '45', icon: Users },
  { label: 'Uptime Control', value: '24/7', icon: Zap },
  { label: 'BIM Complexity', value: 'LOD 400', icon: Cpu },
];

const values = [
  { 
    title: 'Precision', 
    desc: 'Точность до миллиметра в изысканиях и проектировании.', 
    code: 'METRIC_01', 
    icon: Target 
  },
  { 
    title: 'Integrity', 
    desc: 'Неизменность данных на всех этапах жизненного цикла объекта.', 
    code: 'DATA_HASH_V', 
    icon: Shield 
  },
  { 
    title: 'Innovation', 
    desc: 'Внедрение цифровых двойников там, где другие используют бумагу.', 
    code: 'NEXT_GEN_ENG', 
    icon: Zap 
  }
];

export default function AboutContent() {
  return (
    <div className="space-y-32 py-12">
      {/* Header Section */}
      <section className="relative text-left space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-brand-500">
            <Fingerprint size={14} />
            Entity_Identity_Verified
          </div>
          <h1 className="font-display text-7xl font-bold uppercase tracking-tighter leading-[0.8] md:text-9xl">
            Инжиниринг <br />
            <span className="text-zinc-300 dark:text-zinc-800 italic">Полного</span> <br />
            Цикла
          </h1>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-end">
          <p className="text-xl text-zinc-500 leading-relaxed max-w-xl">
            СЭТ (Строительство и Энергетические Технологии) — это не просто компания, это операционная система для вашего строительного проекта. Мы оцифровываем физический мир, превращая хаос стройки в структурированный поток данных.
          </p>
          <div className="flex gap-4">
             {stats.map((s, i) => (
               <div key={i} className="flex-1 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <s.icon className="w-5 h-5 text-brand-500 mb-4" />
                  <div className="text-2xl font-display font-bold">{s.value}</div>
                  <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">{s.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Hero Image Section with AR UI */}
      <section className="relative aspect-[21/9] rounded-[48px] overflow-hidden border border-zinc-200 dark:border-zinc-800 group">
        <Image 
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000" 
          alt="SET HQ"
          fill
          className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        
        {/* AR UI Elements */}
        <div className="absolute top-12 left-12 p-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl text-white font-mono text-[10px] space-y-1">
           <div className="text-brand-500">● HQ_ACTIVE_NODE</div>
           <div>COORD: 55.7194° N, 37.8282° E</div>
           <div className="opacity-50">TEMP: 21°C | HUM: 44%</div>
        </div>

        <div className="absolute bottom-12 right-12 text-right">
           <div className="font-display text-4xl font-bold text-white uppercase tracking-tighter opacity-80">
              Control <br /> Room
           </div>
        </div>
      </section>

      {/* Values / DNA Section */}
      <section className="space-y-16 text-left">
        <h2 className="font-display text-4xl font-bold uppercase tracking-tighter flex items-center gap-6">
          System Core Values <div className="h-px flex-grow bg-zinc-200 dark:bg-zinc-800" />
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[40px] bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <v.icon size={120} />
              </div>
              <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center text-white">
                <v.icon size={24} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-display font-bold uppercase">{v.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
              <div className="pt-6 font-mono text-[9px] text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 uppercase tracking-[0.2em]">
                Component_Code: {v.code}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Legal Digital Passport */}
      <section className="grid lg:grid-cols-5 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8 text-left">
           <h2 className="font-display text-4xl font-bold uppercase tracking-tighter">Цифровой Паспорт</h2>
           <p className="text-zinc-500 text-sm leading-relaxed">
             Полная юридическая прозрачность. Все данные о компании верифицированы и находятся в открытом доступе для наших партнеров.
           </p>
           <div className="p-8 rounded-[40px] border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-4 text-center">
              <Award className="w-12 h-12 text-brand-500 opacity-20" />
              <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Лицензия СРО: Выдана 2024</div>
           </div>
        </div>

        <div className="lg:col-span-3">
           <div className="relative overflow-hidden rounded-[48px] bg-zinc-950 p-12 text-white shadow-2xl border border-zinc-800">
              {/* Decorative watermarks */}
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                 <Cpu size={300} />
              </div>
              
              <div className="grid gap-10 relative z-10">
                <div className="flex justify-between items-start border-b border-zinc-800 pb-8">
                   <div className="space-y-1">
                      <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Entity_Status</div>
                      <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-tighter">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         Active & Verified
                      </div>
                   </div>
                   <div className="text-[9px] font-mono text-zinc-500 text-right uppercase tracking-widest">
                      Cert_ID: SET-RU-2025-001
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { label: 'Наименование', value: companyData.full_name },
                    { label: 'ИНН / ОГРН', value: `${companyData.inn} / ${companyData.ogrn}` },
                    { label: 'Руководитель', value: companyData.ceo },
                    { label: 'Регистрация', value: companyData.reg_date },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                       <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">{item.label}</span>
                       <p className="text-sm font-bold text-zinc-200 leading-tight uppercase tracking-tight">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-zinc-800 space-y-2">
                   <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em]">Юридический адрес</span>
                   <p className="text-xs text-zinc-400 italic">{companyData.legal_address}</p>
                </div>
              </div>

              {/* Fake Barcode */}
              <div className="mt-12 flex items-end justify-between">
                 <div className="flex gap-1 h-8 opacity-30">
                    {[1,4,2,8,2,1,6,3,2,9,4,1,5,3,1,8,2,1].map((h, i) => (
                      <div key={i} className="w-[2px] bg-white" style={{ height: `${h * 10}%` }} />
                    ))}
                 </div>
                 <div className="text-[8px] font-mono text-zinc-700 uppercase">Verification_Seal_v1.0</div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
