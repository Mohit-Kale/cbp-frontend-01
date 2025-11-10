'use client'

import { PricingHero } from './components/PricingHero'
import { PricingModel } from './components/PricingModel'
import { ExpertCategories } from './components/ExpertCategories'
import { ValueProposition } from './components/ValueProposition'
import { PricingFAQ } from './components/PricingFAQ'
import { PricingCTA } from './components/PricingCTA'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PricingHero />
      <PricingModel />
      <ExpertCategories />
      <ValueProposition />
      <PricingFAQ />
      <PricingCTA />
    </div>
  )
}
