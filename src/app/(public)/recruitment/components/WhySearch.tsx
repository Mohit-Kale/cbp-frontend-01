'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { CheckCircle, UserCheck, Briefcase, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { popVariant } from '@/utils/animation.util'

const features = [
  { icon: CheckCircle, title: 'Beyond Executive Advisory', desc: 'Not just about the exec you spoke with — we support any recruitment need in your business across all functions and seniority levels.' },
  { icon: TrendingUp, title: 'Startup & SaaS Specialists', desc: 'Deep expertise in startups, SaaS, and AI companies. We understand your pace, your culture, and your growth challenges.' },
  { icon: UserCheck, title: 'End-to-End Support', desc: 'Dedicated consultants manage the entire process from brief to hire, so you can focus on running your business.' },
  {
    icon: Briefcase,
    title: 'Transparent Pricing',
    desc: (
      <>
        Simple, founder-friendly terms with a flat <span className="font-bold text-primary text-xl">18% of base salary</span> for permanent hires. No hidden costs, no surprises.
      </>
    ),
  },
]

export function WhySearch() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2 className="text-3xl md:text-4xl font-black text-foreground mb-12 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Why Boardtide Search
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div key={i} variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.12)' }}>
              <Card className={`border-2 ${i === 3 ? 'bg-primary/5' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-xl flex items-start gap-3">
                    <Icon className="w-8 h-8 text-primary flex-shrink-0" />
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
