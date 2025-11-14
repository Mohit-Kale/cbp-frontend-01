'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { fadeUpVariant } from '@/utils/animation.util'

const categories = [
  { icon: '🚀', title: 'Startup Advisors', desc: 'VP-level executives, startup veterans with hands-on experience scaling early-stage companies' },
  { icon: '💼', title: 'Scale-up Leaders', desc: 'C-suite executives from growth companies who’ve navigated rapid scaling challenges' },
  { icon: '🏢', title: 'Enterprise Executives', desc: 'Fortune 500 C-suite leaders with deep experience in large-scale operations' },
  { icon: '⭐', title: 'Elite Founders', desc: 'Unicorn founders and IPO CEOs who’ve built category-defining companies' },
]

export function ExpertCategories() {
  return (
    <motion.div className="mt-20 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 p-8" initial="hidden" whileInView="show" viewport={{ once: true }}>
      <div className="container mx-auto px-4">
        <motion.h2 className="mb-8 text-3xl text-center font-bold text-foreground md:text-4xl font-black " variants={fadeUpVariant}>
          Expert Categories
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-4">
          {categories.map((item, idx) => (
            <motion.div key={idx} variants={fadeUpVariant} transition={{ delay: idx * 0.1 }}>
              <Card className="border-border text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
