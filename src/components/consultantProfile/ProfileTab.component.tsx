'use client'

import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { FileText, Upload, CreditCard } from 'lucide-react'
import { ParsedForm } from '@/app/(consultant)/consultant/profile/_componenets/ParsedForm/ParsedForm'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useProfileQuery } from '@/redux/services/auth.api'
import { useOnBoardingMutation } from '@/redux/services/consultant.stripe.api'

interface ProfileTabsProps<T extends z.ZodTypeAny> {
  activeTab: 'static' | 'dynamic' | 'payment'
  setActiveTab: React.Dispatch<React.SetStateAction<'static' | 'dynamic' | 'payment'>>
  children: React.ReactNode
  dynamicFields: Record<string, any>
  setDynamicFields: React.Dispatch<React.SetStateAction<Record<string, any>>>
  form: UseFormReturn<z.infer<T>>
  paymentSection?: React.ReactNode
}

export function ProfileTabs<T extends z.ZodTypeAny>({ activeTab, setActiveTab, children, dynamicFields, setDynamicFields, form, paymentSection }: ProfileTabsProps<T>) {
  const [onBoarding] = useOnBoardingMutation()
  const { data } = useProfileQuery()
  const handleOnBoarding = async () => {
    if (!data?.profile?.stripeAccountId) {
      toast.error('Stripe account email not available.')
      return
    }

    try {
      const response = await onBoarding({ accountId: data.profile.stripeAccountId }).unwrap()
      if (response?.url) {
        window.location.href = response.url
      } else {
        toast.error('Failed to get onboarding URL. Please try again.')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      toast.error('Something went wrong while initiating payout setup.')
    }
  }
  return (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'static' | 'dynamic' | 'payment')} className="w-full">
      {/* HEADER */}
      <div className="bg-muted/30 border-b border-border px-4 sm:px-6 py-4 sm:py-5">
        <TabsList className="grid grid-cols-3 w-full max-w-xl mx-auto bg-background border border-border shadow-sm">
          <TabsTrigger value="static" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs sm:text-sm">
            <FileText className="w-4 h-4 mr-2" /> Profile Info
          </TabsTrigger>

          <TabsTrigger value="dynamic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs sm:text-sm">
            <Upload className="w-4 h-4 mr-2" /> Resume Data
          </TabsTrigger>

          <TabsTrigger value="payment" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all text-xs sm:text-sm">
            <CreditCard className="w-4 h-4 mr-2" /> Payment
          </TabsTrigger>
        </TabsList>
      </div>

      {/* STATIC TAB */}
      <TabsContent value="static" className="p-4 sm:p-6 lg:p-8 space-y-8 mt-0">
        {children}
      </TabsContent>

      {/* DYNAMIC TAB */}
      <TabsContent value="dynamic" className="p-4 sm:p-6 lg:p-8 mt-0">
        <ParsedForm dynamicFields={dynamicFields} setDynamicFields={setDynamicFields} form={form} />

        {Object.keys(dynamicFields ?? {}).length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <Upload className="w-10 h-10 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Parsed Data Available</h3>
            <p className="text-muted-foreground max-w-md">Upload a resume in the Profile Info tab to auto-fill professional details.</p>
          </div>
        )}
      </TabsContent>

      {/* ✅ PAYMENT TAB (New) */}
      <TabsContent value="payment" className="p-4 sm:p-6 lg:p-8 mt-0">
        <section className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-border">
            <div className="h-8 sm:h-10 w-1 bg-primary rounded-full" />
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Payment</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">Complete your payment details</p>
            </div>
          </div>

          <section>
            {data?.profile?.stripeAccountStatus === 'VERIFIED' ? (
              <div className="p-4 bg-green-100  rounded-md">
                <h4 className="font-semibold">Your payout account is configured</h4>
              </div>
            ) : (
              <Button
                type="button"
                onClick={handleOnBoarding}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-medium hover:shadow-strong transition-all"
                disabled={data?.consultantDocuments?.length === 0}
              >
                Payout Setup
              </Button>
            )}
          </section>
        </section>
      </TabsContent>
    </Tabs>
  )
}
