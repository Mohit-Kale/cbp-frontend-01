'use client'

import React from 'react'
import { LogOut } from 'lucide-react'

import { useReduxSelector } from '@/hooks/redux.hook'
import { Button } from '@/components/ui/button'
import { getHeadingFromPath, getInitials, handleLogout } from '@/utils'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { usePathname } from 'next/navigation'
import { useSidebar } from '@/components/ui/sidebar'

export type NavigationItem = {
  label: string
  path: string
  icon: string
}

export default function AdminHeader() {
  const user = useReduxSelector((state) => state.user)
  const pathName = usePathname()
  const { isMobile } = useSidebar()

  return (
    <header className="sticky top-0 rounded-lg shadow-md backdrop-blur-sm bg-white/20 z-10 px-6">
      <div className="flex justify-between items-center h-16 ">
        {/* Left side - Logo and Sidebar Toggle */}

        <div className="flex items-center gap-4 ">
          {isMobile && <SidebarTrigger className="text-gray-600 md:hidden" />}
          <p className="text-lg text-gray-700 font-medium">{getHeadingFromPath(pathName || '')}</p>
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-white text-sm font-bold">{user ? getInitials(user.userProfile.fullName) : 'U'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user ? `${user.userProfile.fullName}` : 'Consultant'}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.userProfile.email || 'user@example.com'}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* <Link href={paths.adminProfile()}>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={() => handleLogout()} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
