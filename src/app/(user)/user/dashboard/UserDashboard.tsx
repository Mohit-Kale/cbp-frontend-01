import React from 'react'
import { generateMeta } from '@/lib/seo'
export const generateMetadata = async () =>
  await generateMeta({
    title: 'Consultant Dashboard',
  })

// export default function Page() {
//   return <DashboardLayout />
// }

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto px-4 pt-20">
        <div className="flex flex-wrap justify-center gap-6">
          <div className="w-64 p-6 rounded-2xl bg-gradient-to-br from-purple-200 to-purple-100 shadow-md">
            <p className="text-sm font-medium text-gray-700">Total Sessions</p>
            <p className="text-2xl font-semibold mt-2">20</p>
          </div>

          <div className="w-64 p-6 rounded-2xl bg-gradient-to-br from-green-200 to-green-100 shadow-md">
            <p className="text-sm font-medium text-gray-700">Success Sessions</p>
            <p className="text-2xl font-semibold mt-2">5</p>
          </div>

          <div className="w-64 p-6 rounded-2xl bg-gradient-to-br from-orange-200 to-orange-100 shadow-md">
            <p className="text-sm font-medium text-gray-700">Pending Sessions</p>
            <p className="text-2xl font-semibold mt-2">15</p>
          </div>
        </div>
      </div>
    </section>
  )
}
