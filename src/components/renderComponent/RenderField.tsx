import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface RenderFieldProps {
  control: any
  name: string
  label: string
  placeholder?: string
  type?: string
  as?: 'input' | 'textarea'
  disabled?: boolean
  required?: boolean
}

// Stable input component for PhoneInput to prevent remounting/focus loss
const PhoneTextInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(function PhoneTextInput({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className={`w-full rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed ${className ?? ''}`}
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
      // If the new value is empty but we had a value before, preserve the country code
      if (!newValue && value) {
        const countryCode = value.split(' ')[0]
        if (countryCode && countryCode.startsWith('+')) {
          onChange(countryCode)
          return
        }
      }
      // Prevent deletion of country code by ensuring it's always present
      if (newValue && value) {
        const currentCountryCode = value.split(' ')[0]
        const newCountryCode = newValue.split(' ')[0]

        // If country code was removed, restore it
        if (currentCountryCode && currentCountryCode.startsWith('+') && (!newCountryCode || !newCountryCode.startsWith('+'))) {
          onChange(currentCountryCode + ' ' + newValue)
          return
        }
      }

      onChange(newValue)
    }

    return <PhoneInput ref={ref} {...props} value={value} onChange={handleChange} countryCallingCodeEditable={false} limitMaxLength={true} addInternationalOption={false} inputComponent={PhoneTextInput} />
  }),
)

export const RenderField = ({ control, name, label, placeholder, type = 'text', as = 'input', disabled = false, required = false }: RenderFieldProps) => {
  const isPhoneField = name === 'phone' || name.endsWith('.phone')

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>

          <FormControl>
            {as === 'textarea' ? (
              <Textarea {...field} placeholder={placeholder} disabled={disabled} className="resize-none" />
            ) : isPhoneField ? (
              <ProtectedPhoneInput
                international
                defaultCountry="GB"
                placeholder={placeholder || 'Enter phone number'}
                value={field.value || undefined}
                onChange={(val: string | undefined) => field.onChange(val ?? '')}
                onBlur={field.onBlur}
                name={field.name}
                id={field.name}
              />
            ) : (
              <Input {...field} type={type} placeholder={placeholder} disabled={disabled} className="p-2 mx-[-2]" />
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
