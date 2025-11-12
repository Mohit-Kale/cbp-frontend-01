import { TApiBase } from '@/types'

export type UserDTO = TApiBase & {
  id: number
  email: string
  fullName: string
  phone: string
  status: 'ACTIVE' | 'INACTIVE'
  isVerified: boolean
  roles?: { id: number; name: string }[]
  role: 'admin' | 'user' | 'consultant'

  // Nested profile object from API
  profile?: {
    street?: string
    city?: string
    state?: string
    dob?: string
    zipcode?: string | null
    qualification?: string | null
    expertise?: string | null
    references?: { name: string; title: string; email: string; phone: string }[]
    currency?: { id: number; name: string; symbol: string } | null
    hourlyRate?: string
    stripeAccountId?: string
    stripeAccountStatus?: string
  }

  // Documents as received
  consultantDocuments?: {
    id: number
    documentType: string
    fileUrl: string
    parsedData?: Record<string, any>
  }[]

  consultantSpecialties?: any[]

  // Flattened convenience fields for Redux / UI
  street?: string
  city?: string
  state?: string
  resumeUrl?: string
  references?: { name: string; title: string; email: string; phone: string }[]
}
