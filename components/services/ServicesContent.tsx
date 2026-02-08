'use client'

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  type Transition,
} from 'framer-motion'
import {
  Binary,
  Boxes,
  ClipboardCheck,
  Cpu,
  FileSearch,
  HardHat,
  Layers,
  ServerCog,
  Settings,
  Zap,
} from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

const servicesData = [
  {
    id: 'SRV-001',
    title: 'Инженерные изыскания',
    desc: 'Полевые и камеральные работы для получения исходных данных под проектирование и безопасное размещение объекта.',
    icon: FileSearch,
    duration: 'обычно от 2 до 6 недель',
    items: [
      'Старт проекта, выбор площадки/трассы',
      'Подготовка проектной документации и прохождение экспертиз',
      'Обоснование конструктивных и инженерных решений',
    ],
    scope: [
      'Инженерно-геодезические работы: топографическая съе, исполнительные схемы опорных сетей, съемка коммуникаций',
      'Инженерно-геологические работы: бурение/зондирование, отбор проб, лабораторные испытания грунтов, оценка УГВ',
      'Инженерно-экологические работы: обследование территории, отбор проб (почва/вода/воздух), оценка ограничений',
      'Гидрометеорологические/гидрологические данные (при необходимости): паводки, стоки, ветровые/снеговые нагрузки',
    ],
    process: [
      'Сбор исходных данных и согласования доступа/ордеров',
      'Полевые работы и контроль качества измерений',
      'Лабораторные испытания и камеральная обработка',
      'Выпуск отчета и передача цифровых материалов в проектную команду',
    ],
    notes: [
      'Результаты изысканий — базовый вход для проектирования и для проверок при строительном контроле.',
    ],
  },
  {
    id: 'SRV-002',
    title: 'BIM Проектирование',
    desc: 'Создание высокоточных цифровых двойников зданий и сетей.',
    icon: Layers,
    duration: '60+ дней',
    items: [
      'Архитектурные решения',
      'Конструктив (КЖ/КМ)',
      'Инженерные системы (MEP)',
      'Сводная модель коллизий',
    ],
    scope: [
      'Разработка BIM-моделей стадий П и Р с уровнем проработки LOD 300–400',
      'Интеграция архитектуры, конструктива и инженерных систем в единую среду',
      'Автоматизированная проверка коллизий и ведомостей объемов (BOQ)',
      'Подготовка моделей для экспертизы, стройплощадки и эксплуатации',
    ],
    process: [
      'Формирование BIM-стандарта проекта и среды общих данных (CDE)',
      'Параллельное моделирование дисциплин и регулярные координационные сессии',
      'Сводка моделей, устранение коллизий и валидация решений',
      'Передача согласованных моделей и чертежей заказчику',
    ],
    notes: [
      'BIM-модель может быть использована для 4D-планирования, смет и последующей эксплуатации объекта.',
    ],
  },
  {
    id: 'SRV-003',
    title: 'Управление (PMO)',
    desc: 'Функции технического заказчика и финансовый контроль.',
    icon: Boxes,
    duration: 'не ограничена',
    items: [
      'Управление бюджетом',
      'Тендерные процедуры',
      'Календарный график (4D)',
      'GR и согласования',
    ],
    scope: [
      'Формирование и контроль бюджета проекта (CAPEX)',
      'Организация закупок и проведение тендеров',
      'Управление графиком, рисками и изменениями',
      'Ведение документации и взаимодействие с надзорными органами',
    ],
    process: [
      'Инициация проекта и формирование структуры управления',
      'Регулярный мониторинг сроков, стоимости и качества',
      'Управление подрядчиками и цепочкой поставок',
      'Закрытие проекта и передача в эксплуатацию',
    ],
    notes: ['PMO снижает риски перерасхода бюджета и задержек сроков строительства.'],
  },
  {
    id: 'SRV-004',
    title: 'Строительный контроль',
    desc: 'Цифровая приемка и независимый надзор за качеством.',
    icon: ClipboardCheck,
    duration: 'зависит от объекта',
    items: ['Входной контроль', 'Лабораторные испытания', 'Цифровые акты (КС-2)', 'Фотограмметрия'],
    scope: [
      'Проверка соответствия материалов и работ проектной документации',
      'Контроль качества бетона, сварных соединений и грунтов',
      'Фиксация выполненных работ с использованием цифровых инструментов',
      'Создание 3D-отчетов на базе фотограмметрии и сканирования',
    ],
    process: [
      'Входной контроль материалов и оборудования',
      'Периодические инспекции на стройплощадке',
      'Лабораторные испытания и анализ результатов',
      'Оформление цифровых актов и отчетов',
    ],
    notes: ['Цифровые методы позволяют снизить количество споров и ускорить приемку работ.'],
  },
  {
    id: 'SRV-005',
    title: 'Технический аудит',
    desc: 'Оценка состояния активов и Due Diligence документации.',
    icon: Binary,
    duration: 'от 10 до 20 дней',
    items: [
      'Обследование конструкций',
      'Аудит исполнительной док-ти',
      'Оценка CAPEX/OPEX',
      'Энерго-аудит',
    ],
    scope: [
      'Визуальное и инструментальное обследование зданий и сооружений',
      'Проверка полноты и корректности исполнительной документации',
      'Анализ эксплуатационных затрат и потенциальных рисков',
      'Оценка энергоэффективности и рекомендации по модернизации',
    ],
    process: [
      'Сбор исходной документации и выезд на объект',
      'Технические обследования и измерения',
      'Аналитическая обработка данных',
      'Подготовка отчета с выводами и рекомендациями',
    ],
    notes: [
      'Результаты аудита помогают принимать решения о реконструкции, продаже или модернизации актива.',
    ],
  },
  {
    id: 'SRV-006',
    title: 'Авторский надзор',
    desc: 'Сопровождение строительства проектной командой.',
    icon: HardHat,
    duration: 'зависит от объекта',
    items: [
      'Контроль проектных решений',
      'Оперативные изменения',
      'Освидетельствование узлов',
      'Технический консалтинг',
    ],
    scope: [
      'Проверка соответствия строительно-монтажных работ проекту',
      'Участие в освидетельствовании скрытых работ и узлов',
      'Внесение оперативных корректировок в проектные решения',
      'Консультации подрядчика и заказчика по техническим вопросам',
    ],
    process: [
      'Регулярные выезды авторского надзора на объект',
      'Фиксация замечаний и выдача предписаний',
      'Согласование изменений с проектировщиком и заказчиком',
      'Закрытие замечаний и ведение журнала авторского надзора',
    ],
    notes: [
      'Авторский надзор обеспечивает соответствие строительства замыслу проекта и требованиям норм.',
    ],
  },
] as const

