import ContactForm from '../../components/contacts/ContactForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Контакты',
}

export default function ContactsPage() {
  return <ContactForm />
}
