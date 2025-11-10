'use client'
import React from 'react'
import AuthDialog from '@/components/auth/AuthDialog'

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AuthDialog />
    </>
  )
}
