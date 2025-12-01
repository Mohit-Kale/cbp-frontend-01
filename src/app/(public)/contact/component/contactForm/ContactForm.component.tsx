'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { fadeDownVariant, slideLeftVariant } from '@/utils/animation.util'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, ContactFormSchema } from './ContactForm.schema'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useContactMutation } from '@/redux/services/auth.api'

export default function ContactPage() {
  const [contactUs, { isLoading }] = useContactMutation()

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactFormSchema) => {
    try {
      await contactUs(data)
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* Hero Section */}
      <motion.div variants={fadeDownVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-0">Contact Us</h1>
          <p className="text-2xl font-semibold text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">Get in touch with our team</p>
        </div>
      </motion.div>

      {/* Contact Form */}
      <section className="py-4 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={slideLeftVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Card className="bg-gray-50 border-0 shadow-lg p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input id="name" {...field} placeholder="Enter your name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input id="email" type="email" {...field} placeholder="Enter your email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input id="phone" type="text" {...field} placeholder="Enter your phone number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input id="subject" maxLength={50} {...field} placeholder="Enter your subject" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea id="message" rows={6} {...field} placeholder="Enter your message" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button disabled={isLoading} type="submit" className="w-full h-12">
                    {isLoading ? 'Sending…' : 'Send Message'}
                  </Button>
                </form>
              </Form>
            </Card>
          </motion.div>
        </div>
      </section>
    </>
  )
}
