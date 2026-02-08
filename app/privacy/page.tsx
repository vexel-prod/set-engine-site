import { Metadata } from 'next'
import PrivacyContent from '@/components/privacy/PrivacyContent'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
