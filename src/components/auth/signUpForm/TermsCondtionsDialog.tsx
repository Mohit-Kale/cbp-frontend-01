'use client'

import React from 'react'
import * as z from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { termsForExecutives } from '@/data/termsForExecutives'
import { termsOfBusiness } from '@/data/termsOfBusiness'
import { ndaForExecutives } from '@/data/ndaForExecutives'

const termsSchema = z.object({
  agree: z.boolean().refine((v) => v, 'You must agree to continue.'),
})

type TermsFormValues = z.infer<typeof termsSchema>

interface Props {
  open: boolean
  onClose: () => void
  onAccept: () => void
  authRole: string
}

export default function TermsConditionsDialog({ open, onClose, onAccept, authRole }: Props) {
  const form = useForm<TermsFormValues>({
    resolver: zodResolver(termsSchema),
    defaultValues: { agree: false },
    mode: 'onChange',
  })

  const handleAgree = form.handleSubmit(
    () => {
      onAccept()
      // keep state or reset — depends on UX preference
      // form.reset()
    },
    () => {
      // validation errors are handled by FormMessage
    },
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) onClose()
      }}
    >
      <DialogContent className="max-w-lg p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-lg font-semibold text-foreground">Terms of Use {authRole === 'consultant' ? 'And NDA For Consultants' : 'For Users'}</DialogTitle>
        </DialogHeader>

        <Separator />

        <Form {...form}>
          <div className="flex flex-col">
            <ScrollArea className="max-h-[55vh] px-6 py-4 text-sm text-muted-foreground">
              <div className="space-y-4 pr-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground text-xl">UK Terms</h3>
                  {authRole === 'user' ? (
                    <>
                      <p>{termsOfBusiness.uk.title}</p>
                      <p>{termsOfBusiness.uk.governingEntity}</p>

                      {termsOfBusiness.uk.sections.map((section) => (
                        <div key={section.id} className="space-y-2">
                          <h4 className="font-semibold text-foreground">{section.title}</h4>
                          {section.content ? <p>{section.content}</p> : null}
                          {section.points ? (
                            <ul className="list-disc pl-6">
                              {section.points.map((point, index) => (
                                <li key={index} className="text-sm">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                      <p className="text-primary">{termsOfBusiness.uk.acceptance}</p>
                    </>
                  ) : (
                    <>
                      <p>{termsForExecutives.uk.title}</p>
                      <p>{termsForExecutives.uk.governingEntity}</p>
                      {termsForExecutives.uk.sections.map((section) => (
                        <div key={section.id} className="space-y-2">
                          <h4 className="font-semibold text-foreground">{section.title}</h4>
                          {section.title ? <p>{section.title}</p> : null}
                          {section.content ? <p>{section.content}</p> : null}
                        </div>
                      ))}
                      <p className="text-primary">{termsForExecutives.uk.acceptance}</p>
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground text-xl">USA Terms</h3>
                  {authRole === 'user' ? (
                    <>
                      <p>{termsOfBusiness.us.title}</p>
                      <p>{termsOfBusiness.us.governingEntity}</p>

                      {termsOfBusiness.us.sections.map((section) => (
                        <div key={section.id} className="space-y-2">
                          <h4 className="font-semibold text-foreground">{section.title}</h4>
                          {section.content ? <p>{section.content}</p> : null}
                          {section.points ? (
                            <ul className="list-disc pl-6">
                              {section.points.map((point, index) => (
                                <li key={index} className="text-sm">
                                  {point}
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                      <p className="text-primary">{termsOfBusiness.us.acceptance}</p>
                    </>
                  ) : (
                    <>
                      <p>{termsForExecutives.us.title}</p>
                      <p>{termsForExecutives.us.governingEntity}</p>
                      {termsForExecutives.us.sections.map((section) => (
                        <div key={section.id} className="space-y-2">
                          <h4 className="font-semibold text-foreground">{section.title}</h4>
                          {section.title ? <p>{section.title}</p> : null}
                          {section.content ? <p>{section.content}</p> : null}
                        </div>
                      ))}
                      <p className="text-primary">{termsForExecutives.uk.acceptance}</p>
                    </>
                  )}
                </div>
                {authRole == 'consultant' && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground text-xl">Non-Disclosure Agreement</h3>
                    <h3>UK Version</h3>
                    <p>{ndaForExecutives.uk.title}</p>
                    <p>{ndaForExecutives.uk.governingEntity}</p>
                    {ndaForExecutives.uk.sections.map((section) => (
                      <div key={section.id} className="space-y-2">
                        <h4 className="font-semibold text-foreground">{section.title}</h4>
                        {section.content ? <p>{section.content}</p> : null}
                        {section.points ? (
                          <ul className="list-disc pl-6">
                            {section.points.map((point, index) => (
                              <li key={index} className="text-sm">
                                {point}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                    <p className="text-primary">{ndaForExecutives.uk.acceptance}</p>
                    <h3>US Version</h3>
                    <p>{ndaForExecutives.us.title}</p>
                    <p>{ndaForExecutives.us.governingEntity}</p>
                    {ndaForExecutives.us.sections.map((section) => (
                      <div key={section.id} className="space-y-2">
                        <h4 className="font-semibold text-foreground">{section.title}</h4>
                        {section.content ? <p>{section.content}</p> : null}
                        {section.points ? (
                          <ul className="list-disc pl-6">
                            {section.points.map((point, index) => (
                              <li key={index} className="text-sm">
                                {point}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    ))}
                    <p className="text-primary">{ndaForExecutives.us.acceptance}</p>
                  </div>
                )}
              </div>
              <div className="px-6 py-4 bg-muted/20">
                <FormField
                  control={form.control}
                  name="agree"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} className="mt-2.5" />
                      </FormControl>
                      <div className="grid gap-1 leading-none">
                        <FormLabel className="text-sm cursor-pointer">I have read and agree to all the above terms and conditions.</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <Separator />

            <DialogFooter className="flex justify-end gap-2 px-6 py-4 bg-muted/20">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset()
                  onClose()
                }}
              >
                Cancel
              </Button>

              <Button type="button" onClick={handleAgree} disabled={!form.watch('agree')}>
                Agree
              </Button>
            </DialogFooter>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
