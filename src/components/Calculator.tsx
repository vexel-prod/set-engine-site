'use client'

import React, { useState } from 'react'

const Calculator: React.FC = () => {
  const [formData, setFormData] = useState({
    type: 'industrial',
    area: 5000,
    region: 'moscow',
    services: [] as string[],
    urgency: 'normal',
  })

  const baseRate = formData.type === 'industrial' ? 4500 : 3200
  const regionMultiplier = formData.region === 'moscow' ? 1.2 : 1.0
  const urgencyMultiplier = formData.urgency === 'urgent' ? 1.5 : 1.0

  const estimatedMin =
    (formData.area * baseRate * regionMultiplier * urgencyMultiplier * 0.9) / 1000000
  const estimatedMax =
    (formData.area * baseRate * regionMultiplier * urgencyMultiplier * 1.1) / 1000000

  const estimatedMonths =
    Math.ceil(formData.area / 1000) * (formData.urgency === 'urgent' ? 0.7 : 1)

  return (
    <div className='grid lg:grid-cols-2 gap-12 items-start bg-zinc-900 border border-zinc-800 p-8 rounded-3xl'>
      <div className='space-y-6'>
        <h3 className='text-2xl font-bold font-display'>Параметры проекта</h3>

        <div>
          <label className='block text-sm text-zinc-500 mb-2 font-mono uppercase'>
            Тип объекта
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className='w-full bg-black border border-zinc-800 rounded-xl p-3 focus:border-brand-500 outline-none'
          >
            <option value='industrial'>Промышленный комплекс</option>
            <option value='energy'>Энергетический узел</option>
            <option value='civil'>Гражданское строительство</option>
          </select>
        </div>

        <div>
          <label className='block text-sm text-zinc-500 mb-2 font-mono uppercase'>
            Площадь (м²): {formData.area}
          </label>
          <input
            type='range'
            min='500'
            max='50000'
            step='500'
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })}
            className='w-full accent-brand-500 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer'
          />
        </div>

        <div>
          <label className='block text-sm text-zinc-500 mb-2 font-mono uppercase'>Регион</label>
          <div className='grid grid-cols-2 gap-2'>
            {['moscow', 'region'].map((r) => (
              <button
                key={r}
                onClick={() => setFormData({ ...formData, region: r })}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.region === r ? 'bg-brand-500 border-brand-500 text-white' : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
              >
                {r === 'moscow' ? 'Москва / МО' : 'Регионы РФ'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className='block text-sm text-zinc-500 mb-2 font-mono uppercase'>Срочность</label>
          <div className='grid grid-cols-2 gap-2'>
            {['normal', 'urgent'].map((u) => (
              <button
                key={u}
                onClick={() => setFormData({ ...formData, urgency: u })}
                className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.urgency === u ? 'bg-zinc-100 text-zinc-950 border-zinc-100' : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}
              >
                {u === 'normal' ? 'Стандарт' : 'Сжатые сроки'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='bg-black/50 p-8 rounded-2xl border border-brand-500/20 flex flex-col justify-center min-h-[400px]'>
        <div className='text-center space-y-8'>
          <div>
            <span className='text-sm font-mono text-zinc-500 uppercase tracking-widest block mb-4'>
              Оценочный бюджет
            </span>
            <div className='text-4xl md:text-5xl font-bold font-display text-white mb-2'>
              {estimatedMin.toFixed(1)} – {estimatedMax.toFixed(1)}{' '}
              <span className='text-2xl text-zinc-500 font-normal'>млн ₽</span>
            </div>
            <p className='text-xs text-zinc-500 mt-2'>
              * Расчет носит предварительный характер и не является офертой
            </p>
          </div>

          <div className='h-px bg-zinc-800 w-full mx-auto' />

          <div>
            <span className='text-sm font-mono text-zinc-500 uppercase tracking-widest block mb-4'>
              Срок реализации
            </span>
            <div className='text-4xl font-bold font-display text-brand-500'>
              {estimatedMonths} – {Math.ceil(estimatedMonths * 1.4)}{' '}
              <span className='text-xl font-normal text-zinc-500 uppercase tracking-tighter'>
                Мес.
              </span>
            </div>
          </div>

          <button className='w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-brand-100 transition-all flex items-center justify-center gap-2 group'>
            Получить детализацию в JSON
            <svg
              className='w-4 h-4 group-hover:translate-x-1 transition-transform'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Calculator
