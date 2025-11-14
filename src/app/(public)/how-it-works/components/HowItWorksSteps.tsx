'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { fadeUpVariant, popVariant } from '@/utils/animation.util'

const steps = [
  {
    number: '1',
    title: 'Browse Global Experts',
    description: 'Search our curated network of C-suite executives from successful technology companies. Filter by expertise area, industry experience, geographic region, and availability.',
    bullets: ['Verified executive profiles with detailed backgrounds', 'Real-time availability and hourly rates', 'Client reviews and success metrics'],
    icon: '🔍',
    imageLabel: 'Expert Search Interface',
    cardGradient: 'from-primary/10 to-accent/10',
  },
  {
    number: '2',
    title: 'Book Hourly Sessions',
    description: 'Schedule one-on-one consultations that fit your timeline and budget. Pay by the hour for focused, actionable guidance from experienced leaders.',
    bullets: ['Flexible scheduling across global time zones', 'Secure video calls with session recordings', 'Transparent hourly pricing with no hidden fees'],
    icon: '📅',
    imageLabel: 'Booking Calendar',
    cardGradient: 'from-accent/10 to-secondary/10',
    reverse: true,
  },
  {
    number: '3',
    title: 'Get Actionable Results',
    description: "Receive strategic insights, tactical advice, and clear next steps from executives who've successfully navigated similar challenges at scale.",
    bullets: ['Strategic roadmaps and implementation plans', 'Industry connections and partnership introductions', 'Follow-up sessions for ongoing guidance'],
    icon: '🎯',
    imageLabel: 'Strategic Outcomes',
    cardGradient: 'from-secondary/10 to-primary/10',
  },
]

export function HowItWorksSteps() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 space-y-24">
        {steps.map((step) => (
          <div key={step.number} className={`grid lg:grid-cols-2 gap-12 items-center ${step.reverse ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''}`}>
            {/* Text Side */}
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-primary-foreground">{step.number}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1">{step.title}</h2>
              </div>
              <p className="text-md font-semibold text-muted-foreground leading-relaxed">{step.description}</p>
              <ul className="space-y-3 text-muted-foreground">
                {step.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Image/Card Side */}
            <motion.div variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <Card className={`bg-gradient-to-br ${step.cardGradient} rounded-lg p-8 h-80 flex items-center justify-center`}>
                <CardContent className="text-center">
                  <motion.div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4" variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
                    <span className="text-2xl">{step.icon}</span>
                  </motion.div>
                  <p className="text-muted-foreground">{step.imageLabel}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
