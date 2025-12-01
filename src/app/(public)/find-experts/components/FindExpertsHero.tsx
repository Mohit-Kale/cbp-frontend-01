'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { fadeDownVariant, fadeUpVariant, popVariant } from '@/utils/animation.util'
import { Search, X } from 'lucide-react'
import { useSpecialistsQuery } from '@/redux/services/consultant.api'

interface FindExpertsHeroProps {
  filters: { name: string; skills: string[]; specialtyId: number[] }
  onFilterChange: (filters: { name: string; skills: string[]; specialtyId: number[] }) => void
  onSearchClick: () => void
}

const quickFilters = ['SaaS & Startups', 'AI & Machine Learning', 'Fintech & Crypto', 'Deep Tech']

export function FindExpertsHero({ filters, onFilterChange, onSearchClick }: FindExpertsHeroProps) {
  const [searchName, setSearchName] = useState(filters.name)
  const { data: specialties } = useSpecialistsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  // Create mapping between quick filter names and specialty IDs
  const quickFilterMapping = useMemo(() => {
    if (!specialties) return {}

    const mapping: Record<string, number[]> = {}

    // Map quick filters to specialty IDs based on name matching
    quickFilters.forEach((filterName) => {
      const matchedSpecialties = specialties.filter(
        (specialty) =>
          specialty.name.toLowerCase().includes(filterName.toLowerCase()) ||
          filterName.toLowerCase().includes(specialty.name.toLowerCase()) ||
          (filterName.toLowerCase().includes('ai') && specialty.name.toLowerCase().includes('artificial intelligence')) ||
          (filterName.toLowerCase().includes('fintech') && specialty.name.toLowerCase().includes('financial technology')) ||
          (filterName.toLowerCase().includes('saas') && specialty.name.toLowerCase().includes('software as a service')),
      )
      mapping[filterName] = matchedSpecialties.map((s) => s.id)
    })

    return mapping
  }, [specialties])

  // Check if a quick filter is currently active
  const isQuickFilterActive = (filterName: string) => {
    const filterIds = quickFilterMapping[filterName] || []
    return filterIds.some((id) => filters.specialtyId.includes(id))
  }

  useEffect(() => {
    setSearchName(filters.name)
  }, [filters.name])

  const handleSearch = () => {
    onFilterChange({ ...filters, name: searchName.trim() })
    onSearchClick()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  const handleQuickFilterClick = (filterName: string) => {
    const filterIds = quickFilterMapping[filterName] || []

    if (filterIds.length === 0) return

    // Check if this quick filter is already active
    const isActive = isQuickFilterActive(filterName)

    // Update specialty filters
    let newSpecialtyIds: number[]
    if (isActive) {
      // Remove this quick filter's specialty IDs
      newSpecialtyIds = filters.specialtyId.filter((id) => !filterIds.includes(id))
    } else {
      // Add this quick filter's specialty IDs
      newSpecialtyIds = [...filters.specialtyId, ...filterIds.filter((id) => !filters.specialtyId.includes(id))]
    }

    onFilterChange({ ...filters, specialtyId: newSpecialtyIds })
    onSearchClick()
  }

  return (
    <section className="pt-12 sm:p-12 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <motion.h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-0" variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          Find Your Perfect Executive Match
        </motion.h1>

        <motion.p className="text-2xl font-semibold text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed" variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          Browse our global network of C-suite executives and book hourly consultations
        </motion.p>

        {/* Search Bar Form (Enter triggers search) */}
        <motion.form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input type="text" placeholder="Search by name" value={searchName} onChange={(e) => setSearchName(e.target.value)} className="pl-9 pr-9" />

              {searchName && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchName('')
                    onFilterChange({ ...filters, name: '' })
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Button type="submit" className="px-6 py-3 text-base">
              Search
            </Button>
          </div>
        </motion.form>

        {/* Quick Filters */}
        <motion.div className="flex flex-wrap justify-center gap-2" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          {quickFilters.map((filter, i) => {
            const isActive = isQuickFilterActive(filter)
            return (
              <motion.div key={filter} variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.1 }}>
                <Button
                  variant={isActive ? 'default' : 'secondary'}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${isActive ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}
                  type="button"
                  onClick={() => handleQuickFilterClick(filter)}
                >
                  {filter}
                </Button>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
