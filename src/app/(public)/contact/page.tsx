import React from 'react'
import { generateMeta } from '@/lib/seo'
import ContactForm from './component/contactForm/ContactForm.component'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Contact Us',
  })
export default function page() {
  return (
    <>
      {/* Hero Section */}
      <ContactForm />
    </>
  )
}
