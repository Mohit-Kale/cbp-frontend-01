import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { generateMeta } from '@/lib/seo'

export const generateMetadata = async () =>
  await generateMeta({
    title: 'Verify Email',
  })

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-24">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardContent className="py-6 px-6 text-center space-y-6">{children}</CardContent>
      </Card>
    </div>
  )
}
