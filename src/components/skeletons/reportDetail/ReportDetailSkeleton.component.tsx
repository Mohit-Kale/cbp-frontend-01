'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function ReportDetailSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Report Info */}
      {/* <Card>
        <CardContent className="p-6 space-y-2">
          <Skeleton className="w-64 h-6" />
          <Skeleton className="w-48 h-4" />
          <div className="flex items-center gap-4">
            <Skeleton className="w-32 h-4" />
            <Skeleton className="w-16 h-6 rounded-full" />
          </div>
        </CardContent>
      </Card> */}

      {/* Tabs */}
      <div className="flex gap-4 border-b pb-2 w-full justify-center">
        <Skeleton className="h-8 rounded-md w-1/2" />
        <Skeleton className="h-8 rounded-md w-1/2" />
      </div>

      {/* Summary + Document Box */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Clinical Summary */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-semibold">Clinical Summary</h2>
          <Card>
            <CardContent className="p-4 space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-4/6" />
              <Skeleton className="h-3 w-4/6" />
            </CardContent>
          </Card>
        </div>

        {/* Report Side Panel */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Reports</h2>

          <Card>
            <CardContent className="p-4 space-y-3">
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
              <Skeleton className="w-full h-6 rounded-md" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Biomarkers Overview */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Biomarkers Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-3 text-center">
                <Skeleton className="w-16 h-16 rounded-full" />
                <Skeleton className="w-full h-6" />
                <Skeleton className="w-full h-6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Biomarkers List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">All Biomarkers</h2>
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4 space-y-3">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 rounded w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
