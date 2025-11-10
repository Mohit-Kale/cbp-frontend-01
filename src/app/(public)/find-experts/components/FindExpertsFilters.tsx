'use client'

import { useState, useEffect, useMemo } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Loader2, X } from 'lucide-react'
import { useSpecialistsQuery } from '@/redux/services/consultant.api'

interface FindExpertsFiltersProps {
  filters: { name: string; skills: string[]; specialtyId: number[] }
  onFilterChange: (filters: { name: string; skills: string[]; specialtyId: number[] }) => void
}

const experienceLevels = ['CEO/Founder', 'CTO/CPO', 'CMO/CGO', 'CFO/COO']
const rateOptions = [
  { value: 'any', label: 'Any rate' },
  { value: '0-100', label: '$0 - $100' },
  { value: '100-250', label: '$100 - $250' },
  { value: '250-500', label: '$250 - $500' },
  { value: '500-1000', label: '$500 - $1000' },
  { value: '1000+', label: '$1000+' },
]

export function FindExpertsFilters({ filters, onFilterChange }: FindExpertsFiltersProps) {
  const [selectedSpecialties, setSelectedSpecialties] = useState<number[]>(filters.specialtyId)
  const [selectedExperience, setSelectedExperience] = useState<string[]>(filters.skills)
  const [selectedRate, setSelectedRate] = useState('any')

  // Sync local state with props
  useEffect(() => {
    setSelectedSpecialties(filters.specialtyId)
    setSelectedExperience(filters.skills)
  }, [filters.specialtyId, filters.skills])

  // Fetch specialties from API
  const { data: specialties, isLoading: isLoadingSpecialties } = useSpecialistsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  // Debounced filter update (only for skills and specialtyId)
  useEffect(() => {
    const debounce = setTimeout(() => {
      onFilterChange({
        ...filters,
        skills: selectedExperience,
        specialtyId: selectedSpecialties,
      })
    }, 500) // Slightly snappier debounce

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
    onFilterChange({ name: '', skills: [], specialtyId: [] }) // Clear all filters, including name (search)
  }

  const hasActiveFilters = useMemo(() => filters.name || selectedSpecialties.length > 0 || selectedExperience.length > 0 || selectedRate !== 'any', [filters.name, selectedSpecialties, selectedExperience, selectedRate])

  return (
    <aside className="lg:col-span-1">
      <Card className="sticky top-6 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Filters</CardTitle>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-8 text-xs hover:text-destructive flex items-center">
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Expertise Area (Specialties) */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Expertise Area
              {selectedSpecialties.length > 0 && <span className="ml-2 text-xs text-muted-foreground">({selectedSpecialties.length} selected)</span>}
            </label>

            {isLoadingSpecialties ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : specialties && specialties.length > 0 ? (
              <div className="max-h-52 overflow-y-auto pr-1 custom-scrollbar">
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

          {/* Hourly Rate */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Hourly Rate</label>
            <Select value={selectedRate} onValueChange={setSelectedRate}>
              <SelectTrigger>
                <SelectValue placeholder="Any rate" />
              </SelectTrigger>
              <SelectContent>
                {rateOptions.map((rate) => (
                  <SelectItem key={rate.value} value={rate.value}>
                    {rate.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Experience Level */}
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Experience Level
              {selectedExperience.length > 0 && <span className="ml-2 text-xs text-muted-foreground">({selectedExperience.length} selected)</span>}
            </label>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox id={`experience-${level}`} checked={selectedExperience.includes(level)} onCheckedChange={() => handleExperienceToggle(level)} />
                  <label htmlFor={`experience-${level}`} className="text-sm cursor-pointer truncate max-w-[180px]">
                    {level}
                  </label>
                </div>
              ))}
            </div>
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
    </aside>
  )
}
