import React from 'react'
import RegistrationSuccess from './_components/RegistrationSuccess.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Registration Successful',
  })

export default function Page() {
  return <RegistrationSuccess />
}
