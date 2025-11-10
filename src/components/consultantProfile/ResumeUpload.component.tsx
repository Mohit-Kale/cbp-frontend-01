'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import UploadedResumeDisplay from '@/components/uploadResume/UploadResumeDisplay'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

interface ResumeUploadSectionProps<T extends z.ZodTypeAny> {
  form: UseFormReturn<z.infer<T>>
  fileInputKey: number
  uploadedFile: File | null
  isParsing: boolean
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  resetDynamicState: () => void
}

export function ResumeUploadSection<T extends z.ZodTypeAny>({ form, fileInputKey, uploadedFile, isParsing, handleFileChange, resetDynamicState }: ResumeUploadSectionProps<T>) {
  // explicitly cast to unknown, then string, since form.watch returns unknown for generics
  const resumeUrl = form.watch('resumeUrl' as any) as string | undefined

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="h-8 sm:h-10 w-1 bg-primary rounded-full" />
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Resume</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">Upload your resume</p>
        </div>
      </div>

      <FormField
        control={form.control}
        name={'resumeUrl' as any}
        render={() => (
          <FormItem>
            {isParsing ? (
              <div className="flex items-center gap-3 py-6 px-6 bg-muted/30 border border-border rounded-lg">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-primary font-medium">Parsing resume...</span>
              </div>
            ) : !uploadedFile && !resumeUrl ? (
              <FormControl>
                <div className="relative group">
                  <FormLabel>
                    Resume <span className="text-destructive">*</span>
                  </FormLabel>
                  <Input
                    key={`file-${fileInputKey}`}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="cursor-pointer h-13 border-border hover:border-primary/50 bg-muted/30 hover:bg-muted/50 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                </div>
              </FormControl>
            ) : (
              <UploadedResumeDisplay key={`uploaded-${fileInputKey}`} file={uploadedFile || undefined} fileUrl={!uploadedFile ? resumeUrl : undefined} onRemove={resetDynamicState} />
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </section>
  )
}
