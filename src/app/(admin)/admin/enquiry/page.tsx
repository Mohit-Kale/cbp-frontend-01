import EnquiryTable from './_component/Enquirytable'

import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Enquiry',
  })

export default function EnquiryPage() {
  return <EnquiryTable />
}
