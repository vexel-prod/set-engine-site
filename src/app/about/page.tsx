'use client'

import Image from 'next/image'
import { CompanyData } from '@/types/types'

const company: CompanyData = {
  full_name: 'Общество с ограниченной ответственностью «Строительство и Энергетические Технологии»',
  short_name: 'ООО «СЭТ»',
  inn: '7720946228',
  ogrn: '1257700108852',
  reg_date: '07.03.2025',
  legal_address:
    'г. Москва, вн.тер. г. Муниципальный округ Вешняки, ул. Вешняковская, д. 31, кв. 323',
  ceo: 'Орлов Евгений Владимирович',
  okved_main: '71.12',
  last_verified_date: '2024-05-20',
}

export default function AboutPage() {
  return (
    <div className='max-w-6xl mx-auto py-12 space-y-24'>
      <div className='grid lg:grid-cols-2 gap-16 items-start'>
        <div className='space-y-12'>
          <h1 className='text-6xl font-display font-bold uppercase tracking-tighter'>О компании</h1>

          <div className='relative aspect-video rounded-[32px] overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 group'>
            {/* Офисное фото (Image 1) */}
            <Image
              fill
              src='/gallery/office.jpeg'
              alt='SET Office HQ'
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100'
            />
            <div className='absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-white uppercase tracking-widest border border-white/10'>
              HQ_OPERATIONS_CENTER
            </div>
          </div>

          <p className='text-xl text-zinc-500 leading-relaxed font-medium'>
            СЭТ — это синергия классического строительства и современных энергетических технологий.
            Мы создаем прозрачные процессы управления для крупных промышленных и гражданских
            объектов.
          </p>

          <div className='p-8 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl space-y-6'>
            <h3 className='text-xl font-bold uppercase font-display tracking-tight'>
              Наши ценности
            </h3>
            <div className='space-y-4'>
              <div className='flex gap-4'>
                <span className='text-brand-500 font-mono font-bold'>01</span>
                <p className='text-zinc-600 dark:text-zinc-400 text-sm'>
                  <strong className='text-zinc-900 dark:text-zinc-100'>
                    Данные превыше всего.
                  </strong>{' '}
                  Мы не гадаем, мы измеряем каждый сантиметр отклонения.
                </p>
              </div>
              <div className='flex gap-4'>
                <span className='text-brand-500 font-mono font-bold'>02</span>
                <p className='text-zinc-600 dark:text-zinc-400 text-sm'>
                  <strong className='text-zinc-900 dark:text-zinc-100'>Оперативность.</strong>{' '}
                  Реагируем на риски до того, как они станут финансовыми проблемами.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='space-y-8'>
          <div className='bg-black text-white p-10 rounded-[48px] border border-zinc-800 space-y-10 relative overflow-hidden shadow-2xl'>
            <div className='flex justify-between items-center border-b border-zinc-800 pb-8'>
              <div>
                <h2 className='text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 mb-2'>
                  Legal Status
                </h2>
                <p className='text-emerald-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2'>
                  <span className='w-2 h-2 bg-emerald-500 rounded-full' /> Verified Active
                </p>
              </div>

              <svg
                className='w-32 h-32'
                viewBox='0 0 100 100'
                fill='currentColor'
                opacity={.2}
              >
                <circle
                  cx='50'
                  cy='50'
                  r='40'
                  stroke='white'
                  strokeWidth='1'
                  fill='none'
                  strokeDasharray='5 5'
                />
              </svg>
            </div>

            <div className='grid gap-6'>
              {[
                { label: 'Наименование', value: company.full_name },
                { label: 'ИНН', value: company.inn },
                { label: 'ОГРН', value: company.ogrn },
                { label: 'Руководитель', value: company.ceo },
                { label: 'Адрес', value: company.legal_address },
                { label: 'Регистрация', value: company.reg_date },
              ].map((item, i) => (
                <div key={i}>
                  <span className='text-[10px] font-mono uppercase text-zinc-600 mb-1 block'>
                    {item.label}
                  </span>
                  <p className='text-sm font-medium leading-relaxed'>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {/* Фото техники (Image 3 / Image 6) */}
            <div className='aspect-square rounded-[32px] overflow-hidden border border-zinc-800 relative bg-zinc-900 group'>
              <Image
                fill
                src='/gallery/tech-3.jpeg'
                alt='Hangil Crane'
                className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
              />
              <div className='absolute top-3 right-3 text-[8px] font-mono text-white/50'>
                TECH_ASSET_77
              </div>
            </div>
            <div className='aspect-square rounded-[32px] overflow-hidden border border-zinc-800 relative bg-zinc-900 group'>
              <Image
                fill
                src='/gallery/tech-2.jpeg'
                alt='High work'
                className='w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
              />
              <div className='absolute top-3 right-3 text-[8px] font-mono text-white/50'>
                FIELD_OPS_BIM
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
