'use client'
import React from 'react'
import { paths } from '@/navigate/paths'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useReduxSelector } from '@/hooks/redux.hook'
import { Button } from '../ui/button'

export default function BackToDashboard() {
  const { role } = useReduxSelector((state) => state.user)
  if (!role) return null // hide completely if there's no role

  let path = paths.userDashboard() // default
  if (role === 'consultant') {
    path = paths.consultantDashboard()
  } else if (role === 'admin') {
    path = paths.adminDashboard()
  }

  return (
    <Link href={path} passHref>
      <Button asChild className="inline-flex items-center gap-2">
        <span className="inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </span>
      </Button>
    </Link>
  )
}
