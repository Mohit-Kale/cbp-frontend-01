'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, LogOut, MapPin } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { paths } from '@/navigate/paths'
import { useReduxSelector } from '@/hooks/redux.hook'
import { useAuthDialog } from '@/components/auth/useAuthDialog.hook'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu'
import Image from 'next/image'
import { handleLogout } from '@/utils'
import { toast } from 'sonner'
import { useProfileQuery } from '@/redux/services/auth.api'

const boardtideLogo = '/assets/boardtide-logo.png'

type NavLink = {
  href: string
  label: string
  icon?: React.ReactNode
  requiresAuth: boolean
  roles?: string[]
}

const CustomerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { openAuthDialog } = useAuthDialog()

  const { isLoggedIn, userProfile } = useReduxSelector((state) => state.user)
  const userRole = userProfile.role
  const { data: userData } = useProfileQuery()
  const resumeUrl = userData?.consultantDocuments?.find((d) => d.documentType === 'CV')?.fileUrl
  const isVerified = userData?.isVerified

  const isConsultant = isLoggedIn && userRole === 'consultant'
  const isProfilePage = pathname.includes('/consultant/profile')

  // Check states
  const isIncomplete = isConsultant && !resumeUrl
  const isUnverified = isConsultant && resumeUrl && !isVerified

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getInitials = (name: string) => {
    return name
      ?.split(' ')
      ?.map((n) => n[0])
      ?.join('')
      ?.toUpperCase()
  }

  const navLinks: NavLink[] = [
    { href: paths.consultantDashboard(), label: 'Dashboard', requiresAuth: true },
    { href: paths.consultantProfile(), label: 'Profile', requiresAuth: true },
    { href: paths.consultantSlots(), label: 'Schedules', requiresAuth: true },
    { href: paths.consultantMyBookings(), label: 'My Bookings', icon: <MapPin className="w-4 h-4" />, requiresAuth: true },
  ]

  const filteredLinks = useMemo(() => {
    return navLinks.filter((link) => {
      if (!link.requiresAuth && !link.roles) return true
      if (!isLoggedIn) return false
      if (link.roles?.length) return link.roles.includes(userRole)
      return true
    })
  }, [isLoggedIn, userRole])

  const isNavigationDisabled = isConsultant && (isIncomplete || isUnverified)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, linkHref: string) => {
    if (isNavigationDisabled && linkHref !== paths.consultantProfile()) {
      e.preventDefault()
      // Recalculate states to be sure
      const resume = userData?.consultantDocuments?.find((d) => d.documentType === 'CV')?.fileUrl || ''
      const verified = userData?.isVerified ?? false
      if (!resume) {
        toast.error('Please complete your profile before proceeding!')
      } else if (resume && !verified) {
        toast.error('Your profile is complete and currently under review. Please complete your payment setup to avoid delays and start accepting bookings sooner.')
      }
    }
  }

  const renderNavLinks = () => {
    return filteredLinks.map((link, index) => {
      const isActive = pathname.startsWith(link.href)
      const isDisabled = isNavigationDisabled && link.href !== paths.consultantProfile()

      return (
        <NavigationMenuItem key={index}>
          <NavigationMenuLink asChild>
            <Link
              href={isDisabled ? '#' : link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`transition-colors ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {link.label}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      )
    })
  }

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={paths.home()} className="flex items-center space-x-2">
          <Image src={boardtideLogo} alt="Boardtide Logo" width={32} height={32} />
          <span className="text-2xl font-bold text-foreground">Boardtide</span>
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-8">{renderNavLinks()}</NavigationMenuList>
        </NavigationMenu>

        {/* Auth Section */}
        <div className="flex ">
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center focus:outline-none">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(userProfile?.fullName || 'U')}</AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href={paths.consultantProfile()}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLogout()}>
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground" onClick={() => openAuthDialog('signin')}>
                  Login
                </Button>
                <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90" onClick={() => openAuthDialog('signup')}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-3">
            {filteredLinks.map((link) => {
              const isDisabled = isNavigationDisabled && link.href !== paths.consultantProfile()
              return (
                <Link
                  key={link.label}
                  href={isDisabled ? '#' : link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href)
                    setIsMenuOpen(false)
                  }}
                  className={`block transition-colors ${isDisabled ? 'text-muted-foreground opacity-50 cursor-not-allowed' : 'text-foreground hover:text-primary'}`}
                >
                  {link.label}
                </Link>
              )
            })}

            {isLoggedIn ? (
              <Button onClick={() => handleLogout()} size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-3">
                Logout
              </Button>
            ) : (
              <div className="pt-3 border-t border-border  space-y-2">
                <Button onClick={() => openAuthDialog('signin')} size="sm" className="w-full bg-background text-foreground border hover:bg-accent">
                  Login
                </Button>
                <Button onClick={() => openAuthDialog('signup')} size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default CustomerHeader
