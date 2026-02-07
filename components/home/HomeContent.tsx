'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ProcessExplorer from '../ProcessExplorer'
import TypingText from '../TypingText'

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
  return (
    <>
      {/* Header section */}
      <section className='grid place-content-center relative overflow-hidden rounded-[40px] shadow-lg shadow-base-300/20 p-4 md:p-12 text-center border border-zinc-50 dark:border-zinc-800'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='max-w-5xl space-y-8'
        >
          <div className='inline-block rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5'>
            <span className='font-mono text-[10px] font-bold uppercase tracking-widest text-brand-500'>
              ENGINEERING HUB v.1.0 — Active
            </span>
          </div>
          <h1>
            Управление
            <br />
            <TypingText
              phrases={['энергосетями', 'технологиями', 'строительством']}
              className='text-brand-500 text-center font-mono'
            />
          </h1>
          <p className='text-zinc-500'>
            ООО «СЭТ» ИНН: 7720946228 Строительство и энергетические технологии Прозрачность
            процессов в каждой точке данных.
          </p>

          <div className='flex flex-col items-center justify-center gap-4 pt-6 sm:flex-row'>
            <Link
              href='/interactives?tool=simulator'
              className='rounded-2xl bg-brand-500 px-10 py-4 font-bold text-white shadow-xl shadow-brand-500/20 transition-all hover:bg-brand-600 active:scale-95'
            >
              Запустить аудит
            </Link>
            <Link
              href='/interactives?tool=calculator'
              className='rounded-2xl bg-zinc-950 px-10 py-4 font-bold text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-800 dark:hover:bg-zinc-700'
            >
              Калькулятор
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Content (images) section */}
      <section className='md:space-y-12'>
        <div className='grid gap-6 md:grid-cols-3'>
          {fieldPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              className='group relative aspect-4/5 overflow-hidden rounded-4xl'
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
            className='group flex h-full flex-col rounded-4xl border border-zinc-200 bg-zinc-50 p-8 transition-all duration-500 hover:border-brand-500 dark:border-zinc-800 dark:bg-zinc-900/50'
          >
            <h3
              className='font-display mb-4 text-xl sm:text-2xl font-bold uppercase tracking-tighter transition-colors group-hover:text-brand-500 wrap-break-words hyphens-auto'
              style={{ hyphens: 'auto' }}
            >
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
