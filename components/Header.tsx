'use client'

import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppContext } from './AppContext'

type NavItem = { name: string; href: string }

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function isActivePath(pathname: string, href: string) {
  const norm = (p: string) => {
    if (!p) return '/'
    if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1)
    return p
  }

  const p = norm(pathname)
  const h = norm(href)

  if (h === '/') return p === '/'
  return p === h || p.startsWith(h + '/')
}

function GuardedLink({
  href,
  children,
  className,
  onNavigate,
  disabledClassName = 'pointer-events-none opacity-60',
}: {
  href: string
  children: React.ReactNode
  className?: string
  onNavigate?: () => void
  disabledClassName?: string
}) {
  const pathname = usePathname()
  const disabled = isActivePath(pathname, href)

  return (
    <Link
      // важно: для активного пункта оставляем href реальным (не '#'),
      // чтобы не ломать классы/состояния и не мешать поведению роутера
      href={href}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault()
          e.stopPropagation()
          onNavigate?.() // закрыть меню можно и при клике по активному пункту
          return
        }
        onNavigate?.()
      }}
      aria-current={disabled ? 'page' : undefined}
      aria-disabled={disabled || undefined}
      tabIndex={0}
      className={cn(className, disabled && disabledClassName)}
    >
      {children}
    </Link>
  )
}

function NavLink({
  item,
  onNavigate,
  variant,
}: {
  item: NavItem
  onNavigate?: () => void
  variant: 'desktop' | 'mobile'
}) {
  const pathname = usePathname()
  const active = isActivePath(pathname, item.href)

  if (variant === 'mobile') {
    return (
      <GuardedLink
        href={item.href}
        onNavigate={onNavigate}
        disabledClassName='' // на мобилке не делаем «серым» активный пункт
        className={cn(
          'w-full flex items-center justify-between rounded-2xl px-4 py-3 border transition-colors',
          'bg-white/70 dark:bg-black/40 backdrop-blur',
          active
            ? 'border-brand-500/60 bg-brand-500/10 text-brand-500'
            : 'border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-white dark:hover:bg-black',
        )}
      >
        <span className='text-sm font-bold uppercase tracking-widest'>{item.name}</span>

        <span
          className={cn(
            'text-[10px] px-2 py-1 rounded-full border',
            active
              ? 'border-brand-500/40 text-brand-500'
              : 'border-zinc-200 dark:border-zinc-800 text-zinc-500',
          )}
        >
          {active ? 'Вы здесь' : 'Открыть'}
        </span>
      </GuardedLink>
    )
  }

  return (
    <GuardedLink
      href={item.href}
      onNavigate={onNavigate}
      disabledClassName='' // на десктопе тоже не «гасим» активный пункт
      className={cn(
        'relative inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-widest transition-colors',
        active ? 'text-brand-500' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100',
      )}
    >
      {item.name}
      <span
        aria-hidden
        className={cn(
          'absolute -bottom-1 left-2 right-2 h-[2px] rounded-full transition-opacity',
          active ? 'opacity-100 bg-brand-500' : 'opacity-0 bg-brand-500',
        )}
      />
    </GuardedLink>
  )
}

