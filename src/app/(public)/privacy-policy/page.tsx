'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { containerVariants, fadeUpVariant, fadeDownVariant } from '@/utils/animation.util'

export default function PrivacyPolicyPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>

      <div className="max-w-5xl mx-auto px-4 py-16 relative">
        <motion.div variants={containerVariants} initial="hidden" animate="show">
          {/* Heading */}
          <motion.h1 className="text-4xl md:text-6xl font-black text-foreground mb-2" variants={fadeDownVariant}>
            Privacy Policy — Boardtide
          </motion.h1>

          <motion.p className="text-sm text-muted-foreground mb-10" variants={fadeUpVariant}>
            Last updated: December 2025
          </motion.p>

          {/* Intro */}
          <motion.p className="text-lg text-muted-foreground leading-relaxed mb-10" variants={fadeUpVariant}>
            Boardtide (“we”, “our”, “the Platform”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and safeguard your information when you use our website and platform
            services.
          </motion.p>

          {/* ============================
              1. Information We Collect 
          ============================== */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            1. Information We Collect
          </motion.h2>

          <motion.h3 className="text-xl font-semibold mb-2 text-foreground" variants={fadeUpVariant}>
            1.1 Information You Provide
          </motion.h3>

          <motion.ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-8" variants={fadeUpVariant}>
            <li>Account details: name, email address, phone number, password</li>
            <li>Professional information: job title, skills, experience, rates</li>
            <li>Payment information: securely processed through Stripe (never stored)</li>
            <li>Session information: bookings, availability, meeting preferences</li>
            <li>Communication: emails, messages, or support requests</li>
          </motion.ul>

          <motion.h3 className="text-xl font-semibold mb-2 text-foreground" variants={fadeUpVariant}>
            1.2 Information Collected Automatically
          </motion.h3>

          <motion.ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-10" variants={fadeUpVariant}>
            <li>IP address, browser type, device identifiers</li>
            <li>Usage data such as page visits, clicks, and activity</li>
            <li>Cookies used for functionality and analytics</li>
          </motion.ul>

          {/* ============================
              2. How We Use Your Information
          ============================== */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            2. How We Use Your Information
          </motion.h2>

          <motion.ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-8" variants={fadeUpVariant}>
            <li>Create and manage your account</li>
            <li>Enable SME–Executive bookings</li>
            <li>Process payments securely</li>
            <li>Improve platform performance</li>
            <li>Provide customer support</li>
            <li>Ensure safety, trust, and compliance</li>
            <li>Send updates related to your account, sessions, or changes</li>
          </motion.ul>

          <motion.p className="text-muted-foreground mb-10" variants={fadeUpVariant}>
            We do not sell your data.
          </motion.p>

          {/* ============================
              3. Sharing of Information
          ============================== */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            3. Sharing of Information
          </motion.h2>

          <motion.p className="mb-3 text-muted-foreground" variants={fadeUpVariant}>
            We share data only when necessary:
          </motion.p>

          <motion.ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-8" variants={fadeUpVariant}>
            <li>Stripe for payments</li>
            <li>Calendly or calendar integrations</li>
            <li>Email providers such as SendGrid</li>
            <li>Verified service providers assisting platform operations</li>
            <li>Legal authorities when required by law</li>
          </motion.ul>

          <motion.p className="text-muted-foreground mb-10" variants={fadeUpVariant}>
            We will never share contact details between SMEs and executives outside the platform unless both parties explicitly agree.
          </motion.p>

          {/* ============================
              4. Data Security
          ============================== */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            4. Data Security
          </motion.h2>

          <motion.p className="text-muted-foreground mb-10" variants={fadeUpVariant}>
            We use industry-standard security measures including encryption, secure servers, and access controls. While no system is fully secure, we continually work to safeguard all data.
          </motion.p>

          {/* ============================
              5. Your Rights
          ============================== */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            5. Your Rights
          </motion.h2>

          <motion.p className="mb-2 text-muted-foreground" variants={fadeUpVariant}>
            Depending on your location, you may have the right to:
          </motion.p>

          <motion.ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-8" variants={fadeUpVariant}>
            <li>Access your data</li>
            <li>Request corrections</li>
            <li>Request deletion</li>
            <li>Restrict or object to processing</li>
            <li>Request a copy of your information</li>
          </motion.ul>

          <motion.p className="text-muted-foreground mb-10" variants={fadeUpVariant}>
            For any privacy requests, email us at{' '}
            <a href="mailto:support@boardtide.com" className="text-primary underline">
              support@boardtide.com
            </a>
            .
          </motion.p>

          {/* ============================
              6. Cookies
          ============================== */}
          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            6. Cookies
          </motion.h2>

          <motion.p className="mb-3 text-muted-foreground" variants={fadeUpVariant}>
            We use cookies for:
          </motion.p>

          <motion.ul className="list-disc pl-6 space-y-1 text-muted-foreground mb-10" variants={fadeUpVariant}>
            <li>Authentication</li>
            <li>Keeping you logged in</li>
            <li>Analytics and performance</li>
            <li>Improving the platform experience</li>
          </motion.ul>

          {/* ============================
              7–9
          ============================== */}

          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            7. Data Retention
          </motion.h2>

          <motion.p className="text-muted-foreground mb-10" variants={fadeUpVariant}>
            We retain information only as long as necessary to provide services, comply with legal or tax obligations, or resolve disputes.
          </motion.p>

          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            8. Changes to This Policy
          </motion.h2>

          <motion.p className="text-muted-foreground mb-10" variants={fadeUpVariant}>
            This Privacy Policy may be updated occasionally. Changes will be posted here with an updated “last revised” date.
          </motion.p>

          <motion.h2 className="text-3xl font-bold mb-4 text-foreground" variants={fadeDownVariant}>
            9. Contact Us
          </motion.h2>

          <motion.p className="text-muted-foreground" variants={fadeUpVariant}>
            For any questions, contact{' '}
            <a href="mailto:support@boardtide.com" className="text-primary underline">
              support@boardtide.com
            </a>
            .
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
