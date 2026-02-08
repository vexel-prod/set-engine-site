'use client'

import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  AppWindowMac,
  ChevronRight,
  Route,
  Search,
  ShieldAlert,
  Tag,
  TrendingUp,
  User,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'

type Severity = 'P1' | 'P2' | 'P3'
type Likelihood = 1 | 2 | 3 | 4 | 5
type Impact = 1 | 2 | 3 | 4 | 5

type Risk = {
  id: string
  title: string
  cat:
    | 'Логистика'
    | 'Проектирование'
    | 'Строительство'
    | 'Экономика'
    | 'HR'
    | 'GR/Нормативы'
    | 'Охрана труда'
    | 'Экология'
    | 'IT/Данные'
  likelihood: Likelihood
  impact: Impact
  triggers: string[]
  earlySignals: string[]
  mitigation: string[]
  contingency: string[]
  ownerRole: string
  stage: 'Изыскания' | 'Проектирование' | 'Закупки' | 'Строительство' | 'ПНР' | 'Эксплуатация'
}

const risks: Risk[] = [
  {
    id: 'R-01',
    title: 'Срыв сроков поставки оборудования (КРУ, трансформаторы, кабель, КИПиА)',
    cat: 'Логистика',
    likelihood: 4,
    impact: 4,
    triggers: [
      'дефицит у производителя',
      'перенос сроков производства',
      'таможня/логистика',
      'неутвержденные спецификации',
    ],
    earlySignals: [
      'рост lead time в КП',
      'нет подтвержденного графика производства',
      'срывы дат инспекции',
      'частые уточнения опросных листов',
    ],
    mitigation: [
      'ранняя фиксация спецификаций и утверждение опросных листов',
      '2 источника поставки для критических позиций',
      'буфер по логистике/таможне в базовом графике',
      'FAT/ITP и контроль исполнения на заводе',
    ],
    contingency: [
      'перепланирование фронтов работ и временные решения',
      'замена на функциональные аналоги по матрице согласованных замен',
      'ускоренная логистика для узких позиций',
    ],
    ownerRole: 'Руководитель закупок / Supply Chain',
    stage: 'Закупки',
  },
  {
    id: 'R-02',
    title: 'Коллизии инженерных сетей и несостыковки разделов (АР/КР/ОВ/ВК/ЭОМ)',
    cat: 'Проектирование',
    likelihood: 4,
    impact: 5,
    triggers: [
      'параллельное проектирование без координации',
      'неполные исходные данные',
      'частые изменения ТЗ',
    ],
    earlySignals: [
      'рост RFI/замечаний',
      'увеличение коллизий на координации',
      'расхождения BOQ/ВОР',
      'много “временных” решений',
    ],
    mitigation: [
      'регулярные clash-detection и протоколы координации',
      'CDE/контроль версий и BIM-стандарт проекта',
      'управление интерфейсами и “заморозка” ключевых стыков',
      'проверка обслуживаемости (maintenance clearance)',
    ],
    contingency: [
      'оперативные корректировки РД по критическим узлам',
      'перенос трасс с пересчетом смежных разделов',
      'локальные усиления/корректировки конструкций по необходимости',
    ],
    ownerRole: 'BIM-координатор / ГИП',
    stage: 'Проектирование',
  },
  {
    id: 'R-03',
    title: 'Превышение сметного лимита из-за индексации, замен и роста объемов',
    cat: 'Экономика',
    likelihood: 3,
    impact: 5,
    triggers: ['индексация/рост цен', 'замены материалов', 'изменение объемов', 'ошибки BOQ/ВОР'],
    earlySignals: [
      'рост цен по КП',
      'увеличение допработ',
      'расхождения BOQ vs факт',
      'снижение конкуренции на торгах',
    ],
    mitigation: [
      'сверка BOQ/ВОР между разделами и этапами',
      'рамочные договоры/фиксация цен на критические позиции',
      'value engineering до закупки',
      'регламент управления изменениями + резерв по стоимости',
    ],
    contingency: [
      'пересборка лотов и повторные торги',
      'оптимизация/фазирование',
      'замены по согласованным каталогам аналогов',
    ],
    ownerRole: 'Cost Controller / Сметчик',
    stage: 'Закупки',
  },
  {
    id: 'R-04',
    title: 'Нарушение требований охраны труда и несчастные случаи на площадке',
    cat: 'Охрана труда',
    likelihood: 3,
    impact: 5,
    triggers: [
      'работы на высоте',
      'огневые работы',
      'подъемные механизмы',
      'переработки/сжатый график',
    ],
    earlySignals: [
      'рост near-miss',
      'нарушения наряд-допусков',
      'проблемы с допусками/инструктажами',
      'снижение дисциплины ППР/ПОС',
    ],
    mitigation: [
      'HSE-план, инструктажи и контроль допусков',
      'наряд-допускная система (огневые/высота/электро)',
      'аудиты площадки и stop-work authority',
      'контроль подрядчиков: СИЗ, квалификация, безопасные методы',
    ],
    contingency: [
      'остановка работ на участке до устранения причин',
      'перепланирование с учетом безопасных технологий',
      'замена подрядчика при системных нарушениях',
    ],
    ownerRole: 'HSE-менеджер / Руководитель строительства',
    stage: 'Строительство',
  },
  {
    id: 'R-05',
    title: 'Изменения нормативных требований и условий согласований/ТУ',
    cat: 'GR/Нормативы',
    likelihood: 2,
    impact: 4,
    triggers: ['обновление СП/ГОСТ', 'изменение техусловий', 'новые требования экспертизы'],
    earlySignals: [
      'разъяснения ведомств',
      'замечания экспертизы по новым пунктам',
      'перевыпуск ТУ от ресурсников',
    ],
    mitigation: [
      'матрица применимых норм и мониторинг изменений',
      'ранние консультации с согласующими (предпроверка решений)',
      'реестр ТУ и контроль актуальности исходных данных',
      'буфер на итерации экспертизы и ответы на замечания',
    ],
    contingency: [
      'корректировка решений с приоритетом критичных требований',
      'пересчет бюджета/сроков и допсоглашения',
      'переподача разделов по плану',
    ],
    ownerRole: 'Технический заказчик / GR',
    stage: 'Проектирование',
  },
  {
    id: 'R-06',
    title: 'Низкая квалификация подрядчика и качество работ (переделки/дефекты)',
    cat: 'HR',
    likelihood: 3,
    impact: 4,
    triggers: [
      'текучка кадров',
      'недостаток ИТР',
      'субподряд без контроля',
      'нет обучения/вводных допусков',
    ],
    earlySignals: [
      'рост переделок',
      'дефекты по операционному контролю',
      'срыв планов из-за производительности',
      'плохая исполнительная документация',
    ],
    mitigation: [
      'квалификационный отбор и проверка ресурсов',
      'QCP/ITP и контроль критических операций',
      'обучение, допуски и производственные инструктажи',
      'приемка по участкам и чек-листы качества',
    ],
    contingency: [
      'усиление контроля и лаборатории',
      'замена ключевых исполнителей/субподрядчиков',
      'перераспределение фронтов работ',
    ],
    ownerRole: 'Инженер по качеству / Руководитель строительства',
    stage: 'Строительство',
  },
  {
    id: 'R-07',
    title: 'Скрытые условия грунтов/УГВ приводят к перепроектированию фундаментов',
    cat: 'Строительство',
    likelihood: 2,
    impact: 5,
    triggers: [
      'недостаточная программа изысканий',
      'локальные слабые грунты',
      'сезонные изменения УГВ',
    ],
    earlySignals: [
      'аномалии лаборатории',
      'расхождения с архивными данными',
      'вода в котловане/просадки',
    ],
    mitigation: [
      'достаточная программа изысканий и контроль качества лаборатории',
      'сопоставление с архивами и соседними площадками',
      'пилотные испытания на критических зонах (штамп/свая)',
    ],
    contingency: [
      'усиление основания (цементация/сваи/замена)',
      'корректировка КР/ППР с пересчетом сроков и бюджета',
    ],
    ownerRole: 'Геотехник / ГИП',
    stage: 'Изыскания',
  },
  {
    id: 'R-08',
    title: 'Потеря актуальности данных и ошибок версионирования (чертежи/модели/акты)',
    cat: 'IT/Данные',
    likelihood: 3,
    impact: 3,
    triggers: ['нет CDE/EDMS', 'ручная рассылка файлов', 'параллельные правки без контроля'],
    earlySignals: [
      'разные версии на площадке',
      'замечания “по старым листам”',
      'конфликты выдачи/подписей',
    ],
    mitigation: [
      'CDE/EDMS и контроль версий',
      'правила именования/статусы WIP/Shared/Published',
      'цифровые журналы и маршруты согласования',
    ],
    contingency: [
      'инвентаризация выпусков и отзыв устаревших комплектов',
      'запрет выдачи без регистрации в CDE',
    ],
    ownerRole: 'BIM-менеджер / Документооборот',
    stage: 'Проектирование',
  },
]

