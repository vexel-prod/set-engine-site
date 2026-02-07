'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import TypingText from '../TypingText'
import ProcessExplorer from '../ProcessExplorer';

const fieldPhotos = [
  { id: 'OBJ-241', label: 'Монтаж опор', desc: 'Установка высоковольтных конструкций', src: 'https://images.unsplash.com/photo-1541933022149-a0957621c6b3?q=80&w=1000' },
  { id: 'UNIT-09', label: 'Тяжелая техника', desc: 'Работа буровой установки Hangil', src: 'https://images.unsplash.com/photo-1581094288338-2314dddb7903?q=80&w=1000' },
  { id: 'SITE-ALPHA', label: 'Общий вид', desc: 'Развертывание узла энергоснабжения', src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000' }
];

export default function HomeContent() {
  return (
    <div className="space-y-32">
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center pt-20 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl space-y-8"
        >
          <div className="inline-block rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-brand-500">
              Control Room v.1.0 — Active
            </span>
          </div>
          <h1 className="font-display text-5xl font-bold uppercase leading-[1.1] tracking-tighter md:text-8xl md:leading-[0.9]">
            Управление <br /> 
            <span className="text-zinc-400 dark:text-zinc-600">Активами</span> <br className="md:hidden" />
            <TypingText
              phrases={['Объектов', 'BIM-моделей', 'Энергосетей', 'Рисков']}
              className='text-brand-500'
            />
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-xl">
            ООО «СЭТ»: Инженерные технологии и цифровой контроль на стыке строительства и энергетики. 
            Прозрачность процессов в каждой точке данных.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row">
            <Link href="/interactives?tool=simulator" className="rounded-2xl bg-brand-500 px-10 py-4 font-bold text-white shadow-xl shadow-brand-500/20 transition-all hover:bg-brand-600 active:scale-95">
              Запустить аудит
            </Link>
            <Link href="/interactives?tool=calculator" className="rounded-2xl bg-zinc-950 px-10 py-4 font-bold text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-800 dark:hover:bg-zinc-700">
              Калькулятор
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="space-y-12">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <h2 className="font-display text-4xl font-bold uppercase tracking-tighter">Operational Reality</h2>
            <p className="max-w-md text-zinc-500">Прямые отчеты с объектов: синхронизация физического мира и цифровых данных.</p>
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {fieldPhotos.map((photo) => (
            <motion.div 
              key={photo.id}
              whileHover={{ y: -5 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-900"
            >
              <div className="absolute top-4 left-4 z-20 flex flex-col gap-1">
                <span className="w-fit rounded border border-white/10 bg-black/60 px-2 py-1 font-mono text-[9px] text-white backdrop-blur-md">
                  ID: {photo.id}
                </span>
                <span className="w-fit rounded bg-brand-500/80 px-2 py-1 font-mono text-[9px] text-white backdrop-blur-md">
                  LIVE_FEED
                </span>
              </div>
              <Image 
                src={photo.src} 
                alt={photo.label}
                fill
                className="object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h4 className="font-display font-bold uppercase tracking-tight text-white">{photo.label}</h4>
                <p className="mt-1 text-xs text-zinc-400">{photo.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Цифровой Контроль", desc: "Мониторинг каждого узла проекта в реальном времени через облачные решения.", href: "/services" },
          { title: "Управление Рисками", desc: "Превентивное выявление коллизий и задержек до их влияния на бюджет.", href: "/interactives?tool=riskmap" },
          { title: "Энергоэффективность", desc: "Оптимизация проектных решений для долгосрочной экономии ресурсов.", href: "/services" }
        ].map((box, i) => (
          <Link key={i} href={box.href} className="group flex h-full flex-col rounded-[32px] border border-zinc-200 bg-zinc-50 p-8 transition-all duration-500 hover:border-brand-500 dark:border-zinc-800 dark:bg-zinc-900/50">
            <h3 className="font-display mb-4 text-xl sm:text-2xl font-bold uppercase tracking-tighter transition-colors group-hover:text-brand-500 break-words hyphens-auto" style={{ hyphens: 'auto' }}>
              {box.title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {box.desc}
            </p>
          </Link>
        ))}
      </section>

      <section className="space-y-12 pb-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="space-y-3">
            <h2 className="font-display text-4xl font-bold uppercase tracking-tighter">Наш Процесс</h2>
            <p className="max-w-md text-zinc-500">От сбора данных до формирования исполнительной документации.</p>
          </div>
        </div>
        <ProcessExplorer />
      </section>
    </div>
  );
}
