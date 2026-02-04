'use client'

import './globals.css'
import React from 'react'
import { AppProvider, useAppContext } from '../components/AppContext'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CommandPalette from '../components/CommandPalette'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <LayoutContent>{children}</LayoutContent>
    </AppProvider>
  )
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { techMode, theme } = useAppContext()

  return (
    <html
      className={theme === 'dark' ? 'dark' : ''}
      suppressHydrationWarning
    >
      <body
        className={`min-h-screen flex flex-col ${techMode ? 'tech-grid cursor-crosshair' : ''}`}
      >
        {techMode && <div className='tech-scanline' />}
        <Header />
        <main className='grow container mx-auto px-4 py-8 relative z-10'>{children}</main>
        <Footer />
        <CommandPalette />
      </body>
    </html>
  )
}
