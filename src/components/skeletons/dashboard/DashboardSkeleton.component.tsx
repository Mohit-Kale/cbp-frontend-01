'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export default function DashboardSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* header */}
      <div className="w-full">
        <Skeleton className="w-full h-18 bg-gray-200" />
      </div>

      {/* Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Biomarker Section */}
        <Card className="p-4 space-y-4">
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <Skeleton className="w-32 h-4 bg-gray-300" />
              <Skeleton className="w-10 h-4 bg-gray-300" />
            </div>
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Skeleton className="w-24 h-3 bg-gray-200" />
                    <Skeleton className="w-6 h-3 bg-gray-200" />
                  </div>
                  <Skeleton className="h-2 w-full rounded bg-gray-300" />
                </div>
              ))}
            </div>
            <Skeleton className="w-32 h-4 mt-2" />
          </CardContent>
        </Card>

        {/* Middle Boxes: Biological Age + VO2 MAX */}
        <div className="space-y-8">
          {/* Bio Age */}
          <Card className="p-6 bg-green-600/30">
            <CardContent className="space-y-2 text-center">
              <Skeleton className="w-24 h-4 mx-auto" />
              <Skeleton className="w-16 h-6 mx-auto" />
              <Skeleton className="w-40 h-4 mx-auto" />
            </CardContent>
          </Card>
          {/* VO2 Max */}
          <Card className="p-6 bg-blue-600/30">
            <CardContent className="space-y-2 text-center">
              <Skeleton className="w-24 h-4 mx-auto" />
              <Skeleton className="w-16 h-6 mx-auto" />
              <Skeleton className="w-40 h-4 mx-auto" />
              <div className="flex justify-center pt-2">
                <Skeleton className="w-20 h-8 rounded-md" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Plan */}
        <Card className="p-4 space-y-4">
          <CardContent className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="w-20 h-3" />
                    <Skeleton className="w-32 h-2" />
                  </div>
                </div>
                <Skeleton className="w-12 h-8 rounded-md" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Clinical Summary */}
      <Card className="py-6 px-4 bg-teal-600/30">
        <CardContent className="space-y-4">
          <Skeleton className="w-60 h-4 bg-gray-100" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-3 bg-gray-100" />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
