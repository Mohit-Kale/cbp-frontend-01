import React from 'react'
import { generateMeta } from '@/lib/seo'
import StripeErrorPage from './_components/StripeError.Component'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Stripe Error',
  })

export default function Page() {
  return <StripeErrorPage />
}