const sevFromScore = (score: number): Severity => {
  if (score >= 16) return 'P1'
  if (score >= 9) return 'P2'
  return 'P3'
}

const sevBadge = (sev: Severity) => {
  if (sev === 'P1') return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
  if (sev === 'P2')
    return 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20'
  return 'bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-500/20'
}

const sevDot = (sev: Severity) => {
  if (sev === 'P1') return 'bg-rose-500'
  if (sev === 'P2') return 'bg-orange-500'
  return 'bg-sky-500'
}

type SevFilter = 'ALL' | Severity
type CatFilter = 'ALL' | Risk['cat']
type StageFilter = 'ALL' | Risk['stage']

function clamp2LinesStyle() {
  return {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  } as const
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div className='rounded-2xl border border-zinc-200/60 dark:border-zinc-800 bg-white/60 dark:bg-black/25 p-4'>
      <div className='flex items-center justify-between gap-3 mb-2'>
        <div className='text-[11px] font-mono text-zinc-500 uppercase tracking-widest'>{title}</div>
        <div className='text-[11px] font-mono text-zinc-400'>{items.length}</div>
      </div>
      <ul className='text-sm text-zinc-800 dark:text-zinc-200 space-y-1.5 list-disc pl-5'>
        {items.map((x) => (
          <li
            key={x}
            className='wrap-break-words'
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function RiskMap() {
  const [query, setQuery] = useState('')
  const [sevFilter, setSevFilter] = useState<SevFilter>('ALL')
  const [catFilter, setCatFilter] = useState<CatFilter>('ALL')
  const [stageFilter, setStageFilter] = useState<StageFilter>('ALL')

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const enriched = useMemo(() => {
    return risks.map((r) => {
      const score = r.likelihood * r.impact
      return { ...r, score, sev: sevFromScore(score) as Severity }
    })
  }, [])

  const cats = useMemo(() => {
    const uniq = Array.from(new Set(enriched.map((r) => r.cat)))
    return uniq as Risk['cat'][]
  }, [enriched])

  const stages = useMemo(() => {
    const uniq = Array.from(new Set(enriched.map((r) => r.stage)))
    return uniq as Risk['stage'][]
  }, [enriched])

  const totals = useMemo(() => {
    const total = enriched.length
    const p1 = enriched.filter((r) => r.sev === 'P1').length
    const p2 = enriched.filter((r) => r.sev === 'P2').length
    const p3 = enriched.filter((r) => r.sev === 'P3').length

    const topCats = Array.from(
      enriched.reduce(
        (m, r) => m.set(r.cat, (m.get(r.cat) ?? 0) + 1),
        new Map<Risk['cat'], number>(),
      ),
    )
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)

    return { total, p1, p2, p3, topCats }
  }, [enriched])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return enriched
      .filter((r) => {
        if (sevFilter !== 'ALL' && r.sev !== sevFilter) return false
        if (catFilter !== 'ALL' && r.cat !== catFilter) return false
        if (stageFilter !== 'ALL' && r.stage !== stageFilter) return false
        if (!q) return true

        return (
          r.title.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.cat.toLowerCase().includes(q) ||
          r.ownerRole.toLowerCase().includes(q) ||
          r.stage.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => b.score - a.score)
  }, [enriched, query, sevFilter, catFilter, stageFilter])

  const selected = useMemo(
    () => enriched.find((r) => r.id === selectedId) ?? null,
    [enriched, selectedId],
  )

  return (
    <div className='h-full min-h-0 w-full'>
      {/* ВАЖНО: без вложенного глобального scroll везде.
          Скроллим только список, чтобы не было "растягивания" профиля и контейнера. */}
      <div className='h-full min-h-0 w-full max-w-6xl mx-auto flex flex-col gap-4'>
        {/* Header */}
        <div className='rounded-[28px] border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/40 backdrop-blur px-4 py-4 md:px-6 md:py-5'>
          <div className='flex items-start justify-between gap-4'>
            <div className='min-w-0'>
              <div className='flex items-center gap-2'>
                <ShieldAlert className='size-5 text-zinc-700 dark:text-zinc-200' />
                <h3 className='text-lg md:text-2xl font-bold text-zinc-900 dark:text-zinc-100'>
                  Карта рисков
                </h3>
              </div>
            </div>

            <div className='hidden md:flex items-center gap-3'>
              <div className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-black/20 px-3 py-2'>
                <div className='text-[10px] font-mono text-zinc-500 uppercase tracking-widest'>
                  Всего: <span>{totals.total}</span>
                </div>
              </div>
              <div className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-black/20 px-3 py-2'>
                <div className='text-[10px] font-mono text-zinc-500 uppercase tracking-widest'>
                  P1 <span className='text-rose-600 font-bold'>{totals.p1}</span>
                </div>
              </div>
              <div className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-black/20 px-3 py-2'>
                <div className='text-[10px] font-mono text-zinc-500 uppercase tracking-widest'>
                  P2 <span className='text-orange-700 font-bold'>{totals.p2}</span>
                </div>
              </div>
              <div className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-black/20 px-3 py-2'>
                <div className='text-[10px] font-mono text-zinc-500 uppercase tracking-widest'>
                  P3 <span className='text-sky-700 font-bold'>{totals.p3}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className='mt-4 grid gap-2 md:grid-cols-[1fr_auto] md:items-center'>
            <div className='relative'>
              <Search className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400' />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Поиск: id, название, категория, владелец, этап...'
                className='w-full rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-black/20 pl-10 pr-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 outline-none'
              />
            </div>

            <div className='flex flex-wrap gap-2 justify-start md:justify-end'>
              {(['ALL', 'P1', 'P2', 'P3'] as const).map((k) => (
                <button
                  key={k}
                  type='button'
                  onClick={() => setSevFilter(k as SevFilter)}
                  className={[
                    'rounded-2xl border px-3 py-2 text-sm font-mono transition',
                    sevFilter === k
                      ? 'bg-white/80 dark:bg-black/30 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100'
                      : 'bg-transparent border-zinc-200/70 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200',
                  ].join(' ')}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary filters */}
          <div className='mt-3 grid gap-2 md:grid-cols-2'>
            <div className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-black/20 px-3 py-2'>
              <div className='flex items-center gap-2 text-[11px] font-mono text-zinc-500 uppercase tracking-widest'>
                <Tag className='size-3.5' /> Категория
              </div>
              <div className='mt-2 flex flex-wrap gap-2'>
                <button
                  type='button'
                  onClick={() => setCatFilter('ALL')}
                  className={[
                    'text-xs rounded-full border px-2 py-1 transition',
                    catFilter === 'ALL'
                      ? 'border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/30 text-zinc-900 dark:text-zinc-100'
                      : 'border-zinc-200/70 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200',
                  ].join(' ')}
                >
                  ALL
                </button>
                {cats.map((c) => (
                  <button
                    key={c}
                    type='button'
                    onClick={() => setCatFilter(c)}
                    className={[
                      'text-xs rounded-full border px-2 py-1 transition',
                      catFilter === c
                        ? 'border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/30 text-zinc-900 dark:text-zinc-100'
                        : 'border-zinc-200/70 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200',
                    ].join(' ')}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-black/20 px-3 py-2'>
              <div className='flex items-center gap-2 text-[11px] font-mono text-zinc-500 uppercase tracking-widest'>
                <Route className='size-3.5' /> Этап
              </div>
              <div className='mt-2 flex flex-wrap gap-2'>
                <button
                  type='button'
                  onClick={() => setStageFilter('ALL')}
                  className={[
                    'text-xs rounded-full border px-2 py-1 transition',
                    stageFilter === 'ALL'
                      ? 'border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/30 text-zinc-900 dark:text-zinc-100'
                      : 'border-zinc-200/70 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200',
                  ].join(' ')}
                >
                  ALL
                </button>
                {stages.map((s) => (
                  <button
                    key={s}
                    type='button'
                    onClick={() => setStageFilter(s)}
                    className={[
                      'text-xs rounded-full border px-2 py-1 transition',
                      stageFilter === s
                        ? 'border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-black/30 text-zinc-900 dark:text-zinc-100'
                        : 'border-zinc-200/70 dark:border-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200',
                    ].join(' ')}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile quick stats */}
          <div className='mt-3 grid grid-cols-4 gap-2 md:hidden'>
            {[
              { t: 'Всего', v: totals.total, cls: 'text-zinc-900 dark:text-zinc-100' },
              { t: 'P1', v: totals.p1, cls: 'text-rose-600 dark:text-rose-400' },
              { t: 'P2', v: totals.p2, cls: 'text-orange-700 dark:text-orange-400' },
              { t: 'P3', v: totals.p3, cls: 'text-sky-700 dark:text-sky-400' },
            ].map((x) => (
              <div
                key={x.t}
                className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-black/20 px-3 py-2'
              >
                <div className='text-[10px] font-mono text-zinc-500 uppercase tracking-widest'>
                  {x.t}
                </div>
                <div className={['text-base font-semibold', x.cls].join(' ')}>{x.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className='min-h-0 grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]'>
          {/* List (scroll area) */}
          <div className='min-h-0 rounded-[28px] border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-black/15 overflow-hidden flex flex-col'>
            <div className='px-4 py-3 md:px-5 md:py-4 border-b border-zinc-200/60 dark:border-zinc-800 flex items-center justify-between gap-3'>
              <div className='flex items-center gap-2 min-w-0'>
                <TrendingUp className='size-4 text-zinc-500' />
                <div className='text-sm text-nowrap font-semibold text-zinc-900 dark:text-zinc-100'>
                  Риски:
                </div>
              </div>
            </div>

            <div className='min-h-0 overflow-auto'>
              <div className='p-2 md:p-3 space-y-2'>
                {filtered.length === 0 ? (
                  <div className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-black/20 p-4 text-sm text-zinc-500'>
                    Ничего не найдено по текущим фильтрам.
                  </div>
                ) : (
                  filtered.map((r) => (
                    <button
                      key={r.id}
                      type='button'
                      onClick={() => {
                        setSelectedId(r.id)
                        // мобила: открываем шторку, десктоп: просто подсветится и покажем справа
                        setSheetOpen(true)
                      }}
                      className={[
                        'w-full text-left rounded-2xl border px-3 py-3 md:px-4 md:py-3 transition',
                        selectedId === r.id
                          ? 'border-brand-500 dark:border-brand-600 bg-white/90 dark:bg-black/30'
                          : 'border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-black/20 hover:border-zinc-200 dark:hover:border-zinc-800',
                      ].join(' ')}
                    >
                      <div className='flex items-start justify-between gap-3'>
                        <div className='min-w-0'>
                          <div className='flex items-center gap-2 flex-wrap'>
                            <span
                              className={[
                                'text-[10px] font-mono px-2 py-0.5 rounded-full border',
                                sevBadge(r.sev),
                              ].join(' ')}
                            >
                              {r.sev} • {r.cat}
                            </span>
                            <span className='text-[11px] font-mono text-zinc-500'>
                              {r.id} • score {r.score} (L{r.likelihood} I{r.impact})
                            </span>
                          </div>
                          <div
                            className='mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100 wrap-break-words'
                            style={clamp2LinesStyle()}
                          >
                            {r.title}
                          </div>

                          <div className='mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-500'>
                            <span className='inline-flex items-center gap-1'>
                              <Route className='size-3.5' /> {r.stage}
                            </span>
                            <span className='inline-flex items-center gap-1 min-w-0'>
                              <User className='size-3.5' />
                              <span className='wrap-break-words'>{r.ownerRole}</span>
                            </span>
                          </div>
                        </div>

                        <div className='shrink-0 flex items-center gap-2'>
                          <span className={['size-2 rounded-full', sevDot(r.sev)].join(' ')} />
                          <ChevronRight className='size-4 text-zinc-400' />
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Profile (desktop only) — фиксированной ширины, не растягивает контейнер */}
          <div className='hidden lg:flex min-h-0 rounded-[28px] border border-zinc-200/70 dark:border-zinc-800 bg-white/60 dark:bg-black/15 overflow-hidden flex-col'>
            <div className='px-5 py-4 border-b border-zinc-200/60 dark:border-zinc-800 flex items-start justify-between gap-3'>
              <div className='min-w-0 flex items-center gap-2'>
                <AppWindowMac className='size-4 text-zinc-500' />
                <div className='text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
                  Информация:
                </div>
              </div>

              {selected ? (
                <span
                  className={[
                    'shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full border',
                    sevBadge(selected.sev),
                  ].join(' ')}
                >
                  {selected.sev}
                </span>
              ) : (
                <span className='shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full border border-zinc-200/70 dark:border-zinc-800 text-zinc-500'>
                  —
                </span>
              )}
            </div>

            <div className='min-h-0 overflow-auto p-3'>
              <AnimatePresence mode='wait'>
                {selected ? (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className='space-y-3'
                  >
                    <div className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/75 dark:bg-black/20 p-4'>
                      <div className='flex items-start justify-between gap-3'>
                        <div className='min-w-0'>
                          <div className='text-[11px] font-mono text-zinc-500 uppercase tracking-widest'>
                            ID
                          </div>
                          <div className='mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100'>
                            {selected.id}
                          </div>
                        </div>

                        <div className='text-right shrink-0'>
                          <div className='text-[11px] font-mono text-zinc-500 uppercase tracking-widest'>
                            Score
                          </div>
                          <div className='mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100'>
                            {selected.score}{' '}
                            <span className='text-zinc-500 font-normal'>
                              (L{selected.likelihood} I{selected.impact})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='mt-3 text-sm text-zinc-900 dark:text-zinc-100 wrap-break-words'>
                        {selected.title}
                      </div>

                      <div className='mt-3 flex flex-wrap gap-2 text-xs text-zinc-500'>
                        <span className='rounded-full border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-black/15 px-2 py-0.5'>
                          {selected.cat}
                        </span>
                        <span className='rounded-full border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-black/15 px-2 py-0.5'>
                          {selected.stage}
                        </span>
                      </div>

                      <div className='mt-3 text-xs text-zinc-500'>
                        Владелец:{' '}
                        <span className='text-zinc-900 dark:text-zinc-100'>
                          {selected.ownerRole}
                        </span>
                      </div>
                    </div>

                    <Section
                      title='Триггеры'
                      items={selected.triggers}
                    />
                    <Section
                      title='Ранние сигналы'
                      items={selected.earlySignals}
                    />
                    <Section
                      title='Профилактика'
                      items={selected.mitigation}
                    />
                    <Section
                      title='План B'
                      items={selected.contingency}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key='empty'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-black/20 p-4 text-sm text-zinc-500 flex items-start gap-2'
                  >
                    <AlertTriangle className='size-4 mt-0.5 text-zinc-400' />
                    Нет выбранного риска.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet (аккуратно, не растягивает контейнер, с нормальным скроллом) */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.button
              type='button'
              aria-label='close'
              className='fixed inset-0 bg-black/40 lg:hidden'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              className='fixed left-0 right-0 bottom-0 lg:hidden rounded-t-[28px] border border-zinc-200/70 dark:border-zinc-800 bg-white/90 dark:bg-black/85 backdrop-blur p-4'
              initial={{ y: 520 }}
              animate={{ y: 0 }}
              exit={{ y: 520 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              style={{ maxHeight: '82vh' }}
            >
              <div className='flex items-center justify-between gap-3'>
                <div className='min-w-0'>
                  <div className='text-sm font-semibold text-zinc-900 dark:text-zinc-100'>
                    {selected ? `${selected.id} — профиль риска` : 'Профиль риска'}
                  </div>
                  {selected && (
                    <div className='mt-1 text-xs text-zinc-500'>
                      score {selected.score} (L{selected.likelihood} I{selected.impact})
                    </div>
                  )}
                </div>

                <button
                  type='button'
                  onClick={() => setSheetOpen(false)}
                  className='shrink-0 inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full border border-zinc-200/70 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300'
                >
                  <X className='size-3.5' /> Close
                </button>
              </div>

              <div
                className='mt-3 overflow-auto'
                style={{ maxHeight: '72vh' }}
              >
                {!selected ? (
                  <div className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-black/20 p-4 text-sm text-zinc-500'>
                    Выберите риск из списка.
                  </div>
                ) : (
                  <div className='space-y-3'>
                    <div className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/75 dark:bg-black/20 p-3'>
                      <div className='flex items-center justify-between gap-2'>
                        <span
                          className={[
                            'text-[10px] font-mono px-2 py-0.5 rounded-full border',
                            sevBadge(selected.sev),
                          ].join(' ')}
                        >
                          {selected.sev} • {selected.cat}
                        </span>
                        <span className='text-[11px] font-mono text-zinc-500'>
                          {selected.stage}
                        </span>
                      </div>

                      <div className='mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100 wrap-break-words'>
                        {selected.title}
                      </div>

                      <div className='mt-2 text-xs text-zinc-500 wrap-break-words'>
                        Владелец:{' '}
                        <span className='text-zinc-900 dark:text-zinc-100'>
                          {selected.ownerRole}
                        </span>
                      </div>
                    </div>

                    <details
                      className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-black/20 p-3'
                      open
                    >
                      <summary className='cursor-pointer text-[11px] font-mono text-zinc-600 dark:text-zinc-300 uppercase tracking-widest'>
                        Триггеры
                      </summary>
                      <ul className='mt-2 text-sm text-zinc-800 dark:text-zinc-200 space-y-1.5 list-disc pl-5'>
                        {selected.triggers.map((x) => (
                          <li
                            key={x}
                            className='wrap-break-words'
                          >
                            {x}
                          </li>
                        ))}
                      </ul>
                    </details>

                    {[
                      { t: 'Ранние сигналы', v: selected.earlySignals },
                      { t: 'Профилактика', v: selected.mitigation },
                      { t: 'План B', v: selected.contingency },
                    ].map((b) => (
                      <details
                        key={b.t}
                        className='rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/70 dark:bg-black/20 p-3'
                      >
                        <summary className='cursor-pointer text-[11px] font-mono text-zinc-600 dark:text-zinc-300 uppercase tracking-widest'>
                          {b.t}
                        </summary>
                        <ul className='mt-2 text-sm text-zinc-800 dark:text-zinc-200 space-y-1.5 list-disc pl-5'>
                          {b.v.map((x) => (
                            <li
                              key={x}
                              className='wrap-break-words'
                            >
                              {x}
                            </li>
                          ))}
                        </ul>
                      </details>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className='h-2'></div>
    </div>
  )
}