export default function ServicesContent() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const reduceMotion = useReducedMotion()

  const layoutTransition: Transition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : {
            type: 'spring',
            stiffness: 520,
            damping: 48,
            mass: 0.9,
          },
    [reduceMotion],
  )

  const appearTransition: Transition = useMemo(
    () => (reduceMotion ? { duration: 0 } : { duration: 0.22 }),
    [reduceMotion],
  )

  return (
    <>
      {/* Header Section */}
      <section className='relative overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 text-left border border-zinc-200 dark:border-zinc-800 shadow-lg shadow-base-300/20'>
        <div className='absolute top-0 right-0 p-3 opacity-10'>
          <ServerCog
            size={240}
            className='text-brand-500'
          />
        </div>
        <div className='border-l-2 md:border-l-4 border-brand-500 pl-6 md:pl-12'>
          <div className='flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-brand-500'>
            <ServerCog
              size={14}
              className='animate-pulse'
            />
            services
          </div>
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
              Наши <span className='text-brand-500'>Системные</span> <br />
              Модули
            </h1>
          </motion.div>
          <p className='text-xs md:text-xl text-zinc-500 max-w-2xl leading-relaxed w-full mt-2 wrap-break-words whitespace-normal'>
            Мы предлагаем дискретные и комплексные инженерные решения, оцифрованные по стандарту
            СЭТ. Каждый модуль гарантирует консистентность данных на протяжении всего жизненного
            цикла объекта.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section>
        <LayoutGroup id='services-grid'>
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {servicesData.map((s, i) => {
              const isExpanded = expandedId === s.id
              const Icon = s.icon

              return (
                <motion.article
                  key={s.id}
                  layout='position'
                  transition={{ layout: layoutTransition }}
                  style={{ willChange: 'transform' }}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-brand-500 group relative flex flex-col rounded-3xl  overflow-hidden ${
                    isExpanded ? 'lg:col-span-2 border-brand-500' : 'shadow-lg shadow-base-300/20'
                  }`}
                >
                  {/* Decorative Tech Elements */}
                  <div className='p-10 flex flex-col h-full'>
                    <div className='flex justify-between items-start mb-8'>
                      <div
                        className={`p-4 rounded-2xl ${
                          isExpanded
                            ? 'bg-brand-500 text-white'
                            : 'bg-zinc-100 dark:bg-zinc-900 text-brand-500'
                        }`}
                      >
                        <Icon size={30} />
                      </div>

                      <div className='text-right'>
                        <div className='font-mono text-[10px] text-zinc-400 uppercase tracking-widest'>
                          {s.id}
                        </div>
                        <div className='flex items-center justify-end gap-2 mt-1'>
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              isExpanded ? 'bg-emerald-400 animate-pulse' : 'bg-brand-500/30'
                            }`}
                          />
                          <span className='font-mono text-[8px] text-zinc-500 uppercase'>
                            Status: Ready
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='space-y-4 grow'>
                      <h3 className='font-display text-2xl font-bold uppercase tracking-tight group-hover:text-brand-500 transition-colors'>
                        {s.title}
                      </h3>
                      <p
                        className={`text-sm leading-relaxed ${isExpanded ? 'text-zinc-400' : 'text-zinc-500'}`}
                      >
                        {s.desc}
                      </p>
                    </div>

                    {/* Expanded content */}
                    <AnimatePresence
                      initial={false}
                      mode='sync'
                    >
                      {isExpanded && (
                        <motion.div
                          key='expand'
                          layout
                          transition={{ layout: layoutTransition }}
                          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={
                            reduceMotion ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }
                          }
                          className='mt-12 pt-12 border-t border-zinc-800'
                        >
                          <div className='grid md:grid-cols-2 gap-12'>
                            <div className='space-y-6'>
                              <h4 className='text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2'>
                                <Settings size={12} /> СОСТАВ МОДУЛЯ:
                              </h4>
                              <ul className='grid gap-3 list-inside'>
                                {s.scope.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className='text-xs font-medium'
                                  >
                                    <div className='flex gap-2 items-center'>
                                      <div className='w-2 h-2 bg-brand-500 rounded-full shrink-0' />
                                      <span>{item}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className='space-y-6'>
                              <h4 className='text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2'>
                                <Cpu size={12} /> ШАГИ:
                              </h4>
                              <div className='grid gap-4'>
                                <ul className='grid gap-3 list-decimal list-inside'>
                                  {s.process.map((item, idx) => (
                                    <li
                                      key={idx}
                                      className='flex items-center gap-2 text-xs font-medium'
                                    >
                                      <div className='text-brand-500 text-xs'>{idx + 1 + '.'}</div>
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className='flex w-full mt-12 gap-2 items-center justify-center p-2 rounded-xl  border border-zinc-200/50'>
                            <span className='text-xs font-mono text-brand-500 uppercase'>
                              Длительность модуля:
                            </span>
                            <span className='text-xs font-bold'>{s.duration}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className='mt-12 flex items-center gap-4'>
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : s.id)}
                        className={`cursor-pointer grow py-4 rounded-2xl font-mono text-[10px] font-bold uppercase tracking-[0.2em] border transition-colors duration-300 ${
                          isExpanded
                            ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                            : 'bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-brand-500 hover:text-brand-500'
                        }`}
                      >
                        {isExpanded ? 'ЗАКРЫТЬ_МОДУЛЬ' : 'ИЗУЧИТЬ_МОДУЛЬ'}
                      </button>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </LayoutGroup>
      </section>

      {/* Performance Footer Banner */}
      <section className='relative overflow-hidden rounded-3xl bg-zinc-50 dark:bg-zinc-950 p-12 text-left border border-zinc-200 dark:border-zinc-800 shadow-lg shadow-base-300/20'>
        <div className='absolute inset-0 opacity-10 tech-grid' />
        <div className='relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left'>
          <div className='space-y-4'>
            <h2 className='font-display text-4xl font-bold uppercase tracking-tighter'>
              Нужен кастомный пайплайн?
            </h2>
            <p className='max-w-lg'>
              Мы можем собрать уникальный стек инженерных услуг под специфику вашего энергетического
              или промышленного объекта.
            </p>
          </div>
          <Link
            href='/contacts'
            className='flex gap-2 items-center cursor-pointer py-4 px-6 rounded-2xl font-mono text-[10px] font-bold uppercase tracking-[0.2em] border transition-colors duration-300 bg-transparent border-zinc-200 dark:border-zinc-800 text-brand-500 hover:border-brand-500 dark:bg-brand-500 dark:text-zinc-200 dark:hover:border-zinc-200'
          >
            <Zap
              size={16}
              className='animate-pulse'
            />{' '}
            Конфигурировать Решение
          </Link>
        </div>
      </section>
    </>
  )
}
