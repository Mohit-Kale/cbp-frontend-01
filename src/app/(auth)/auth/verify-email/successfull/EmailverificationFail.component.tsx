'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function EmailverificationFail() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center w-12 h-12 text-destructive mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>
      </div>
      <h1 className="text-xl font-semibold text-destructive">Verification Failed</h1>
      <p className="text-sm text-gray-500 mt-2 max-w-xs">
        We couldn&apos;t verify your email due to a server issue. Please try again later or contact
        {/* <a href="mailto:info@centum.health"> */}
        <span className="text-primary font-medium hover:text-primary/80 underline mx-2">BoardTide.</span>
        {/* </a> */}
      </p>
    </motion.div>
  )
}
