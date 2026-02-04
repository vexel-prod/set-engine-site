'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ContactsPage() {
  const [sent, setSent] = useState(false)

  return (
    <div className='max-w-6xl mx-auto py-12 space-y-16'>
      <div className='grid md:grid-cols-2 gap-16'>
        <div className='space-y-8'>
          <h1 className='text-6xl font-display font-bold uppercase tracking-tighter'>Контакты</h1>

          {/* Office Photo (Image 1) */}
          <div className='relative aspect-[16/9] rounded-[32px] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 group shadow-lg'>
            <Image
              fill
              src='/gallery/contacts.png'
              alt='Our Workspace'
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
            <div className='absolute bottom-4 left-6'>
              <p className='text-[10px] font-mono text-brand-500 font-bold uppercase tracking-[0.2em] mb-1'>
                SET_BACKOFFICE_NODE
              </p>
              <p className='text-white font-bold text-sm'>Центр управления проектами</p>
            </div>
          </div>

          <p className='text-xl text-zinc-500 leading-relaxed font-medium'>
            Нужен инженерный аудит или расчет проекта? Мы на связи. Наш офис всегда открыт для
            обсуждения ваших идей.
          </p>
          <div className='space-y-4'>
            <div className='p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl'>
              <span className='text-[10px] font-mono text-zinc-400 uppercase block mb-1'>
                Офис в Москве
              </span>
              <p className='font-medium text-sm'>ул. Вешняковская, д. 31, кв. 323</p>
            </div>
            <div className='p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl'>
              <span className='text-[10px] font-mono text-zinc-400 uppercase block mb-1'>
                Режим работы
              </span>
              <p className='font-medium text-sm'>Пн — Пт, 09:00 — 18:00</p>
            </div>
          </div>
        </div>

        <div className='bg-white dark:bg-zinc-950 p-8 rounded-[48px] border border-zinc-200 dark:border-zinc-800 shadow-2xl relative overflow-hidden flex flex-col justify-center'>
          {sent ? (
            <div className='h-full flex flex-col items-center justify-center text-center space-y-6 py-12'>
              <div className='w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-4xl shadow-xl shadow-emerald-500/20'>
                ✓
              </div>
              <h3 className='text-2xl font-bold uppercase font-display'>Заявка Отправлена</h3>
              <p className='text-zinc-500'>Специалист СЭТ свяжется с вами в ближайшее время.</p>
              <button
                onClick={() => setSent(false)}
                className='text-brand-500 font-mono text-xs uppercase hover:underline'
              >
                Отправить еще одну
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
              className='space-y-6'
            >
              <h3 className='text-2xl font-display font-bold uppercase mb-4'>Написать нам</h3>
              <div className='space-y-2'>
                <label className='text-[10px] font-mono uppercase text-zinc-400'>Ваше имя</label>
                <input
                  required
                  className='w-full p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-brand-500 outline-none transition-all'
                />
              </div>
              <div className='space-y-2'>
                <label className='text-[10px] font-mono uppercase text-zinc-400'>
                  Телефон или Email
                </label>
                <input
                  required
                  className='w-full p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-brand-500 outline-none transition-all'
                />
              </div>
              <div className='space-y-2'>
                <label className='text-[10px] font-mono uppercase text-zinc-400'>
                  Суть запроса
                </label>
                <textarea className='w-full p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl h-32 focus:border-brand-500 outline-none transition-all resize-none' />
              </div>
              <button className='w-full py-5 bg-brand-500 text-white font-bold rounded-2xl hover:bg-brand-600 transition-all shadow-xl shadow-brand-500/20 uppercase tracking-widest text-[10px]'>
                Отправить запрос в SET_ROOM
              </button>
              <p className='text-[9px] text-zinc-500 text-center uppercase font-mono tracking-tighter'>
                Обработка данных производится согласно ФЗ-152
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
