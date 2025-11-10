import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { paths } from '@/navigate/paths'

export default function useAdminSidebar() {
  const [activePath, setActivePath] = useState<string>('')
  const pathname = usePathname()

  const isActive = (path: string) => path === activePath

  const navItems = [
    { label: 'Dashboard', path: paths.adminDashboard(), icon: 'layout-dashboard' },
    { label: 'Consultants', path: paths.adminConsultants(), icon: 'users' },
    { label: 'Users', path: paths.adminUsers(), icon: 'user' },
  ]

  useEffect(() => {
    setActivePath(pathname || '')
  }, [pathname])

  return {
    activePath,
    setActivePath,
    isActive,
    navItems,
  }
}
