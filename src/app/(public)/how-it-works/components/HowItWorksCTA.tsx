'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function HowItWorksCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-black text-foreground mb-6">Ready to Connect with Global Executives?</h2>
        <p className="text-2xl font-bold text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">Start browsing our network of C-suite leaders today</p>
        <Link href="/find-experts">
          <Button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 shadow-lg">Browse Experts</Button>
        </Link>
      </div>
    </section>
  )
}
