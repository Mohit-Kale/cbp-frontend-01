'use client'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { containerVariants, fadeUpVariant, popVariant } from '../../../utils/animation.util'

export function HowBoardtideWorksSection() {
  const steps = [
    {
      number: '1',
      title: 'Browse Experts',
      description: 'Search our global network of C-suite executives by expertise, industry, and availability',
    },
    {
      number: '2',
      title: 'Book a Session',
      description: 'Schedule hourly consultations with global executives that fit your timeline and budget',
    },
    {
      number: '3',
      title: 'Get Results',
      description: 'Receive actionable insights and strategic guidance to accelerate your business growth',
    },
  ]

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">How Boardtide Works</h2>
          <p className="text-xl font-bold text-muted-foreground max-w-3xl mx-auto leading-relaxed">Three simple steps to access technology executive expertise</p>
        </div>

        <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {steps.map((step) => (
            <motion.div key={step.number} variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <Card className={cn('text-center bg-transparent shadow-none border-none')}>
                <CardContent className="flex flex-col items-center justify-center">
                  <motion.div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4" variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                    <span className="text-2xl font-bold text-primary-foreground">{step.number}</span>
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-lg font-semibold text-muted-foreground leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
