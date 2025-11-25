import React from 'react'
import EmailverificationFail from '../successfull/EmailverificationFail.component'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Verify Email failed',
  })

export default function Page() {
  return <EmailverificationFail />
}
