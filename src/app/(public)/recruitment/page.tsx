'use client'

import { Hero } from './components/Hero'
import { WhySearch } from './components/WhySearch'
import { HowItWorks } from './components/HowItWorks'
import { Services } from './components/Services'
import { FoundersTrust } from './components/FoundersTrust'
import { CTA } from './components/CTA'

export default function BoardtideSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Hero />
      <WhySearch />
      <HowItWorks />
      <Services />
      <FoundersTrust />
      <CTA />
    </div>
  )
}
