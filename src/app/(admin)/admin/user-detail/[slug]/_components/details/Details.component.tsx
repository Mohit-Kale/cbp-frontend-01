'use client'

import React from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useUpdateUserMutation } from '@/redux/services/admin/users.api'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface Props {
  data: any
}

export default function AdminUserDetails({ data }: Props) {
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const resumeDoc = data?.consultantDocuments?.find((doc: any) => doc.documentType === 'CV')
  const expertise = data?.consultantSpecialties ?? []

  const isOnlyUserRole = data?.roles?.length === 1 && data.roles[0]?.name === 'user'

  const fields = [
    { label: 'Email', value: data?.email },
    { label: 'Phone', value: data?.phone },
    !isOnlyUserRole ? { label: 'Stripe Account Status', value: data?.profile?.stripeAccountStatus === 'VERIFIED' ? 'Configured' : 'Not Configured' } : null,

    { label: 'Street', value: data?.profile?.street },
    { label: 'City', value: data?.profile?.city },
    { label: 'State', value: data?.profile?.state },
    { label: 'Zip Code', value: data?.profile?.zipcode },
  ].filter(Boolean)

  type TUserStatus = 'ACTIVE' | 'INACTIVE'

  const handleSetVerification = async (value: boolean) => {
    try {
      await updateUser({ id: data.id, isVerified: value }).unwrap()
    } catch (err) {
      console.error('Failed to update verification', err)
    }
  }

  const handleActivation = async (status: TUserStatus) => {
    try {
      await updateUser({ id: data.id, status }).unwrap()
    } catch (err) {
      console.error('Failed to update activation', err)
    }
  }
  console.log(data.status)
  return (
    <div className="space-y-8">
      {/* ================= Profile Overview ================= */}
      <div className="">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="flex-1 w-full space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <Avatar className="h-24 w-24 border-2 border-border shadow-md">
                    <AvatarFallback className="text-primary text-4xl">{data?.fullName?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-semibold text-foreground">{data?.fullName}</h2>

                  {/* Verification Badge — hidden for role: user */}
                  {!isOnlyUserRole && (
                    <div
                      className={cn(
                        'flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full border transition-colors',
                        data?.isVerified ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200',
                      )}
                    >
                      {data?.isVerified ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          Verified
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" />
                          Not Verified
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Activation toggle (keep this for all roles) */}
                {!isOnlyUserRole && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button onClick={() => handleActivation(data.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')} disabled={isLoading || data.status === 'PENDING_VERIFICATION'} className="flex items-center gap-2">
                        <span className={cn('text-sm font-medium', data.status === 'ACTIVE' ? 'text-primary' : 'text-gray-400')}>Active</span>
                        <div className={cn('relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors', data.status === 'ACTIVE' ? 'bg-primary border-primary' : 'bg-gray-200 border-gray-300')}>
                          <span className={cn('inline-flex h-5 w-5 items-center justify-center transform rounded-full bg-white transition-transform shadow-sm', data.status === 'ACTIVE' ? 'translate-x-5' : 'translate-x-0')}>
                            {data.status === 'ACTIVE' && <CheckCircle2 className="h-3 w-3 text-primary" />}
                          </span>
                        </div>
                        <span className={cn('text-sm font-medium', data.status === 'INACTIVE' ? 'text-gray-600' : 'text-gray-400')}>Inactive</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {data.status === 'PENDING_VERIFICATION' && <p>Cannot activate user until verification is completed</p>}
                      <p>Click to {data.status === 'ACTIVE' ? 'deactivate' : 'activate'} user</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                {fields.map((field) => (
                  <div key={field?.label} className="flex flex-col">
                    <span className="text-muted-foreground">{field?.label}</span>
                    <span className="font-medium text-foreground break-words">{field?.value || '—'}</span>
                  </div>
                ))}
              </div>

              {expertise?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {expertise.map((item: any) => (
                      <Badge key={item.id} variant="secondary" className="px-3 py-1 text-sm rounded-full">
                        {item.specialty?.name || `Specialty #${item.specialtyId}`}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Resume + Verify Buttons — hidden for role: user */}
              {!isOnlyUserRole && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8 border-t border-border pt-4">
                  <Badge className="p-3 px-6 bg-primary/10 hover:bg-primary/30">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-foreground/70" />
                      <div className="flex flex-col">
                        <p className="font-medium text-foreground">{resumeDoc ? resumeDoc.fileUrl.split('/').pop() : 'No resume uploaded'}</p>
                        {resumeDoc && (
                          <Link href={resumeDoc.fileUrl} target="_blank" className="text-sm text-muted-foreground hover:text-foreground underline">
                            View Resume
                          </Link>
                        )}
                      </div>
                    </div>
                  </Badge>

                  <div className="flex items-center gap-3">
                    <Button onClick={() => handleSetVerification(true)} disabled={isLoading || data.isVerified} variant={data.isVerified ? 'secondary' : 'default'} className="px-4">
                      Verify
                    </Button>
                    <Button onClick={() => handleSetVerification(false)} disabled={isLoading || !data.isVerified} variant={!data.isVerified ? 'secondary' : 'destructive'} className="px-4">
                      Not Verify
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Resume Sections — hidden for role: user */}
      {!isOnlyUserRole && resumeDoc?.parsedData && (
        <div className="">
          <div className="p-6 md:p-8 space-y-6">
            {resumeDoc.parsedData.summary && (
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-2">Summary</h3>
                <p className="text-sm text-foreground">{resumeDoc.parsedData.summary}</p>
              </section>
            )}

            {Array.isArray(resumeDoc.parsedData.education) && resumeDoc.parsedData.education.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-2">Education</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                  {resumeDoc.parsedData.education.map((edu: string, idx: number) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              </section>
            )}

            {Array.isArray(resumeDoc.parsedData.workExperience) && resumeDoc.parsedData.workExperience.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold text-foreground mb-2">Work Experience</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
                  {resumeDoc.parsedData.workExperience.map((exp: string, idx: number) => (
                    <li key={idx}>{exp}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      )}

      {/* References stay visible always */}
      {data?.profile?.references?.length > 0 && (
        <div className="">
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6">References</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.profile.references.map((ref: any, idx: number) => (
                <div key={idx} className="group relative p-5 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-base font-semibold text-foreground">{ref.name}</p>
                    {ref.title && (
                      <p className="text-muted-foreground">
                        <span className="font-medium text-foreground">Title:</span> {ref.title}
                      </p>
                    )}
                    <div className="mt-2 space-y-1.5 text-sm">
                      {ref.email && (
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Email:</span> {ref.email}
                        </p>
                      )}
                      {ref.phone && (
                        <p className="text-muted-foreground">
                          <span className="font-medium text-foreground">Phone:</span> {ref.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
