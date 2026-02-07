import AboutContent from '../../components/about/AboutContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'О компании',
}

export default function AboutPage() {
  return <AboutContent />
}
