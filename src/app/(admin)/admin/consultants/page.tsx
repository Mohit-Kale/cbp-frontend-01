import React from 'react'

import { generateMeta } from '@/lib/seo'
import ConsultantTable from './_components/UsersTable.component'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Users',
  })

export default function Page() {
  return <ConsultantTable />
}
