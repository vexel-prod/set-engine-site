'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type Phase = 'typing' | 'pause' | 'fade'

export default function TypingText({
  phrases,
  // базовая “человеческая” скорость (с джиттером и паузами на знаках)
  speed = 55,
  pauseMs = 1800,
  fadeMs = 250,
  className = '',
}: {
  phrases: string[]
  speed?: number
  pauseMs?: number
  fadeMs?: number
  className?: string
}) {
  const list = useMemo(() => {
    if (Array.isArray(phrases) && phrases.length) return phrases
    return [String((phrases as unknown as string) ?? '')]
  }, [phrases])

  const [idx, setIdx] = useState(0)
  const [pos, setPos] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')

  const current = list[idx] ?? ''
  const typed = current.slice(0, pos)
  const visible = phase !== 'fade'

  // чтобы джиттер был стабильнее между рендерами
  const rngRef = useRef(Math.random)

  const nextDelayMs = (nextChar: string) => {
    // джиттер как у реального набора
    const jitter = (rngRef.current() * 0.7 - 0.35) * speed // примерно ±35%
    let d = Math.max(18, Math.round(speed + jitter))

    // микропаузЫ на знаках препинания
    if (/[,.!?;:]/.test(nextChar)) d += 140 + Math.round(rngRef.current() * 220)
    if (nextChar === ' ') d += 10 + Math.round(rngRef.current() * 25)

    // редкие “задумался”
    if (rngRef.current() < 0.03) d += 120 + Math.round(rngRef.current() * 260)

    return d
  }

  useEffect(() => {
    let t: number | undefined

    if (phase === 'typing') {
      if (pos < current.length) {
        const nextChar = current[pos] ?? ''
        t = window.setTimeout(() => setPos((p) => p + 1), nextDelayMs(nextChar))
      } else {
        t = window.setTimeout(() => setPhase('pause'), 0)
      }
    } else if (phase === 'pause') {
      t = window.setTimeout(() => setPhase('fade'), pauseMs)
    } else {
      t = window.setTimeout(() => {
        setIdx((v) => (v + 1) % list.length)
        setPos(0)
        setPhase('typing')
      }, fadeMs)
    }

    return () => {
      if (t) window.clearTimeout(t)
    }
  }, [phase, pos, current, speed, pauseMs, fadeMs, list.length])

  return (
    <span className={['inline-flex items-baseline', className].join(' ')}>
      <span
        className='transition-opacity duration-300'
        style={{
          opacity: visible ? 1 : 0,
          whiteSpace: 'nowrap',
          letterSpacing: '1px',
        }}
      >
        {typed}
      </span>

      {/* курсор как был, но с гарантированной высотой, чтобы не “пропадал” */}
      <span
        className='ml-1.5 inline-block w-[0.04em] bg-current animate-terminal-blink'
        style={{ height: '1em', transform: 'translateY(0.05em)' }}
      />
    </span>
  )
}
