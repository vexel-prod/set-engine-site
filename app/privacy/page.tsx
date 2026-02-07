import PrivacyContent from '../../components/privacy/PrivacyContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
}

export default function PrivacyPage() {
  return <PrivacyContent />
}
