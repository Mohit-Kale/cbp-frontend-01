'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FileText, Upload } from 'lucide-react'
import { ParsedForm } from '@/app/(consultant)/consultant/profile/_componenets/ParsedForm/ParsedForm'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

interface ProfileTabsProps<T extends z.ZodTypeAny> {
  activeTab: 'static' | 'dynamic'
  setActiveTab: React.Dispatch<React.SetStateAction<'static' | 'dynamic'>>
  children: React.ReactNode
  dynamicFields: Record<string, any>
  setDynamicFields: React.Dispatch<React.SetStateAction<Record<string, any>>>
  form: UseFormReturn<z.infer<T>>
}

export function ProfileTabs<T extends z.ZodTypeAny>({ activeTab, setActiveTab, children, dynamicFields, setDynamicFields, form }: ProfileTabsProps<T>) {
  return (
    <Tabs
      value={activeTab}
      // ✅ Cast required since `onValueChange` gives string, not union
      onValueChange={(value) => setActiveTab(value as 'static' | 'dynamic')}
      className="w-full"
    >
      {/* HEADER */}
      <div className="bg-muted/30 border-b border-border px-4 sm:px-6 py-4 sm:py-5">
        <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto bg-background border border-border shadow-sm">
          <TabsTrigger value="static" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200 text-xs sm:text-sm">
            <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Profile Info</span>
            <span className="sm:hidden">Profile</span>
          </TabsTrigger>

          <TabsTrigger value="dynamic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all duration-200 text-xs sm:text-sm">
            <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Resume Data</span>
            <span className="sm:hidden">Resume</span>
          </TabsTrigger>
        </TabsList>
      </div>

      {/* STATIC TAB */}
      <TabsContent value="static" className="p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-10 mt-0">
        {children}
      </TabsContent>

      {/* DYNAMIC TAB */}
      <TabsContent value="dynamic" className="p-4 sm:p-6 lg:p-8 mt-0">
        <ParsedForm dynamicFields={dynamicFields} setDynamicFields={setDynamicFields} form={form} />

        {Object.keys(dynamicFields ?? {}).length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
              <Upload className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Parsed Data Available</h3>
            <p className="text-muted-foreground max-w-md">Upload a resume in the Profile Info tab to automatically extract and populate your professional information here.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
