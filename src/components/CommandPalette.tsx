
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from './AppContext';

const commands = [
  { name: 'Главная', path: '/', icon: '🏠' },
  { name: 'Услуги', path: '/services', icon: '🛠️' },
  { name: 'Интерактивы', path: '/interactives', icon: '⚡' },
  { name: 'Симулятор проекта', path: '/interactives?tool=simulator', icon: '🎯' },
  { name: 'Калькулятор бюджета', path: '/interactives?tool=calculator', icon: '📊' },
  { name: 'Карта рисков', path: '/interactives?tool=riskmap', icon: '🔥' },
  { name: 'О компании', path: '/about', icon: '🏢' },
  { name: 'Контакты', path: '/contacts', icon: '📞' },
];

export default function CommandPalette() {
  const { isCommandPaletteOpen, setCommandPaletteOpen } = useAppContext();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  const close = useCallback(() => {
    setCommandPaletteOpen(false);
    setQuery('');
    setSelectedIndex(0);
  }, [setCommandPaletteOpen]);

  const navigate = useCallback((path: string) => {
    window.location.hash = path;
    close();
  }, [close]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') close();
      
      if (isCommandPaletteOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }
        if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
          navigate(filteredCommands[selectedIndex].path);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, selectedIndex, filteredCommands, close, navigate, setCommandPaletteOpen]);

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-zoom-out"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] z-[210] overflow-hidden"
          >
            {/* Input Section */}
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-4">
              <span className="text-xl text-zinc-400">🔍</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Поиск по системе СЭТ..."
                className="w-full bg-transparent outline-none text-xl font-display font-medium py-1 placeholder:text-zinc-400"
              />
              <button 
                onClick={close}
                className="text-[10px] font-mono text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results Section */}
            <div className="max-h-[50vh] overflow-y-auto p-3 custom-scrollbar">
              {filteredCommands.length > 0 ? (
                <div className="space-y-1">
                  {filteredCommands.map((cmd, idx) => (
                    <button
                      key={cmd.path}
                      onClick={() => navigate(cmd.path)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between p-4 rounded-[20px] transition-all group ${
                        selectedIndex === idx 
                          ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-2xl transition-transform ${selectedIndex === idx ? 'scale-110' : ''}`}>
                          {cmd.icon}
                        </span>
                        <div className="text-left">
                          <span className="font-bold uppercase tracking-tight text-sm block leading-none">
                            {cmd.name}
                          </span>
                          <span className={`text-[9px] font-mono uppercase tracking-widest mt-1 block opacity-60`}>
                            {cmd.path}
                          </span>
                        </div>
                      </div>
                      {selectedIndex === idx && (
                        <div className="flex items-center gap-2">
                           <span className="text-[9px] font-mono font-bold opacity-60">SELECT</span>
                           <span className="text-xs">↵</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-16 text-center space-y-4">
                  <div className="text-4xl opacity-20">📂</div>
                  <div>
                    <p className="text-zinc-400 font-medium">Ничего не найдено</p>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase mt-1">Попробуйте другой поисковый запрос</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer / Hints */}
            <div className="p-4 bg-zinc-50/50 dark:bg-black/20 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center px-6">
              <div className="flex gap-5 text-[9px] font-mono text-zinc-500 uppercase">
                <span className="flex items-center gap-1.5">
                  <kbd className="border border-zinc-300 dark:border-zinc-700 px-1.5 py-0.5 rounded shadow-sm bg-white dark:bg-zinc-900">↑↓</kbd> 
                  Навигация
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="border border-zinc-300 dark:border-zinc-700 px-1.5 py-0.5 rounded shadow-sm bg-white dark:bg-zinc-900">ENTER</kbd> 
                  Открыть
                </span>
              </div>
              <span className="text-[9px] font-mono text-brand-500 font-bold uppercase tracking-[0.2em] animate-pulse">
                SET_PALETTE_READY
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
