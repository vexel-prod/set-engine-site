'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Home,
  Briefcase,
  Zap,
  Activity,
  Calculator,
  ShieldAlert,
  Building2,
  Phone,
  Search,
  FolderSearch,
} from 'lucide-react'
import { useAppContext } from './AppContext'

type CommandItem = {
  name: string
  path: string
  icon: LucideIcon
}

const commands: CommandItem[] = [
  { name: 'Главная', path: '/', icon: Home },
  { name: 'Услуги', path: '/services', icon: Briefcase },
  { name: 'Интерактивы', path: '/interactives', icon: Zap },
  { name: 'Симулятор проекта', path: '/interactives?tool=simulator', icon: Activity },
  { name: 'Калькулятор бюджета', path: '/interactives?tool=calculator', icon: Calculator },
  { name: 'Карта рисков', path: '/interactives?tool=riskmap', icon: ShieldAlert },
  { name: 'О компании', path: '/about', icon: Building2 },
  { name: 'Контакты', path: '/contacts', icon: Phone },
]

export default function CommandPalette() {
  const router = useRouter()
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useAppContext()

  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const openRef = useRef(isCommandPaletteOpen)
  const selectedIndexRef = useRef(selectedIndex)
  const filteredLenRef = useRef(commands.length)

  useEffect(() => {
    openRef.current = isCommandPaletteOpen
  }, [isCommandPaletteOpen])

  useEffect(() => {
    selectedIndexRef.current = selectedIndex
  }, [selectedIndex])

  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((cmd) => cmd.name.toLowerCase().includes(q))
  }, [query])

  const safeSelectedIndex = useMemo(() => {
    const len = filteredCommands.length
    if (len <= 0) return 0
    return Math.max(0, Math.min(selectedIndex, len - 1))
  }, [filteredCommands.length, selectedIndex])

  if (filteredCommands.length > 0 && safeSelectedIndex !== selectedIndex) {
    setSelectedIndex(safeSelectedIndex)
  }

  useEffect(() => {
    filteredLenRef.current = filteredCommands.length || 0
  }, [filteredCommands.length])

  const close = useCallback(() => {
    setCommandPaletteOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }, [setCommandPaletteOpen])

  const open = useCallback(() => {
    setCommandPaletteOpen(true)
    setQuery('')
    setSelectedIndex(0)
  }, [setCommandPaletteOpen])

  const navigate = useCallback(
    (path: string) => {
      router.push(path)
      close()
    },
    [router, close],
  )

  const onQueryChange = useCallback((value: string) => {
    setQuery(value)
    setSelectedIndex(0)
  }, [])

  const selectNext = useCallback(() => {
    const len = filteredLenRef.current
    if (!len) return
    setSelectedIndex((prev) => (prev + 1) % len)
  }, [])

  const selectPrev = useCallback(() => {
    const len = filteredLenRef.current
    if (!len) return
    setSelectedIndex((prev) => (prev - 1 + len) % len)
  }, [])

  const selectCurrent = useCallback(() => {
    const len = filteredLenRef.current
    if (!len) return
    const idx = selectedIndexRef.current
    const cmd = filteredCommands[idx]
    if (cmd) navigate(cmd.path)
  }, [filteredCommands, navigate])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K (toggle)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        if (openRef.current) close()
        else open()
        return
      }

      if (!openRef.current) return

      // Esc
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }

      if (!filteredLenRef.current) return

      // Arrows
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        selectNext()
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        selectPrev()
        return
      }

      // Enter
      if (e.key === 'Enter') {
        e.preventDefault()
        selectCurrent()
        return
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [close, open, selectNext, selectPrev, selectCurrent])

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className='fixed inset-0 z-200 flex items-center justify-center p-4'>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className='absolute inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out'
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className='relative w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-4xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] z-210 overflow-hidden'
            role='dialog'
            aria-modal='true'
            aria-label='Command palette'
          >
            {/* Input Section */}
            <div className='p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-4'>
              <Search
                className='text-zinc-400'
                size={20}
              />
              <input
                autoFocus
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder='Поиск по системе …'
                className='w-full bg-transparent outline-none text-xl font-display font-medium py-1 placeholder:text-zinc-400'
              />
              <div className='flex items-center gap-1.5'>
                <button
                  onClick={close}
                  type='button'
                  className='text-[10px] font-mono text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors uppercase tracking-widest'
                >
                  ESC
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className='max-h-[50vh] overflow-y-auto p-3 custom-scrollbar'>
              {filteredCommands.length > 0 ? (
                <div className='space-y-1'>
                  {filteredCommands.map((cmd, idx) => {
                    const Icon = cmd.icon
                    const active = safeSelectedIndex === idx

                    return (
                      <button
                        key={`${cmd.path}-${cmd.name}`}
                        type='button'
                        onClick={() => navigate(cmd.path)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`cursor-pointer w-full flex items-center justify-between p-4 rounded-[20px] transition-all group ${
                          active
                            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                            : 'hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                        }`}
                      >
                        <div className='flex items-center gap-4'>
                          <div
                            className={`p-2.5 rounded-xl transition-colors ${
                              active
                                ? 'bg-white/20'
                                : 'bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700'
                            }`}
                          >
                            <Icon
                              size={18}
                              className={active ? 'text-white' : 'text-brand-500'}
                              aria-hidden
                            />
                          </div>

                          <div className='text-left'>
                            <span className='font-bold uppercase tracking-tight text-sm block leading-none'>
                              {cmd.name}
                            </span>
                            <span className='text-[9px] font-mono uppercase tracking-widest mt-1.5 block opacity-60'>
                              {cmd.path}
                            </span>
                          </div>
                        </div>

                        {active && (
                          <div className='flex items-center gap-2'>
                            <span className='flex items-center gap-2'>
                              <kbd className='border border-zinc-300 dark:border-zinc-700 px-1.5 py-0.5 rounded shadow-sm font-sans'>
                                ↵
                              </kbd>
                              SELECT
                            </span>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              ) : (
                <div className='p-16 text-center space-y-6'>
                  <div className='flex justify-center'>
                    <div className='w-16 h-16 rounded-full bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center border border-zinc-100 dark:border-zinc-800'>
                      <FolderSearch
                        size={28}
                        className='text-zinc-300 dark:text-zinc-700'
                        aria-hidden
                      />
                    </div>
                  </div>
                  <div>
                    <p className='text-zinc-400 font-medium'>Ничего не найдено</p>
                    <p className='text-[10px] font-mono text-zinc-500 uppercase mt-1.5 tracking-widest'>
                      Система не обнаружила совпадений по вашему запросу
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Hints */}
            <div className='p-4 bg-zinc-50/50 dark:bg-black/20 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center px-6'>
              <div className='flex gap-5 text-[9px] font-mono text-zinc-500 uppercase'>
                <span className='flex items-center gap-2'>
                  <kbd className='border border-zinc-300 dark:border-zinc-700 px-1.5 py-0.5 rounded shadow-sm bg-white dark:bg-zinc-900 font-sans'>
                    ↑↓
                  </kbd>
                  Навигация
                </span>
                <span className='flex items-center gap-2'>
                  <kbd className='border border-zinc-300 dark:border-zinc-700 px-1.5 py-0.5 rounded shadow-sm bg-white dark:bg-zinc-900 font-sans'>
                    ↵
                  </kbd>
                  Открыть
                </span>
              </div>
              <span className='text-[9px] font-mono text-brand-500 font-bold uppercase tracking-[0.2em] flex items-center gap-2'>
                <span className='w-1 h-1 rounded-full bg-brand-500 animate-pulse' />
                INDEX_READY
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
