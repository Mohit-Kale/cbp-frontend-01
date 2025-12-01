'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants, fadeUpVariant, fadeDownVariant } from '@/utils/animation.util'

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />

      <div className="max-w-5xl mx-auto px-4 py-16 relative">
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          {/* Heading */}
          <motion.h1 className="text-4xl md:text-6xl font-black text-foreground mb-6" variants={fadeDownVariant}>
            About Boardtide
          </motion.h1>

          <motion.p className="text-lg text-muted-foreground leading-relaxed mb-10" variants={fadeUpVariant}>
            Boardtide connects ambitious SMEs with world-class executive expertise on demand. Designed for founders, CEOs, and operators who need fast, practical guidance, the platform gives instant access to curated C-suite
            leaders and senior specialists across AI, technology, finance, operations, growth marketing, and digital transformation.
          </motion.p>

          <motion.p className="text-lg text-muted-foreground leading-relaxed mb-14" variants={fadeUpVariant}>
            Instead of long retainers or slow consulting engagements, Boardtide enables rapid, high-impact strategy sessions that help businesses solve problems, validate decisions, and accelerate growth.
          </motion.p>

          {/* Mission */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            Our Mission
          </motion.h2>

          <motion.p className="text-muted-foreground leading-relaxed mb-14" variants={fadeUpVariant}>
            Our mission is to make top-tier executive experience accessible to every business — not just enterprises with big consulting budgets. SMEs deserve world-class guidance without friction, complexity, or inflated
            costs.
          </motion.p>

          {/* How It Works */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            How It Works
          </motion.h2>

          <motion.ol className="list-decimal pl-6 space-y-3 text-muted-foreground mb-14" variants={fadeUpVariant}>
            <li>Browse curated executives with deep expertise in SaaS growth, AI innovation, digital transformation, GTM, operations, media, infrastructure, and more.</li>
            <li>View real-time availability and book a session instantly.</li>
            <li>Connect privately for a focused, actionable strategy call.</li>
            <li>Walk away with clarity, next steps, and the confidence to move forward faster.</li>
          </motion.ol>

          {/* Executives */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            Our Executives
          </motion.h2>

          <motion.p className="text-muted-foreground leading-relaxed mb-14" variants={fadeUpVariant}>
            Work with reference-checked C-suite leaders across technology, finance, operations, and growth marketing — professionals who’ve built and scaled real businesses. Their experience spans early-stage startups to
            fast-growing global enterprises, ensuring guidance rooted in practical, real-world execution.
          </motion.p>

          {/* Why Executives Join */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            Why Executives Join
          </motion.h2>

          <motion.ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-14" variants={fadeUpVariant}>
            <li>Share their knowledge with businesses who genuinely benefit.</li>
            <li>Build credibility through meaningful advisory relationships.</li>
            <li>Earn flexible, high-value income on their terms.</li>
            <li>Join an elite cohort shaping the next generation of SMEs.</li>
          </motion.ul>

          {/* Trust & NDA */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            Built With Trust at the Core
          </motion.h2>

          <motion.p className="text-muted-foreground leading-relaxed mb-14" variants={fadeUpVariant}>
            Confidentiality is foundational. Every session on Boardtide is protected by a platform-wide Non-Disclosure Agreement. SMEs can speak openly, and executives can advise confidently, knowing their discussions remain
            private.
          </motion.p>

          {/* Early 100 */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            The Early 100
          </motion.h2>

          <motion.p className="text-muted-foreground leading-relaxed" variants={fadeUpVariant}>
            Boardtide is currently onboarding its first 100 executives — a carefully curated group selected for their credibility, experience, and proven track records. Early SME demand shows a clear need for rapid, practical
            strategic support delivered by leaders who have truly been in the trenches.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
