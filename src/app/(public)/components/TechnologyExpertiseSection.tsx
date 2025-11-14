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
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-1">Technology Expertise Areas</h2>
          <p className="text-xl font-semibold text-muted-foreground max-w-4xl mx-auto leading-relaxed">Specialized knowledge from executives who&apos;ve scaled technology companies across all sectors</p>
        </div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          {areas.map((area) => (
            <motion.div key={area.title} variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
              <Card className="h-full flex flex-col bg-card border border-border rounded-lg hover:shadow-lg transition-shadow">
                
                <CardContent className="p-4 flex-1">
                  
                  <motion.div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2" variants={popVariant} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
                    <span className="text-primary text-2xl">{area.icon}</span>
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{area.title}</h3>

                  <p className="text-md font-semibold text-muted-foreground">{area.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
