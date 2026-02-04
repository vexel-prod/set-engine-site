'use client'

import React, { useEffect, useState, useCallback } from 'react'
import type { Theme } from '../types/types'

type Props = {
  /** ключ для localStorage */
  storageKey?: string
  /** стартовая тема, если в localStorage ничего нет */
  defaultTheme?: Theme
  /** коллбек, если хочешь синхронизировать с контекстом (опционально) */
  onThemeChange?: (theme: Theme) => void
  /** классы для кнопки */
  className?: string
}

/**
 * Рабочий переключатель тем для Next.js + Tailwind v4.
 * Ставит/снимает класс `dark` на <html>, сохраняет в localStorage.
 *
 * ВАЖНО: в globals.css должен быть:
 * @custom-variant dark (&:where(.dark, .dark *));
 */
export default function ThemeToggle({
  storageKey = 'theme',
  defaultTheme = 'dark',
  onThemeChange,
  className = '',
}: Props) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  // 1) прочитать сохранённую тему на клиенте
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey) as Theme | null
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved)
      } else {
        setTheme(defaultTheme)
      }
    } catch {
      setTheme(defaultTheme)
    } finally {
      setMounted(true)
    }
  }, [storageKey, defaultTheme])

  // 2) применить к DOM + сохранить
  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement

    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme // чтобы системные контролы/скроллбар корректно выглядели

    try {
      localStorage.setItem(storageKey, theme)
    } catch {}

    onThemeChange?.(theme)
  }, [theme, mounted, storageKey, onThemeChange])

  const toggle = useCallback(() => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  }, [])

  // чтобы не было "мигания" и рассинхрона до маунта
  if (!mounted) {
    return (
      <div
        className={[
          'w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800',
          'opacity-0 pointer-events-none',
          className,
        ].join(' ')}
        aria-hidden='true'
      />
    )
  }

  return (
    <button
      type='button'
      onClick={toggle}
      className={[
        'w-10 h-10 flex items-center justify-center rounded-xl',
        'border border-zinc-200 dark:border-zinc-800',
        'hover:bg-zinc-50 dark:hover:bg-zinc-900',
        'transition-colors',
        className,
      ].join(' ')}
      aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
      title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  )
}
