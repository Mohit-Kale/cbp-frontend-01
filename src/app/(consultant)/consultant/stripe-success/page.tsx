import React from 'react'
import { generateMeta } from '@/lib/seo'
import StripeThankYou from './_components/StripeSuccess.component'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Stripe Successful',
  })

export default function Page() {
  return <StripeThankYou />
}
