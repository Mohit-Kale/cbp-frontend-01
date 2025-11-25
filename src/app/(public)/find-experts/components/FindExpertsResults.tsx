'use client'

import { useState, useEffect, useMemo } from 'react'
import { FindExpertsFilters } from './FindExpertsFilters'
import { ExpertCard } from './ExpertCard'
import { useConsultantsQuery } from '@/redux/services/consultant.api'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import NoRecordsFound from '@/components/noRecordsFound/NoRecordFound.component'
import AlertError from '@/components/alert/AlertError'
import { Skeleton } from '@/components/ui/skeleton'

// Skeleton component
function ExpertCardSkeleton() {
  return (
    <div className="border rounded-lg p-4 animate-pulse bg-gray-100 dark:bg-gray-800">
      {/* Avatar + Name */}
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="rounded-full h-16 w-16 bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* Subtitle */}
      <Skeleton className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded mb-3" />

      {/* Big block content */}
      <Skeleton className="h-24 w-full bg-gray-300 dark:bg-gray-700 rounded mb-4" />

      {/* Two columns */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
        <Skeleton className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
    </div>
  )
}

interface FindExpertResultsProps {
  filters: { name: string; skills: string[]; specialtyId: number[] }
  onFilterChange: (filters: { name: string; skills: string[]; specialtyId: number[] }) => void
  forceLoading?: boolean
  onResultsLoaded?: () => void
}

export function FindExpertResults({ filters, onFilterChange, forceLoading = false, onResultsLoaded }: FindExpertResultsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const pageLimit = 6

  const { data, isLoading, error } = useConsultantsQuery({
    name: filters.name || undefined,
    specialtyId: filters.specialtyId.length ? [...filters.specialtyId] : undefined,
  })

  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  useEffect(() => {
    if (!isLoading && onResultsLoaded) {
      onResultsLoaded()
    }
  }, [isLoading, onResultsLoaded])

  const totalPages = useMemo(() => Math.ceil((data?.list.length || 0) / pageLimit), [data, pageLimit])

  const currentPageData = useMemo(() => {
    if (!data?.list) return []
    const start = (currentPage - 1) * pageLimit
    const end = currentPage * pageLimit
    return data.list.slice(start, end)
  }, [data, currentPage, pageLimit])

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    setIsPageLoading(true)
    setCurrentPage(page)
    setTimeout(() => setIsPageLoading(false), 300)
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    const filtersChanged = newFilters.name !== filters.name || newFilters.skills.join(',') !== filters.skills.join(',') || newFilters.specialtyId.join(',') !== filters.specialtyId.join(',')

    if (filtersChanged) onFilterChange(newFilters)
  }

  const loading = isLoading || forceLoading
  const hasResults = data?.list && data.list.length > 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-6">
        <FindExpertsFilters filters={filters} onFilterChange={handleFilterChange} />

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3 mt-3">
            <div className="text-md text-primary">
              {!loading && (
                <>
                  Showing {currentPageData.length} of {data?.list.length || 0} experts
                </>
              )}
            </div>
          </div>

          {/* Error */}
          {error && <AlertError title="Failed to load experts" description="Please try again later." />}

          {/* No results */}
          {!loading && !error && !hasResults && <NoRecordsFound />}

          {/* Experts Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: pageLimit }).map((_, i) => (
                <ExpertCardSkeleton key={i} />
              ))}
            </div>
          ) : hasResults ? (
            <>
              {isPageLoading ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: pageLimit }).map((_, i) => (
                    <ExpertCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {currentPageData.map((expert) => (
                    <ExpertCard key={expert.id} expert={expert} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      const showPage = page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)

                      if (!showPage) {
                        if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span key={page} className="px-2 text-muted-foreground">
                              ...
                            </span>
                          )
                        }
                        return null
                      }

                      return (
                        <Button key={page} variant={currentPage === page ? 'default' : 'outline'} size="sm" onClick={() => handlePageChange(page)} className="min-w-[40px] hover:text-primary">
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="hover:text-primary">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
