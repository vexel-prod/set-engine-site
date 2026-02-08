'use client'

import { motion, useReducedMotion, type Transition } from 'framer-motion'
import Image from 'next/image'
import {
  Shield,
  Target,
  Zap,
  Cog,
  Cpu,
  Users,
  Award,
  Database,
  Activity,
  Globe,
  Layers,
} from 'lucide-react'
import { companyData } from '../../data/company'
import { useMemo } from 'react'

type StatItem = {
  label: string
  value: string
  icon: React.ElementType
}

type ValueItem = {
  title: string
  desc: string
  code: string
  icon: React.ElementType
}

const stats: StatItem[] = [
  { label: 'Проверенные проекты', value: '140+', icon: Database },
  { label: 'Эксперты в команде', value: '45', icon: Users },
  { label: 'Контроль 24/7', value: '24/7', icon: Zap },
  { label: 'Сложность BIM', value: 'LOD 400', icon: Cpu },
]

const values: ValueItem[] = [
  {
    title: 'Точность',
    desc: 'Точность до миллиметра в изысканиях и проектировании.',
    code: 'METRIC_01',
    icon: Target,
  },
  {
    title: 'Целостность данных',
    desc: 'Неизменность данных на всех этапах жизненного цикла объекта.',
    code: 'DATA_HASH_V',
    icon: Shield,
  },
  {
    title: 'Инновации',
    desc: 'Внедрение цифровых двойников там, где другие используют бумагу.',
    code: 'NEXT_GEN_ENG',
    icon: Zap,
  },
]

