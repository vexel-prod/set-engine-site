import InteractivesContent from '@/components/interactives/InteractivesContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Интерактивы',
}

export default function InteractivesPage() {
  return <InteractivesContent />
}
