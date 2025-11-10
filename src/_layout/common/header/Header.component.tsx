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
import { handleLogout } from '@/utils'
import Image from 'next/image'

const boardtideLogo = '/assets/boardtide-logo.png'

type NavLink = {
  href: string
  label: string
  icon?: React.ReactNode
  requiresAuth: boolean
  roles?: string[]
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const { openAuthDialog } = useAuthDialog()

  // Redux state
  const { isLoggedIn, userProfile } = useReduxSelector((state) => state.user)
  const userRole = userProfile.role

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
    { href: paths.howItWorks(), label: 'How it Works', icon: <MapPin className="w-4 h-4" />, requiresAuth: false },
    { href: paths.findExperts(), label: 'Find Experts', requiresAuth: false },
    { href: paths.forExperts(), label: 'For Experts', requiresAuth: false },
    { href: paths.pricing(), label: 'Pricing', requiresAuth: false },
    { href: paths.recruitment(), label: 'Recruitment', requiresAuth: false },
  ]

  // Filter links based on role/auth
  const filteredLinks = useMemo(() => {
    return navLinks.filter((link) => {
      if (!link.requiresAuth && !link.roles) return true
      if (!isLoggedIn) return false
      if (link.roles?.length) return link.roles.includes(userRole)
      return true
    })
  }, [isLoggedIn, userRole])

  const renderNavLinks = () => {
    return filteredLinks.map((link, index) => {
      const isActive = pathname.startsWith(link.href)
      return (
        <NavigationMenuItem key={index}>
          <NavigationMenuLink asChild>
            <Link href={link.href} className={`transition-colors ${isActive ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}`}>
              {link.label}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      )
    })
  }

  // Dashboard path by role
  const getDashboardPath = () => {
    switch (userRole) {
      case 'admin':
        return paths.adminDashboard()
      case 'consultant':
        return paths.consultantDashboard()
      case 'user':
        return paths.userDashboard()
      default:
        return paths.home()
    }
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
        {/* Auth + Mobile Toggle Section */}
        <div className="flex items-center space-x-2">
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
                  <Link href={getDashboardPath()}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLogout()}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-muted-foreground hover:text-primary hover:bg-primary/10" onClick={() => openAuthDialog('signin')}>
                Login
              </Button>
              <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90" onClick={() => openAuthDialog('signup', 'USER')}>
                Get Started
              </Button>
            </div>
          )}

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
            {filteredLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <Button onClick={() => handleLogout()} size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 mt-3">
                Logout
              </Button>
            ) : (
              <div className="pt-3 border-t border-border space-y-2">
                <Button onClick={() => openAuthDialog('signin')} size="sm" className="w-full bg-background text-foreground border hover:bg-accent">
                  Login
                </Button>
                <Button onClick={() => openAuthDialog('signup', 'USER')} size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
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

export default Header
