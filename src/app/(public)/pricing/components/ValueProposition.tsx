'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { popVariant } from '@/utils/animation.util'

const traditional = ['$50K+ minimum projects', '3–6 month commitments', 'Junior consultants executing', 'Theoretical frameworks', 'Complex contracts']
const boardtide = ['Competitive hourly rates', 'Book by the hour', 'Direct access to C-suite', 'Real operational experience', 'Simple, transparent pricing']

export function ValueProposition() {
  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <motion.div className="mx-auto max-w-4xl text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="mb-4 text-3xl font-bold text-foreground">Why Companies Choose Boardtide</h2>
          <p className="text-muted-foreground">Compare the value of executive guidance versus traditional consulting</p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          <motion.div variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <Card>
              <CardContent className="p-8">
                <h3 className="mb-6 text-center text-xl font-semibold">Traditional Consulting</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {traditional.map((text, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-100">
                        <span className="text-sm text-red-600">✕</span>
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="relative border-primary/20">
              <CardContent className="p-8">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">Boardtide Advantage</span>
                </div>
                <h3 className="pt-4 mb-6 text-center text-xl font-semibold">Executive Guidance</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {boardtide.map((text, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                        <span className="text-sm text-green-600">✓</span>
                      </div>
                      {text}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
