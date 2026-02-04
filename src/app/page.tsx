'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ProcessExplorer from '../components/ProcessExplorer'

const fieldPhotos = [
  {
    id: 'OBJ-241',
    label: 'Монтаж опор',
    desc: 'Установка высоковольтных конструкций',
    src: '/gallery/high-1.jpeg',
  },
  {
    id: 'UNIT-09',
    label: 'Тяжелая техника',
    desc: 'Работа буровой установки Hangil',
    src: '/gallery/tech-1.jpeg',
  },
  {
    id: 'SITE-ALPHA',
    label: 'Общий вид',
    desc: 'Развертывание узла энергоснабжения',
    src: '/gallery/high-3.jpeg',
  },
]

export default function HomePage() {
  return (
    <div className='space-y-32'>
      {/* Hero Section */}
      <section className='min-h-[70vh] flex flex-col items-center justify-center text-center relative pt-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='max-w-5xl space-y-8'
        >
          <div className='inline-block px-4 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full'>
            <span className='text-[10px] font-mono font-bold text-brand-500 uppercase tracking-widest'>
              Control Room v.1.0 — Active
            </span>
          </div>
          <h1 className='text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.85] uppercase'>
            Управление <br />
            <span className='text-brand-500'>Энергией</span> Будущего
          </h1>
          <p className='text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed'>
            ООО «СЭТ»: Инженерные технологии и цифровой контроль на стыке строительства и
            энергетики. Москва, ИНН 7720946228.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-6'>
            <Link
              href='/interactives?tool=simulator'
              className='px-10 py-4 bg-brand-500 text-white rounded-2xl font-bold hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20 active:scale-95'
            >
              Запустить аудит
            </Link>
            <Link
              href='/interactives?tool=calculator'
              className='px-10 py-4 bg-zinc-950 dark:bg-zinc-800 text-white rounded-2xl font-bold hover:bg-zinc-800 dark:hover:bg-zinc-700 transition-all active:scale-95'
            >
              Калькулятор
            </Link>
          </div>
        </motion.div>
      </section>

      {/* NEW: Operational Pulse Section (Image Integration) */}
      <section className='space-y-12'>
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
          <div className='space-y-3'>
            <h2 className='text-4xl font-display font-bold uppercase tracking-tighter'>
              Operational Reality
            </h2>
            <p className='text-zinc-500 max-w-md'>
              Прямые отчеты с объектов: синхронизация физического мира и цифровых данных.
            </p>
          </div>
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
          {fieldPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              className='relative aspect-[4/5] bg-zinc-900 rounded-[32px] overflow-hidden border border-zinc-800 group'
            >
              {/* Overlay Metadata */}
              <div className='absolute top-4 left-4 z-20 flex flex-col gap-1'>
                <span className='text-[9px] font-mono bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded border border-white/10 w-fit'>
                  ID: {photo.id}
                </span>
                <span className='text-[9px] font-mono bg-brand-500/80 backdrop-blur-md text-white px-2 py-1 rounded w-fit'>
                  LIVE_FEED
                </span>
              </div>

              {/* Image Placeholder - Replace with your provided images */}
              <Image
                fill
                src={photo.src}
                alt={photo.label}
                className='w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale hover:grayscale-0'
              />

              <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none' />

              <div className='absolute bottom-6 left-6 right-6'>
                <h4 className='text-white font-bold font-display uppercase tracking-tight'>
                  {photo.label}
                </h4>
                <p className='text-zinc-400 text-xs mt-1'>{photo.desc}</p>
              </div>

              {/* Viewfinder Corners */}
              <div className='absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20' />
              <div className='absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20' />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Solutions Grid */}
      <section className='grid md:grid-cols-3 gap-6'>
        {[
          {
            title: 'Цифровой Контроль',
            desc: 'Мониторинг каждого узла проекта в реальном времени через облачные решения.',
            link: '/services',
          },
          {
            title: 'Управление Рисками',
            desc: 'Превентивное выявление коллизий и задержек до их влияния на бюджет.',
            link: '/interactives?tool=riskmap',
          },
          {
            title: 'Энергоэффективность',
            desc: 'Оптимизация проектных решений для долгосрочной экономии ресурсов.',
            link: '/services',
          },
        ].map((box, i) => (
          <Link
            key={i}
            href={box.link}
            className='p-6 lg:p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[32px] group hover:border-brand-500 transition-all duration-500 flex flex-col h-full'
          >
            <h3 className='text-xl md:text-lg lg:text-xl xl:text-2xl font-bold font-display mb-4 uppercase group-hover:text-brand-500 transition-colors leading-tight tracking-tighter break-words hyphens-auto'>
              {box.title}
            </h3>
            <p className='text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed'>{box.desc}</p>
          </Link>
        ))}
      </section>

      {/* Process Explorer */}
      <section className='space-y-12'>
        <div className='flex flex-col md:flex-row md:items-end justify-between gap-6'>
          <div className='space-y-3'>
            <h2 className='text-4xl font-display font-bold uppercase'>Наш Процесс</h2>
            <p className='text-zinc-500 max-w-md'>
              От сбора данных до формирования исполнительной документации в цифровом виде.
            </p>
          </div>
          <Link
            href='/approach'
            className='font-mono text-xs font-bold uppercase tracking-widest text-brand-500 hover:text-brand-600'
          >
            Детализация этапов →
          </Link>
        </div>
        <ProcessExplorer />
      </section>
    </div>
  )
}
