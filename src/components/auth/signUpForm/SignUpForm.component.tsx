'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, User, Lock, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import { useAuthDialog } from '../useAuthDialog.hook'
import { useRegisterMutation } from '@/redux/services/auth.api'
import { signUpSchema, type SignUpFormData } from './SignUpForm.schema'
import { paths } from '@/navigate/paths'
import TermsConditionsDialog from './TermsCondtionsDialog'

// Locked input component - country code cannot be edited
const LockedPhoneInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function LockedPhoneInput({ className, value, onChange, ...props }, ref) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useImperativeHandle(ref, () => inputRef.current!)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const cursorPosition = input.selectionStart || 0
    const textValue = String(value || '')

    // Find where country code ends
    const countryCodeMatch = textValue.match(/^\+\d+\s*/)
    const countryCodeLength = countryCodeMatch ? countryCodeMatch[0].length : 0

    // Block backspace/delete in country code area
    if ((e.key === 'Backspace' && cursorPosition <= countryCodeLength) || (e.key === 'Delete' && cursorPosition < countryCodeLength)) {
      e.preventDefault()
      return
    }

    // Block deletion of selected text that includes country code
    if ((e.key === 'Backspace' || e.key === 'Delete') && input.selectionStart !== input.selectionEnd) {
      const selectionStart = input.selectionStart || 0
      if (selectionStart < countryCodeLength) {
        e.preventDefault()
        return
      }
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const cursorPosition = input.selectionStart || 0
    const textValue = String(value || '')

    const countryCodeMatch = textValue.match(/^\+\d+\s*/)
    const countryCodeLength = countryCodeMatch ? countryCodeMatch[0].length : 0

    // Move cursor after country code if clicked inside it
    if (cursorPosition < countryCodeLength) {
      setTimeout(() => {
        input.setSelectionRange(countryCodeLength, countryCodeLength)
      }, 0)
    }
  }

  const handleSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    const textValue = String(value || '')

    const countryCodeMatch = textValue.match(/^\+\d+\s*/)
    const countryCodeLength = countryCodeMatch ? countryCodeMatch[0].length : 0

    // Prevent selecting country code
    if ((input.selectionStart || 0) < countryCodeLength) {
      input.setSelectionRange(countryCodeLength, input.selectionEnd || countryCodeLength)
    }
  }

  return (
    <input
      ref={inputRef}
      {...props}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onSelect={handleSelect}
      className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary ${className ?? ''}`}
    />
  )
})

// Custom PhoneInput wrapper to prevent country code deletion
interface ProtectedPhoneInputProps {
  value?: string | undefined
  onChange: (value: string | undefined) => void
  [key: string]: any
}

const ProtectedPhoneInput = React.memo(
  React.forwardRef<any, ProtectedPhoneInputProps>(function ProtectedPhoneInput({ value, onChange, ...props }, ref) {
    const handleChange = (newValue: string | undefined) => {
      // Simply pass through the value - LockedPhoneInput handles the protection
      onChange(newValue)
    }

    return <PhoneInput ref={ref} {...props} value={value} onChange={handleChange} countryCallingCodeEditable={false} limitMaxLength={true} addInternationalOption={false} inputComponent={LockedPhoneInput} />
  }),
)

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isTermsOpen, setIsTermsOpen] = useState(false)
  const [isTermsAccepted, setIsTermsAccepted] = useState(false)

  const [register] = useRegisterMutation()
  const { closeAuthDialog, authRole } = useAuthDialog()
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

      if ('error' in response) throw new Error()

      router.push(paths.registrationSuccess(data.email))
      reset()
      closeAuthDialog()
    } catch (error) {
      // toast.error('Something went wrong during registration.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      {/* ********** NAME + PHONE SIDE BY SIDE ********** */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
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

        {/* Phone Number */}
        <div className="space-y-1">
          <Label htmlFor="phone">Phone Number</Label>
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange } }) => (
              <ProtectedPhoneInput
                id="phone"
                international
                defaultCountry="GB"
                placeholder="Enter phone number"
                value={value ?? ''}
                onChange={(val: string | undefined) => {
                  onChange(val ?? undefined)
                }}
              />
            )}
          />

          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      {/* ********** EMAIL ********** */}
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

      {/* ********** PASSWORDS ********** */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Password */}
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

        {/* Confirm Password */}
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

      {/* ********** TERMS ********** */}
      <div className="flex items-start gap-3 rounded-md border border-gray-200 p-3 sm:p-4 bg-gray-50/50">
        <Checkbox id="terms" className="mt-1 chkbox-disable" checked={isTermsAccepted} disabled />

        <div className="text-sm text-muted-foreground leading-relaxed">
          Please{' '}
          <button type="button" onClick={() => setIsTermsOpen(true)} className="text-primary font-medium hover:underline">
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

      {/* ********** SUBMIT BUTTON ********** */}
      <div className="pt-2">
        <Button type="submit" className="w-full btn-gradient" disabled={isLoading || !isTermsAccepted}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>
    </form>
  )
}
