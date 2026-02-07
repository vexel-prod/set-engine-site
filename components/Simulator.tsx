'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    id: 1,
    text: "Как часто вы получаете отчетность о текущем прогрессе на объекте?",
    options: [
      { label: "Ежедневно (цифровой поток)", value: "A", points: 10, recommendation: "Высокий уровень цифровой зрелости." },
      { label: "Еженедельно (бумажные отчеты)", value: "B", points: 5, recommendation: "Рекомендуется переход на real-time дашборды." },
      { label: "По запросу / эпизодически", value: "C", points: 0, recommendation: "Критический риск потери контроля. Необходим аудит процессов." }
    ]
  },
  {
    id: 2,
    text: "Как решаются коллизии в проектной документации?",
    options: [
      { label: "Автоматизированно в BIM-модели", value: "A", points: 10, recommendation: "Используйте BIM для планирования ресурсов." },
      { label: "Вручную на совещаниях", value: "B", points: 4, recommendation: "Высокая вероятность человеческой ошибки." },
      { label: "На этапе монтажа «по месту»", value: "C", points: -5, recommendation: "Прямой риск увеличения бюджета на 20-30%." }
    ]
  },
  {
    id: 3,
    text: "Контроль качества материалов:",
    options: [
      { label: "QR-маркировка и цифровая приемка", value: "A", points: 10, recommendation: "Прозрачность цепочек поставок обеспечена." },
      { label: "Журналы входного контроля", value: "B", points: 6, recommendation: "Оцифруйте журналы для исключения подлогов." },
      { label: "Доверие к сертификатам подрядчика", value: "C", points: 1, recommendation: "Нужен выборочный инструментальный аудит." }
    ]
  }
];

const Simulator: React.FC = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (points: number, recommendation: string) => {
    setScore(prev => prev + points);
    setHistory(prev => [...prev, recommendation]);
    if (step < questions.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const getMaturity = () => {
    if (score > 25) return { label: 'Оптимальный', color: 'text-emerald-500' };
    if (score > 10) return { label: 'Стабильный', color: 'text-yellow-500' };
    return { label: 'Критический', color: 'text-rose-500' };
  };

  if (finished) {
    const maturity = getMaturity();
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl">
        <h3 className="text-2xl font-bold mb-4 font-display">Результат аудита</h3>
        <div className="mb-6">
          <span className="text-zinc-400 text-sm block mb-1">Уровень цифровой зрелости:</span>
          <span className={`text-4xl font-bold ${maturity.color} font-display uppercase`}>{maturity.label}</span>
        </div>
        <div className="space-y-4 mb-8">
          <p className="text-zinc-300 font-medium">Рекомендации на основе ваших ответов:</p>
          <ul className="space-y-2">
            {history.map((h, i) => (
              <li key={i} className="flex gap-3 text-sm text-zinc-400">
                <span className="text-brand-500">→</span> {h}
              </li>
            ))}
          </ul>
        </div>
        <button 
          onClick={() => { setStep(0); setScore(0); setHistory([]); setFinished(false); }}
          className="px-6 py-3 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-colors"
        >
          Пройти заново
        </button>
      </motion.div>
    );
  }

  const q = questions[step];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center justify-between text-xs font-mono text-zinc-500 uppercase">
        <span>Вопрос {step + 1} из {questions.length}</span>
        <span>Score: {score}</span>
      </div>
      <div className="mb-4 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-brand-500"
          initial={{ width: 0 }}
          animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>
      <AnimatePresence mode="wait">
        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold font-display leading-tight">{q.text}</h2>
          <div className="grid gap-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.points, opt.recommendation)}
                className="p-5 text-left bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-brand-500 hover:bg-brand-500/5 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-zinc-200 group-hover:text-brand-500">{opt.label}</span>
                  <div className="w-6 h-6 rounded-full border border-zinc-700 flex items-center justify-center group-hover:border-brand-500">
                    <div className="w-2 h-2 bg-brand-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Simulator;
