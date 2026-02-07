'use client'

import React, { useEffect, useMemo, useState, type FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Transition } from 'framer-motion'
import { Mail, Phone, MessageSquare, Globe, Clock, ShieldCheck, Contact } from 'lucide-react'
import { useClientValue } from '@/components/hooks/useClientValue'

type Status = 'idle' | 'sending' | 'success'

type FormState = {
  name: string
  contact: string
  objective: string
  message: string
}

const OBJECTIVES = ['Аудит', 'BIM', 'Изыскания', 'Тендер', 'Другое'] as const

export default function ContactForm() {
  const reduceMotion = useReducedMotion()

  // Session ID is client-only; hook provides stable fallback during SSR/first render.
  const sessionId = useClientValue(
    () => Math.random().toString(36).substring(2, 9).toUpperCase(),
    '-------',
  )

  const [status, setStatus] = useState<Status>('idle')

  // No "isMounted" state (eslint rule). Use client-only initial state + effect-driven updates.
  const [currentTime, setCurrentTime] = useState<string>(() => '--:--:--')

  const [form, setForm] = useState<FormState>({
    name: '',
    contact: '',
    objective: '',
    message: '',
  })

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('ru-RU', { hour12: false }))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const appearTransition: Transition = useMemo(
    () => (reduceMotion ? { duration: 0 } : { duration: 0.22 }),
    [reduceMotion],
  )

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const resetSession = () => {
    setStatus('idle')
    setForm({ name: '', contact: '', objective: '', message: '' })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return

    setStatus('sending')
    setTimeout(() => setStatus('success'), 2000)
  }

  return (
    <>
      {/* Hero Header Section */}
      <section className='relative overflow-hidden rounded-[40px] dark:bg-zinc-950 p-12 text-left border border-zinc-200 dark:border-zinc-900'>
        <div className='absolute top-0 right-0 p-8 opacity-10'>
          <Contact
            size={240}
            className='text-brand-500'
          />
        </div>

        <div className='border-l-4 border-brand-500 pl-8 md:pl-12'>
          <div className='flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-brand-500'>
            <Contact
              size={14}
              className='animate-pulse'
            />
            Communication Node: Active
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={appearTransition}
            className='space-y-4'
          >
            <h1>
              обратная связь с <br />{' '}
              <span className='text-zinc-300 dark:text-zinc-800'>Центром</span>
            </h1>
          </motion.div>

          <p>
            Инициируйте сессию взаимодействия для аудита вашего объекта или получения технической
            консультации.
          </p>
        </div>
      </section>

      <section className='grid gap-6 lg:grid-cols-3'>
        {/* Left Column: Stats & Info */}
        <div className='space-y-6 lg:col-span-1'>
          {/* Status Panel */}
          <div className='rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-8 space-y-6'>
            <h3 className='font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-4'>
              System_Status
            </h3>

            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-xs text-zinc-500 flex items-center gap-2'>
                  <Clock size={14} /> Время MSK
                </span>
                <span className='font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100 tabular-nums'>
                  {currentTime}
                </span>
              </div>

              <div className='flex justify-between items-center'>
                <span className='text-xs text-zinc-500 flex items-center gap-2'>
                  <ShieldCheck size={14} /> Шифрование
                </span>
                <span className='text-[10px] font-mono font-bold text-brand-500 uppercase'>
                  AES-256 Enabled
                </span>
              </div>

              <div className='flex justify-between items-center'>
                <span className='text-xs text-zinc-500 flex items-center gap-2'>
                  <Globe size={14} /> Пинг
                </span>
                <span className='font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100'>
                  14 ms
                </span>
              </div>
            </div>

            <div className='pt-4'>
              <div className='rounded-2xl p-4 border border-zinc-200 dark:border-zinc-800'>
                <div className='flex items-center gap-1.5 text-[9px] font-mono text-brand-500 mb-1'>
                  <div className=' w-2 h-2 bg-brand-500 rounded-full animate-pulse' />
                  <span className='text-sm tracking-wide'>ONLINE</span>
                </div>
                <div className='text-xs font-medium'>
                  Дежурный инженер доступен для экспресс-аудита
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className='grid grid-cols-2 gap-4'>
            <a
              href='mailto:info@set-energy.tech'
              className='flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-500 transition-colors group'
            >
              <Mail className='w-6 h-6 mb-3 text-zinc-400 group-hover:text-brand-500 transition-colors' />
              <span className='text-[10px] font-mono uppercase tracking-widest'>Email</span>
            </a>

            <a
              href='tel:+74950000000'
              className='flex flex-col items-center justify-center p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-500 transition-colors group'
            >
              <Phone className='w-6 h-6 mb-3 text-zinc-400 group-hover:text-brand-500 transition-colors' />
              <span className='text-[10px] font-mono uppercase tracking-widest'>Call</span>
            </a>
          </div>

          {/* Location Visual */}
          <div
            className='bg-[url(/contacts.png)] bg-cover relative aspect-square rounded-[40px] border dark:border-zinc-800 border-zinc-200 overflow-hidden group'
            style={{ backgroundPositionX: '-111px' }}
          >
            <div className='absolute inset-0 bg-black/60 backdrop-grayscale pointer-events-none' />
            <div className='absolute inset-0 opacity-20 tech-grid' />

            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='relative'>
                <motion.div
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className='absolute inset-0 -m-4 rounded-full border border-brand-500/50'
                />
                <div className='h-4 w-4 rounded-full bg-brand-500 shadow-[0_0_15px_rgba(20,184,166,1)]' />
              </div>
            </div>

            <div className='absolute bottom-6 left-6 right-6 space-y-1'>
              <div className='text-[9px] font-mono text-zinc-500'>LAT: 55.719488</div>
              <div className='text-[9px] font-mono text-zinc-500'>LNG: 37.828236</div>
              <div className='text-xs font-bold text-white uppercase tracking-tight'>
                Москва, Вешняковская, 31
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Terminal Form */}
        <div className='lg:col-span-2'>
          <div className='h-full rounded-[48px] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col'>
            {/* Terminal Header */}
            <div className='bg-zinc-100 dark:bg-zinc-900 px-8 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between'>
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

              <div className='text-[9px] font-mono text-zinc-400 uppercase tracking-widest'>
                Session ID: {sessionId}
              </div>
            </div>

            <div className='p-10 grow'>
              <AnimatePresence mode='wait'>
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className='h-full flex flex-col items-center justify-center text-center space-y-8'
                  >
                    <div className='relative'>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className='absolute inset-0 -m-6 border border-dashed border-emerald-500/30 rounded-full'
                      />
                      <div className='w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center text-white text-5xl shadow-2xl shadow-emerald-500/40 rotate-12'>
                        ✓
                      </div>
                    </div>

                    <div className='space-y-4'>
                      <h2 className='text-3xl font-display font-bold uppercase tracking-tight'>
                        Пакет данных передан
                      </h2>
                      <p className='text-zinc-500 text-sm max-w-sm mx-auto leading-relaxed'>
                        Запрос успешно верифицирован и поставлен в очередь на обработку дежурным
                        инженером. Ожидайте подтверждения.
                      </p>
                    </div>

                    <button
                      type='button'
                      onClick={resetSession}
                      className='px-8 py-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl text-[10px] font-mono uppercase font-bold tracking-widest hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors'
                    >
                      Новая сессия
                    </button>
                  </motion.div>
                ) : (
                  <form
                    suppressHydrationWarning
                    onSubmit={handleSubmit}
                    className='space-y-8'
                  >
                    <div className='grid md:grid-cols-2 gap-8'>
                      <div className='space-y-2'>
                        <label
                          htmlFor='cf-name'
                          className='text-[10px] font-mono uppercase text-zinc-400 tracking-widest ml-1'
                        >
                          Identity
                        </label>
                        <input
                          suppressHydrationWarning
                          id='cf-name'
                          name='name'
                          required
                          value={form.name}
                          onChange={(e) => setField('name', e.target.value)}
                          autoComplete='name'
                          className='w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 p-4 font-display text-xl focus:border-brand-500 outline-none transition-colors placeholder:text-zinc-100 dark:placeholder:text-zinc-800'
                          placeholder='ИМЯ_КЛИЕНТА'
                        />
                      </div>

                      <div className='space-y-2'>
                        <label
                          htmlFor='cf-contact'
                          className='text-[10px] font-mono uppercase text-zinc-400 tracking-widest ml-1'
                        >
                          Contact_Line
                        </label>
                        <input
                          suppressHydrationWarning
                          id='cf-contact'
                          name='contact'
                          required
                          value={form.contact}
                          onChange={(e) => setField('contact', e.target.value)}
                          autoComplete='email'
                          className='w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 p-4 font-display text-xl focus:border-brand-500 outline-none transition-colors placeholder:text-zinc-100 dark:placeholder:text-zinc-800'
                          placeholder='TELEPHONE_OR_EMAIL'
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-[10px] font-mono uppercase text-zinc-400 tracking-widest ml-1'>
                        Objective
                      </label>

                      <div className='grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2'>
                        {OBJECTIVES.map((tag) => {
                          const active = form.objective === tag
                          return (
                            <button
                              key={tag}
                              type='button'
                              onClick={() => setField('objective', tag)}
                              aria-pressed={active}
                              className={[
                                'cursor-pointer px-4 py-3 rounded-xl border text-[10px] font-mono uppercase transition-all text-left',
                                active
                                  ? 'border-brand-500 text-brand-500'
                                  : 'border-zinc-200 dark:border-zinc-800 hover:border-brand-500 hover:text-brand-500',
                              ].join(' ')}
                            >
                              {tag}
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label
                        htmlFor='cf-message'
                        className='text-[10px] font-mono uppercase text-zinc-400 tracking-widest ml-1'
                      >
                        Message_Body
                      </label>
                      <textarea
                        suppressHydrationWarning
                        id='cf-message'
                        name='message'
                        value={form.message}
                        onChange={(e) => setField('message', e.target.value)}
                        className='w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 min-h-37.5 outline-none focus:border-brand-500 transition-colors text-sm'
                        placeholder='Опишите техническую задачу или вопрос...'
                      />
                    </div>

                    <div className='pt-4'>
                      <button
                        type='submit'
                        disabled={status === 'sending'}
                        className='cursor-pointer w-full py-6 bg-brand-500 hover:bg-brand-600 disabled:hover:bg-brand-500 disabled:opacity-80 text-white font-bold rounded-3xl transition-all shadow-xl shadow-brand-500/20 group relative overflow-hidden'
                      >
                        {status === 'sending' ? (
                          <span className='flex items-center justify-center gap-3'>
                            <span className='animate-spin rounded-full h-4 w-4 border-2 border-white/20 border-t-white' />
                            ОТПРАВКА_ПАКЕТА...
                          </span>
                        ) : (
                          <span className='flex items-center justify-center gap-2 tracking-[0.2em] text-xs uppercase'>
                            Инициировать Контакт
                            <MessageSquare
                              size={16}
                              className='group-hover:translate-x-1 transition-transform'
                            />
                          </span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
