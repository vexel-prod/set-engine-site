import TermsContent from '../../components/terms/TermsContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика обработки данных',
}

export default function TermsPage() {
  return <TermsContent />
}
