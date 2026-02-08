'use client'

import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppContext } from './AppContext'

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
  const isDisabled = pathname === href

  return (
    <Link
      href={isDisabled ? '#' : href}
      onClick={(e) => {
        if (isDisabled) {
          e.preventDefault()
          e.stopPropagation()
          return
        }
        onNavigate?.()
      }}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : 0}
      className={`${className ?? ''} ${isDisabled ? disabledClassName : ''}`}
    >
      {children}
    </Link>
  )
}

function NavLink({
  href,
  children,
  onNavigate,
}: {
  href: string
  children: React.ReactNode
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <GuardedLink
      href={href}
      onNavigate={onNavigate}
      disabledClassName='pointer-events-none opacity-60'
      className={`w-1/2 md:w-max md:border-none text-center rounded-md border active:border-brand-500 py-1 px-2 text-xs font-bold uppercase tracking-widest transition-colors ${
        isActive ? 'text-brand-500' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
      }`}
    >
      {children}
    </GuardedLink>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 22)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const { toggleTheme, techMode, setTechMode, theme, setCommandPaletteOpen } = useAppContext()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const links = useMemo(
    () => [
      { name: 'Услуги', href: '/services' },
      { name: 'Интерактивы', href: '/interactives' },
      { name: 'О компании', href: '/about' },
      { name: 'Контакты', href: '/contacts' },
    ],
    [],
  )

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={`sticky top-0 z-100 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 backdrop-blur-2xl transition-all' ${
        scrolled
          ? 'dark:bg-zinc-950/50 transition-all duration-150 border-none shadow-lg shadow-base-300/20'
          : ''
      }`}
    >
      <div className='container mx-auto px-4 h-20 flex items-center justify-between'>
        <GuardedLink
          href='/'
          className='flex items-center gap-3 group'
          disabledClassName='pointer-events-none opacity-60'
        >
          <div className='w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12'>
            <Image
              src='/logo/logo.svg'
              width={30}
              height={30}
              alt='Logotype'
              className='w-7.5 h-7.5'
            />
          </div>

          <div className='flex flex-col'>
            <span className='font-bold uppercase tracking-wider'>ООО «СЭТ»</span>
            <span className='text-[8px] uppercase tracking-[0.2em] text-zinc-500'>
              ENGINEERING HUB
            </span>
          </div>
        </GuardedLink>

        {/* Desktop nav */}
        <nav className='hidden md:flex items-center gap-8'>
          {links.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
            >
              {l.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => setCommandPaletteOpen(true)}
            className='hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40 hover:bg-white dark:hover:bg-black transition-colors'
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
            className='inline-flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40 hover:bg-white dark:hover:bg-black transition-colors'
            aria-label='Переключить тему'
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type='button'
            onClick={() => setTechMode(!techMode)}
            className={`hidden sm:inline-flex items-center justify-center px-3 h-10 rounded-xl border transition-colors ${
              techMode
                ? 'border-brand-500/40 bg-brand-500/10 text-brand-500'
                : 'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40 hover:bg-white dark:hover:bg-black'
            }`}
            aria-label='Переключить Tech Mode'
          >
            <span className='text-xs font-bold uppercase tracking-widest'>Tech</span>
          </button>

          {/* Mobile menu */}
          <button
            type='button'
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className='md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40 hover:bg-white dark:hover:bg-black transition-colors'
            aria-label='Открыть меню'
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {isMobileMenuOpen && (
        <div className='md:hidden border-t border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-black/80 backdrop-blur-2xl'>
          <nav className='container items-center mx-auto px-4 py-6 flex flex-col gap-4'>
            {links.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                onNavigate={closeMobileMenu}
              >
                {l.name}
              </NavLink>
            ))}
            <button
              type='button'
              onClick={() => setTechMode(!techMode)}
              className={`sm:inline-flex items-center justify-center px-3 h-10 rounded-xl border transition-colors ${
                techMode
                  ? 'border-brand-500/40 bg-brand-500/10 text-brand-500'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-black/40 hover:bg-white dark:hover:bg-black'
              }`}
              aria-label='Переключить Tech Mode'
            >
              <span className='text-xs font-bold uppercase tracking-widest'>Tech</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
