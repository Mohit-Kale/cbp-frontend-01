import React from 'react'
import UsersTable from './_components/UsersTable.component'

import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Users',
  })

export default function Page() {
  return <UsersTable />
}
