
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const risks = [
  { id: 'R1', title: 'Срыв сроков поставки оборудования', cat: 'Логистика', sev: 'P1' },
  { id: 'R2', title: 'Коллизии в инженерных сетях', cat: 'Проектирование', sev: 'P1' },
  { id: 'R3', title: 'Превышение сметного лимита', cat: 'Экономика', sev: 'P2' },
  { id: 'R4', title: 'Недостаточная квалификация персонала', cat: 'HR', sev: 'P2' },
  { id: 'R5', title: 'Изменения в нормативной базе', cat: 'GR', sev: 'P3' },
  { id: 'R6', title: 'Нарушение техники безопасности', cat: 'Охрана труда', sev: 'P1' }
];

const RiskMap: React.FC = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleRisk = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const getPriorityColor = (sev: string) => {
    if (sev === 'P1') return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
    if (sev === 'P2') return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {risks.map(risk => (
          <button
            key={risk.id}
            onClick={() => toggleRisk(risk.id)}
            className={`p-6 text-left rounded-2xl border transition-all relative overflow-hidden group ${
              selected.includes(risk.id) 
                ? 'bg-zinc-100 border-zinc-100 text-zinc-950' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
            }`}
          >
            <div className={`text-[10px] font-mono px-2 py-0.5 rounded-full border w-fit mb-3 ${getPriorityColor(risk.sev)}`}>
              {risk.sev} | {risk.cat}
            </div>
            <h4 className="font-bold leading-tight">{risk.title}</h4>
            <div className={`absolute bottom-2 right-4 text-4xl font-mono opacity-10 ${selected.includes(risk.id) ? 'opacity-20' : ''}`}>
              {risk.id}
            </div>
          </button>
        ))}
      </div>

      {selected.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8 bg-black border border-zinc-800 rounded-3xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Анализ выбранного профиля рисков</h3>
              <p className="text-zinc-500 text-sm">Мы сформировали базовый план компенсационных мероприятий для ваших P1-рисков.</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-rose-500">{selected.filter(id => risks.find(r => r.id === id)?.sev === 'P1').length}</div>
                <div className="text-[10px] uppercase font-mono text-zinc-500">Critical</div>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div className="text-center">
                <div className="text-3xl font-bold text-zinc-300">{selected.length}</div>
                <div className="text-[10px] uppercase font-mono text-zinc-500">Selected</div>
              </div>
            </div>
          </div>
          <button className="mt-8 px-6 py-3 border border-brand-500 text-brand-500 rounded-xl hover:bg-brand-500 hover:text-white transition-all w-full md:w-auto">
            Экспорт PDF чек-листа
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default RiskMap;
