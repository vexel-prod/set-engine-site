import ServicesContent from '../../components/services/ServicesContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Услуги',
}

export default function ServicesPage() {
  return <ServicesContent />
}
