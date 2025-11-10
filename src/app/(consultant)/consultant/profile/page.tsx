import { generateMeta } from '@/lib/seo'
import ProfileForm from './_componenets/ProfileForm.component'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Consultant Profile',
  })
export default function ProfilePage() {
  return (
    <div className="p-4">
      <ProfileForm />
    </div>
  )
}