export default function AboutContent() {
  const reduceMotion = useReducedMotion()

  const appearTransition: Transition = useMemo(
    () => (reduceMotion ? { duration: 0 } : { duration: 0.22 }),
    [reduceMotion],
  )

  const fadeUp = useMemo(
    () => ({
      initial: reduceMotion ? false : { opacity: 0, y: 18 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.35 },
      transition: appearTransition,
    }),
    [reduceMotion, appearTransition],
  )

  return (
    <>
      {/* HERO / HEADER */}
      <section
        className='relative overflow-hidden rounded-[40px]
        bg-zinc-50 dark:bg-zinc-950
        border border-zinc-200 dark:border-zinc-800
        shadow-lg shadow-base-300/20
        p-6 md:p-12'
      >
        <div className='absolute top-0 right-0 p-3 opacity-10 pointer-events-none'>
          <Cog
            size={267}
            className='text-brand-500'
          />
        </div>

        <div className='border-l-4 border-brand-500 pl-6 sm:pl-8 md:pl-12'>
          <div className='flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-brand-500'>
            <Cog
              size={14}
              className={reduceMotion ? '' : 'animate-pulse'}
            />
            Entity_Identity
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={appearTransition}
            className='space-y-4'
          >
            <h1
              className='font-display font-bold uppercase tracking-tighter leading-[0.95]
              text-3xl sm:text-5xl md:text-6xl'
            >
              Инжиниринг <br />
              <span className='text-brand-500'>полного</span> <br />
              цикла
            </h1>
          </motion.div>

          <p className='text-sm sm:text-base md:text-xl text-zinc-500 max-w-2xl leading-relaxed mt-2'>
            СЭТ (Строительство и Энергетические Технологии) — это операционная система для
            строительного проекта. Мы оцифровываем физический мир и превращаем хаос стройки в
            структурированный поток данных.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {stats.map((s, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            className='flex items-center gap-4 p-5 md:p-6 rounded-3xl
              bg-zinc-50 dark:bg-zinc-950
              border border-zinc-200 dark:border-zinc-800
              shadow-lg shadow-base-300/20'
          >
            <s.icon className='w-8 h-8 text-brand-500 shrink-0' />
            <div className='min-w-0'>
              <div className='text-2xl font-display font-bold leading-none'>{s.value}</div>
              <div className='text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1'>
                {s.label}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* IMAGE / AR BLOCK */}
      <section
        className='relative overflow-hidden group rounded-[40px]
          bg-zinc-50 dark:bg-zinc-950
          border border-zinc-200 dark:border-zinc-800
          shadow-lg shadow-base-300/20
          min-h-[560px] sm:min-h-[620px] md:min-h-[680px]'
      >
        <Image
          src='/background.jpeg'
          alt='Energy Control Room'
          fill
          priority
          className='object-cover grayscale-70 dark:grayscale-0 transition-all duration-1000
            scale-110 group-hover:scale-100'
        />

        <div className='absolute inset-0 bg-linear-to-b from-black/35 via-black/10 to-black/80' />
        <div className='absolute inset-0 bg-linear-to-r from-black/35 via-transparent to-transparent sm:from-black/25' />

        <div className='absolute inset-0 z-10 p-4 sm:p-6 md:p-12 flex flex-col gap-4 sm:gap-6'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-6'>
            <div className='flex flex-col gap-3 sm:gap-4 max-w-full sm:max-w-xs'>
              <div
                className='flex items-center gap-2 sm:gap-3 bg-brand-500 px-3 sm:px-4 py-1.5 rounded-full
                text-white font-mono text-[10px] font-bold w-fit shadow-md'
              >
                <Activity
                  size={14}
                  className={reduceMotion ? '' : 'animate-pulse'}
                />
                LIVE_RENDER_ACTIVE
              </div>

              <div
                className='p-3 sm:p-4 bg-black/55 backdrop-blur-md border border-white/10 rounded-2xl space-y-2
                w-full sm:max-w-xs'
              >
                <div className='flex justify-between text-[10px] sm:text-[9px] font-mono text-zinc-300 sm:text-zinc-400'>
                  <span>CPU_LOAD</span>
                  <span>44.2%</span>
                </div>

                <div className='w-full h-1.5 sm:h-1 bg-white/10 rounded-full overflow-hidden'>
                  <motion.div
                    animate={reduceMotion ? { width: '44%' } : { width: ['20%', '80%', '40%'] }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 4, repeat: Infinity }}
                    className='h-full bg-brand-500'
                  />
                </div>

                <div className='text-[10px] sm:text-[9px] font-mono text-zinc-400 sm:text-zinc-500'>
                  SENSORS: ONLINE_OK
                </div>
              </div>
            </div>

            <div className='text-left sm:text-right max-w-full sm:max-w-sm'>
              <div className='font-mono text-[10px] text-white/90 uppercase tracking-widest'>
                Global_Grid_Sync
              </div>
              <div
                className='text-brand-500 font-mono text-2xl sm:text-3xl md:text-4xl font-bold
                tracking-tighter leading-none uppercase drop-shadow-lg break-words'
              >
                ENERGY_SYNC
              </div>
            </div>
          </div>

          <div className='mt-auto max-w-3xl'>
            <h2
              className='font-bold text-[30px] leading-[1.05]
              sm:text-4xl sm:leading-none md:text-6xl
              text-white uppercase tracking-tighter drop-shadow-lg'
            >
              Мы видим сквозь <br />
              <span className='text-brand-500'>бетон и время</span>
            </h2>

            <p
              className='mt-4 text-[13px] leading-relaxed
              sm:text-base md:text-xl
              text-zinc-100 sm:text-zinc-200 max-w-2xl
              bg-black/35 backdrop-blur-sm border border-white/10
              p-4 sm:p-5 md:p-6 rounded-2xl
              break-words whitespace-normal'
            >
              Использование технологий дополненной реальности и 5D-моделирования позволяет нам
              предсказывать ошибки строительства до того, как будет залит первый кубометр бетона.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className='space-y-10 md:space-y-12 text-left'>
        <div className='flex items-center gap-6'>
          <h2 className='font-display text-3xl sm:text-4xl font-bold uppercase tracking-tighter'>
            Ценности системы
          </h2>
          <div className='h-px grow bg-zinc-200 dark:bg-zinc-800' />
        </div>

        <div className='grid md:grid-cols-3 gap-6 md:gap-8'>
          {values.map((v, i) => (
            <motion.div
              key={i}
              whileHover={reduceMotion ? undefined : { y: -8 }}
              className='p-7 sm:p-8 md:p-10 rounded-[40px]
                bg-zinc-50 dark:bg-zinc-950
                border border-zinc-200 dark:border-zinc-800
                shadow-lg shadow-base-300/20
                space-y-6 relative overflow-hidden group'
            >
              <div className='absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none'>
                <v.icon
                  size={120}
                  className='text-zinc-950 dark:text-white'
                />
              </div>

              <div className='w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center text-white'>
                <v.icon size={24} />
              </div>

              <div className='space-y-3'>
                <h3 className='text-2xl font-display font-bold uppercase tracking-tight'>
                  {v.title}
                </h3>
                <p className='text-zinc-500 text-sm leading-relaxed'>{v.desc}</p>
              </div>

              <div
                className='pt-6 font-mono text-[9px] text-zinc-400
                border-t border-zinc-200 dark:border-zinc-800
                uppercase tracking-[0.2em]'
              >
                Component_Code: {v.code}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LEGAL DIGITAL PASSPORT */}
      <section className='relative px-0 sm:px-2'>
        <div className='flex flex-col md:flex-row gap-8 md:gap-12 items-start'>
          <div className='lg:col-span-4 space-y-8 md:space-y-12'>
            <div className='space-y-4 text-left'>
              <h2 className='font-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.95]'>
                Юридический <br /> цифровой <br />
                <span className='text-zinc-400'>паспорт</span>
              </h2>

              <p className='text-zinc-500 leading-relaxed text-sm md:text-base max-w-md'>
                Мы верим в прозрачность. Данные о юридической структуре ООО «СЭТ» верифицированы и
                открыты для аудита.
              </p>
            </div>

            <div
              className='p-6 md:p-8 rounded-[32px] md:rounded-[40px]
              bg-zinc-50 dark:bg-zinc-950
              border-2 border-dashed border-zinc-200 dark:border-zinc-800
              shadow-lg shadow-base-300/20
              flex flex-col gap-6 group'
            >
              <Award className='w-10 h-10 md:w-12 md:h-12 text-brand-500 group-hover:scale-110 transition-transform' />
              <div>
                <div className='text-lg md:text-xl font-bold uppercase tracking-tight'>
                  ISO 9001:2015
                </div>
                <div className='text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1'>
                  Система менеджмента качества
                </div>
              </div>
            </div>
          </div>

          <div className='lg:col-span-8 w-full overflow-hidden rounded-[40px] md:rounded-[60px] shadow-lg shadow-base-300/20 border border-zinc-200 dark:border-zinc-800'>
            <motion.div className='relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 p-5 sm:p-6 md:p-10 lg:p-14'>

              <div className='absolute inset-0 pointer-events-none opacity-[0.06]'>
                <div className='absolute -top-10 -right-10'>
                  <Globe
                    size={240}
                  />
                </div>
              </div>

              <div className='relative z-10 grid gap-8 md:gap-14'>
                <div
                  className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6
                  border-b border-zinc-200 dark:border-zinc-800 pb-5 md:pb-8'
                >
                  <div className='space-y-2'>
                    <div className='text-[10px] md:text-[11px] font-mono text-brand-500 uppercase tracking-widest'>
                      Identity_Module: REGISTER_04
                    </div>

                    <div className='flex flex-wrap items-center gap-3'>
                      <h3
                        className='text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase tracking-tighter italic
                        text-zinc-950 dark:text-white'
                      >
                        Паспорт юрлица
                      </h3>

                      <div className='flex items-center gap-2 px-3 py-1 bg-emerald-500/15 border border-emerald-500/25 rounded-full'>
                        <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
                        <span className='text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400'>
                          АКТИВЕН
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className='text-left md:text-right'>
                    <div className='text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase'>
                      Контрольная сумма
                    </div>
                    <div className='text-[10px] md:text-[11px] font-mono font-bold text-zinc-900 dark:text-zinc-200 break-all'>
                      #E4-99-AF-2B-3C-01
                    </div>
                  </div>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10'>
                  {[
                    { label: 'Полное наименование', value: companyData.full_name, full: true },
                    { label: 'ИНН', value: companyData.inn },
                    { label: 'ОГРН', value: companyData.ogrn },
                    { label: 'Генеральный директор', value: companyData.ceo },
                    { label: 'Дата регистрации', value: companyData.reg_date },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`space-y-2 ${item.full ? 'sm:col-span-2' : ''}`}
                    >
                      <span
                        className='flex items-center gap-2 text-[10px] md:text-[11px]
                        font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest'
                      >
                        <Layers
                          size={12}
                          className='text-brand-500'
                        />
                        {item.label}
                      </span>

                      <p
                        className='text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight leading-tight
                        text-zinc-900 dark:text-zinc-100 break-words'
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className='pt-6 md:pt-8 border-t border-zinc-200 dark:border-zinc-800
                  flex flex-col md:flex-row md:justify-between gap-6 md:gap-8'
                >
                  <div className='space-y-3 max-w-lg'>
                    <span className='text-[10px] md:text-[11px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest'>
                      Юридический адрес
                    </span>
                    <p className='text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed'>
                      {companyData.legal_address}
                    </p>
                  </div>

                  <div
                    className='w-full md:w-[260px] p-4 md:p-5
                    bg-zinc-50 dark:bg-zinc-950
                    border border-zinc-200 dark:border-zinc-800
                    rounded-2xl md:rounded-3xl
                    shadow-lg shadow-base-300/20
                    flex flex-col gap-3'
                  >
                    <div className='text-[9px] md:text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest'>
                      Электронная печать
                    </div>

                    <div className='h-9 md:h-10 flex gap-1 items-end opacity-25'>
                      {[2, 5, 3, 8, 4, 6, 2, 9, 3, 5, 7, 4].map((h, k) => (
                        <div
                          key={k}
                          className='flex-1 bg-zinc-900 dark:bg-white rounded-sm'
                          style={{ height: `${h * 10}%` }}
                        />
                      ))}
                    </div>

                    <div className='text-[9px] md:text-[10px] font-mono text-brand-500 font-bold uppercase tracking-widest'>
                      Подписант: Е.В. Орлов
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
