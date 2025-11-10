import React from 'react'

import HeroSection from './components/HeroSection'
import { HowBoardtideWorksSection } from './components/HowBoardtideWorksSection'
import { TechnologyExpertiseSection } from './components/TechnologyExpertiseSection'
import { CallToActionSection } from './components/CallToActionSection'

export default function page() {
  return (
    <>
      <HeroSection />
      <HowBoardtideWorksSection />
      <TechnologyExpertiseSection />
      <CallToActionSection />
    </>
  )
}
