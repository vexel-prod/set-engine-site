import CommandPalette from '@/components/CommandPalette'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import LayoutShell from '@/components/LayoutShell'
import Providers from '@/components/Providers'
import type { Metadata } from 'next'
import React from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s - ООО «СЭТ»',
    default: 'ООО «СЭТ»',
  },
  description:
    'Технологическое предприятие управления строительством и энергетическими технологиями. ООО «СЭТ», ИНН 7720946228.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='ru'
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <LayoutShell>
            <Header />
            <main className='flex flex-col gap-6 container relative z-10 mx-auto grow p-6'>
              {children}
            </main>
            <Footer />
            <CommandPalette />
          </LayoutShell>
        </Providers>
      </body>
    </html>
  )
}
