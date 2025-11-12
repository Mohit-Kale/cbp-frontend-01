'use client'

import React, { useEffect, useState } from 'react'
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
import { useReduxDispatch } from '@/hooks/redux.hook'

export default function AuthGuard({ children, pageType }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<UserDTO | null>(null)
  const [getUser] = useLazyProfileQuery()
  // const { data: profile } = useProfileQuery()
  const dispatch = useReduxDispatch()
  // const resumeUploded = profile?.consultantDocuments?.find((d) => d.documentType === 'CV')?.fileUrl
  // Fetch user profile and store in Redux + local state
  const fetchUser = async () => {
    try {
      const data = await getUser().unwrap()

      if (data) {
        // 🔒 Initial inactive check
        if (data.status === 'INACTIVE') {
          // toast.error('Your account is inactive. Please contact support.')
          handleLogout()
          dispatch(logoutSlice())
          dispatch(updateUser({} as UserDTO))
          setUser(null)
          router.replace('/')
          return
        }

        const resumeUrl = data.consultantDocuments?.find((d) => d.documentType === 'CV')?.fileUrl

        const userDTO: UserDTO = {
          ...data,
          street: data.profile?.street,
          city: data.profile?.city,
          state: data.profile?.state,
          references: data.profile?.references?.map((ref) => ({ name: ref.name, title: ref.title, email: ref.email, phone: ref.phone })) || [],
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

  // Initial load — check token and fetch user
  useEffect(() => {
    const token = getCookie('accessToken')

    if (!token) {
      if (pageType !== 'public' && pageType !== 'auth') {
        toast.error('Session expired! Please login again.')
        router.replace('/')
      } else {
        setIsLoading(false)
      }
      return
    }

    fetchUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // 🔁 Reactively handle inactive user or role-based redirection
  useEffect(() => {
    if (isLoading) return

    // 🚨 If user becomes inactive at any time
    if (user?.status === 'INACTIVE') {
      toast.error('Your account is inactive. Please contact support.')
      handleLogout()
      dispatch(logoutSlice())
      dispatch(updateUser({} as UserDTO))
      router.replace('/')
      return
    }

    // PUBLIC pages — always allow
    if (pageType === 'public') return

    // Protected pages (consultant/admin)
    if (!user) {
      toast.error('Session expired! Please login again.')
      router.replace('/')
      return
    }

    // Consultant-specific rule — must upload resume (recheck on route change)
    if (user.role === 'consultant' && !user.isVerified) {
      const isProfilePage = pathname.includes('/consultant/profile')
      if (!isProfilePage) {
        if (user.resumeUrl) {
          toast.error('Your Profile is under review.')
        } else {
          console.log(user.resumeUrl, '-----')
          toast.error('Please complete your profile before proceeding!')
        }
        router.replace(paths.consultantProfile())
        return
      }
    }
    if (user.role === 'user' && pageType !== 'user') {
      toast.error('You are not authorized to access this page.')
      router.replace('/')
      return
    }
    if (user.role === 'consultant' && pageType !== 'consultant') {
      toast.error('You are not authorized to access this page.')
      router.replace('/')
      return
    }
    if (user.role === 'admin' && pageType !== 'admin') {
      toast.error('You are not authorized to access this page.')
      router.replace('/')
      return
    }
    // Role-based route access
    if (allowedRoles.includes(pageType)) {
      const allowedRole = pageType as PageType
      if (user.role !== allowedRole) {
        toast.error('You are not authorized to access this page.')
        router.replace('/')
      }
    }
  }, [user, isLoading, pageType, pathname, router, dispatch])

  // Prevent early rendering
  if (isLoading || (pageType !== 'public' && pageType !== 'auth' && !user)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <SectionLoading />
      </div>
    )
  }

  // Authorization condition
  const isAuthorized = (() => {
    if (pageType === 'public') return true
    if (pageType === 'auth') return !user
    return user?.role === pageType
  })()

  return isAuthorized ? <>{children}</> : null
}
