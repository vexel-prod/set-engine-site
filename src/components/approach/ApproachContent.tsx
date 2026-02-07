
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const standards = [
  { code: 'SET-ST-01', title: 'LOD 400 Integration', desc: 'Обязательный уровень детализации всех инженерных узлов для исключения коллизий на этапе монтажа.' },
  { code: 'SET-ST-02', title: 'Cloud Data Sync', desc: 'Синхронизация данных с объекта каждые 24 часа через зашифрованные каналы связи.' },
  { code: 'SET-ST-03', title: 'Double-Check Audit', desc: 'Двухуровневая верификация объемов: полевой инспектор + камеральная проверка.' }
];

export default function ApproachContent() {
  return (
    <div className="max-w-5xl mx-auto py-12 space-y-24">
      <section className="space-y-6 text-left border-l-2 border-brand-500 pl-8">
        <div className="inline-block px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 mb-4">
          <span className="font-mono text-[10px] font-bold text-brand-500 uppercase tracking-widest">Standard_v2025.4</span>
        </div>
        <h1 className="text-6xl font-display font-bold uppercase tracking-tighter">Методология <br/><span className="text-zinc-400">Цифрового Контроля</span></h1>
        <p className="text-xl text-zinc-500 max-w-2xl leading-relaxed">
          Мы не просто строим — мы создаем цифровой след каждого процесса. Наша методология базируется на трех столпах: точность данных, прозрачность сроков и превентивный риск-менеджмент.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {standards.map((std, i) => (
          <motion.div 
            key={std.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] space-y-4"
          >
            <span className="font-mono text-[10px] text-brand-500 font-bold">{std.code}</span>
            <h3 className="text-xl font-display font-bold uppercase">{std.title}</h3>
            <p className="text-sm text-zinc-500 leading-relaxed">{std.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="space-y-12">
        <h2 className="text-3xl font-display font-bold uppercase tracking-tight flex items-center gap-4 text-left">
          Workflow Lifecycle <span className="h-px flex-grow bg-zinc-200 dark:bg-zinc-800" />
        </h2>
        
        <div className="space-y-4">
          {[
            { step: '01', label: 'Аудит и Изыскания', details: 'Сбор облака точек, лазерное сканирование, верификация границ.' },
            { step: '02', label: 'BIM-моделирование', details: 'Создание цифрового двойника в среде общих данных (CDE).' },
            { step: '03', label: 'Операционный контроль', details: 'Еженедельный план-фактный анализ с использованием фотограмметрии.' },
            { step: '04', label: 'Asset Handover', details: 'Передача исполнительной документации в формате интерактивного паспорта.' }
          ].map((item, idx) => (
            <div key={idx} className="group flex items-start gap-8 p-6 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0">
              <span className="font-mono text-2xl font-bold text-zinc-300 dark:text-zinc-700 group-hover:text-brand-500 transition-colors">{item.step}</span>
              <div className="space-y-1 text-left">
                <h4 className="font-bold uppercase text-lg">{item.label}</h4>
                <p className="text-sm text-zinc-500">{item.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="p-12 bg-black rounded-[40px] text-center space-y-6">
        <h3 className="text-2xl font-display font-bold text-white uppercase italic">«Прозрачность — это новый стандарт инжиниринга»</h3>
        <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">SET_METHODOLOGY_VERIFIED_BY_EXPERTS</p>
      </div>
    </div>
  );
}
