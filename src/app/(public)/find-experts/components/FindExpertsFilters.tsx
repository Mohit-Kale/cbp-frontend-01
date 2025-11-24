'use client'

import { useState, useEffect, useMemo } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Filter } from 'lucide-react'
import { useSpecialistsQuery } from '@/redux/services/consultant.api'
import SectionLoading from '@/components/ui/section-loading'

interface FindExpertsFiltersProps {
  filters: { name: string; skills: string[]; specialtyId: number[] }
  onFilterChange: (filters: { name: string; skills: string[]; specialtyId: number[] }) => void
}

export function FindExpertsFilters({ filters, onFilterChange }: FindExpertsFiltersProps) {
  const [selectedSpecialties, setSelectedSpecialties] = useState<number[]>(filters.specialtyId)
  const [selectedExperience, setSelectedExperience] = useState<string[]>(filters.skills)
  const [selectedRate, setSelectedRate] = useState('any')

  // NEW: mobile collapse
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSelectedSpecialties(filters.specialtyId)
    setSelectedExperience(filters.skills)
  }, [filters.specialtyId, filters.skills])

  const { data: specialties, isLoading: isLoadingSpecialties } = useSpecialistsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    const debounce = setTimeout(() => {
      onFilterChange({
        ...filters,
        skills: selectedExperience,
        specialtyId: selectedSpecialties,
      })
    }, 500)
    return () => clearTimeout(debounce)
  }, [selectedSpecialties, selectedExperience, filters, onFilterChange])

  const handleSpecialtyToggle = (id: number) => {
    setSelectedSpecialties((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const handleExperienceToggle = (level: string) => {
    setSelectedExperience((prev) => (prev.includes(level) ? prev.filter((x) => x !== level) : [...prev, level]))
  }

  const handleClearFilters = () => {
    setSelectedSpecialties([])
    setSelectedExperience([])
    setSelectedRate('any')
    onFilterChange({ ...filters, skills: [], specialtyId: [] })
  }

  const hasActiveFilters = useMemo(() => selectedSpecialties.length > 0 || selectedExperience.length > 0 || selectedRate !== 'any', [selectedSpecialties, selectedExperience, selectedRate])

  return (
    <aside className="lg:col-span-1">
      {/* MOBILE: Toggle button */}
      <div className="lg:hidden mb-3">
        <Button variant="outline" className="w-full flex items-center justify-center gap-2 hover:bg-primary/10 hover:text-primary" onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <X size={16} /> : <Filter size={16} />}
          {isOpen ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      {/* Wrapper controls collapse only on mobile */}
      <div
        className={`${isOpen ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'} 
            overflow-hidden transition-all duration-300 lg:max-h-none`}
      >
        <Card className="sticky top-6 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Filters</CardTitle>
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={handleClearFilters} className="h-8 text-xs hover hover:text-primary flex items-center">
                  <X className="h-3 w-3 mr-1" />
                  Clear all
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Expertise Area */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Expertise Area
                {selectedSpecialties.length > 0 && <span className="ml-2 text-xs text-muted-foreground">({selectedSpecialties.length} selected)</span>}
              </label>

              {isLoadingSpecialties ? (
                <div className="flex items-center justify-center py-4">
                  <SectionLoading />
                </div>
              ) : specialties && specialties.length > 0 ? (
                <div className="max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                  {specialties.map((specialty: { id: number; name: string }) => (
                    <div key={specialty.id} className="flex items-center space-x-2 py-1">
                      <Checkbox id={`specialty-${specialty.id}`} checked={selectedSpecialties.includes(specialty.id)} onCheckedChange={() => handleSpecialtyToggle(specialty.id)} />
                      <label htmlFor={`specialty-${specialty.id}`} className="text-sm cursor-pointer truncate max-w-[180px]">
                        {specialty.name}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-2">No specialties available</p>
              )}
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="pt-4 border-t text-xs text-muted-foreground">
                <span className="font-medium">Active filters:</span>{' '}
                {[
                  filters.name && 'Search',
                  selectedSpecialties.length > 0 && `${selectedSpecialties.length} expertise`,
                  selectedExperience.length > 0 && `${selectedExperience.length} experience`,
                  selectedRate !== 'any' && 'Rate range',
                ]
                  .filter(Boolean)
                  .join(' • ')}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}
