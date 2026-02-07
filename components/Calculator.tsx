'use client'

import React, { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer'

const PDFDownloadLink = dynamic(
  () => import('@react-pdf/renderer').then((m) => m.PDFDownloadLink),
  { ssr: false },
)

type ObjectType = 'industrial' | 'energy' | 'civil'
type Region = 'moscow' | 'regions'
type Urgency = 'normal' | 'urgent'

type ServiceKey =
  | 'surveys'
  | 'design'
  | 'bim'
  | 'pmo'
  | 'construction_control'
  | 'tech_audit'
  | 'author_supervision'

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

const formatRUB = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)

const formatNumberRU = (value: number) => new Intl.NumberFormat('ru-RU').format(value)

const human = {
  type: (t: ObjectType) =>
    t === 'industrial'
      ? 'Промышленный объект'
      : t === 'energy'
        ? 'Энергетическая инфраструктура'
        : 'Гражданское строительство',
  region: (r: Region) => (r === 'moscow' ? 'Москва / МО' : 'Регионы РФ'),
  urgency: (u: Urgency) => (u === 'urgent' ? 'Сжатые сроки' : 'Стандарт'),
}

const serviceOptions: Array<{
  key: ServiceKey
  title: string
  desc: string
  requiresDesign?: boolean
}> = [
  {
    key: 'surveys',
    title: 'Инженерные изыскания',
    desc: 'Геодезия + укрупненно комплекс (геология/экология).',
  },
  { key: 'design', title: 'Проектирование', desc: 'Укрупненно П+Р по ₽/м² (по типу объекта).' },
  {
    key: 'bim',
    title: 'BIM',
    desc: 'Надбавка к проектированию за информационную модель.',
    requiresDesign: true,
  },
  {
    key: 'author_supervision',
    title: 'Авторский надзор',
    desc: 'Процент от стоимости проектирования.',
    requiresDesign: true,
  },
  {
    key: 'construction_control',
    title: 'Строительный контроль',
    desc: 'Процент от оценки стоимости строительства.',
  },
  {
    key: 'pmo',
    title: 'Управление (PMO)',
    desc: 'Процент от оценки стоимости строительства (техзаказчик).',
  },
  {
    key: 'tech_audit',
    title: 'Технический аудит',
    desc: 'Укрупненно ₽/м² (обследование/документы).',
  },
]

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    className={className}
    aria-hidden='true'
  >
    <path
      d='M20 6L9 17l-5-5'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)

let fontsRegistered = false
function ensurePdfFontsRegistered() {
  if (fontsRegistered) return
  fontsRegistered = true

  Font.register({
    family: 'Inter',
    fonts: [{ src: '/fonts/Inter-Variable.ttf' }],
  })
}

type BreakdownRow = { key: ServiceKey; label: string; min: number; max: number }

type EstimatePayload = {
  input: {
    type: ObjectType
    area_m2: number
    region: Region
    urgency: Urgency
    services: ServiceKey[]
  }
  output: {
    budget_rub: { min: number; max: number }
    timeline_months: { min: number; max: number }
    breakdown_rub: Array<{ service: string; min: number; max: number }>
    construction_cost_for_percent_rub: { min: number; max: number }
  }
  disclaimer: string
}

const pdf = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 44,
    paddingHorizontal: 36,
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },

  headerBand: {
    backgroundColor: '#0f172a',
    padding: 16,
    borderRadius: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: 700, color: '#fff' },
  headerMeta: {
    marginTop: 6,
    color: '#cbd5e1',
    fontSize: 9,
  },

  section: { marginTop: 14 },
  sectionTitle: { fontSize: 11, fontWeight: 700, marginBottom: 8 },

  card: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
  },

  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 8 },
  item: { flex: 1 },
  label: { fontSize: 9, fontWeight: 400, color: '#475569' },
  value: { fontSize: 12, fontWeight: 700, marginTop: 2 },

  pillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  pill: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: '#eef2ff',
    borderWidth: 1,
    borderColor: '#c7d2fe',
  },
  pillText: { fontSize: 9, color: '#1e293b' },

  table: { borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, overflow: 'hidden' },
  trHead: { flexDirection: 'row', backgroundColor: '#f1f5f9' },
  tr: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  th: { padding: 8, fontWeight: 700, fontSize: 9 },
  td: { padding: 8, fontSize: 9 },
  col1: { flex: 2.2 },
  col2: { flex: 1, textAlign: 'right' },
  col3: { flex: 1, textAlign: 'right' },

  note: { marginTop: 10, fontSize: 8.5, color: '#475569', lineHeight: 1.3 },

  footer: {
    position: 'absolute',
    left: 36,
    right: 36,
    bottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#64748b',
    fontSize: 8.5,
  },
})

