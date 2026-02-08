'use client'

import React from 'react'
import { AppProvider } from './AppContext'

// Making children optional to fix TS errors in some environments when passing components
export default function Providers({ children }: { children?: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}
