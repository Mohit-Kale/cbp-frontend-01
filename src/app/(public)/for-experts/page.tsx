'use client'

import { ForExpertsHero } from './components/ForExpertsHero'
import { ForExpertsBenefits } from './components/ForExpertsBenefits'
import { ExpertRequirements } from './components/ExpertRequirements'
import { ApplicationProcess } from './components/ApplicationProcess'
import { ExpertSuccessStories } from './components/ExpertSuccessStories'
import { ForExpertsCTA } from './components/ForExpertsCTA'

export default function ForExpertsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ForExpertsHero />
      <ForExpertsBenefits />
      <ExpertRequirements />
      <ApplicationProcess />
      <ExpertSuccessStories />
      <ForExpertsCTA />
    </div>
  )
}
