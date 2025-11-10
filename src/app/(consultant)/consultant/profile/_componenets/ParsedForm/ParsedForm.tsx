'use client'

import React from 'react'
import { Path, UseFormReturn } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { X, Plus, Trash2 } from 'lucide-react'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'

interface DynamicFieldsRendererProps<T extends Record<string, any>> {
  dynamicFields: Record<string, any>
  setDynamicFields: React.Dispatch<React.SetStateAction<Record<string, any>>>
  form: UseFormReturn<T>
}

export const splitDotSeparated = (str: string) => {
  if (!str) return []
  return str
    .split(/•|\u2022|·|,|\/|–|-|\s{2,}/g)
    .map((s) => s.trim())
    .filter((s) => s.length > 1)
}
export function ParsedForm<T extends Record<string, any>>({ dynamicFields, setDynamicFields, form }: DynamicFieldsRendererProps<T>) {
  // Lifted state for chip fields (newValue and open per field key)
  const [chipStates, setChipStates] = React.useState<Record<string, { newValue: string; open: boolean }>>({})

  const handleRemoveSection = (key: string) => {
    const updated = { ...dynamicFields }
    delete updated[key]
    setDynamicFields(updated)
    form.unregister(key as Path<T>)
  }

  Object.keys(dynamicFields).forEach((key) => {
    if (!form.getFieldState(key as Path<T>).isTouched) {
      form.register(key as Path<T>)
    }
  })

  const fieldOrder = ['summary', 'work_experience', 'workExperience', 'experience', 'skills', 'education']

  const sortedEntries = Object.entries(dynamicFields)
    .filter(([key]) => !['fullName', 'email', 'phone', 'fileUrl'].includes(key))
    .sort(([a], [b]) => {
      const normalize = (k: string) => k.toLowerCase().replace(/_/g, '')
      const indexA = fieldOrder.findIndex((o) => normalize(o) === normalize(a))
      const indexB = fieldOrder.findIndex((o) => normalize(o) === normalize(b))
      return (indexA === -1 ? fieldOrder.length : indexA) - (indexB === -1 ? fieldOrder.length : indexB)
    })

  const getErrorMessage = (path: string) => {
    const error = form.formState.errors[path as keyof typeof form.formState.errors]
    return error?.message as string
  }

  const renderFieldContent = (key: string, value: any) => {
    const fieldKey = key as Path<T>
    const currentValue = form.watch(fieldKey) ?? value
    const label = key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

    // === ARRAY OF STRINGS ===
    if (Array.isArray(currentValue) && currentValue.every((v) => typeof v === 'string')) {
      const keyLower = key.toLowerCase()
      const isChipField = ['skills', 'languages', 'technologies'].includes(keyLower)
      const isEducationField = keyLower === 'education'

      // Get or initialize chip state for this key
      const chipState = chipStates[key] || { newValue: '', open: false }

      const processedValues = isChipField ? currentValue.flatMap((v) => splitDotSeparated(v)) : currentValue

      const addValue = () => {
        const trimmed = chipState.newValue.trim()
        if (trimmed && !processedValues.includes(trimmed)) {
          const updated = [...processedValues, trimmed]
          form.setValue(fieldKey, updated as any)
          // Reset newValue after adding
          setChipStates((prev) => ({ ...prev, [key]: { ...chipState, newValue: '', open: false } }))
        }
      }

      return (
        <section key={key} className="space-y-3">
          {/* === Section Header === */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-primary rounded-full" />
              <h3 className="text-lg font-semibold text-foreground break-words">{label}</h3>
            </div>
            <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive self-end sm:self-auto" onClick={() => handleRemoveSection(key)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {isChipField ? (
            // === CHIP FIELD ===
            <div className="flex flex-wrap items-center gap-2 border border-border rounded-md p-3 bg-card/50 min-h-[3rem]">
              {processedValues.map((v, i) => (
                <Badge key={i} variant="secondary" className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {v}
                  <X
                    className="w-3 h-3 ml-1 cursor-pointer hover:text-destructive transition-colors"
                    onClick={() => {
                      const updated = [...processedValues]
                      updated.splice(i, 1)
                      form.setValue(fieldKey, updated as any)
                    }}
                  />
                </Badge>
              ))}

              <Popover open={chipState.open} onOpenChange={(open) => setChipStates((prev) => ({ ...prev, [key]: { ...chipState, open } }))}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="h-8 w-8 rounded-full p-0 border-dashed">
                    <Plus className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="center" className="w-60 p-3 sm:p-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      value={chipState.newValue}
                      onChange={(e) => setChipStates((prev) => ({ ...prev, [key]: { ...chipState, newValue: e.target.value } }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addValue()
                        }
                      }}
                      placeholder={`Add ${label}`}
                      className="flex-1"
                    />
                    <Button size="sm" className="w-full sm:w-auto" onClick={addValue}>
                      Add
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          ) : isEducationField ? (
            // === EDUCATION FIELD ===
            <div className="space-y-2">
              {processedValues.map((v, i) => {
                const errMsg = getErrorMessage(`${key}[${i}]`)
                return (
                  <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <Input
                      value={v}
                      onChange={(e) => {
                        const updated = [...processedValues]
                        updated[i] = e.target.value
                        form.setValue(fieldKey, updated as any)
                      }}
                      placeholder={`Education ${i + 1}`}
                      className="flex-1 w-full"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => {
                        const updated = [...processedValues]
                        updated.splice(i, 1)
                        form.setValue(fieldKey, updated as any)
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    {errMsg && <p className="text-red-500 text-xs sm:text-sm">{errMsg}</p>}
                  </div>
                )
              })}
              <Button type="button" size="sm" variant="outline" className="w-full sm:w-auto text-primary border-primary/30 hover:bg-primary/10" onClick={() => form.setValue(fieldKey, [...processedValues, ''] as any)}>
                <Plus className="w-4 h-4 mr-2" /> Add Education
              </Button>
            </div>
          ) : (
            // === GENERIC ARRAY FIELD ===
            <div className="space-y-4">
              {processedValues.map((v, i) => {
                const errMsg = getErrorMessage(`${key}[${i}]`)
                return (
                  <div key={i} className="relative  bg-card/50 p-3 space-y-2">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="text-sm font-medium text-muted-foreground">{processedValues.length > 1 ? `${label} ${i + 1}` : label}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => {
                          const updated = [...processedValues]
                          updated.splice(i, 1)
                          form.setValue(fieldKey, updated as any)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Textarea
                      value={v}
                      rows={5}
                      className="font-mono text-sm "
                      onChange={(e) => {
                        const updated = [...processedValues]
                        updated[i] = e.target.value
                        form.setValue(fieldKey, updated as any)
                      }}
                    />
                    {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}
                  </div>
                )
              })}
              <Button type="button" size="sm" variant="outline" className="w-full sm:w-auto text-primary border-primary/30 hover:bg-primary/10" onClick={() => form.setValue(fieldKey, [...processedValues, ''] as any)}>
                <Plus className="w-4 h-4 mr-2" /> Add {label}
              </Button>
            </div>
          )}
        </section>
      )
    }

    // === OBJECT FIELDS ===
    if (typeof currentValue === 'object' && currentValue !== null) {
      return (
        <section key={key} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border gap-2">
            <div className="flex items-center gap-3">
              <div className="h-6 w-1 bg-primary rounded-full" />
              <h3 className="text-lg font-semibold text-foreground">{label}</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(currentValue).map(([subKey, subValue]) => {
              const errMsg = getErrorMessage(`${key}.${subKey}`)
              return (
                <div key={subKey} className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground break-words">{subKey.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</label>
                  <Input value={String(subValue ?? '')} onChange={(e) => form.setValue(`${key}.${subKey}` as Path<T>, e.target.value as any)} />
                  {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}
                </div>
              )
            })}
          </div>
        </section>
      )
    }

    // === PRIMITIVE FIELDS ===
    const errMsg = getErrorMessage(key)
    return (
      <section key={key} className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border gap-2">
          <div className="flex items-center gap-3">
            <div className="h-6 w-1 bg-primary rounded-full" />
            <h3 className="text-lg font-semibold text-foreground break-words">
              {label} <span className="text-destructive"> *</span>
            </h3>
          </div>
        </div>
        <Textarea
          value={String(currentValue ?? '')}
          rows={6}
          onChange={(e) =>
            form.setValue(fieldKey, e.target.value as any, {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
        {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}
      </section>
    )
  }

  return <section className="space-y-8 pb-10 sm:pb-0">{sortedEntries.map(([k, v]) => renderFieldContent(k, v))}</section>
}
