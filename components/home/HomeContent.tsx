'use client'

import { motion, useReducedMotion, type Transition } from 'framer-motion'
import { useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProcessExplorer from '../ProcessExplorer'
import TypingText from '../TypingText'
import { House } from 'lucide-react'

const fieldPhotos = [
  {
    id: 'OBJ-241',
    label: 'Монтаж опор',
    desc: 'Установка высоковольтных конструкций',
    src: '/high-1.jpeg',
  },
  {
    id: 'UNIT-09',
    label: 'Тяжелая техника',
    desc: 'Работа буровой установки Hangil',
    src: '/tech-1.jpeg',
  },
  {
    id: 'SITE-ALPHA',
    label: 'Общий вид',
    desc: 'Развертывание узла энергоснабжения',
    src: '/high-3.jpeg',
  },
]

export default function HomeContent() {
  const reduceMotion = useReducedMotion()
  const appearTransition: Transition = useMemo(
    () => (reduceMotion ? { duration: 0 } : { duration: 0.22 }),
    [reduceMotion],
  )
  return (
    <>
      {/* Header section */}
      <section className='relative overflow-hidden rounded-[40px] bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 text-left border border-zinc-200 dark:border-zinc-800 shadow-lg shadow-base-300/20'>
        <div className='absolute top-0 right-0 pt-2 opacity-10 pointer-events-none'>
          <House
            size={260}
            className='text-brand-500'
          />
        </div>
        <div className='border-l-2 md:border-l-4 border-brand-500 pl-6 md:pl-12'>
          <div className='flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-brand-500'>
            <House
              size={14}
              className='animate-pulse'
            />
            home
          </div>
          <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-10'>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={appearTransition}
            >
              <h1
                className='font-display font-bold uppercase tracking-tighter leading-[0.95]
              text-3xl sm:text-5xl md:text-6xl'
              >
                управление <br />
                <TypingText
                  phrases={['строительством', 'энергетикой', 'технологиями']}
                  speed={130}
                  className='text-brand-500 tracking-wide uppercase font-mono text-left'
                />
              </h1>
            </motion.div>
          </div>

          <p className='mt-2 text-xs md:text-xl text-zinc-500 max-w-2xl leading-relaxed w-full wrap-break-words whitespace-normal'>
            Интерактивные инструменты для быстрого аудита и расчётов: моделируйте сценарии,
            сравнивайте варианты и принимайте решения на данных.
          </p>
        </div>
        
      </section>

      {/* Content (images) section */}
      <section className='md:space-y-12'>
        <div className='grid gap-6 md:grid-cols-3'>
          {fieldPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              className='border border-zinc-200 dark:border-zinc-800 shadow-lg shadow-base-300/20 group relative aspect-4/5 overflow-hidden rounded-4xl'
            >
              <div className='absolute top-4 left-4 z-20 flex flex-col gap-1'>
                <span className='w-fit rounded border border-white/10 bg-black/60 px-2 py-1 font-mono text-[9px] text-white backdrop-blur-md'>
                  ID: {photo.id}
                </span>
                <span className='w-fit rounded bg-brand-500/80 px-2 py-1 font-mono text-[9px] text-white backdrop-blur-md'>
                  LIVE_FEED
                </span>
              </div>
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                className='object-cover overflow-hidden transition-all duration-700'
              />
              <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent' />
              <div className='absolute bottom-6 left-6 right-6'>
                <h4 className='font-display font-bold uppercase tracking-tight text-white'>
                  {photo.label}
                </h4>
                <p className='mt-1 text-xs text-zinc-400'>{photo.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className='grid gap-6 md:grid-cols-3'>
        {[
          {
            title: 'Цифровой Контроль',
            desc: 'Мониторинг каждого узла проекта в реальном времени через облачные решения.',
            href: '/services',
          },
          {
            title: 'Управление Рисками',
            desc: 'Превентивное выявление коллизий и задержек до их влияния на бюджет.',
            href: '/interactives?tool=riskmap',
          },
          {
            title: 'Энергоэффективность',
            desc: 'Оптимизация проектных решений для долгосрочной экономии ресурсов.',
            href: '/services',
          },
        ].map((box, i) => (
          <Link
            key={i}
            href={box.href}
            className='group flex h-full flex-col rounded-4xl border border-zinc-200 bg-zinc-50 p-4 md:p-8 transition-all duration-500 hover:border-brand-500 dark:border-zinc-800 dark:bg-zinc-950 shadow-lg shadow-base-300/20'
          >
            <h3 className='mb-4 font-bold uppercase tracking-tighter transition-colors group-hover:text-brand-500'>
              {box.title}
            </h3>
            <p className='text-sm leading-relaxed text-zinc-500 dark:text-zinc-400'>{box.desc}</p>
          </Link>
        ))}
      </section>

      <section className='space-y-12 pb-20'>
        <div className='flex flex-col justify-between gap-6 md:flex-row md:items-end'>
          <div className='space-y-3'>
            <h2 className='font-display text-4xl font-bold uppercase tracking-tighter'>
              Наш Процесс:
            </h2>
            <p className='max-w-md text-zinc-500'>
              От сбора данных до формирования исполнительной документации.
            </p>
          </div>
        </div>
        <ProcessExplorer />
      </section>
    </>
  )
}