export default function Header() {
  const pathname = usePathname()
  const { toggleTheme, techMode, setTechMode, theme, setCommandPaletteOpen } = useAppContext()

  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const links = useMemo<NavItem[]>(
    () => [
      { name: 'Услуги', href: '/services' },
      { name: 'Интерактивы', href: '/interactives' },
      { name: 'О компании', href: '/about' },
      { name: 'Контакты', href: '/contacts' },
    ],
    [],
  )

  // тень при скролле
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // закрывать бургер на любой навигации (смене pathname)
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // ESC закрывает бургер
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const openCommandPalette = () => {
    closeMobileMenu() // важно: закрыть бургер если открываем поиск/инструменты
    setCommandPaletteOpen(true)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-100 border-b border-zinc-200 dark:border-zinc-800',
        'bg-zinc-50/80 dark:bg-zinc-950/70 backdrop-blur-2xl transition-all',
        scrolled && 'shadow-lg shadow-base-300/10',
      )}
    >
      <div className='container mx-auto px-4 h-20 flex items-center justify-between'>
        <GuardedLink
          href='/'
          className='flex items-center gap-3 group'
        >
          <div className='w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12'>
            <Image
              src='/logo/logo.svg'
              width={30}
              height={30}
              alt='Logotype'
              className='w-7.5 h-7.5'
            />
          </div>

          <div className='flex flex-col leading-tight'>
            <span className='font-bold uppercase tracking-wider'>ООО «СЭТ»</span>
            <span className='text-[8px] uppercase tracking-[0.2em] text-zinc-500'>
              ENGINEERING HUB
            </span>
          </div>
        </GuardedLink>

        {/* Desktop nav */}
        <nav className='hidden md:flex items-center gap-6'>
          {links.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              variant='desktop'
            />
          ))}
        </nav>

        {/* Actions */}
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={openCommandPalette}
            className={cn(
              'hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-2xl border',
              'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40',
              'hover:bg-white dark:hover:bg-black transition-colors',
            )}
            aria-label='Открыть поиск (Cmd/Ctrl+K)'
          >
            <Search size={16} />
            <span className='text-xs text-zinc-500'>Поиск</span>
            <span className='ml-2 text-[10px] text-zinc-400 border border-zinc-200 dark:border-zinc-800 rounded-md px-1.5 py-0.5'>
              ⌘K
            </span>
          </button>

          <button
            type='button'
            onClick={() => toggleTheme()}
            className={cn(
              'inline-flex items-center justify-center w-10 h-10 rounded-2xl border',
              'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40',
              'hover:bg-white dark:hover:bg-black transition-colors',
            )}
            aria-label='Переключить тему'
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type='button'
            onClick={() => setTechMode(!techMode)}
            className={cn(
              'hidden sm:inline-flex items-center justify-center px-3 h-10 rounded-2xl border transition-colors',
              techMode
                ? 'border-brand-500/40 bg-brand-500/10 text-brand-500'
                : 'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40 hover:bg-white dark:hover:bg-black',
            )}
            aria-label='Переключить Tech Mode'
          >
            <span className='text-xs font-bold uppercase tracking-widest'>Tech</span>
          </button>

          {/* Mobile menu button */}
          <button
            type='button'
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className={cn(
              'md:hidden inline-flex items-center justify-center w-10 h-10 rounded-2xl border transition-colors',
              isMobileMenuOpen
                ? 'border-brand-500/40 bg-brand-500/10 text-brand-500'
                : 'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40 hover:bg-white dark:hover:bg-black',
            )}
            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={isMobileMenuOpen}
            aria-controls='mobile-nav'
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay + sheet */}
      <div
        className={cn(
          'md:hidden',
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        {/* Overlay */}
        <div
          className={cn(
            'fixed inset-0 z-90 transition-opacity',
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0',
            'bg-black/30 dark:bg-black/50',
          )}
          onClick={closeMobileMenu}
          aria-hidden
        />

        {/* Sheet */}
        <div
          id='mobile-nav'
          className='fixed left-0 right-0 top-0 z-100 pt-20'
        >
          <div
            className={cn(
              'mx-4 mt-2 rounded-3xl border',
              'border-zinc-200 dark:border-zinc-800',
              'bg-zinc-50/95 dark:bg-zinc-950/90 backdrop-blur-2xl',
              'shadow-2xl shadow-black/10',
              'transition-transform transition-opacity duration-200',
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0',
            )}
          >
            <div className='p-4'>
              <div className='flex items-center justify-between gap-3'>
                <div className='min-w-0'>
                  <div className='text-xs font-bold uppercase tracking-widest text-zinc-500'>
                    Меню
                  </div>
                  <div className='text-sm text-zinc-900 dark:text-zinc-100 truncate'>
                    {links.find((l) => isActivePath(pathname, l.href))?.name ?? 'Навигация'}
                  </div>
                </div>

                <button
                  type='button'
                  onClick={closeMobileMenu}
                  className={cn(
                    'inline-flex items-center justify-center w-10 h-10 rounded-2xl border',
                    'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40',
                    'hover:bg-white dark:hover:bg-black transition-colors',
                  )}
                  aria-label='Закрыть меню'
                >
                  <X size={18} />
                </button>
              </div>

              <div className='mt-4 grid gap-3'>
                {links.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    variant='mobile'
                    onNavigate={closeMobileMenu}
                  />
                ))}
              </div>

              <div className='mt-4 pt-4 border-t border-zinc-200/70 dark:border-zinc-800/70 flex items-center gap-2'>
                <button
                  type='button'
                  onClick={() => setTechMode(!techMode)}
                  className={cn(
                    'flex-1 inline-flex items-center justify-center h-11 rounded-2xl border transition-colors',
                    techMode
                      ? 'border-brand-500/40 bg-brand-500/10 text-brand-500'
                      : 'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40 hover:bg-white dark:hover:bg-black',
                  )}
                  aria-label='Переключить Tech Mode'
                >
                  <span className='text-xs font-bold uppercase tracking-widest'>Tech</span>
                </button>

                <button
                  type='button'
                  onClick={() => toggleTheme()}
                  className={cn(
                    'w-11 h-11 inline-flex items-center justify-center rounded-2xl border transition-colors',
                    'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40 hover:bg-white dark:hover:bg-black',
                  )}
                  aria-label='Переключить тему'
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                <button
                  type='button'
                  onClick={openCommandPalette}
                  className={cn(
                    'w-11 h-11 inline-flex items-center justify-center rounded-2xl border transition-colors',
                    'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40 hover:bg-white dark:hover:bg-black',
                  )}
                  aria-label='Открыть поиск'
                >
                  <Search size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
