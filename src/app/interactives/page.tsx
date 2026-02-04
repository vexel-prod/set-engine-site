'use client'

import { useState, useEffect } from 'react'
import Simulator from '../../components/Simulator'
import Calculator from '../../components/Calculator'
import RiskMap from '../../components/RiskMap'

export default function InteractivesPage() {
  const [activeTool, setActiveTool] = useState('simulator')

  // Simple query simulation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const tool = params.get('tool')
    if (tool) setActiveTool(tool)
  }, [])

  const tools = [
    { id: 'simulator', name: 'Симулятор Проекта', icon: '🎯' },
    { id: 'calculator', name: 'Калькулятор Бюджета', icon: '📊' },
    { id: 'riskmap', name: 'Карта Рисков', icon: '⚡' },
  ]

  return (
    <div className='space-y-12 py-12'>
      <div className='text-center space-y-4'>
        <h1 className='text-5xl font-display font-bold uppercase tracking-tight'>
          Interactive Hub
        </h1>
        <p className='text-zinc-500 max-w-xl mx-auto'>
          Инструменты для принятия инженерных решений на основе данных.
        </p>
      </div>

      <div className='flex flex-wrap justify-center gap-3'>
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`px-8 py-4 rounded-2xl border font-bold transition-all flex items-center gap-3 ${
              activeTool === tool.id
                ? 'bg-brand-500 border-brand-500 text-white shadow-xl shadow-brand-500/20'
                : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-400'
            }`}
          >
            <span className='text-xl'>{tool.icon}</span>
            {tool.name}
          </button>
        ))}
      </div>

      <div className='bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[48px] p-8 md:p-12 overflow-hidden'>
        {activeTool === 'simulator' && <Simulator />}
        {activeTool === 'calculator' && <Calculator />}
        {activeTool === 'riskmap' && <RiskMap />}
      </div>
    </div>
  )
}
