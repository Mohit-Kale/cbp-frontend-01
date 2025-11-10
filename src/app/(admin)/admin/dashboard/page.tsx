import React from 'react'
import DashboardLayout from './_dashboardLayout/DashboardLayout.component'
import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Admin Dashboard',
  })

export default function Page() {
  return <DashboardLayout />
}