function PdfTable({
  head,
  rows,
}: {
  head: [string, string, string]
  rows: Array<[string, string, string]>
}) {
  return (
    <View style={pdf.table}>
      <View style={pdf.trHead}>
        <Text style={[pdf.th, pdf.col1]}>{head[0]}</Text>
        <Text style={[pdf.th, pdf.col2]}>{head[1]}</Text>
        <Text style={[pdf.th, pdf.col3]}>{head[2]}</Text>
      </View>

      {rows.map((r, idx) => (
        <View
          key={idx}
          style={pdf.tr}
        >
          <Text style={[pdf.td, pdf.col1]}>{r[0]}</Text>
          <Text style={[pdf.td, pdf.col2]}>{r[1]}</Text>
          <Text style={[pdf.td, pdf.col3]}>{r[2]}</Text>
        </View>
      ))}
    </View>
  )
}

const EstimatePdfDocument: React.FC<{
  form: { type: ObjectType; area: number; region: Region; urgency: Urgency; services: ServiceKey[] }
  result: {
    area: number
    breakdown: BreakdownRow[]
    buildMin: number
    buildMax: number
    subtotalMin: number
    subtotalMax: number
    monthsMin: number
    monthsMax: number
    payload: EstimatePayload
  }
}> = ({ form, result }) => {
  ensurePdfFontsRegistered()

  const now = new Date()
  const dateStr = new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long' }).format(now)

  const budgetMinMln = result.subtotalMin / 1_000_000
  const budgetMaxMln = result.subtotalMax / 1_000_000

  const selectedTitles = form.services
    .map((k) => serviceOptions.find((s) => s.key === k)?.title)
    .filter(Boolean) as string[]

  const breakdownRows: Array<[string, string, string]> =
    result.breakdown.length > 0
      ? result.breakdown.map((b) => [b.label, formatRUB(b.min), formatRUB(b.max)])
      : [['—', '—', '—']]

  return (
    <Document>
      <Page
        size='A4'
        style={pdf.page}
      >
        <View style={pdf.headerBand}>
          <Text style={pdf.headerTitle}>
            ООО «СЭТ» - строительство и энергетические технологии ИНН: 7720946228
          </Text>
        </View>

        <View style={[pdf.section, pdf.card]}>
          <Text style={pdf.sectionTitle}>Коммерческая оценка проекта:</Text>

          <View style={pdf.row}>
            <View style={pdf.item}>
              <Text style={pdf.label}>Оценочный бюджет</Text>
              <Text style={pdf.value}>
                {budgetMinMln.toFixed(1)} – {budgetMaxMln.toFixed(1)} млн ₽
              </Text>
            </View>
            <View style={pdf.item}>
              <Text style={pdf.label}>Срок выполнения</Text>
              <Text style={pdf.value}>
                {Math.round(result.monthsMin)} – {Math.round(result.monthsMax)} мес.
              </Text>
            </View>
          </View>

          <Text style={pdf.note}>
            * Оценка укрупненная и не является сметой/офертой.{'\n'}Итог зависит от ТЗ, стадии,
            состава разделов, исходных данных и требований экспертизы.
          </Text>
        </View>

        <View style={[pdf.section, pdf.card]}>
          <Text style={pdf.sectionTitle}>Параметры проекта:</Text>
          <Text style={pdf.note}>
            Тип объекта: {human.type(form.type)}
            {'\n'}
            Площадь: {formatNumberRU(result.area)} м²{'\n'}
            Регион: {human.region(form.region)}
            {'\n'}
            Срочность: {human.urgency(form.urgency)}
          </Text>

          <View style={pdf.pillsRow}>
            {(selectedTitles.length ? selectedTitles : ['Услуги не выбраны']).map((t, i) => (
              <View
                key={i}
                style={pdf.pill}
              >
                <Text style={pdf.pillText}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={pdf.section}>
          <Text style={pdf.sectionTitle}>Детализация бюджета:</Text>
          <PdfTable
            head={['Услуга', 'Мин.', 'Макс.']}
            rows={breakdownRows}
          />
        </View>

        <View style={pdf.section}>
          <Text style={pdf.sectionTitle}>Оценка стоимости строительства:</Text>
          <PdfTable
            head={['Показатель', 'Мин.', 'Макс.']}
            rows={[
              ['Стоимость строительства', formatRUB(result.buildMin), formatRUB(result.buildMax)],
            ]}
          />
        </View>

        <View
          style={pdf.footer}
          fixed
        >
          <Text>{result.payload.disclaimer}</Text>
          <Text
            render={({ pageNumber, totalPages }) => `Стр. ${pageNumber} / ${totalPages}`}
            fixed
          />
          <Text style={pdf.headerMeta}>Дата: {dateStr}</Text>
        </View>
      </Page>
    </Document>
  )
}

const Calculator: React.FC = () => {
  const [form, setForm] = useState<{
    type: ObjectType
    area: number
    region: Region
    urgency: Urgency
    services: ServiceKey[]
    date: string
  }>({
    type: 'industrial',
    area: 5000,
    region: 'moscow',
    urgency: 'normal',
    services: ['surveys', 'design', 'bim', 'construction_control'],
    date: new Date().toISOString(),
  })

  const formatDateForFilename = (iso: string) => iso.slice(0, 10).split('-').reverse().join('-')
  const filename = `ООО«СЭТ»_ОЦЕНКА_${formatDateForFilename(form.date)}`

  const toggleService = (key: ServiceKey) => {
    setForm((prev) => {
      const exists = prev.services.includes(key)
      let services = exists ? prev.services.filter((s) => s !== key) : [...prev.services, key]

      // зависимости
      if (!services.includes('design')) {
        services = services.filter((s) => s !== 'bim' && s !== 'author_supervision')
      }

      return { ...prev, services }
    })
  }

  const config = useMemo(() => {
    const regionMultiplier = form.region === 'moscow' ? 1.15 : 1.0
    const urgencyMultiplier = form.urgency === 'urgent' ? 1.25 : 1.0

    const designRate: Record<ObjectType, { min: number; max: number }> = {
      industrial: { min: 900, max: 1800 },
      civil: { min: 800, max: 1600 },
      energy: { min: 1100, max: 2200 },
    }

    const constructionCostPerM2: Record<ObjectType, { min: number; max: number }> = {
      civil: { min: 60_000, max: 120_000 },
      industrial: { min: 45_000, max: 110_000 },
      energy: { min: 80_000, max: 160_000 },
    }

    const surveysRatePerHa: Record<Region, { min: number; max: number }> = {
      moscow: { min: 20_000, max: 30_000 },
      regions: { min: 10_000, max: 15_000 },
    }

    const bimMarkup = { min: 0.2, max: 0.35 }
    const constructionControlPct = { min: 0.0175, max: 0.025 }
    const pmoPct = { min: 0.01, max: 0.0225 }
    const techAuditRatePerM2 = { min: 120, max: 350 }
    const authorSupervisionPct = { min: 0.006, max: 0.015 }

    return {
      regionMultiplier,
      urgencyMultiplier,
      designRate,
      constructionCostPerM2,
      surveysRatePerHa,
      bimMarkup,
      constructionControlPct,
      pmoPct,
      techAuditRatePerM2,
      authorSupervisionPct,
    }
  }, [form.region, form.urgency])

  const result = useMemo(() => {
    const area = clamp(form.area, 200, 300_000)
    const areaHa = area / 10_000

    const regionMult = config.regionMultiplier
    const urgencyMult = config.urgencyMultiplier
    const selected = new Set(form.services)

    const buildMin = area * config.constructionCostPerM2[form.type].min * regionMult
    const buildMax = area * config.constructionCostPerM2[form.type].max * regionMult

    const designBaseMin = area * config.designRate[form.type].min * regionMult
    const designBaseMax = area * config.designRate[form.type].max * regionMult

    let designMin = 0
    let designMax = 0
    if (selected.has('design')) {
      designMin = designBaseMin
      designMax = designBaseMax

      if (selected.has('bim')) {
        designMin *= 1 + config.bimMarkup.min
        designMax *= 1 + config.bimMarkup.max
      }

      designMin *= urgencyMult
      designMax *= urgencyMult
    }

    let surveysMin = 0
    let surveysMax = 0
    if (selected.has('surveys')) {
      const perHa = config.surveysRatePerHa[form.region]
      const complexityK: Record<ObjectType, number> = { civil: 1.0, industrial: 1.15, energy: 1.25 }

      const geodMin = areaHa * perHa.min
      const geodMax = areaHa * perHa.max

      const complexMultiplierMin = 2.2 * complexityK[form.type]
      const complexMultiplierMax = 3.4 * complexityK[form.type]

      surveysMin = geodMin * complexMultiplierMin * urgencyMult
      surveysMax = geodMax * complexMultiplierMax * urgencyMult
    }

    let controlMin = 0
    let controlMax = 0
    if (selected.has('construction_control')) {
      controlMin = buildMin * config.constructionControlPct.min * urgencyMult
      controlMax = buildMax * config.constructionControlPct.max * urgencyMult
    }

    let pmoMin = 0
    let pmoMax = 0
    if (selected.has('pmo')) {
      pmoMin = buildMin * config.pmoPct.min * urgencyMult
      pmoMax = buildMax * config.pmoPct.max * urgencyMult
    }

    let auditMin = 0
    let auditMax = 0
    if (selected.has('tech_audit')) {
      auditMin = area * config.techAuditRatePerM2.min * regionMult * urgencyMult
      auditMax = area * config.techAuditRatePerM2.max * regionMult * urgencyMult
    }

    let authorMin = 0
    let authorMax = 0
    if (selected.has('author_supervision') && selected.has('design')) {
      authorMin = designMin * config.authorSupervisionPct.min
      authorMax = designMax * config.authorSupervisionPct.max
    }

    const subtotalMin = surveysMin + designMin + controlMin + pmoMin + auditMin + authorMin
    const subtotalMax = surveysMax + designMax + controlMax + pmoMax + auditMax + authorMax

    const monthsBase = clamp(
      Math.sqrt(area / 1000) * 1.2 + (form.type === 'energy' ? 1.0 : 0.6),
      1,
      18,
    )
    const servicesK =
      (selected.has('surveys') ? 0.6 : 0) +
      (selected.has('design') ? 1.4 : 0) +
      (selected.has('bim') ? 0.3 : 0) +
      (selected.has('construction_control') ? 0.2 : 0) +
      (selected.has('pmo') ? 0.2 : 0) +
      (selected.has('tech_audit') ? 0.25 : 0) +
      (selected.has('author_supervision') ? 0.15 : 0)

    const monthsMin = clamp(monthsBase + servicesK, 1, 24) * (form.urgency === 'urgent' ? 0.75 : 1)
    const monthsMax = clamp(monthsMin * 1.35, 1, 30)

    const breakdown: BreakdownRow[] = []
    if (selected.has('surveys')) {
      breakdown.push({
        key: 'surveys',
        label: 'Инженерные изыскания',
        min: surveysMin,
        max: surveysMax,
      })
    }
    if (selected.has('design')) {
      breakdown.push({
        key: 'design',
        label: selected.has('bim') ? 'Проектирование (BIM)' : 'Проектирование',
        min: designMin,
        max: designMax,
      })
    }
    if (selected.has('author_supervision') && selected.has('design')) {
      breakdown.push({
        key: 'author_supervision',
        label: 'Авторский надзор',
        min: authorMin,
        max: authorMax,
      })
    }
    if (selected.has('construction_control')) {
      breakdown.push({
        key: 'construction_control',
        label: 'Строительный контроль',
        min: controlMin,
        max: controlMax,
      })
    }
    if (selected.has('pmo')) {
      breakdown.push({ key: 'pmo', label: 'Управление (PMO)', min: pmoMin, max: pmoMax })
    }
    if (selected.has('tech_audit')) {
      breakdown.push({
        key: 'tech_audit',
        label: 'Технический аудит',
        min: auditMin,
        max: auditMax,
      })
    }

    const payload: EstimatePayload = {
      input: {
        type: form.type,
        area_m2: area,
        region: form.region,
        urgency: form.urgency,
        services: form.services,
      },
      output: {
        budget_rub: { min: Math.round(subtotalMin), max: Math.round(subtotalMax) },
        timeline_months: { min: Math.round(monthsMin), max: Math.round(monthsMax) },
        breakdown_rub: breakdown.map((b) => ({
          service: b.label,
          min: Math.round(b.min),
          max: Math.round(b.max),
        })),
        construction_cost_for_percent_rub: { min: Math.round(buildMin), max: Math.round(buildMax) },
      },
      disclaimer: '',
    }

    return {
      area,
      subtotalMin,
      subtotalMax,
      monthsMin,
      monthsMax,
      buildMin,
      buildMax,
      breakdown,
      payload,
    }
  }, [form, config])

  const budgetMinMln = result.subtotalMin / 1_000_000
  const budgetMaxMln = result.subtotalMax / 1_000_000

  const pdfDoc = (
    <EstimatePdfDocument
      form={form}
      result={result}
    />
  )

  return (
    <div className='w-full max-w-6xl mx-auto'>
      {/* Критично для мобилки: w-full + адекватные паддинги + никаких фиксированных min-width/nowrap */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start p-4 sm:p-6 lg:p-8 rounded-3xl w-full'>
        {/* LEFT */}
        <div className='space-y-6 min-w-0'>
          <h3 className='text-xl sm:text-2xl font-bold font-display'>Параметры проекта</h3>

          <div className='min-w-0'>
            <label className='block text-sm text-zinc-500 mb-2 font-mono uppercase'>
              Тип объекта
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as ObjectType }))}
              className='w-full border border-zinc-800 rounded-xl p-3 focus:border-brand-500 outline-none bg-transparent'
            >
              <option value='industrial'>Промышленный объект</option>
              <option value='energy'>Энергетическая инфраструктура</option>
              <option value='civil'>Гражданское строительство</option>
            </select>
            <p className='text-xs text-zinc-600 mt-2'>
              Ставки и коэффициенты — укрупненные ориентиры (не смета).
            </p>
          </div>

          <div className='min-w-0'>
            <label className='block text-sm text-zinc-500 mb-2 font-mono uppercase'>
              Площадь (м²): {formatNumberRU(form.area)}
            </label>

            <input
              type='range'
              min='500'
              max='80000'
              step='250'
              value={form.area}
              onChange={(e) => setForm((p) => ({ ...p, area: Number(e.target.value) }))}
              className='w-full accent-brand-500 h-2 bg-zinc-300 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer'
            />

            <div className='mt-3 flex flex-col sm:flex-row gap-2 min-w-0'>
              <input
                inputMode='numeric'
                value={form.area}
                onChange={(e) => {
                  const v = Number(String(e.target.value).replace(/[^\d]/g, ''))
                  setForm((p) => ({ ...p, area: Number.isFinite(v) && v > 0 ? v : 500 }))
                }}
                className='w-full min-w-0 border border-zinc-800 rounded-xl p-3 focus:border-brand-500 outline-none bg-transparent'
                aria-label='Площадь, м²'
              />
              <button
                type='button'
                className='shrink-0 cursor-pointer px-4 py-3 rounded-xl border border-zinc-800 text-sm hover:border-zinc-600'
                onClick={() => setForm((p) => ({ ...p, area: 5000 }))}
              >
                Сброс
              </button>
            </div>
          </div>

          <div className='min-w-0'>
            <label className='block text-sm text-zinc-500 mb-2 font-mono uppercase'>Регион</label>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              {(['moscow', 'regions'] as Region[]).map((r) => (
                <button
                  key={r}
                  type='button'
                  onClick={() => setForm((p) => ({ ...p, region: r }))}
                  className={`cursor-pointer p-3 rounded-xl border text-sm font-medium transition-all w-full ${
                    form.region === r
                      ? 'bg-brand-500 border-brand-500 text-white'
                      : 'border-zinc-500 hover:border-zinc-600'
                  }`}
                >
                  {human.region(r)}
                </button>
              ))}
            </div>
          </div>

          <div className='min-w-0'>
            <label className='block text-sm text-zinc-500 mb-2 font-mono uppercase'>
              Срочность
            </label>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              {(['normal', 'urgent'] as Urgency[]).map((u) => (
                <button
                  key={u}
                  type='button'
                  onClick={() => setForm((p) => ({ ...p, urgency: u }))}
                  className={`cursor-pointer p-3 rounded-xl border text-sm font-medium transition-all w-full ${
                    form.urgency === u
                      ? 'bg-brand-500 border-brand-500 text-white'
                      : 'border-zinc-500 hover:border-zinc-600'
                  }`}
                >
                  {human.urgency(u)}
                </button>
              ))}
            </div>
            <p className='text-xs text-zinc-600 mt-2'>
              Срочность увеличивает стоимость и снижает сроки.
            </p>
          </div>

          <div className='pt-2 min-w-0'>
            <label className='block text-sm text-zinc-500 mb-3 font-mono uppercase'>
              Состав работ
            </label>

            <div className='space-y-2 min-w-0'>
              {serviceOptions.map((s) => {
                const checked = form.services.includes(s.key)
                const disabled = Boolean(s.requiresDesign && !form.services.includes('design'))

                return (
                  <button
                    key={s.key}
                    type='button'
                    disabled={disabled}
                    onClick={() => toggleService(s.key)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all min-w-0 ${
                      disabled
                        ? 'opacity-40 cursor-not-allowed border-zinc-900 bg-black/20'
                        : checked
                          ? 'border-brand-500/70 bg-brand-500/10'
                          : 'border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    <div className='flex items-start justify-between gap-3 min-w-0'>
                      <div className='min-w-0'>
                        <div className='text-sm font-semibold wrap-break-words'>{s.title}</div>
                        <div className='text-xs mt-1 text-zinc-500 wrap-break-words'>{s.desc}</div>
                      </div>

                      <div
                        className={`shrink-0 mt-1 h-6 w-6 rounded-lg border flex items-center justify-center ${
                          checked
                            ? 'bg-brand-500 border-brand-500 text-white'
                            : 'border-zinc-600 text-transparent'
                        }`}
                        aria-hidden='true'
                      >
                        <CheckIcon className='h-4 w-4' />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className='min-w-0'>
          <div className='p-4 sm:p-6 lg:p-8 rounded-2xl border border-brand-500/20 flex flex-col justify-center w-full'>
            <div className='text-center space-y-6 sm:space-y-8 min-w-0'>
              <div className='min-w-0'>
                <span className='text-xs sm:text-sm font-mono uppercase tracking-widest block mb-3 sm:mb-4'>
                  Оценочный бюджет
                </span>

                {/* Критично: flex-wrap + отсутствие nowrap, чтобы не выдавливало вправо */}
                <div className='flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 min-w-0 leading-tight'>
                  <span className='text-3xl sm:text-4xl md:text-5xl font-bold font-display tabular-nums wrap-break-words'>
                    {budgetMinMln.toFixed(1)} – {budgetMaxMln.toFixed(1)}
                  </span>
                  <span className='text-lg sm:text-2xl text-zinc-500 font-normal'>млн ₽</span>
                </div>

                <p className='text-xs text-zinc-500 mt-2 px-1'>
                  * Укрупненная оценка. Итог зависит от ТЗ, стадии, исходных данных и требований
                  экспертизы.
                </p>
              </div>

              <div className='h-px bg-zinc-800/70 w-full mx-auto' />

              <div className='min-w-0'>
                <span className='text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-widest block mb-3 sm:mb-4'>
                  Срок выполнения
                </span>

                <div className='flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 min-w-0 leading-tight'>
                  <span className='text-3xl sm:text-4xl font-bold font-display text-brand-500 tabular-nums'>
                    {Math.round(result.monthsMin)} – {Math.round(result.monthsMax)}
                  </span>
                  <span className='text-base sm:text-xl font-normal text-zinc-500 uppercase tracking-tighter'>
                    мес.
                  </span>
                </div>
              </div>

              <div className='h-px bg-zinc-800/70 w-full mx-auto' />

              <div className='text-left space-y-3 min-w-0'>
                <div className='text-xs font-mono text-zinc-500 uppercase tracking-widest'>
                  Детализация
                </div>

                <div className='space-y-2 min-w-0'>
                  {result.breakdown.length === 0 ? (
                    <div className='text-sm text-zinc-500'>Выберите состав работ слева.</div>
                  ) : (
                    result.breakdown.map((b) => (
                      <div
                        key={b.key}
                        className='flex items-start justify-between gap-3 min-w-0'
                      >
                        <div className='text-sm min-w-0 wrap-break-words'>{b.label}</div>
                        <div className='text-sm tabular-nums text-right min-w-[8ch]'>
                          {formatRUB(b.min)} – {formatRUB(b.max)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 gap-3 min-w-0'>
                <PDFDownloadLink
                  document={pdfDoc}
                  fileName={`${filename}.pdf`}
                  className='cursor-pointer w-full py-4 bg-brand-500 text-white font-bold rounded-xl hover:bg-brand-400 transition-all flex items-center justify-center'
                >
                  {({ loading }) => (loading ? 'Готовим PDF…' : 'Скачать PDF')}
                </PDFDownloadLink>
              </div>
            </div>
          </div>
            <div className='h-8 md:hidden'></div>

          {/* Доп. защита от горизонтального скролла на некоторых девайсах/темах */}
          <div
            className='sr-only'
            aria-hidden='true'
          >
            {/* keep */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
