'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { containerVariants, fadeUpVariant, fadeDownVariant, popVariant } from '../../../utils/animation.util' // adjust path if needed
import { useAuthDialog } from '@/components/auth/useAuthDialog.hook'

export default function HeroSection() {
  const { openAuthDialog } = useAuthDialog()

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10"></div>
      <div className="container mx-auto px-4 py-20 relative">
        <motion.div className="text-center max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="show">
          <motion.h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-foreground mb-8" variants={fadeDownVariant}>
            Global C-Suite Expertise
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">By the Hour</span>
          </motion.h1>

          <motion.p className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed" variants={fadeUpVariant}>
            Access world-class executives from successful SaaS, AI, fintech, and technology companies. Book sessions by the hour with experienced C-suite leaders from around the world.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div variants={popVariant}>
              <Link href="/find-experts" passHref>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg px-8 py-4 text-lg font-semibold">
                  <span>Find an Expert</span>
                </Button>
              </Link>
            </motion.div>
            <motion.div variants={popVariant}>
              <Button
                variant="outline"
                onClick={() => openAuthDialog('signup', 'CONSULTANT')}
                className="border-border pointer-cursor bg-background text-foreground hover:bg-primary/10 hover:text-primary px-8 py-4 text-lg font-semibold"
              >
                <span>Become an Expert</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
