'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, User, Phone, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { useAuthDialog } from '../useAuthDialog.hook'
import { useRegisterMutation } from '@/redux/services/auth.api'
import { signUpSchema, type SignUpFormData } from './SignUpForm.schema'
import { paths } from '@/navigate/paths'
import TermsConditionsDialog from './TermsCondtionsDialog'
import { useCreateStripeSessionMutation } from '@/redux/services/consultant.stripe.api'

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)

  const [register] = useRegisterMutation()
  const [createStripeSession] = useCreateStripeSessionMutation()
  const { closeAuthDialog, authRole } = useAuthDialog() // 👈 include authRole
  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: SignUpFormData) => {
    console.log(authRole)
    if (!isTermsAccepted) {
      toast.warning('Please agree to all terms before signing up.')
      return
    }

    try {
      setIsLoading(true)
      const response = await register({
        email: data.email,
        fullName: data.name,
        phone: data.phone,
        password: data.password,
        role: authRole,
      })
      if (authRole === 'CONSULTANT') {
        const stripeSessionResponse = await createStripeSession({ email: data.email })
        if ('error' in stripeSessionResponse) throw new Error()
      }
      if ('error' in response) throw new Error()

      router.push(paths.registrationSuccess(data.email))
      reset()
      closeAuthDialog()
    } catch (error) {
      console.error('Register error:', error)
      toast.error('Something went wrong during registration.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Role Display */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Label htmlFor="name">Full Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="Enter your full name" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone">Phone Number</Label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="phone" placeholder="Enter your phone number" className="pl-10" {...field} />
              </div>
            )}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="email" placeholder="Enter your email" className="pl-10" {...field} />
            </div>
          )}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" className="pl-10 pr-10" {...field} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            )}
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" className="pl-10 pr-10" {...field} />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-muted-foreground">
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            )}
          />
          {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      {/* Terms Section */}
      <div className="flex items-start gap-3 rounded-md border border-gray-200 p-3 sm:p-4 bg-gray-50/50">
        <Checkbox id="terms" className="mt-1 chkbox-disable" checked={isTermsAccepted} disabled />
        <div className="text-sm text-muted-foreground leading-relaxed">
          Please{' '}
          <button type="button" onClick={() => setIsTermsOpen(true)} className="text-primary font-medium   hover:underline">
            click here
          </button>{' '}
          to read the Terms of Use before proceeding to Sign Up.
        </div>
      </div>

      <TermsConditionsDialog
        open={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        onAccept={() => {
          setIsTermsAccepted(true)
          setIsTermsOpen(false)
        }}
        authRole={authRole}
      />

      <div className="pt-2">
        <Button type="submit" className="w-full btn-gradient" disabled={isLoading || !isTermsAccepted}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>
    </form>
  )
}
