'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const servicesData = [
  {
    id: '01',
    title: 'Инженерные изыскания',
    desc: 'Геодезия, геология и экологический аудит территории.',
    fullDesc:
      'Комплексное изучение природных и техногенных условий территории строительства. Мы формируем цифровой фундамент проекта, исключая неожиданные затраты на этапе земляных работ.',
    scope: [
      'Топографическая съемка в масштабах 1:500 — 1:5000',
      'Инженерно-геологическое бурение и лабораторные исследования грунтов',
      'Экологический мониторинг и замеры радиационного фона',
      'Гидрометеорологические изыскания',
    ],
    artifacts: [
      'Цифровая модель рельефа (ЦМР)',
      'Технический отчет об изысканиях',
      'Геологические разрезы в формате Civil 3D',
    ],
    stats: { complexity: 'High', duration: '14-30 дней', okved: '71.12' },
  },
  {
    id: '02',
    title: 'Проектирование',
    desc: 'BIM-моделирование и разработка стадии П и Р.',
    fullDesc:
      'Разработка проектной документации с использованием сквозных технологий моделирования. Создаем информационную модель (BIM), которая живет на протяжении всего цикла объекта.',
    scope: [
      'Архитектурно-строительные решения',
      'Проектирование внутренних и наружных инженерных сетей',
      'BIM-координация и устранение коллизий (LOD 400)',
      'Разработка ПОС и ППР',
    ],
    artifacts: [
      'BIM-модель (IFC/RVT)',
      'Проектная документация (Стадия П)',
      'Сметные расчеты в Гранд-Смета',
    ],
    stats: { complexity: 'Very High', duration: 'от 60 дней', okved: '71.12' },
  },
  {
    id: '03',
    title: 'Управление проектами',
    desc: 'Технический заказчик и менеджмент строительных рисков.',
    fullDesc:
      'Профессиональное сопровождение инвестиционно-строительного процесса. Мы выступаем как технологический офис, обеспечивающий соблюдение сроков и бюджета.',
    scope: [
      'Получение ГПЗУ и разрешительной документации',
      'Календарно-сетевое планирование (Primavera/MS Project)',
      'Управление тендерными процедурами',
      'Финансово-технический аудит',
    ],
    artifacts: [
      'График Ганта (Базовый план)',
      'Реестр рисков проекта',
      'Отчеты о статусе (Weekly/Monthly)',
    ],
    stats: { complexity: 'Critical', duration: 'Весь срок реализации', okved: '71.12' },
  },
  {
    id: '04',
    title: 'Строительный контроль',
    desc: 'Независимый надзор за качеством и объемами работ.',
    fullDesc:
      'Жесткий контроль соответствия факта проекту. Мы фиксируем каждое нарушение в цифровой среде, не позволяя скрывать дефекты под отделкой.',
    scope: [
      'Входной контроль материалов и оборудования',
      'Операционный контроль технологических процессов',
      'Приемка скрытых работ с фотофиксацией',
      'Проверка исполнительной документации',
    ],
    artifacts: ['Электронный журнал работ', 'Предписания по качеству', 'Акты освидетельствования'],
    stats: { complexity: 'High', duration: 'Этап СМР', okved: '71.12' },
  },
  {
    id: '05',
    title: 'Авторский надзор',
    desc: 'Контроль соблюдения проектных решений на площадке.',
    fullDesc:
      'Обеспечение визуального и конструктивного соответствия строящегося объекта проектным решениям. Быстрое внесение изменений в проект при изменении условий.',
    scope: [
      'Плановые выезды проектировщиков на объект',
      'Ведение журнала авторского надзора',
      'Согласование замен материалов без потери качества',
      'Участие в комиссиях по приемке',
    ],
    artifacts: ['Журнал АН', 'Листы согласования изменений', 'Финальное заключение'],
    stats: { complexity: 'Medium', duration: 'Этап СМР', okved: '71.12' },
  },
  {
    id: '06',
    title: 'Технический аудит',
    desc: 'Оценка состояния объектов и аудит документации.',
    fullDesc:
      'Независимая экспертиза текущего состояния актива. Помогаем инвесторам понять реальную стоимость и риски объекта перед покупкой или реконструкцией.',
    scope: [
      'Обследование строительных конструкций',
      'Инструментальная проверка инженерных систем',
      'Анализ полноты исполнительной документации',
      'Оценка CAPEX на восстановление/модернизацию',
    ],
    artifacts: ['Заключение о техсостоянии', 'Дефектная ведомость', 'Расчет стоимости устранения'],
    stats: { complexity: 'High', duration: '10-25 дней', okved: '71.12' },
  },
]

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<(typeof servicesData)[0] | null>(null)

  return (
    <div className='space-y-20 py-12 relative'>
      <div className='max-w-3xl space-y-6'>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className='text-6xl font-display font-bold uppercase tracking-tighter'
        >
          Наши Услуги
        </motion.h1>
        <p className='text-xl text-zinc-500'>
          Комплексный инженерный подход к задачам любой сложности. Мы работаем по стандарту ОКВЭД
          71.12, обеспечивая прозрачность каждого этапа.
        </p>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {servicesData.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className='p-10 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[32px] group hover:border-brand-500 transition-all flex flex-col justify-between'
          >
            <div>
              <div className='text-[10px] font-mono text-zinc-400 mb-6 uppercase tracking-widest flex justify-between'>
                <span>Node {s.id}</span>
                <span className='text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity'>
                  Ready
                </span>
              </div>
              <h3 className='text-2xl font-bold font-display mb-4 uppercase group-hover:text-brand-500 transition-colors'>
                {s.title}
              </h3>
              <p className='text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-8'>
                {s.desc}
              </p>
            </div>
            <button
              onClick={() => setSelectedService(s)}
              className='w-full px-6 py-3 border border-zinc-200 dark:border-zinc-800 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-brand-500 hover:border-brand-500 hover:text-white transition-all active:scale-95'
            >
              Подробнее
            </button>
          </motion.div>
        ))}
      </div>

      {/* Side Detail Panel (Drawer) */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className='fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] cursor-zoom-out'
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='fixed inset-y-0 right-0 w-full max-w-xl bg-white dark:bg-zinc-950 z-[120] border-l border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col overflow-hidden'
            >
              {/* Header - Fixed in Flex */}
              <div className='flex-shrink-0 p-6 md:p-8 border-b border-zinc-100 dark:border-zinc-900 flex justify-between items-center bg-white dark:bg-zinc-950'>
                <div className='flex items-center gap-4'>
                  <div className='w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white font-bold font-mono'>
                    {selectedService.id}
                  </div>
                  <h2 className='text-xl font-display font-bold uppercase tracking-tight'>
                    {selectedService.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className='w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors'
                >
                  ✕
                </button>
              </div>

              {/* Content Area - Scrollable with min-h-0 to allow shrinking */}
              <div className='flex-grow min-h-0 overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar'>
                <section className='space-y-4'>
                  <h4 className='text-[10px] font-mono uppercase text-zinc-400 tracking-widest'>
                    Описание услуги
                  </h4>
                  <p className='text-zinc-600 dark:text-zinc-300 leading-relaxed font-medium'>
                    {selectedService.fullDesc}
                  </p>
                </section>

                <section className='space-y-4'>
                  <h4 className='text-[10px] font-mono uppercase text-zinc-400 tracking-widest'>
                    Состав работ
                  </h4>
                  <ul className='grid gap-3'>
                    {selectedService.scope.map((item, idx) => (
                      <li
                        key={idx}
                        className='flex gap-4 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl text-sm'
                      >
                        <span className='text-brand-500 font-mono'>0{idx + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className='space-y-4'>
                  <h4 className='text-[10px] font-mono uppercase text-zinc-400 tracking-widest'>
                    Выходные артефакты
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {selectedService.artifacts.map((art, idx) => (
                      <span
                        key={idx}
                        className='px-3 py-1.5 bg-brand-500/5 text-brand-500 border border-brand-500/20 rounded-lg text-xs font-medium'
                      >
                        {art}
                      </span>
                    ))}
                  </div>
                </section>

                <section className='grid grid-cols-3 gap-4 py-6 border-t border-zinc-100 dark:border-zinc-800'>
                  <div className='text-center'>
                    <div className='text-[9px] font-mono text-zinc-500 uppercase mb-1'>
                      Сложность
                    </div>
                    <div className='text-sm font-bold'>{selectedService.stats.complexity}</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-[9px] font-mono text-zinc-500 uppercase mb-1'>
                      Длительность
                    </div>
                    <div className='text-sm font-bold'>{selectedService.stats.duration}</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-[9px] font-mono text-zinc-500 uppercase mb-1'>ОКВЭД</div>
                    <div className='text-sm font-bold font-mono'>{selectedService.stats.okved}</div>
                  </div>
                </section>
              </div>

              {/* Footer - Fixed at the very bottom of the Flex container */}
              <div className='flex-shrink-0 p-4 md:p-8 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/80 dark:bg-black/60 backdrop-blur-md'>
                <button
                  onClick={() => {
                    window.location.hash = '/contacts'
                    setSelectedService(null)
                  }}
                  className='w-full py-4 bg-zinc-950 dark:bg-zinc-100 text-white dark:text-black font-bold rounded-2xl hover:bg-brand-500 dark:hover:bg-brand-500 dark:hover:text-white transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3 group'
                >
                  Обсудить задачу
                  <svg
                    className='w-4 h-4 group-hover:translate-x-1 transition-transform'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
