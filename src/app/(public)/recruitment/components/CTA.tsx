'use client'

import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10">
      <div className="container mx-auto px-4 text-center max-w-3xl space-y-2">
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-1">Ready to Make Your Next Hire?</h2>
        <p className="text-xl font-semibold text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-3">
          Book a call with our recruitment team today and we&apos;ll help you secure the right talent — quickly and transparently.
        </p>
        <Button size="lg" className="bg-primary text-primary-foreground px-8 py-4 text-lg font-semibold hover:bg-primary/90 shadow-lg rounded-lg" asChild>
          <a href="">Book a Call</a>
        </Button>
      </div>
    </section>
  )
}
