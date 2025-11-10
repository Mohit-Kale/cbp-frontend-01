import { generateMeta } from '@/lib/seo'
import UserProfileForm from './_components/UserProfile'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'User Profile',
  })
export default function UserProfilePage() {
  return <UserProfileForm />
}
