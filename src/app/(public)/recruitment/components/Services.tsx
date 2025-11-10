'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { popVariant } from '@/utils/animation.util'

const services = [
  {
    title: 'Contract Engagements',
    desc: 'Scale quickly with interim execs and consultants, fully contracted and compliant.',
    content: 'Need immediate expertise? Our contract placements allow you to bring in senior talent for critical projects, growth phases, or coverage without long-term commitments.',
    bg: '',
  },
  {
    title: 'Permanent Recruitment',
    desc: 'Hire senior leaders and specialists at a flat 18% of base salary.',
    content: 'Build your core team with top-tier permanent hires. From C-suite to department heads, we source leaders who will shape your company’s future — transparently priced at 18% with no hidden fees.',
    bg: 'bg-primary/5',
  },
  {
    title: 'Cross-Functional Expertise',
    desc: 'Sales, marketing, product, finance, tech, operations — we cover every key function.',
    content: 'Whatever role you need to fill, we have the network and expertise. Our team specializes in finding the right fit for growing companies across all business functions.',
    bg: '',
  },
]

export function Services() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2 className="text-4xl lg:text-5xl font-bold text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Our Services
        </motion.h2>

        <div className="space-y-8">
          {services.map(({ title, desc, content, bg }, idx) => (
            <motion.div key={idx} variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: idx * 0.1 }} whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.12)' }}>
              <Card className={`border-2 ${bg}`}>
                <CardHeader>
                  <CardTitle className="text-3xl">{title}</CardTitle>
                  <CardDescription className="text-lg">{desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">{content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
