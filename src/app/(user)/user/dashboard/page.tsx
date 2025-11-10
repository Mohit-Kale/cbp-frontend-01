import { generateMeta } from '@/lib/seo'
import UserDashboard from './UserDashboard'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'User Dashboard',
  })
export default function page() {
  return <UserDashboard />
}
