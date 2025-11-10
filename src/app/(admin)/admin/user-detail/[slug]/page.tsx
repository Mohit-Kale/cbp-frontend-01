import React from 'react'
import UserDetailLayout from './_layoutComponents/UserDetailLayout.component'
import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'User Detail',
  })
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <UserDetailLayout slug={slug} />
}
