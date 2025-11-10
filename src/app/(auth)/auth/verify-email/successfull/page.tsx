import React from 'react'
import EmailVerificationSuccess from '../_components/EmailVerificationSuccess.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Verify Email successfull',
  })

export default function Page() {
  return <EmailVerificationSuccess />
}
