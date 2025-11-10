'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { popVariant } from '@/utils/animation.util'

const stories = [
  {
    initials: 'RK',
    color: 'primary',
    name: 'Robert Kim',
    title: 'Former CTO, CloudTech Solutions',
    quote: 'Boardtide has allowed me to stay connected with the startup ecosystem while providing meaningful value. I’ve helped 15+ companies scale their engineering teams in just 6 months.',
    meta: '$750/hr average rate • 4.9/5 rating',
  },
  {
    initials: 'JL',
    color: 'primary',
    name: 'Jennifer Liu',
    title: 'CEO & Founder, DataFlow AI',
    quote: 'The platform connects me with ambitious founders facing similar challenges I overcame. It’s rewarding to accelerate their journey while building valuable relationships.',
    meta: '$900/hr average rate • 5.0/5 rating',
  },
]

export function ExpertSuccessStories() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 text-center mb-16">
        <motion.h2 className="text-3xl font-bold text-foreground mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Expert Success Stories
        </motion.h2>
        <motion.p className="text-muted-foreground" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Hear from executives who are already making an impact on our platform
        </motion.p>
      </div>

      <div className="container mx-auto max-w-4xl grid md:grid-cols-2 gap-8 px-4">
        {stories.map((story, idx) => (
          <motion.div key={idx} variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: idx * 0.2 }}>
            <Card className="border border-border p-6 text-left">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-${story.color}/10 rounded-full flex items-center justify-center mr-4`}>
                  <span className={`font-bold text-${story.color}`}>{story.initials}</span>
                </div>
                <div>
                  <h4 className="font-semibold">{story.name}</h4>
                  <p className="text-sm text-muted-foreground">{story.title}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">“{story.quote}”</p>
              <p className={`text-sm font-medium text-${story.color}`}>{story.meta}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
