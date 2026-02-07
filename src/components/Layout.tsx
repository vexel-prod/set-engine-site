
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from './AppContext';
import { companyData } from '../data/company';
import CommandPalette from './CommandPalette';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, toggleTheme, techMode, setTechMode } = useAppContext();
  const location = useLocation();

  const navLinks = [
    { name: 'Услуги', path: '/services' },
    { name: 'Решения', path: '/solutions' },
    { name: 'Подход', path: '/approach' },
    { name: 'Интерактивы', path: '/interactives' },
  ];

  return (
    <div className={`min-h-screen ${techMode ? 'tech-grid cursor-crosshair' : ''}`}>
      {techMode && <div className="tech-scanline" />}
      
      <header className="sticky top-0 z-[60] bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-500 flex items-center justify-center rounded-lg group-hover:rotate-45 transition-transform duration-300">
              <span className="text-white font-bold text-xs">SET</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tighter uppercase hidden sm:block">СЭТ</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-brand-500 ${location.pathname === link.path ? 'text-brand-500' : 'text-zinc-500 dark:text-zinc-400'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
             <button 
              onClick={() => setTechMode(!techMode)}
              className={`p-2 rounded-lg border text-[10px] font-mono uppercase transition-all ${techMode ? 'bg-brand-500/10 border-brand-500 text-brand-500' : 'border-zinc-200 dark:border-zinc-800 text-zinc-500'}`}
              title="Tech Mode"
            >
              Tech
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="bg-zinc-950 dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-xs font-bold font-mono uppercase hidden sm:block hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all">
              Ctrl+K
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {children}
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <Link to="/" className="inline-block mb-6">
                <span className="font-display font-bold text-2xl tracking-tighter uppercase">СЭТ</span>
              </Link>
              <p className="text-zinc-500 text-sm max-w-sm mb-6">
                Технологический партнер в управлении строительными рисками и энергетическими проектами. ООО «СЭТ», ИНН 7720946228.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-200 dark:bg-zinc-900 rounded-full border border-zinc-300 dark:border-zinc-800">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400">Данные подтверждены: {companyData.last_verified_date}</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-sm uppercase mb-6 tracking-widest">Навигация</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><Link to="/services" className="hover:text-brand-500">Услуги</Link></li>
                <li><Link to="/solutions" className="hover:text-brand-500">Решения</Link></li>
                <li><Link to="/approach" className="hover:text-brand-500">Подход</Link></li>
                <li><Link to="/about" className="hover:text-brand-500">О компании</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-sm uppercase mb-6 tracking-widest">Документация</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><Link to="/privacy" className="hover:text-brand-500">Политика конфиденциальности</Link></li>
                <li><Link to="/terms" className="hover:text-brand-500">Согласие на обработку</Link></li>
                <li><Link to="/contacts" className="hover:text-brand-500">Связаться с нами</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between gap-4 text-[10px] font-mono text-zinc-500 uppercase">
            <span>© 2025 ООО «СЭТ». Все права защищены.</span>
            <div className="flex gap-6">
              <span>INN: 7720946228</span>
              <span>OGRN: 1257700108852</span>
            </div>
          </div>
        </div>
      </footer>

      <CommandPalette />
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl border border-zinc-800 rounded-2xl px-6 py-4 flex items-center gap-8 z-[100]">
        <Link to="/"><svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></Link>
        <Link to="/interactives"><svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></Link>
        <Link to="/contacts"><svg className="w-6 h-6 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></Link>
      </nav>
    </div>
  );
};

export default Layout;
