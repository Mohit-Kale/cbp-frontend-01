'use client'

import React from 'react'
import { HowItWorksHero } from './components/HowItWorksHero'
import { HowItWorksSteps } from './components/HowItWorksSteps'
import { HowItWorksCTA } from './components/HowItWorksCTA'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <HowItWorksHero />
      <HowItWorksSteps />
      <HowItWorksCTA />
    </div>
  )
}
