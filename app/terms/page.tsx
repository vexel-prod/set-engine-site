import { Metadata } from 'next'
import TermsContent from '@/components/terms/TermsContent'

export const metadata: Metadata = {
  title: 'Политика обработки данных',
}

export default function TermsPage() {
  return <TermsContent />
}
