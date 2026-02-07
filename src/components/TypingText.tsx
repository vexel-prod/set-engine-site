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
  const list = useMemo(
    () => (phrases?.length ? phrases : [phrases as any]),
    [phrases]
  )

  const [idx, setIdx] = useState(0)
  const [pos, setPos] = useState(0)
  const [phase, setPhase] = useState<Phase>('typing')
  const [visible, setVisible] = useState(true)

  const current = list[idx] || ''
  const typed = current.slice(0, pos)

  // Резерв ширины под самый длинный текст для предотвращения Layout Shift
  const maxCh = useMemo(() => {
    const m = list.reduce((acc, s) => Math.max(acc, (s || '').length), 1)
    return Math.max(5, m)
  }, [list])

  useEffect(() => {
    let t: number | undefined

    if (phase === 'typing') {
      setVisible(true)
      if (pos < current.length) {
        t = window.setTimeout(() => setPos((p) => p + 1), speed)
      } else {
        setPhase('pause')
      }
    }

    if (phase === 'pause') {
      t = window.setTimeout(() => {
        setPhase('fade')
        setVisible(false)
      }, pauseMs)
    }

    if (phase === 'fade') {
      t = window.setTimeout(() => {
        setIdx((v) => (v + 1) % list.length)
        setPos(0)
        setPhase('typing')
      }, fadeMs)
    }

    return () => {
      if (t) window.clearTimeout(t)
    }
  }, [phase, pos, current.length, speed, pauseMs, fadeMs, list.length])

  return (
    <span
      className={['inline-flex items-center justify-center text-center', className].join(' ')}
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
      <span className='ml-1.5 inline-block w-[0.05em] h-[0.9em] bg-current animate-terminal-blink align-middle' />
    </span>
  )
}
