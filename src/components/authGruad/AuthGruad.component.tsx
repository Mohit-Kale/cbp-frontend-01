'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getCookie, handleLogout } from '@/utils'
import { handleLogout as logoutSlice } from '@/redux/slices/auth.slice'
import { AuthGuardProps, PageType } from './AuthGuard.type'
import { allowedRoles } from '@/utils'
import { useLazyProfileQuery } from '@/redux/services/auth.api'
import { updateUser } from '@/redux/slices/user.slice'
import { UserDTO } from '@/dto'
import { paths } from '@/navigate/paths'
import SectionLoading from '../ui/section-loading'
import { toast } from 'sonner'
import { useReduxDispatch, useReduxSelector } from '@/hooks/redux.hook'

export default function AuthGuard({ children, pageType }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<UserDTO | null>(null)
  const [getUser] = useLazyProfileQuery()
  const dispatch = useReduxDispatch()

  const { userProfile } = useReduxSelector((state) => state.user)

  // Refs to prevent duplicate executions
  const hasFetchedRef = useRef(false)
  const redirectingRef = useRef(false)
  const lastAuthCheckRef = useRef({
    pathname: '',
    userStatus: '',
    userRole: '',
    resumeUrl: '',
    isVerified: false,
  })

  // Safe navigation wrapper
  const safeReplace = (to: string) => {
    if (!redirectingRef.current && pathname !== to) {
      redirectingRef.current = true
      router.replace(to)
    }
  }

  // Logout helper
  const performLogout = (message?: string) => {
    if (message) {
      toast.error(message)
    }
    handleLogout()
    dispatch(logoutSlice())
    dispatch(updateUser({} as UserDTO))
    setUser(null)
    safeReplace('/')
  }

  // Fetch user profile
  const fetchUser = async () => {
    try {
      const data = await getUser().unwrap()

      if (data) {
        // Initial inactive check
        if (data.status === 'INACTIVE') {
          performLogout('Your account is inactive. Please contact support.')
          return
        }

        const resumeUrl = data.consultantDocuments?.find((d) => d.documentType === 'CV')?.fileUrl

        const userDTO: UserDTO = {
          ...data,
          street: data.profile?.street,
          city: data.profile?.city,
          state: data.profile?.state,
          references:
            data.profile?.references?.map((ref) => ({
              name: ref.name,
              title: ref.title,
              email: ref.email,
              phone: ref.phone,
            })) || [],
          resumeUrl,
        }

        setUser(userDTO)
        dispatch(updateUser(userDTO))
      } else {
        setUser(null)
        dispatch(logoutSlice())
        dispatch(updateUser({} as UserDTO))
      }
    } catch (err) {
      console.error('Fetch user failed:', err)
      handleLogout()
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  // Memoize user critical properties to avoid unnecessary re-renders
  const userCriticalData = useMemo(
    () => ({
      status: user?.status || '',
      role: user?.role || '',
      resumeUrl: user?.resumeUrl || '',
      isVerified: user?.isVerified || false,
    }),
    [user?.status, user?.role, user?.resumeUrl, user?.isVerified],
  )

  // Initial load — check token and fetch user (runs once)
  useEffect(() => {
    if (hasFetchedRef.current) return
    hasFetchedRef.current = true

    const token = getCookie('accessToken')

    if (!token) {
      if (pageType !== 'public' && pageType !== 'auth') {
        toast.error('Session expired! Please login again.')
        safeReplace('/')
      } else {
        setIsLoading(false)
      }
      return
    }

    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Authorization and routing logic (optimized with duplicate check prevention)
  useEffect(() => {
    if (isLoading) return

    // Create current check signature
    const currentCheck = {
      pathname,
      userStatus: userCriticalData.status,
      userRole: userCriticalData.role,
      resumeUrl: userCriticalData.resumeUrl,
      isVerified: userCriticalData.isVerified,
    }

    // Prevent duplicate checks for same state
    const lastCheck = lastAuthCheckRef.current
    if (
      lastCheck.pathname === currentCheck.pathname &&
      lastCheck.userStatus === currentCheck.userStatus &&
      lastCheck.userRole === currentCheck.userRole &&
      lastCheck.resumeUrl === currentCheck.resumeUrl &&
      lastCheck.isVerified === currentCheck.isVerified
    ) {
      return
    }

    // Update last check reference
    lastAuthCheckRef.current = currentCheck

    console.log('AuthGuard: Running authorization check', currentCheck)

    // Check if user became inactive
    if (user && userCriticalData.status === 'INACTIVE') {
      performLogout('Your account is inactive. Please contact support.')
      return
    }

    // PUBLIC pages — always allow
    if (pageType === 'public') return

    // AUTH pages (login/register) — redirect if already logged in
    if (pageType === 'auth') {
      if (user) {
        safeReplace('/')
      }
      return
    }

    // Protected pages — require user
    if (!user) {
      toast.error('Session expired! Please login again.')
      safeReplace('/')
      return
    }

    // Consultant-specific rule — must upload resume and be verified
    if (userCriticalData.role === 'consultant') {
      const isProfilePage = pathname.includes('/consultant/profile')
      const currentUserData = user || userProfile

      if (!isProfilePage) {
        if (!currentUserData?.resumeUrl) {
          toast.error('Please complete your profile before proceeding!')
          safeReplace(paths.consultantProfile())
          return
        } else if (currentUserData?.resumeUrl && !currentUserData?.isVerified) {
          toast.error('Your profile is completed but under review. Once approved you will be redirected to dashboard.')
          safeReplace(paths.consultantProfile())
          return
        }
      }
    }

    // Role-based authorization
    if (userCriticalData.role === 'user' && pageType !== 'user') {
      toast.error('You are not authorized to access this page.')
      safeReplace('/')
      return
    }

    if (userCriticalData.role === 'consultant' && pageType !== 'consultant') {
      toast.error('You are not authorized to access this page.')
      safeReplace('/')
      return
    }

    if (userCriticalData.role === 'admin' && pageType !== 'admin') {
      toast.error('You are not authorized to access this page.')
      safeReplace('/')
      return
    }

    // Additional role check for allowed roles
    if (allowedRoles.includes(pageType)) {
      const allowedRole = pageType as PageType
      if (userCriticalData.role !== allowedRole) {
        toast.error('You are not authorized to access this page.')
        safeReplace('/')
      }
    }
  }, [isLoading, pageType, pathname, user, userProfile, userCriticalData.status, userCriticalData.role, userCriticalData.resumeUrl, userCriticalData.isVerified])

  // Show loading state
  if (isLoading || (pageType !== 'public' && pageType !== 'auth' && !user)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SectionLoading />
      </div>
    )
  }

  // Determine if user is authorized
  const isAuthorized = (() => {
    if (pageType === 'public') return true
    if (pageType === 'auth') return !user
    return user?.role === pageType
  })()

  return isAuthorized ? <>{children}</> : null
}
