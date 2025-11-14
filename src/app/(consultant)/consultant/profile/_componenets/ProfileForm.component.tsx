'use client'

import React from 'react'
import { useForm, useFieldArray, Path } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save, UserPlus, Trash2, Loader2 } from 'lucide-react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form'
import { RenderComponent } from '@/components/renderComponent/RenderComponent.component'
import { useReduxDispatch } from '@/hooks/redux.hook'
import { useProfileQuery, useUpdateProfileMutation } from '@/redux/services/auth.api'
import { updateUser } from '@/redux/slices/user.slice'
import { ProfileSchema } from './ProfileForm.schema'
import { createDynamicSchema } from './ParsedForm/ParsedForm.schema'
import { flattenData } from '@/utils/flattendata'
import { toast } from 'sonner'
import { useCurrenciesQuery, useSpecialistsQuery, useUploadFileMutation } from '@/redux/services/consultant.api'
import { SpecialistMultiSelect } from '@/components/ui/SpecialstMultiSelect'
import { ProfileTabs } from '@/components/consultantProfile/ProfileTab.component'
import { ResumeUploadSection } from '@/components/consultantProfile/ResumeUpload.component'
import { RenderField } from '@/components/renderComponent/RenderField'
import { normalizeNullArrays } from '@/utils/normalizeData'
import { normalizeData } from '@/utils/normalizeData'
import { Currencies } from '@/dto/Currencies.dto'
import { useOnBoardingMutation } from '@/redux/services/consultant.stripe.api'
import { useRouter } from 'next/navigation'
import { paths } from '@/navigate/paths'

