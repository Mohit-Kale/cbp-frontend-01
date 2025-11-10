'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, Loader2 } from 'lucide-react'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'

import { useReduxDispatch } from '@/hooks/redux.hook'
import { useProfileQuery, useUpdateProfileMutation } from '@/redux/services/auth.api'
import { updateUser } from '@/redux/slices/user.slice'
import { toast } from 'sonner'
import { TUserProfile, UserProfileSchema } from './UserProfile.schema'
import { RenderField } from '@/components/renderComponent/RenderField'

export default function UserProfileForm() {
  const { data } = useProfileQuery()
  const dispatch = useReduxDispatch()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()

  const form = useForm<TUserProfile>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      fullName: data?.fullName ?? '',
      email: data?.email ?? '',
      phone: data?.phone ?? '',
      street: data?.profile?.street ?? '',
      city: data?.profile?.city ?? '',
      state: data?.profile?.state ?? '',
      zipcode: data?.profile?.zipcode ?? '',
    },
  })

  const onSubmit = async (values: TUserProfile) => {
    try {
      const response = await updateProfile(values).unwrap()
      if (response) {
        dispatch(updateUser(response))
        // toast.success('Profile updated successfully!')
      }
    } catch (err) {
      console.error('Update failed:', err)
      toast.error('Failed to update profile.')
    }
  }

  return (
    <RenderComponent isLoading={isUpdating}>
      <div className="min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
            <p className="text-muted-foreground text-base">Update your basic information</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="bg-card border border-border rounded-xl shadow-soft p-6 sm:p-8 space-y-8">
                {/* PERSONAL INFO */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b border-border">
                    <div className="h-8 w-1 bg-primary rounded-full" />
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Personal Information</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">Keep your personal details up to date</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <RenderField control={form.control} name="fullName" label="Full Name" placeholder="Enter your full name" required />
                    <RenderField control={form.control} name="email" label="Email" placeholder="Enter your email" disabled required />
                    <RenderField control={form.control} name="phone" label="Phone Number" placeholder="Enter phone number" required />
                  </div>
                </section>
              </div>
              <section className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="h-10 w-1 bg-primary rounded-full" />
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">Address</h3>
                    <p className="text-sm text-muted-foreground mt-1">Your current location details</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {(['street', 'city', 'state', 'zipcode'] as const).map((field) => (
                    <RenderField key={field} control={form.control} required name={field} label={field.charAt(0).toUpperCase() + field.slice(1)} />
                  ))}
                </div>
              </section>
              {/* SUBMIT BUTTON */}
              <div className="flex justify-end gap-4">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-medium hover:shadow-strong transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto sm:min-w-[180px]"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5 mr-2" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </RenderComponent>
  )
}
