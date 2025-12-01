'use client'

import { useConsultantsQuery, useCurrenciesQuery } from '@/redux/services/consultant.api'
import { useReduxSelector } from '@/hooks/redux.hook'
import { useAuthDialog } from '@/components/auth/useAuthDialog.hook'
import { Calendar, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import React, { useMemo } from 'react'

interface SlotsComponentProps {
  id: string
  onClickBooking: () => void
}
export interface InvoiceBoxProps {
  consultantId: number
}

/* ----------------------------- INVOICE COMPONENT ----------------------------- */

export function InvoiceBox({ consultantId }: InvoiceBoxProps) {
  const { data: consultantsData, isLoading } = useConsultantsQuery({ page: 1, limit: 50 })
  const { data: currencies } = useCurrenciesQuery()

  const consultant = useMemo(() => consultantsData?.list.find((c) => c.id === consultantId), [consultantsData, consultantId])

  if (isLoading) {
    return <Card className="p-4 text-sm text-muted-foreground">Loading fees…</Card>
  }

  if (!consultant) {
    return <Card className="p-4 text-sm text-muted-foreground">Fee info unavailabledddd</Card>
  }

  const rateSource = consultant.profile?.hourlyRate ?? null
  const hourlyRate = rateSource ? parseFloat(rateSource) : null
  if (!hourlyRate) {
    return <Card className="p-4 text-sm text-muted-foreground">Fee info unavailable</Card>
  }

  const currencyId = consultant.profile?.currencyId
  const currencySymbol = consultant.currency?.symbol || currencies?.find((c) => c.id === currencyId)?.symbol || ''

  const platformFee = hourlyRate * 0.1
  const total = hourlyRate + platformFee

  return (
    <Card className="p-4 border border-border shadow-sm mt-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="text-muted-foreground">Booking Fee</span>
        <span className="font-medium">
          {currencySymbol}
          {hourlyRate.toFixed(2)}
        </span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-muted-foreground">Platform Fee (10%)</span>
        <span className="font-medium">
          {currencySymbol}
          {platformFee.toFixed(2)}
        </span>
      </div>

      <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-base">
        <span>Total Amount</span>
        <span>
          {currencySymbol}
          {total.toFixed(2)}
        </span>
      </div>
    </Card>
  )
}

/* ------------------------------- MAIN COMPONENT ------------------------------ */

export default function SlotsComponent({ id, onClickBooking }: SlotsComponentProps) {
  const { isLoggedIn, userProfile } = useReduxSelector((state) => state.user)
  const { openAuthDialog } = useAuthDialog()

  const { data: consultantsData, isLoading } = useConsultantsQuery({ page: 1, limit: 50 })
  const { data: currencies } = useCurrenciesQuery()

  const consultant = useMemo(() => consultantsData?.list.find((c) => c.id === Number(id)), [consultantsData, id])

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>

  if (!consultant) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Consultant not found</div>

  const rateSource = consultant.profile?.hourlyRate ?? null
  const parsedRate = rateSource ? parseFloat(rateSource) : null

  const currencyId = consultant.profile?.currencyId
  const currencySymbol = consultant.currency?.symbol || currencies?.find((c) => c.id === currencyId)?.symbol || ''

  const hourlyRate = parsedRate ? `${currencySymbol}${parsedRate}/hr` : null
  const city = consultant.profile?.city ?? ''
  const state = consultant.profile?.state ?? ''
  const userRole = userProfile?.role

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
                    <div className="flex flex-col items-end text-right">
                      <div>
                        <p className="text-xl font-semibold text-primary leading-none">{hourlyRate}</p>
                        <p className="text-xs text-muted-foreground mt-1">Consultation Fee</p>
                      </div>
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

                {/* Invoice inside consultant page */}
              </CardContent>
            </Card>
          </div>

          {/* Action Box */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-20 shadow-sm border border-border">
              <Button
                className="w-full flex items-center justify-center"
                onClick={() => {
                  if (!isLoggedIn) return openAuthDialog('signin')
                  if (userRole !== 'user') {
                    toast.error('Only users can book sessions.')
                    return
                  }
                  onClickBooking()
                }}
              >
                <Calendar className="w-4 h-4 mr-2" /> Book Session
              </Button>
              <div className="mt-3 text-md text-muted-foreground leading-relaxed">Book your consultation at a time that works best for you.</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
