'use client'

import { useEffect, useMemo, useState } from 'react'

type Phase = 'typing' | 'pause' | 'fade'

export default function TypingText({
  phrases,
  speed = 80,
  pauseMs = 2000,
  fadeMs = 300,
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

  // derived: видимость зависит только от фазы (убираем visible state => нет setState в effect)
  const visible = phase !== 'fade'

  // Резерв ширины под самый длинный текст для предотвращения Layout Shift
  const maxCh = useMemo(() => {
    const m = list.reduce((acc, s) => Math.max(acc, (s || '').length), 1)
    return Math.max(5, m)
  }, [list])

  useEffect(() => {
    let t: number | undefined

    if (phase === 'typing') {
      if (pos < current.length) {
        t = window.setTimeout(() => setPos((p) => p + 1), speed)
      } else {
        // переход в pause — это смена "режима", а не derived state
        t = window.setTimeout(() => setPhase('pause'), 0)
      }
    } else if (phase === 'pause') {
      t = window.setTimeout(() => setPhase('fade'), pauseMs)
    } else if (phase === 'fade') {
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
    <span
      className={['inline-flex justify-center', className].join(' ')}
      style={{ minWidth: `${maxCh}ch`, letterSpacing: '1px' }}
    >
      <span
        className='transition-opacity duration-300'
        style={{
          opacity: visible ? 1 : 0,
          whiteSpace: 'nowrap',
        }}
      >
        {typed}
      </span>
      <span className='ml-1.5 inline-block w-[0.04em] bg-current animate-terminal-blink' />
    </span>
  )
}
