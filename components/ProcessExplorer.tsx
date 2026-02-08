'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    title: 'Сбор данных',
    desc: 'Сбор исходных данных, лазерное сканирование, аудит документации.',
    artifacts: ['Облако точек', 'Реестр несоответствий', 'BIM-исходник'],
    techLabel: 'SCAN_MODE: LASER_LIDAR',
  },
  {
    title: 'Моделирование рисков',
    desc: 'Анализ критических путей, коллизий и потенциальных отклонений бюджета.',
    artifacts: ['Карта рисков', 'Матрица сценариев', 'LOD 300–400'],
    techLabel: 'ANALYSIS: STOCHASTIC_SIM',
  },
  {
    title: 'Стратегическое планирование',
    desc: 'Разработка детального 4D/5D-графика и систем контроля.',
    artifacts: ['График Ганта', 'Ресурсная ведомость', 'План контроля'],
    techLabel: 'PLANNING: 4D_TEMPORAL',
  },
  {
    title: 'Активный контроль',
    desc: 'Непрерывный мониторинг, авторский и строительный надзор.',
    artifacts: ['Ежедневный дашборд', 'Акты контроля', 'Фотограмметрия'],
    techLabel: 'CONTROL: REAL_TIME_FEED',
  },
  {
    title: 'Отчетность',
    desc: 'Прозрачная отчетность и передача исполнительной документации.',
    artifacts: ['As-built модель', 'Финальный отчет', 'Электронный паспорт'],
    techLabel: 'OUTPUT: DIGITAL_CERT',
  },
] as const

function TechnicalButton({
  active,
  index,
  title,
  techLabel,
  onSelect,
}: {
  active: boolean
  index: number
  title: string
  techLabel: string
  onSelect: () => void
}) {
  return (
    <button
      type='button'
      onClick={onSelect}
      className={[
        'cursor-pointer relative shrink-0 snap-center rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-all text-left overflow-hidden',
        'w-[80vw] sm:w-80 px-6 py-5 shadow-lg shadow-base-300/20',
        active
          ? 'bg-brand-500 border-brand-500 text-white scale-[1.02]'
          : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:hover:border-brand-500',
      ].join(' ')}
      aria-pressed={active}
    >
      {/* Background Grid */}
      <div className='absolute inset-0 tech-grid opacity-20 pointer-events-none' />

      {/* Moving Scanline */}
      <motion.div
        aria-hidden
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className={[
          'absolute left-0 right-0 h-px z-10 pointer-events-none',
          active
            ? 'bg-white/35 shadow-[0_0_10px_rgba(255,255,255,0.35)]'
            : 'bg-brand-500/30 shadow-[0_0_10px_rgba(20,184,166,0.35)]',
        ].join(' ')}
      />

      <div className='relative z-20 flex items-center gap-4'>
        {/* Core (важно: shrink-0 чтобы не ужималось и не становилось овалом) */}
        <div className='relative w-16 h-16 shrink-0'>
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className={[
              'absolute inset-0 border border-dashed rounded-full',
              active ? 'border-white/40' : 'border-brand-500/30',
            ].join(' ')}
          />
          <motion.div
            aria-hidden
            animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={[
              'absolute inset-2 border-2 rounded-2xl flex items-center justify-center',
              active ? 'border-white' : 'border-brand-500',
            ].join(' ')}
          >
            <svg
              className={['w-7 h-7', active ? 'text-white' : 'text-brand-500'].join(' ')}
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
            >
              <motion.path
                key={index}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2 }}
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1}
                d='M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
              />
            </svg>
          </motion.div>
        </div>

        {/* Labels */}
        <div className='min-w-0'>
          <div className='text-[10px] font-mono uppercase opacity-60'>Step {index + 1}</div>
          <div className='font-bold font-display uppercase tracking-tight leading-snug'>
            {title}
          </div>
          <div
            className={[
              'mt-1 text-[10px] font-mono truncate',
              active ? 'text-white/80' : 'text-zinc-500',
            ].join(' ')}
          >
            {techLabel}
          </div>
        </div>
      </div>

      {/* Overlay grid */}
      <svg
        aria-hidden
        className='absolute inset-0 w-full h-full pointer-events-none opacity-10'
      >
        <pattern
          id={`grid-sub-${index}`}
          width='10'
          height='10'
          patternUnits='userSpaceOnUse'
        >
          <path
            d='M 10 0 L 0 0 0 10'
            fill='none'
            stroke='currentColor'
            strokeWidth='0.5'
          />
        </pattern>
        <rect
          width='100%'
          height='100%'
          fill={`url(#grid-sub-${index})`}
        />
      </svg>
    </button>
  )
}

export default function ProcessExplorer() {
  const [active, setActive] = useState(0)

  return (
    <div className='relative'>
      {/* Выбор шага (вся анимация = кнопка) */}
      <div className='flex gap-4 overflow-x-auto p-4 no-scrollbar snap-x snap-mandatory scroll-smooth px-[10vw] sm:px-2'>
        {steps.map((s, i) => (
          <TechnicalButton
            key={s.title}
            active={active === i}
            index={i}
            title={s.title}
            techLabel={s.techLabel}
            onSelect={() => setActive(i)}
          />
        ))}
      </div>

      {/* Контент выбранного шага */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='mt-10 grid md:grid-cols-2 gap-8 lg:gap-12 items-start'
      >
        <div className='space-y-4'>
          <h3 className='text-3xl font-display font-bold uppercase text-zinc-900 dark:text-zinc-100'>
            {steps[active].title}
          </h3>
          <p className='text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed'>
            {steps[active].desc}
          </p>
        </div>

        <div className='space-y-4'>
          <h5 className='text-[10px] font-mono text-zinc-400 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800 pb-2'>
            Выходные артефакты
          </h5>
          <div className='flex flex-wrap gap-2'>
            {steps[active].artifacts.map((art, j) => (
              <motion.span
                key={`${steps[active].title}-${art}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: j * 0.08 }}
                className='px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-sm'
              >
                {art}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
