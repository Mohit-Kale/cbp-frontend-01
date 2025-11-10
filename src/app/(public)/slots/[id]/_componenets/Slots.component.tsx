'use client'

import { useConsultantsQuery, useCurrenciesQuery } from '@/redux/services/consultant.api'
import { useReduxSelector } from '@/hooks/redux.hook'
import { useAuthDialog } from '@/components/auth/useAuthDialog.hook'
import { Calendar, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SlotsComponentProps {
  id: string
  onClickBooking: () => void
}

export default function SlotsComponent({ id, onClickBooking }: SlotsComponentProps) {
  const { isLoggedIn } = useReduxSelector((state) => state.user)
  const { openAuthDialog } = useAuthDialog()

  const { data: consultantsData, isLoading } = useConsultantsQuery({ page: 1, limit: 50 })
  const { data: currencies } = useCurrenciesQuery()

  const consultant = consultantsData?.list.find((c) => c.id === Number(id))

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>
  if (!consultant) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Consultant not found</div>

  const rateSource = consultant.profile?.hourlyRate ?? null
  const parsedRate = rateSource ? parseFloat(rateSource) : null

  const currencyId = consultant.profile?.currencyId
  const currencySymbol = consultant.currency?.symbol || currencies?.find((c) => c.id === currencyId)?.symbol || ''

  const hourlyRate = parsedRate ? `${currencySymbol}${parsedRate}/hr` : null

  const city = consultant.profile?.city ?? ''
  const state = consultant.profile?.state ?? ''
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2">
            <Card className="p-2 md:p-8 pt-2 md:pt-8 shadow-sm hover:shadow-md transition-all border border-border">
              <CardContent className="space-y-6 pt-2 md:pt-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{consultant.fullName}</h1>
                    <p className="text-sm text-muted-foreground mt-1 capitalize">{consultant.roles?.[0]?.name || 'Consultant'}</p>
                  </div>

                  {hourlyRate && (
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">{hourlyRate}</p>
                      <p className="text-xs text-muted-foreground">Consultation Fee</p>
                    </div>
                  )}
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-2">
                  {consultant.consultantSpecialties?.length ? (
                    consultant.consultantSpecialties.map((s: any, idx: number) => (
                      <Badge key={idx} variant="default">
                        {s.specialty?.name || s.name}
                      </Badge>
                    ))
                  ) : (
                    <Badge>No specializations listed</Badge>
                  )}
                </div>

                {/* Location */}
                {(city || state) && (
                  <div className="flex items-center text-sm text-muted-foreground gap-2 mt-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>
                      {city}
                      {city && state ? ', ' : ''}
                      {state}
                    </span>
                  </div>
                )}

                {/* Summary */}
                <p className="text-sm text-muted-foreground leading-relaxed">{consultant.consultantDocuments?.[0]?.parsedData?.summary || 'No description available.'}</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Box */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20 shadow-sm border border-border">
              <Button
                className="w-full mb-3 flex items-center justify-center"
                onClick={() => {
                  if (!isLoggedIn) return openAuthDialog('signin')
                  else onClickBooking()
                }}
              >
                <Calendar className="w-4 h-4 mr-2" /> Book Session
              </Button>

              {/* <Button
                variant="outline"
                className="w-full flex items-center justify-center hover:bg-primary/10 hover:text-primary"
                onClick={() => {
                  if (!isLoggedIn) return openAuthDialog('signin')
                }}
              >
                <Users className="w-4 h-4 mr-2" /> Message Expert
              </Button> */}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
