
'use client';

import React from 'react';

export default function TermsContent() {
  return (
    <div className="max-w-4xl mx-auto py-12 space-y-16 text-left">
      <header className="space-y-4 border-b border-zinc-200 dark:border-zinc-800 pb-12">
        <h1 className="text-5xl font-display font-bold uppercase tracking-tighter">Обработка <br/><span className="text-zinc-400">Заявок</span></h1>
        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Регламент взаимодействия с клиентом</p>
      </header>

      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-2xl font-display font-bold uppercase">1. Жизненный цикл заявки</h2>
          <div className="grid gap-4">
            {[
              { time: '0-15 мин', label: 'Регистрация', desc: 'Автоматическое присвоение ID и уведомление ответственного инженера.' },
              { time: '1-3 часа', label: 'Первичный скоринг', desc: 'Анализ задачи на предмет технической возможности реализации.' },
              { time: 'До 24 ч', label: 'Feedback', desc: 'Прямой контакт специалиста для уточнения деталей ТЗ.' }
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-6 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                <div className="text-center min-w-[80px]">
                  <div className="text-brand-500 font-bold font-mono text-xs uppercase">{step.time}</div>
                </div>
                <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800" />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm uppercase">{step.label}</h4>
                  <p className="text-xs text-zinc-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 text-left">
          <h2 className="text-2xl font-display font-bold uppercase">2. Согласие на обработку</h2>
          <div className="p-10 border border-zinc-200 dark:border-zinc-800 rounded-[40px] space-y-6 text-zinc-500 text-sm leading-relaxed">
            <p>
              Нажимая кнопку «Отправить» или «Заказать аудит» на любом из разделов сайта, вы даете свое полное согласие ООО «СЭТ» (ИНН 7720946228) на автоматизированную обработку предоставленных данных.
            </p>
            <p>
              Ваши данные используются исключительно для подготовки КП, проведения расчетов и связи по техническим деталям.
            </p>
            <p className="font-bold text-zinc-900 dark:text-zinc-100">
              Срок действия согласия: бессрочно или до момента получения письменного отзыва на почту.
            </p>
          </div>
        </section>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 p-8 bg-brand-500/5 border border-brand-500/20 rounded-3xl">
            <h4 className="font-bold text-brand-500 uppercase text-xs mb-2">Гарантия SLA</h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">Мы гарантируем ответ на 95% заявок в течение рабочего дня. Если вы не получили ответ — ваша заявка находится в глубоком техническом анализе.</p>
          </div>
          <div className="flex-1 p-8 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
            <h4 className="font-bold uppercase text-xs mb-2">Хранение данных</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">Данные хранятся в защищенной CRM-системе на серверах, расположенных на территории РФ.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
