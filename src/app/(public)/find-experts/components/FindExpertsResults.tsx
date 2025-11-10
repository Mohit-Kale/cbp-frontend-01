'use client'

import { useState } from 'react'
import { FindExpertsFilters } from './FindExpertsFilters'
import { ExpertCard } from './ExpertCard'
import { useConsultantsQuery } from '@/redux/services/consultant.api'
import { Button } from '@/components/ui/button'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import NoRecordsFound from '@/components/noRecordsFound/NoRecordFound.component'
import AlertError from '@/components/alert/AlertError'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FindExpertResultsProps {
  filters: { name: string; skills: string[]; specialtyId: number[] }
  onFilterChange: (filters: { name: string; skills: string[]; specialtyId: number[] }) => void
}

export function FindExpertResults({ filters, onFilterChange }: FindExpertResultsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const pageLimit = 4

  // Fetch consultants with filters and pagination
  const { data, isLoading, error } = useConsultantsQuery({
    page: currentPage,
    limit: pageLimit,
    name: filters.name || undefined,
    specialtyId: filters.specialtyId.length > 0 ? filters.specialtyId : undefined,
  })

  // // Debug: Log when filters or data changes
  // useEffect(() => {
  //   console.log('🔍 Current Filters:', filters)
  //   console.log('📄 Current Page:', currentPage)
  //   console.log('📊 API Response:', data)
  //   console.log('🔄 Is Fetching:', isFetching)
  // }, [filters, currentPage, data, isFetching])

  const handleFilterChange = (newFilters: typeof filters) => {
    const filtersChanged = newFilters.name !== filters.name || newFilters.skills.join(',') !== filters.skills.join(',') || newFilters.specialtyId.join(',') !== filters.specialtyId.join(',')

    if (filtersChanged) {
      onFilterChange(newFilters)
      setCurrentPage(1)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    if (window.scrollY > 800) {
      window.scrollTo({ top: 500, behavior: 'smooth' })
    }
  }

  const totalPages = data?.totalPages || 1
  const hasResults = data?.list && data.list.length > 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Filters Sidebar - Using your FindExpertsFilters component */}
        <FindExpertsFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Results Section */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-3 mt-3">
            <div className="text-md text-muted-foreground">
              {isLoading ? (
                'Loading...'
              ) : (
                <>
                  Showing {data?.list.length || 0} of {data?.totalItems || 0} experts
                  {currentPage > 1 && ` • Page ${currentPage} of ${totalPages}`}
                </>
              )}
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by relevance " />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lowestRate">Lowest rate first</SelectItem>
                <SelectItem value="highestRate">Highest rate first</SelectItem>
                <SelectItem value="mostRecent">Most recent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {error && <AlertError title="Failed to load experts" description="Please try again later." />}

          {/* No Results */}
          {!isLoading && !error && !hasResults && <NoRecordsFound />}

          {/* Expert Cards Grid */}
          {!isLoading && hasResults && (
            <>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {data.list.map((expert) => (
                  <ExpertCard key={expert.id} expert={expert} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage = page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)

                      if (!showPage) {
                        // Show ellipsis
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
                        <Button key={page} variant={currentPage === page ? 'default' : 'outline'} size="sm" onClick={() => handlePageChange(page)} className="min-w-[40px]">
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
