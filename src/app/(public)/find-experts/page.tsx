'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { FindExpertsHero } from './components/FindExpertsHero'
import { FindExpertResults } from './components/FindExpertsResults'

export default function FindExpertsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    name: '',
    skills: [] as string[],
    specialtyId: [] as number[],
  })

  const [isSearching, setIsSearching] = useState(false)
  const resultsRef = useRef<HTMLDivElement | null>(null)

  // ✅ Initialize filters from URL on first mount
  useEffect(() => {
    const qpName = searchParams.get('name') || ''
    const qpSkills = searchParams.get('skills')
    const qpSpecialtyId = searchParams.get('specialtyId')

    setFilters({
      name: qpName,
      skills: qpSkills ? decodeURIComponent(qpSkills).split(',').filter(Boolean) : [],
      specialtyId: qpSpecialtyId
        ? decodeURIComponent(qpSpecialtyId)
            .split(',')
            .map((n) => Number(n))
            .filter((n) => !Number.isNaN(n))
        : [],
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // run once on mount

  // ✅ Sync filters → URL (but prevent redundant updates)
  // Persist filters to URL (without scroll) when they change
  useEffect(() => {
    try {
      const params = new URLSearchParams()
      if (filters.name) params.set('name', filters.name)
      if (filters.skills.length) params.set('skills', encodeURIComponent(filters.skills.join(',')))
      if (filters.specialtyId.length) params.set('specialtyId', encodeURIComponent(filters.specialtyId.join(',')))

      const qs = params.toString()
      const newUrl = qs ? `${pathname}?${qs}` : pathname

      // ✅ prevent scroll to top when updating query params
      router.replace(newUrl, { scroll: false })
    } catch {}
  }, [filters, pathname, router])

  // ✅ Scroll to results smoothly
  const handleSearchClick = () => {
    setIsSearching(true)
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-background">
      <FindExpertsHero filters={filters} onFilterChange={setFilters} onSearchClick={handleSearchClick} />
      <div ref={resultsRef}>
        <FindExpertResults filters={filters} onFilterChange={setFilters} forceLoading={isSearching} onResultsLoaded={() => setIsSearching(false)} />
      </div>
    </div>
  )
}
