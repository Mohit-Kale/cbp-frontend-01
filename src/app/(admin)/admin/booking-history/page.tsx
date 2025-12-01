import BookingTable from './_component/BookingTable'
import EnquiryTable from './_component/BookingTable'

import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Booking',
  })

export default function EnquiryPage() {
  return <BookingTable />
}
