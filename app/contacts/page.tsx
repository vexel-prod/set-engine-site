import { Metadata } from 'next'
import ContactForm from '@/components/contacts/ContactForm'

export const metadata: Metadata = {
  title: 'Контакты',
}

export default function ContactsPage() {
  return <ContactForm />
}
