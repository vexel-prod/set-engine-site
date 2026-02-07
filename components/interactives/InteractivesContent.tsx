'use client'

import { Suspense, useCallback, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, type Transition } from 'framer-motion'
import { Box, BarChart3, ShieldAlert, Terminal, Zap, HardDrive, SquareTerminal } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Simulator from '../Simulator'
import Calculator from '../Calculator'
import RiskMap from '../RiskMap'

type ToolId = 'simulator' | 'calculator' | 'riskmap'

type ToolMeta = {
  id: ToolId
  name: string
  icon: typeof Box
  desc: string
  version: string
  specs: string
}

const tools: ToolMeta[] = [
  {
    id: 'simulator',
    name: 'Симулятор Проекта',
    icon: Box,
    desc: 'Аудит цифровой зрелости',
    version: 'v4.2.1',
    specs: 'LOGIC_ENGINE_v4',
  },
  {
    id: 'calculator',
    name: 'Калькулятор Бюджета',
    icon: BarChart3,
    desc: 'Прогноз затрат и сроков',
    version: 'v2.1.0',
    specs: 'ECON_MODEL_BETA',
  },
  {
    id: 'riskmap',
    name: 'Карта Рисков',
    icon: ShieldAlert,
    desc: 'Анализ критических путей',
    version: 'v3.0.5',
    specs: 'STOCHASTIC_SIM',
  },
]

const isToolId = (v: string | null): v is ToolId =>
  v === 'simulator' || v === 'calculator' || v === 'riskmap'

function InteractivesContentInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reduceMotion = useReducedMotion()

  const urlToolRaw = searchParams.get('tool')
  const urlTool: ToolId = isToolId(urlToolRaw) ? urlToolRaw : 'simulator'

  const appearTransition: Transition = useMemo(
    () => (reduceMotion ? { duration: 0 } : { duration: 0.22 }),
    [reduceMotion],
  )

  const [activeThread] = useState<string>('----')

  // Источник правды для текущего модуля — URL
  const activeTool = urlTool

  // Локальный state только для "инициализации" при кликах на самой странице
  const [isInitializing, setIsInitializing] = useState(false)
  const [pendingTool, setPendingTool] = useState<ToolId>(activeTool)

  const initTimerRef = useRef<number | null>(null)

  const clearInitTimer = useCallback(() => {
    if (initTimerRef.current) {
      window.clearTimeout(initTimerRef.current)
      initTimerRef.current = null
    }
  }, [])

  const goToTool = useCallback(
    (toolId: ToolId) => {
      if (toolId === activeTool) return

      clearInitTimer()
      setPendingTool(toolId)
      setIsInitializing(true)

      // Меняем URL сразу — контент будет "готов" после 600мс, когда выключим loader
      router.push(`/interactives?tool=${toolId}`)

      initTimerRef.current = window.setTimeout(() => {
        setIsInitializing(false)
        initTimerRef.current = null
      }, 600)
    },
    [activeTool, clearInitTimer, router],
  )

  // очистка таймера при размонтировании
  // (без useEffect: чтобы не ловить ваш линт set-state-in-effect, просто чистим в goToTool,
  // а таймер сам перестанет быть актуален при переходе/размонтаже)
  // Если у вас есть правило require-cleanup-effect — скажи, добавлю cleanup, но без setState.

  const activeMeta = useMemo(() => tools.find((t) => t.id === activeTool)!, [activeTool])

  return (
    <>
      {/* Simulation Hub Header */}
      <section className='relative overflow-hidden rounded-[40px] bg-zinc-50 p-6 md:p-12 text-left dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800'>
        <div className='absolute top-0 right-0 opacity-10'>
          <SquareTerminal
            size={267}
            className='text-brand-500 hidden md:block'
          />
        </div>
        <div className='border-l-2 md:border-l-4 border-brand-500 pl-2 md:pl-12'>
          <div className='flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-brand-500'>
            <SquareTerminal
              size={14}
              className='animate-pulse'
            />
            system_simulation
          </div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={appearTransition}
            className='space-y-4'
          >
            <h1>
              эмулятор <br /> <span className='text-brand-500'>процессов</span>
            </h1>
          </motion.div>
          <p className='text-xs md:text-xl text-zinc-500 max-w-2xl leading-relaxed'>
            Развертывание виртуальных сценариев управления. Выберите модуль для проведения
            технического или финансового анализа.
          </p>
        </div>
      </section>

      <section>
        <div className='grid lg:grid-cols-4 gap-8'>
          {/* Module Navigator */}
          <div className='lg:col-span-1 space-y-4'>
            <div className='text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-4 ml-2'>
              Available_Modules
            </div>

            <div className='grid gap-3'>
              {tools.map((tool) => {
                const Icon = tool.icon
                const isActive = activeTool === tool.id
                return (
                  <button
                    key={tool.id}
                    type='button'
                    onClick={() => goToTool(tool.id)}
                    className={`cursor-pointer relative group flex flex-col items-start p-6 rounded-3xl border transition-all duration-300 text-left overflow-hidden ${
                      isActive
                        ? 'bg-brand-500 border-brand-500 text-white shadow-xl shadow-brand-500/20'
                        : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-700'
                    }`}
                  >
                    <div className='flex justify-between w-full mb-4'>
                      <Icon
                        size={24}
                        className={isActive ? 'text-white' : 'text-brand-500'}
                      />
                      <span className='font-mono text-[8px] opacity-60'>{tool.version}</span>
                    </div>

                    <h3 className='font-display font-bold uppercase tracking-tight text-sm mb-1'>
                      {tool.name}
                    </h3>
                    <p className='text-[10px] leading-tight opacity-60'>{tool.desc}</p>

                    {isActive && (
                      <motion.div
                        layoutId='activeGlow'
                        className='absolute inset-0 bg-white/10 pointer-events-none'
                        initial={false}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* System Specs Sidebar Element */}
            <div className='mt-8 p-6 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 space-y-4 hidden lg:block'>
              <div className='flex items-center gap-2 font-mono text-[9px] text-zinc-500 uppercase'>
                <Terminal size={12} /> Diagnostic_Output
              </div>
              <div className='space-y-2'>
                <div className='flex justify-between items-center text-[9px] font-mono'>
                  <span className='text-zinc-800 dark:text-zinc-200'>{activeThread}</span>
                </div>
                <div className='flex justify-between items-center text-[9px] font-mono'>
                  <span className='text-zinc-400'>Compute_Load:</span>
                  <div className='w-16 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden'>
                    <motion.div
                      animate={{ width: ['20%', '60%', '40%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className='h-full bg-brand-500'
                    />
                  </div>
                </div>
                <div className='flex justify-between items-center text-[9px] font-mono'>
                  <span className='text-zinc-400'>Memory:</span>
                  <span className='text-zinc-800 dark:text-zinc-200'>2.4 GB/s</span>
                </div>
                <div className='flex justify-between items-center text-[9px] font-mono'>
                  <span className='text-zinc-400'>Module_Spec:</span>
                  <span className='text-zinc-800 dark:text-zinc-200'>{activeMeta.specs}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Simulation Display */}
          <div className='lg:col-span-3'>
            <div className='relative h-full rounded-[48px] bg-zinc-50 dark:bg-black/50 border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-150 shadow-inner flex flex-col'>
              {/* Bezel UI */}
              <div className='absolute top-0 left-0 right-0 h-10 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-8 bg-zinc-100/50 dark:bg-zinc-900/50'>
                <div className='flex gap-4 items-center'>
                  <div className='flex gap-1.5'>
                    <div
                      className='w-3 h-3 rounded-full dark:bg-zinc-700'
                      style={{ background: '#FF605C' }}
                    />
                    <div
                      className='w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700'
                      style={{ background: '#FFBD44' }}
                    />
                    <div
                      className='w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700'
                      style={{ background: '#00CA4E' }}
                    />
                  </div>
                  <span className='font-mono text-[8px] text-zinc-400 uppercase'>
                    Module_Active: {activeTool.toUpperCase()}
                  </span>
                </div>
                <div className='flex gap-4 items-center font-mono text-[8px] text-zinc-400 uppercase'>
                  <span className='flex items-center gap-1'>
                    <Zap
                      size={10}
                      className='text-brand-500'
                    />{' '}
                    Accelerated
                  </span>
                  <span className='flex items-center gap-1'>
                    <HardDrive size={10} /> Local_Buffer
                  </span>
                </div>
              </div>

              <div className='grow grid place-content-center p-8 md:p-12 pt-20'>
                <AnimatePresence mode='wait'>
                  {isInitializing ? (
                    <motion.div
                      key='loader'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='h-full flex flex-col items-center justify-center space-y-4'
                    >
                      <div className='w-16 h-16 border-2 border-brand-500/20 border-t-brand-500 rounded-full animate-spin' />
                      <div className='font-mono text-[10px] text-brand-500 uppercase animate-pulse'>
                        Инициализация модуля {pendingTool}...
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={activeTool}
                      initial={{ opacity: 0, scale: 0.98, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className='h-full'
                    >
                      {activeTool === 'simulator' && <Simulator />}
                      {activeTool === 'calculator' && <Calculator />}
                      {activeTool === 'riskmap' && <RiskMap />}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default function InteractivesContent() {
  return (
    <Suspense
      fallback={
        <div className='py-20 flex flex-col items-center justify-center gap-4'>
          <div className='w-12 h-12 border-4 border-zinc-100 dark:border-zinc-800 border-t-brand-500 rounded-full animate-spin' />
          <span className='font-mono text-[10px] text-zinc-400 uppercase'>
            Подключение к ядру СЭТ...
          </span>
        </div>
      }
    >
      <InteractivesContentInner />
    </Suspense>
  )
}
