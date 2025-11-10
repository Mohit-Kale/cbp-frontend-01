'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

interface SpecialistOption {
  id: number
  name: string
}

interface SpecialistMultiSelectProps<T extends FieldValues> {
  field: ControllerRenderProps<T, any>
  options: SpecialistOption[]
  label?: string
  placeholder?: string
}

export function SpecialistMultiSelect<T extends FieldValues>({ field, options, label, placeholder = 'Search and select specialties...' }: SpecialistMultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false)

  // Properly type the selected IDs as number[]
  const selectedIds: number[] = React.useMemo(() => {
    return Array.isArray(field.value) ? field.value : []
  }, [field.value])

  const toggleSelection = React.useCallback(
    (id: number) => {
      const updated = selectedIds.includes(id) ? selectedIds.filter((val) => val !== id) : [...selectedIds, id]
      field.onChange(updated)
    },
    [field, selectedIds],
  )

  const removeSelection = React.useCallback(
    (id: number, e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const updated = selectedIds.filter((val) => val !== id)
      field.onChange(updated)
    },
    [field, selectedIds],
  )

  const selectedOptions = React.useMemo(() => options.filter((opt) => selectedIds.includes(opt.id)), [options, selectedIds])

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-800">{label}</label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn('w-full justify-between min-h-[44px] h-auto px-3 py-2 rounded-lg border-gray-300', 'hover:border-gray-400 hover:bg-gray-50 bg-white transition-colors', !selectedOptions.length && 'text-gray-500')}
          >
            <div className="flex flex-wrap gap-1.5 flex-1 text-sm mr-2">
              {selectedOptions.length > 0 ? (
                selectedOptions.map((opt) => (
                  <Badge key={opt.id} variant="secondary" className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100">
                    <span className="text-xs">{opt.name}</span>
                    {/* Use span instead of button to avoid nested button issue */}
                    <span
                      role="button"
                      tabIndex={0}
                      className="ml-1 rounded-full outline-none hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 cursor-pointer inline-flex items-center justify-center"
                      onMouseDown={(e) => removeSelection(opt.id, e)}
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault()
                          removeSelection(opt.id, e as any)
                        }
                      }}
                      aria-label={`Remove ${opt.name}`}
                    >
                      <X className="h-3 w-3" />
                    </span>
                  </Badge>
                ))
              ) : (
                <span className="text-sm">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0 shadow-lg" align="start">
          <Command>
            <CommandInput placeholder="Search specialties..." className="h-9 border-b border-gray-200" />
            <CommandEmpty className="py-6 text-center text-sm text-gray-500">No specialties found.</CommandEmpty>
            <CommandGroup className="max-h-[240px] overflow-y-auto">
              {options.map((opt) => {
                const isSelected = selectedIds.includes(opt.id)
                return (
                  <CommandItem key={opt.id} value={opt.name} onSelect={() => toggleSelection(opt.id)} className="cursor-pointer flex items-center py-2 px-2 hover:bg-gray-100">
                    <Check className={cn('mr-2 h-4 w-4 text-blue-600 transition-opacity', isSelected ? 'opacity-100' : 'opacity-0')} />
                    <span className="text-sm">{opt.name}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
