'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Consultant } from '@/redux/services/consultant.api'
import { useCurrenciesQuery } from '@/redux/services/consultant.api'
import { paths } from '@/navigate/paths'
import { useRouter } from 'next/navigation'
import { useAuthDialog } from '@/components/auth/useAuthDialog.hook'
import { useReduxSelector } from '@/hooks/redux.hook'
import { Eye } from 'lucide-react'

export function ExpertCard({ expert }: { expert: Consultant }) {
  const { data: currencies } = useCurrenciesQuery()
  const router = useRouter()
  const { openAuthDialog } = useAuthDialog()
  const getInitials = (name: string) =>
    name
      ?.split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() || 'N/A'

  const expertiseList = expert.consultantSpecialties?.map((item) => item.specialty?.name).filter(Boolean) || []
  const uniqueExpertise = Array.from(new Set(expertiseList))
  const displayExpertise = uniqueExpertise.slice(0, 3)
  const remainingExpertise = uniqueExpertise.length - displayExpertise.length

  const roleName = expert.roles?.[0]?.name || 'Consultant'
  const summary = expert.consultantDocuments?.[0]?.parsedData?.summary

  // ✅ Parse hourlyRate safely
  const parsedRate = expert.profile?.hourlyRate ? parseFloat(expert.profile.hourlyRate) : 0

  // ✅ Resolve symbol: use API-provided currency if available,
  // else find by currencyId fallback
  const currencySymbol = expert.currency?.symbol || currencies?.find((c) => c.id === expert.profile?.currencyId)?.symbol || ''
  const hourlyRate = parsedRate && parsedRate > 0 ? `${currencySymbol}${parsedRate}/hr` : ''
  const openSession = (expertId: number) => {
    router.push(paths.userConsultantsSlots(expertId))
  }

  return (
    <Card className="group flex flex-col h-full w-full max-w-md bg-card border border-border hover:shadow-md transition-all duration-300">
      <CardContent className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="font-bold text-sm">{getInitials(expert.fullName)}</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-foreground truncate max-w-[160px]">{expert.fullName}</h3>
              <p className="text-sm text-muted-foreground capitalize truncate">{roleName}</p>
            </div>
          </div>

          {/* Rate + Rating */}
          <div className="flex flex-col items-end text-right flex-shrink-0">
            {hourlyRate ? <div className="text-sm font-bold whitespace-nowrap">{hourlyRate}</div> : <div className="text-sm text-muted-foreground italic">Rate not set</div>}
            <div className="text-sm text-muted-foreground whitespace-nowrap">⭐ 4.9 (23)</div>
          </div>
        </div>

        {/* Expertise */}
        {uniqueExpertise.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {displayExpertise.map((exp, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full truncate max-w-[100px]" title={exp}>
                  {exp}
                </span>
              ))}
              {remainingExpertise > 0 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full cursor-pointer" onClick={() => router.push(paths.userViewProfile(expert.id))}>
                  +{remainingExpertise} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Summary */}
        {summary && <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">{summary}</p>}

        {/* Actions */}
        <div className="mt-auto flex gap-2 pt-2">
          <Button className="flex-1 text-sm font-medium" onClick={() => openSession(expert.id)}>
            Book Session
          </Button>
          <Button variant="outline" className="text-sm font-medium hover:bg-primary/10 hover:text-primary" onClick={() => router.push(paths.userViewProfile(expert.id))}>
            <Eye /> Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
