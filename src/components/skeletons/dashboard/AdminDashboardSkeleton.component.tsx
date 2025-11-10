import { Skeleton } from '@/components/ui/skeleton'

export default function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl p-4 border shadow-sm space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-8 w-1/4" />
          </div>
        ))}
      </div>

      {/* Last 20 Users */}
      <div className="border rounded-xl shadow-sm">
        {/* Table Header */}
        <div className="bg-muted px-4 py-3 rounded-t-xl">
          <Skeleton className="h-4 w-1/4" />
        </div>

        {/* Table Rows */}
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 px-4 py-3 items-center">
              <Skeleton className="h-4 w-24" /> {/* Full Name */}
              <Skeleton className="h-4 w-36" /> {/* Email */}
              <Skeleton className="h-4 w-24" /> {/* Phone */}
              <Skeleton className="h-4 w-16" /> {/* Gender */}
              <Skeleton className="h-6 w-16 rounded-full" /> {/* Status */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
