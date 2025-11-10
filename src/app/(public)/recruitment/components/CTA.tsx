'use client'

import { Button } from '@/components/ui/button'

const calendarLink = 'https://calendly.com/boardtide'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
      <div className="container mx-auto px-4 text-center max-w-3xl space-y-8">
        <h2 className="text-4xl lg:text-5xl font-bold">Ready to Make Your Next Hire?</h2>
        <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">Book a call with our recruitment team today and we&apos;ll help you secure the right talent — quickly and transparently.</p>
        <Button size="lg" className="text-lg font-bold px-10 py-6 h-auto" asChild>
          <a href={calendarLink} target="_blank" rel="noopener noreferrer">
            Book a Call
          </a>
        </Button>
      </div>
    </section>
  )
}
