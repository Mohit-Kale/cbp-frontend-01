'use client'

import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { containerVariants, fadeUpVariant, popVariant } from '@/utils/animation.util'
import { motion } from 'framer-motion'

export function TechnologyExpertiseSection() {
  const areas = [
    {
      icon: '🚀',
      title: 'SaaS & Startups',
      description: 'Product-Market Fit, Scaling, Fundraising, Go-to-Market, B2B Sales, Subscription Models',
    },
    {
      icon: '🤖',
      title: 'AI & Machine Learning',
      description: 'AI Strategy, ML Implementation, Data Science, LLMs, Computer Vision, Automation',
    },
    {
      icon: '💰',
      title: 'Fintech & Crypto',
      description: 'Digital Banking, Payments, Blockchain, DeFi, Regulatory Compliance, Financial Innovation',
    },
    {
      icon: '⚡',
      title: 'Deep Tech & Infrastructure',
      description: 'Cloud Architecture, DevOps, Cybersecurity, IoT, Hardware, Enterprise Software',
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Technology Expertise Areas</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Specialized knowledge from executives who&apos;ve scaled technology companies across all sectors</p>
        </div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {areas.map((area) => (
            <motion.div key={area.title} variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <Card className="h-full flex flex-col bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
                <CardHeader className="p-6 pb-2">
                  <motion.div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4" variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                    <span className="text-primary text-2xl">{area.icon}</span>
                  </motion.div>
                  <h3 className="text-lg font-semibold">{area.title}</h3>
                </CardHeader>

                <CardContent className="p-4 pt-0 flex-1">
                  <p className="text-muted-foreground text-sm leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
