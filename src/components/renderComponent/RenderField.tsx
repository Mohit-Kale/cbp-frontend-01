import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

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

export const RenderField = ({ control, name, label, placeholder, type = 'text', as = 'input', disabled = false, required = false }: RenderFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-1">
            {label}
            {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            {as === 'textarea' ? <Textarea {...field} placeholder={placeholder} disabled={disabled} /> : <Input {...field} type={type} placeholder={placeholder} disabled={disabled} className="p-2 mx-[-2]" />}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
