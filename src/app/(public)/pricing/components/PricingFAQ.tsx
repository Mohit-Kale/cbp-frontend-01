'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { fadeUpVariant } from '@/utils/animation.util'

const faqs = [
  {
    q: 'How do I know what to expect to pay?',
    a: "Each expert sets their own hourly rate, which is clearly displayed on their profile. You can browse expert profiles to compare rates and expertise areas before booking. You'll see the total cost before confirming your session.",
  },
  {
    q: 'Are there any additional platform fees?',
    a: 'No hidden fees. The rate you see is what you pay. Boardtide’s commission is built into the expert’s published hourly rate, so there are no surprise charges at checkout.',
  },
  {
    q: 'What’s the minimum session length?',
    a: "Most experts have a 30-minute minimum, though some may require 1-hour minimums for strategic sessions. This is clearly indicated on each expert's profile.",
  },
  { q: 'Can I extend a session if needed?', a: 'Yes, if both you and the expert agree, sessions can be extended in real-time. Additional time is charged at the same hourly rate.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards and ACH transfers for US companies. All payments are processed securely and held in escrow until your session is complete.' },
  { q: 'Do you offer refunds?', a: "If you need to cancel, you can do so up to 24 hours before your session for a full refund. For cancellations within 24 hours, refunds are at the expert's discretion." },
]

export function PricingFAQ() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl font-black" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          Pricing FAQ
        </motion.h2>
        <div className="space-y-8">
          {faqs.map((item, idx) => (
            <motion.div key={idx} variants={fadeUpVariant} initial="hidden" whileInView="show" viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-lg font-semibold">{item.q}</h3>
                  <p className="text-muted-foreground text-sm">{item.a}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
