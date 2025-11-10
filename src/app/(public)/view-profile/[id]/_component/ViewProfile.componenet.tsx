'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Calendar, MapPin } from 'lucide-react'
import { useConsultantsQuery, useCurrenciesQuery } from '@/redux/services/consultant.api'
import { useReduxSelector } from '@/hooks/redux.hook'
import { useAuthDialog } from '@/components/auth/useAuthDialog.hook'
import { useRouter } from 'next/navigation'
import { paths } from '@/navigate/paths'
import { randomBytes } from 'crypto'

interface Props {
  id: string
}

export default function ConsultantDetails({ id }: Props) {
  const router = useRouter()
  const { isLoggedIn } = useReduxSelector((state) => state.user)
  const { openAuthDialog } = useAuthDialog()

  const { data: consultantsData, isLoading } = useConsultantsQuery({ page: 1, limit: 50 })
  console.log(consultantsData)
  const { data: currencies } = useCurrenciesQuery()

  const consultant = consultantsData?.list.find((c) => c.id === Number(id))

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>
  }

  if (!consultant) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Consultant not found</div>
  }

  const currencySymbol = consultant.currency?.symbol || currencies?.find((c) => c.id === consultant.profile?.currencyId)?.symbol || ''

  const hourlyRate = consultant.profile?.hourlyRate ? `${currencySymbol}${parseFloat(consultant.profile.hourlyRate)}/hr` : null

  const resumeDoc = consultant.consultantDocuments?.find((doc) => doc.parsedData)
  const specialties = consultant.consultantSpecialties || []

  const handleBookSession = () => {
    if (!isLoggedIn) return openAuthDialog('signin')
    router.push(paths.userConsultantsSlots(consultant.id))
  }

  const handleMessage = () => {
    if (!isLoggedIn) return openAuthDialog('signin')
    // TODO: redirect to chat once messaging feature exists
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-10 space-y-10">
      <Card className="p-6 md:p-8 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex-1 space-y-4 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Avatar + Name Section */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-border shadow-md flex-shrink-0">
                  <AvatarFallback className="text-primary text-2xl">{consultant.fullName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>

                <div>
                  <h2 className="text-2xl font-semibold text-foreground">{consultant.fullName}</h2>
                  <p className="text-sm text-muted-foreground capitalize">{consultant.roles?.[0]?.name || 'Consultant'}</p>
                </div>
              </div>

              {/* Hourly Rate */}
              {hourlyRate && (
                <div className="text-right">
                  <p className="text-lg font-semibold text-primary">{hourlyRate}</p>
                  <p className="text-xs text-muted-foreground">Consultation Fee</p>
                </div>
              )}
            </div>

            {consultant.profile?.city && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>
                  {consultant.profile.city} ,{consultant.profile.state}
                </span>
              </div>
            )}

            {specialties.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {specialties.map((s) => (
                  <Badge key={randomBytes(6).toString('hex')} variant="default" className="rounded-full px-3 py-1 text-sm">
                    {s.specialty?.name || s.name}
                  </Badge>
                ))}
              </div>
            )}

            {resumeDoc?.parsedData && (
              <>
                {resumeDoc.parsedData.summary && (
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Summary</h3>
                    <p className="text-sm text-foreground">{resumeDoc.parsedData.summary}</p>
                  </section>
                )}
                {resumeDoc.parsedData.education && (
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Education</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                      {resumeDoc.parsedData.education.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {resumeDoc.parsedData.workExperience && (
                  <section>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Work Experience</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                      {resumeDoc.parsedData.workExperience.map((exp, i) => (
                        <li key={i}>{exp}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}
            <div className="flex gap-4 pt-2">
              <Button className="flex-1" onClick={handleBookSession}>
                <Calendar className="w-4 h-4 mr-2" /> Book Session
              </Button>

              <Button variant="outline" className="flex-1 hover:bg-primary/10 hover:text-primary" onClick={handleMessage}>
                Message Consultant
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
