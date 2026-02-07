'use client'

import { useEffect, useState } from 'react'

export function useClientValue<T>(factory: () => T, fallback: T) {
  const [value, setValue] = useState<T>(fallback)
  useEffect(() => {
    setValue(factory())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return value
}
