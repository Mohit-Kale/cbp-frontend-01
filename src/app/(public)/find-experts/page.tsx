'use client'

import { useRef, useState } from 'react'
import { FindExpertsHero } from './components/FindExpertsHero'
import { FindExpertResults } from './components/FindExpertsResults'

export default function FindExpertsPage() {
  const [filters, setFilters] = useState({
    name: '',
    skills: [] as string[],
    specialtyId: [] as number[],
  })

  // ✅ Ref to scroll to results
  const resultsRef = useRef<HTMLDivElement | null>(null)

  const handleSearchClick = () => {
    // Scroll smoothly to the results section
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-background">
      <FindExpertsHero filters={filters} onFilterChange={setFilters} onSearchClick={handleSearchClick} />
      <div ref={resultsRef}>
        <FindExpertResults filters={filters} onFilterChange={setFilters} />
      </div>
    </div>
  )
}
