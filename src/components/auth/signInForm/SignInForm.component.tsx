'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuthDialog } from '../useAuthDialog.hook'
import { signInSchema, type SignInFormData } from './SignInForm.schema'
import { useLoginMutation } from '@/redux/services/auth.api'
import { getCookie, setUser } from '@/utils'
import { paths } from '@/navigate/paths'
import { updateUser } from '@/redux/slices/user.slice'
import { useReduxDispatch } from '@/hooks/redux.hook'
import { handleLogin } from '@/redux/slices/auth.slice'

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { closeAuthDialog } = useAuthDialog()
  const dispatch = useReduxDispatch()
  const [login] = useLoginMutation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true)
    try {
      const response = await login(data).unwrap()
      if (!response.token) {
        toast.error('Invalid response from server.')
        return
      }

      const token = getCookie('accessToken')
      if (token) {
        setUser({ token })
      } else {
        setUser({ token: response.token })
      }

      const roles = response.user.roles || []
      const isUser = roles.some((r: any) => r.name === 'user')

      // 🛑 Prevent redirect if logged-in user comes from `/slots/:id`
      const isSlotsPage = pathname.startsWith('/slots/')
      const userShouldStay = isUser && isSlotsPage

      dispatch(handleLogin({ token: response.token }))
      dispatch(updateUser(response.user))

      if (response.status === 'PENDING_VERIFICATION') {
        toast.info('Please verify your email first!')
      }

      // 🟢 AUTO-REDIRECT ONLY if userShouldStay === false
      if (!userShouldStay) {
        if (roles.find((r: any) => r.name === 'consultant')) {
          router.push(paths.consultantDashboard())
        } else if (roles.find((r: any) => r.name === 'admin')) {
          router.push(paths.adminDashboard())
        } else if (isUser) {
          router.push(paths.userDashboard())
        } else {
          router.push(paths.home())
        }
      }

      closeAuthDialog()
      router.refresh()
    } catch (error: any) {
      // const message = error?.data?.message || 'Invalid email or password'
      // toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="Enter your email" className="pl-10" {...field} />
            </div>
          )}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="pl-10 pr-10" {...field} />
              <button type="button" className="absolute right-3 top-3 text-muted-foreground" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          )}
        />
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-center">
        <Button type="submit" className="w-full btn-gradient" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </div>
    </form>
  )
}
