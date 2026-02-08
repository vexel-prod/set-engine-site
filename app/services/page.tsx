import { Metadata } from 'next'
import ServicesContent from '@/components/services/ServicesContent'

export const metadata: Metadata = {
  title: 'Услуги',
}

export default function ServicesPage() {
  return <ServicesContent />
}
