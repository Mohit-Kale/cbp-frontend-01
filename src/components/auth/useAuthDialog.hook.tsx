'use client'

import { useReduxDispatch, useReduxSelector } from '@/hooks/redux.hook'
import { handleAuthDialog, TAuthMode, TRoles } from '@/redux/slices/auth.slice'
import { RootState } from '@/redux/store'
import { useRouter, usePathname } from 'next/navigation'

export function useAuthDialog() {
  const dispatch = useReduxDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const { isLoggedIn } = useReduxSelector((state) => state?.user)

  const { authDialogOpen, authMode, authRole } = useReduxSelector((state: RootState) => state?.auth?.authDialog)

  // opens the auth dialog and sets mode + role
  const openAuthDialog = (mode: TAuthMode, role: TRoles = 'USER') => {
    console.log({ isLoggedIn })
    if (isLoggedIn) return
    dispatch(handleAuthDialog({ authDialogOpen: true, authMode: mode, authRole: role }))
  }

  const closeAuthDialog = () => {
    dispatch(handleAuthDialog({ authDialogOpen: false, authMode, authRole }))
    const roles: TRoles[] = ['USER', 'CONSULTANT']

    // only navigate back if the path is role-based
    if (roles.some((role) => pathname.includes(`/${role}`))) {
      router.back()
    }
  }

  return {
    authDialogOpen,
    authMode,
    authRole,
    openAuthDialog,
    closeAuthDialog,
  }
}
