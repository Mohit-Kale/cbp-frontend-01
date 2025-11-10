import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonComparison() {
  return (
    <div className="space-y-6 ">
      {/* Comparison Overview */}
      <div className="grid md:grid-cols-2 gap-4">
        {[1, 2].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                <Skeleton className="h-4 w-40" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="h-3 w-24 mt-1" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Skeleton className="h-7 w-14 rounded-md" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" /> {/* Badge */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Health Score Comparison */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="text-lg">Health Score Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-10">
            <div className="text-center">
              <Skeleton className="h-10 w-14 mx-auto rounded-md" />
            </div>

            <div className="flex items-center">
              <Skeleton className="h-6 w-24 rounded-md" />
            </div>

            <div className="text-center">
              <Skeleton className="h-10 w-14 mx-auto rounded-md" />
            </div>
          </div>

          <div className="mt-5 p-4 bg-gray-50 border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-3/4 mt-2 rounded" />
          </div>
        </CardContent>
      </Card> */}

      {/* Compare Report Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Report Summary</CardTitle>
          <CardDescription>
            <Skeleton className="h-3 w-48 mt-1" />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-start space-x-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
