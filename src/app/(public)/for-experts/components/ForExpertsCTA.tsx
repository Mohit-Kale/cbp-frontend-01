'use client'

import { useAuthDialog } from '@/components/auth/useAuthDialog.hook'
import { Button } from '@/components/ui/button'

export function ForExpertsCTA() {
  const { openAuthDialog } = useAuthDialog()
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Share Your Expertise?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Join our selective network of technology executives and start earning by the hour</p>
        <Button size="lg" className="shadow-lg" onClick={() => openAuthDialog('signup', 'CONSULTANT')}>
          Apply Now
        </Button>
      </div>
    </section>
  )
}
