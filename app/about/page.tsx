import { Metadata } from 'next'
import AboutContent from '@/components/about/AboutContent'

export const metadata: Metadata = {
  title: 'О компании',
}

export default function AboutPage() {
  return <AboutContent />
}
