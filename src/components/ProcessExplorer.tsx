'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const steps = [
  {
    title: 'Data Acquisition',
    desc: 'Сбор исходных данных, лазерное сканирование, аудит документации.',
    artifacts: ['Облако точек', 'Реестр несоответствий', 'BIM-исходник'],
    techLabel: 'SCAN_MODE: LASER_LIDAR',
  },
  {
    title: 'Risk Modelling',
    desc: 'Анализ критических путей, коллизий и потенциальных срывов бюджета.',
    artifacts: ['Карта рисков', 'Матрица сценариев', 'LOD 300-400'],
    techLabel: 'ANALYSIS: STOCHASTIC_SIM',
  },
  {
    title: 'Strategic Planning',
    desc: 'Разработка детального графика 4D/5D и систем контроля.',
    artifacts: ['График Ганта', 'Ресурсная ведомость', 'План контроля'],
    techLabel: 'PLANNING: 4D_TEMPORAL',
  },
  {
    title: 'Active Control',
    desc: 'Непрерывный мониторинг, авторский и строительный надзор.',
    artifacts: ['Ежедневный дашборд', 'Акты контроля', 'Фотограмметрия'],
    techLabel: 'CONTROL: REAL_TIME_FEED',
  },
  {
    title: 'Reporting',
    desc: 'Прозрачная отчетность и передача исполнительной документации.',
    artifacts: ['As-built модель', 'Финальный отчет', 'Электронный паспорт'],
    techLabel: 'OUTPUT: DIGITAL_CERT',
  },
]

const TechnicalVisualizer = ({ activeIndex }: { activeIndex: number }) => {
  const [dataPoints, setDataPoints] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    // Generate some random technical "data points"
    const points = Array.from({ length: 12 }).map(() => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
    }))
    setDataPoints(points)
  }, [activeIndex])

  return (
    <div className='relative w-full h-full overflow-hidden flex items-center justify-center'>
      {/* Background Grid */}
      <div className='absolute inset-0 tech-grid opacity-20' />

      {/* Moving Scanline inside the box */}
      <motion.div
        animate={{ top: ['0%', '100%', '0%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className='absolute left-0 right-0 h-[1px] bg-brand-500/30 z-10 shadow-[0_0_10px_rgba(20,184,166,0.5)]'
      />

      {/* Central Interactive Core */}
      <div className='relative z-20 w-48 h-48'>
        {/* Outer Rotating Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className='absolute inset-0 border border-dashed border-brand-500/30 rounded-full'
        />

        {/* Inner Pulsing Hexagon/Circle */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className='absolute inset-4 border-2 border-brand-500 rounded-2xl flex items-center justify-center'
        >
          <svg
            className='w-16 h-16 text-brand-500'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              key={activeIndex}
              transition={{ duration: 1.5 }}
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1}
              d='M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
            />
          </svg>
        </motion.div>

        {/* Floating Data Nodes */}
        {dataPoints.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              x: `${p.x}%`,
              y: `${p.y}%`,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className='absolute w-1 h-1 bg-brand-500 rounded-full'
          />
        ))}
      </div>

      {/* Dynamic Data Labels */}
      <div className='absolute top-6 left-6 font-mono text-[9px] text-zinc-500 space-y-1 z-30'>
        <div className='flex items-center gap-2'>
          <span className='w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse' />
          <span className='text-zinc-300'>{steps[activeIndex].techLabel}</span>
        </div>
        <div>LATENCY: 14ms</div>
        <div className='text-brand-500/50'>ENCRYPTION: AES-256_ACTIVE</div>
      </div>

      <div className='absolute bottom-6 right-6 font-mono text-[9px] text-zinc-500 text-right z-30'>
        <div className='text-zinc-300'>NODE_ID: SET_CORE_0{activeIndex + 1}</div>
        <div>COORD: 55.7558° N, 37.6173° E</div>
        <div className='text-zinc-600'>STATUS: OPTIMIZING_FLOW</div>
      </div>

      {/* Visual Overlay of Progress */}
      <svg className='absolute inset-0 w-full h-full pointer-events-none opacity-10'>
        <pattern
          id='grid-sub'
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
          fill='url(#grid-sub)'
        />
      </svg>
    </div>
  )
}

const ProcessExplorer: React.FC = () => {
  const [active, setActive] = useState(0)

  return (
    <div className='relative'>
      <div className='flex overflow-x-auto pb-4 gap-4 no-scrollbar'>
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 px-6 py-4 rounded-2xl border transition-all text-left min-w-[240px] ${
              active === i
                ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20 scale-[1.02]'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400'
            }`}
          >
            <div className='text-[10px] font-mono mb-1 uppercase opacity-60'>Step 0{i + 1}</div>
            <h4 className='font-bold font-display uppercase tracking-tight'>{step.title}</h4>
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className='mt-12 grid md:grid-cols-2 gap-8 lg:gap-12 items-center'
      >
        <div className='space-y-8 order-2 md:order-1'>
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
                  key={j}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: j * 0.1 }}
                  className='px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-sm'
                >
                  {art}
                </motion.span>
              ))}
            </div>
          </div>

          <div className='pt-4'>
            <button className='flex items-center gap-3 text-brand-500 font-mono text-[10px] uppercase font-bold tracking-widest group'>
              Скачать регламент этапа
              <svg
                className='w-3 h-3 group-hover:translate-y-0.5 transition-transform'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={3}
                  d='M19 14l-7 7m0 0l-7-7m7 7V3'
                />
              </svg>
            </button>
          </div>
        </div>

        <div className='aspect-square bg-zinc-50 dark:bg-zinc-950 rounded-[40px] border border-zinc-200 dark:border-zinc-800 overflow-hidden relative shadow-inner order-1 md:order-2'>
          <TechnicalVisualizer activeIndex={active} />
        </div>
      </motion.div>
    </div>
  )
}

export default ProcessExplorer
