'use client'

import { useState, useEffect, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { fadeUpVariant, popVariant } from '@/utils/animation.util'
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

  // ✅ Fetch all specialties to map selected IDs → names
  const { data: specialties } = useSpecialistsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  })

  // Sync input with filter name
  useEffect(() => {
    setSearchName(filters.name)
  }, [filters.name])

  // ✅ Debounced name search
  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //     onFilterChange({ ...filters, name: searchName.trim() })
  //   }, 1000)
  //   return () => clearTimeout(debounce)
  // }, [searchName, filters, onFilterChange])

  // ✅ Handle search click
  const handleSearch = () => {
    onFilterChange({ ...filters, name: searchName.trim() })
    onSearchClick()
  }

  // ✅ Remove a quick filter (unselect specialty)
  const handleRemoveQuickFilter = (name: string) => {
    if (!specialties) return
    const specialtyToRemove = specialties.find((s) => s.name === name)
    if (!specialtyToRemove) return
    const updatedIds = filters.specialtyId.filter((id) => id !== specialtyToRemove.id)
    onFilterChange({ ...filters, specialtyId: updatedIds })
  }

  return (
    <section className="p-12  bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        {/* Headline */}
        <motion.h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-8" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
          Find Your Perfect Executive Match
        </motion.h1>

        {/* Subheadline */}
        <motion.p className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-10 leading-relaxed" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          Browse our global network of C-suite executives and book hourly consultations
        </motion.p>

        {/* Search Bar */}
        <motion.div className="max-w-2xl mx-auto mb-8" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="text" placeholder="Search by name or specialty..." value={searchName} onChange={(e) => setSearchName(e.target.value)} className="pl-9 pr-9" />
              {searchName && (
                <button onClick={() => setSearchName('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button className="px-6 py-3 text-base" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </motion.div>

        {/* Dynamic Quick Filters (Selected Specialties) */}
        {/* {selectedSpecialties.length > 0 && (
          <motion.div className="flex flex-wrap justify-center gap-2" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            {selectedSpecialties.map((name, i) => (
              <motion.div key={name} variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.05 }}>
                <Button variant="secondary" className="px-4 py-2 rounded-full text-sm bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-2" onClick={() => handleRemoveQuickFilter(name)}>
                  {name}
                  <X className="h-3 w-3 opacity-70 hover:opacity-100" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )} */}
        <motion.div className="flex flex-wrap justify-center gap-2" variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
          {quickFilters.map((filter, i) => (
            <motion.div key={filter} variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.1 }}>
              <Button variant="secondary" className="px-4 py-2 rounded-full text-sm bg-primary/10 text-primary hover:bg-primary/20">
                {filter}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
