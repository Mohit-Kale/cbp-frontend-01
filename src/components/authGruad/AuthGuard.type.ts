import { TRoles } from '@/types'

export type PageType = TRoles | 'public' | 'auth'

export interface AuthGuardProps {
  children: React.ReactNode
  pageType: PageType
}