export default function ProfileForm() {
  const { data } = useProfileQuery()
  const dispatch = useReduxDispatch()
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation()
  const [uploadFile] = useUploadFileMutation()
  const [activeTab, setActiveTab] = React.useState<'static' | 'dynamic' | 'payment'>('static')

  // Scroll to top when switching tabs
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  // Improved scroll to field function
  const scrollToField = React.useCallback((fieldName: string) => {
    // Try multiple selectors to find the field
    const selectors = [`[name="${fieldName}"]`, `[id="${fieldName}"]`, `input[name="${fieldName}"]`, `select[name="${fieldName}"]`, `textarea[name="${fieldName}"]`]

    let element: HTMLElement | null = null

    for (const selector of selectors) {
      element = document.querySelector(selector)
      if (element) break
    }

    // If still not found, try finding by data attribute or closest form item
    if (!element) {
      const allInputs = document.querySelectorAll('input, select, textarea')
      for (const input of allInputs) {
        if (input.getAttribute('name')?.includes(fieldName)) {
          element = input as HTMLElement
          break
        }
      }
    }

    if (element) {
      // Scroll to the element with offset for better visibility
      const yOffset = -100 // Offset from top
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset

      window.scrollTo({ top: y, behavior: 'smooth' })

      // Focus the element after a short delay
      setTimeout(() => {
        element?.focus()
      }, 300)
    } else {
      console.warn(`Could not find element for field: ${fieldName}`)
    }
  }, [])

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null)
  const [dynamicFields, setDynamicFields] = React.useState<Record<string, any>>({})
  const [dynamicSchema, setDynamicSchema] = React.useState<z.ZodObject<any>>(z.object({}))
  const [isParsing, setIsParsing] = React.useState(false)
  const [fileInputKey, setFileInputKey] = React.useState(0)
  const { data: specialists } = useSpecialistsQuery()

  const CombinedSchema = React.useMemo(() => ProfileSchema.merge(dynamicSchema), [dynamicSchema])
  type TCombinedProfile = z.infer<typeof CombinedSchema>

  const consultantDocs = data?.consultantDocuments ?? []
  const existingResumeUrl = consultantDocs.find((doc) => doc.documentType === 'CV')?.fileUrl

  const parsedResumeData = React.useMemo(() => {
    const cvDoc = data?.consultantDocuments?.find((doc: any) => doc.documentType === 'CV' && doc.parsedData)
    return cvDoc?.parsedData ? flattenData(cvDoc.parsedData) : null
  }, [data])

  const form = useForm<TCombinedProfile>({
    resolver: zodResolver(CombinedSchema),
    defaultValues: {
      fullName: data?.fullName ?? '',
      email: data?.email ?? '',
      phone: data?.phone ?? '',
      street: data?.profile?.street ?? '',
      city: data?.profile?.city ?? '',
      state: data?.profile?.state ?? '',
      zipcode: data?.profile?.zipcode ?? '',
      references: data?.profile?.references ?? [
        { name: data?.profile?.references?.[0]?.name ?? '', title: data?.profile?.references?.[0]?.title ?? '', email: data?.profile?.references?.[0]?.email ?? '', phone: data?.profile?.references?.[0]?.phone ?? '' },
        { name: data?.profile?.references?.[1]?.name ?? '', title: data?.profile?.references?.[1]?.title ?? '', email: data?.profile?.references?.[1]?.email ?? '', phone: data?.profile?.references?.[1]?.phone ?? '' },
      ],
      resumeUrl: existingResumeUrl ?? '',
      specialties: data?.consultantSpecialties?.map((s) => s.specialtyId) ?? [],
      currencyId: data?.profile?.currency?.id ?? 0,
      hourlyRate: data?.profile?.hourlyRate?.toString() ?? '',
    },
  })
  const [onBoarding] = useOnBoardingMutation()
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

  React.useEffect(() => {
    if (existingResumeUrl && !form.getValues('resumeUrl')) {
      form.setValue('resumeUrl', existingResumeUrl)
    }
  }, [existingResumeUrl, form])

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'references',
    keyName: 'fieldId',
  })

  React.useEffect(() => {
    if (!parsedResumeData || typeof parsedResumeData !== 'object') return
    const normalized = normalizeNullArrays(parsedResumeData)
    const schema = createDynamicSchema(normalized)
    setDynamicSchema(schema)
    setDynamicFields(normalized)

    for (const [key, value] of Object.entries(normalized)) {
      form.register(key as Path<TCombinedProfile>)
      form.setValue(key as Path<TCombinedProfile>, value)
    }
  }, [parsedResumeData, form])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const maxFileSizeMB = 5
    const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      // Show a toast, alert, or form error
      toast.error('Only PDF or Docs are allowed.')
      e.target.value = '' // reset input
      return
    }
    if (file.size > maxFileSizeBytes) {
      toast.error(`File size must be under ${maxFileSizeMB} MB.`)
      e.target.value = '' // reset input
      return
    }
    setUploadedFile(file)
    setIsParsing(true)

    try {
      const res = await uploadFile({ file }).unwrap()
      if (res?.fileUrl) {
        form.setValue('resumeUrl', res.fileUrl, { shouldValidate: true, shouldDirty: true })
        form.clearErrors('resumeUrl')
      }

      const parsed = flattenData(res)
      const normalized = normalizeNullArrays(parsed)
      const schema = createDynamicSchema(normalized)
      setDynamicSchema(schema)
      setDynamicFields(normalized)

      for (const [key, value] of Object.entries(normalized)) {
        form.register(key as Path<TCombinedProfile>)
        form.setValue(key as Path<TCombinedProfile>, value)
      }

      setActiveTab('dynamic')
    } catch (err) {
      // console.error('Upload failed:', err)
      resetDynamicState()
      // toast.error('Resume upload failed. Please try again.')
    } finally {
      setIsParsing(false)
    }
  }

  const { data: currencies } = useCurrenciesQuery()

  const resetDynamicState = React.useCallback(() => {
    setUploadedFile(null)
    setDynamicFields({})
    setDynamicSchema(z.object({}))
    form.setValue('resumeUrl', '')
    setFileInputKey((prev) => prev + 1)
  }, [form])
  const router = useRouter()
  const onSubmit = async (formData: TCombinedProfile) => {
    try {
      const normalizedData = normalizeData(formData)
      const { resumeUrl, ...rest } = normalizedData
      const response = await updateProfile(rest)

      if (response) {
        dispatch(updateUser(response))
        setActiveTab('payment')
        if (data?.profile?.stripeAccountStatus === 'VERIFIED') {
          // setActiveTab('static')
          router.push(paths.consultantDashboard())
          return
        }
      }
    } catch (err) {
      // console.error('Update failed:', err)
      toast.error('Profile update failed. Please try again.')
    }
  }

  const onError = React.useCallback(
    (errors: any) => {
      toast.error('Please fill all required fields before submitting.', {
        duration: 5000,
        position: 'top-right',
      })

      const errorFields = Object.keys(errors)
      if (errorFields.length === 0) return

      /* ---------------------------------------------------
       1) BUILD REFERENCE FIELD ORDER (ACCURATE)
       --------------------------------------------------- */
      let referenceFieldOrder: string[] = []

      if (errors.references && typeof errors.references === 'object') {
        const referenceIndexes = Object.keys(errors.references) // usually ['0','1']

        // EXACT order based on your form structure
        const refInnerOrder = ['name', 'title', 'email', 'phone']

        referenceIndexes.forEach((refIndex) => {
          refInnerOrder.forEach((inner) => {
            referenceFieldOrder.push(`references.${refIndex}.${inner}`)
          })
        })
      }

      /* ---------------------------------------------------
       2) DEFINE FULL FORM UI ORDER
       --------------------------------------------------- */
      const formFieldOrder: string[] = [
        // static user info
        'fullName',
        'email',
        'phone',

        // payment
        'currencyId',
        'hourlyRate',

        // address
        'street',
        'city',
        'state',
        'zipcode',

        // other static
        'specialties',
        // reference fields (in order)
        ...referenceFieldOrder,
        'resumeUrl',

        // dynamic custom fields
        ...Object.keys(dynamicFields),
      ]

      /* ---------------------------------------------------
       3) FIND FIRST ERROR BASED ON UI ORDER
       --------------------------------------------------- */
      const firstErrorField = formFieldOrder.find((f) => errorFields.includes(f)) || errorFields[0]

      /* ---------------------------------------------------
       4) DETERMINE WHICH TAB TO OPEN
       --------------------------------------------------- */
      let targetTab: 'static' | 'dynamic' = 'static'

      if (firstErrorField.startsWith('references.')) {
        targetTab = 'static'
      } else if (Object.keys(dynamicFields).includes(firstErrorField)) {
        targetTab = 'dynamic'
      }

      setActiveTab(targetTab)

      /* ---------------------------------------------------
       5) SCROLL TO FIRST ERROR FIELD
       --------------------------------------------------- */
      setTimeout(() => {
        scrollToField(firstErrorField)
      }, 150)
    },
    [dynamicFields, scrollToField],
  )

  React.useEffect(() => {
    return () => {
      setDynamicSchema(z.object({}))
      setDynamicFields({})
    }
  }, [])

  return (
    <RenderComponent isLoading={isUpdating}>
      <div className="min-h-screen py-4 sm:py-8 px-0 sm:px-4 lg:px-8">
        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center mb-6 sm:mb-8 px-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-3 tracking-tight">Profile Settings</h1>
            <p className="text-muted-foreground text-base sm:text-lg">Manage your personal information and preferences</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-8">
              <div className="bg-card border border-border rounded-none sm:rounded-xl shadow-soft overflow-hidden">
                <ProfileTabs<typeof CombinedSchema> activeTab={activeTab} setActiveTab={setActiveTab} dynamicFields={dynamicFields} setDynamicFields={setDynamicFields} form={form}>
                  {/* PERSONAL INFO */}
                  <section className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 pb-4 border-b border-border">
                      <div className="h-8 sm:h-10 w-1 bg-primary rounded-full" />
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Personal Information</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Keep your personal details</p>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                      <RenderField control={form.control} name="fullName" label="Full Name" required />
                      <RenderField control={form.control} name="email" label="Email" disabled required />
                      <RenderField control={form.control} name="phone" label="Phone Number" required />

                      {/* Currency and Hourly Rate */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
                        <FormField
                          control={form.control}
                          name="currencyId"
                          render={({ field }) => (
                            <FormItem className="w-full sm:w-40 pt-4">
                              <FormLabel>
                                Currency <span className="text-destructive">*</span>{' '}
                              </FormLabel>
                              <FormControl>
                                <select
                                  {...field}
                                  onChange={(e) => field.onChange(Number(e.target.value))}
                                  className="w-full h-10 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  <option value={0}>Currency</option>
                                  {currencies?.map((c: Currencies) => (
                                    <option key={c.id} value={c.id}>
                                      {`${c.name} (${c.symbol ?? c.code})`}
                                    </option>
                                  ))}
                                </select>
                              </FormControl>
                              <div className="min-h-[18px] text-xs text-destructive">
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="hourlyRate"
                          render={({ field }) => (
                            <FormItem className="w-full sm:flex-1 pt-4">
                              <FormLabel className="pb-1">
                                Hourly Rate <span className="text-destructive">*</span>
                              </FormLabel>
                              <FormControl>
                                <input
                                  type="number"
                                  {...field}
                                  value={field.value || ''}
                                  onChange={(e) => field.onChange(e.target.value)}
                                  placeholder="Hourly rate"
                                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                              </FormControl>
                              <div className="min-h-[18px] text-xs text-destructive">
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </section>

                  {/* ADDRESS */}
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
                        <RenderField key={field} control={form.control} name={field} label={field.charAt(0).toUpperCase() + field.slice(1)} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} />
                      ))}
                    </div>
                  </section>

                  {/* SPECIALIZATION */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-border">
                      <div className="h-10 w-1 bg-primary rounded-full" />
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground">Specialization</h3>
                        <p className="text-sm text-muted-foreground mt-1">Select your areas of expertise</p>
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="specialties"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <SpecialistMultiSelect field={field} options={specialists || []} label="Select Specialties" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </section>

                  {/* REFERENCES */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-border">
                      <div className="h-8 sm:h-10 w-1 bg-primary rounded-full" />
                      <div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-foreground">References</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Add references</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      {fields.map((item, index) => (
                        <div key={item.fieldId} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {(['name', 'title', 'email', 'phone'] as const).map((sub) => (
                              <RenderField
                                key={sub}
                                control={form.control}
                                name={`references.${index}.${sub}`}
                                label={sub.charAt(0).toUpperCase() + sub.slice(1)}
                                required
                                placeholder={sub.charAt(0).toUpperCase() + sub.slice(1)}
                              />
                            ))}
                          </div>

                          {fields.length > 2 && (
                            <div className="flex justify-end">
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                className="text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors duration-200"
                                onClick={() => remove(index)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" /> Remove
                              </Button>
                            </div>
                          )}

                          {index < fields.length - 1 && <div className="border-b border-border pt-4" />}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-colors hover:text-primary duration-200"
                        onClick={() => append({ name: '', title: '', email: '', phone: '' })}
                      >
                        <UserPlus className="w-4 h-4 mr-2" /> Add Reference
                      </Button>
                    </div>
                  </section>

                  {/* RESUME UPLOAD */}
                  <ResumeUploadSection form={form} fileInputKey={fileInputKey} uploadedFile={uploadedFile} isParsing={isParsing} handleFileChange={handleFileChange} resetDynamicState={resetDynamicState} />
                  {/* PAYMENT */}
                </ProfileTabs>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="flex justify-end gap-4 px-4 sm:px-0">
                <Button
                  type="submit"
                  disabled={isParsing || isUpdating}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-medium hover:shadow-strong transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto sm:min-w-[180px]"
                >
                  {isParsing || isUpdating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      {isParsing ? 'Parsing...' : 'Saving...'}
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
