
'use client';

import React, { useState } from 'react';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useAppContext } from './AppContext';

// Using React.FC to properly handle children and internal React props like key
const CustomLink: React.FC<{ href: string, children: React.ReactNode, onClick?: () => void }> = ({ href, children, onClick }) => {
  const currentPath = typeof window !== 'undefined' ? window.location.hash.replace('#', '') || '/' : '/';
  const isActive = currentPath === href;
  
  return (
    <a 
      href={`#${href}`}
      className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-brand-500' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
      onClick={(e) => {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          window.location.hash = href;
          if (onClick) onClick();
        }
      }}
    >
      {children}
    </a>
  );
};

export default function Header() {
  const { toggleTheme, techMode, setTechMode, theme, setCommandPaletteOpen } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: 'Услуги', href: '/services' },
    { name: 'Интерактивы', href: '/interactives' },
    { name: 'О компании', href: '/about' },
    { name: 'Контакты', href: '/contacts' },
  ];

  return (
    <header className="sticky top-0 z-[100] bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-b border-zinc-100 dark:border-zinc-800 transition-all">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <a href="#/" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); window.location.hash = '/'; }}>
          <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-white font-bold text-xs uppercase tracking-tighter">СЭТ</span>
          </div>
          <div className="hidden xs:block">
            <h1 className="font-display font-bold text-xl uppercase tracking-tighter leading-none">СЭТ</h1>
            <p className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-1 leading-none">Energy Tech</p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <CustomLink key={link.href} href={link.href}>
              {link.name}
            </CustomLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-brand-500 transition-colors group cursor-pointer"
          >
             <Search className="w-4 h-4 text-zinc-400 group-hover:text-brand-500 transition-colors" />
             <span className="hidden sm:inline text-[10px] font-mono text-zinc-400 group-hover:text-brand-500 transition-colors">ПОИСК [⌘+k]</span>
          </button>

          <button 
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button 
            onClick={() => setTechMode(!techMode)}
            className={`hidden sm:block px-3 py-2 rounded-xl border text-[10px] font-mono uppercase transition-all ${
              techMode 
                ? 'bg-brand-500 border-brand-500 text-white shadow-[0_0_15px_rgba(20,184,166,0.3)]' 
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-zinc-400'
            }`}
          >
            Tech
          </button>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-zinc-600 dark:text-zinc-300"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-b border-zinc-100 dark:border-zinc-800 overflow-hidden py-8">
          <div className="container mx-auto px-4 flex flex-col gap-6">
            {links.map((link) => (
              <CustomLink key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                <span className="text-2xl font-display font-bold uppercase">{link.name}</span>
              </CustomLink>
            ))}
            <button 
              onClick={() => { setTechMode(!techMode); setIsMobileMenuOpen(false); }}
              className={`py-4 rounded-2xl border text-xs font-mono uppercase transition-all flex items-center justify-center gap-2 ${
                techMode ? 'bg-brand-500 text-white' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500'
              }`}
            >
              Технологический режим
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
