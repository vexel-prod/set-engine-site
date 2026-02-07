
'use client';

import React from 'react';
import Link from 'next/link';
import { companyData } from '../data/company';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 py-16 z-[3]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 space-y-6 text-left">
            <Link href="/" className="inline-block">
              <span className="font-display font-bold text-2xl uppercase tracking-tighter">ООО «СЭТ»</span>
            </Link>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed text-left">
              Технологическая студия управления строительными и энергетическими проектами. Изыскания, проектирование и контроль.
            </p>
            <div className="flex items-center gap-3 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-2xl w-fit border border-zinc-200 dark:border-zinc-800">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
               <span className="text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
                 ИНН: {companyData.inn} — {companyData.last_verified_date}
               </span>
            </div>
          </div>

          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-900 dark:text-zinc-100">Навигация</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><Link href="/services" className="hover:text-brand-500 transition-colors">Услуги</Link></li>
              <li><Link href="/interactives" className="hover:text-brand-500 transition-colors">Инструменты</Link></li>
              <li><Link href="/about" className="hover:text-brand-500 transition-colors">О компании</Link></li>
              <li><Link href="/contacts" className="hover:text-brand-500 transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-zinc-900 dark:text-zinc-100">Документация</h4>
            <ul className="space-y-4 text-sm text-zinc-500 font-medium">
              <li><Link href="/approach" className="hover:text-brand-500 transition-colors">Методология</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-500 transition-colors">Конфиденциальность</Link></li>
              <li><Link href="/terms" className="hover:text-brand-500 transition-colors">Обработка заявок</Link></li>
              <li><span className="text-[10px] font-mono uppercase opacity-50 block mt-2">ОГРН: {companyData.ogrn}</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between gap-4 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
          <span>© {currentYear} ООО «СЭТ». Все права защищены.</span>
          <span>Control Room v1.0.4</span>
        </div>
      </div>
    </footer>
  );
}
