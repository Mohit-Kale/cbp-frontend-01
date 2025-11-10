'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { handleLogout } from '@/utils'
import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarHeader, useSidebar } from '@/components/ui/sidebar'
import { GenerateIcon } from '@/components/GenerateIcon/GenerateIcon.component'
import { IconName } from 'lucide-react/dynamic'
import { Button } from '@/components/ui/button'
import useAdminSidebar from './useAdminSidebar.hook'
import { paths } from '@/navigate/paths'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function AdminSidebar() {
  const { navItems, isActive } = useAdminSidebar()
  const { setOpenMobile } = useSidebar()

  return (
    <Sidebar className="z-40">
      <SidebarContent>
        <SidebarHeader className="border-b">
          {/* Logo */}
          <Link href={paths.adminDashboard()} className="cursor-pointer items-center h-16 flex justify-center">
            <Image src="/assets/boardtide-logo.png" alt="Board Tide " className="h-full w-auto object-contain" height={1000} width={1000} priority />
          </Link>
        </SidebarHeader>

        {/* Navigation Menu */}
        <SidebarMenu className="flex flex-col mt-6 overflow-x-hidden p-1">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label} className={cn(isActive(item.path) && 'bg-primary/10', 'rounded relative hover:bg-primary/10')} onClick={() => setOpenMobile(false)}>
              <div className={cn(isActive(item.path) && 'absolute left-0 h-full w-2 bg-primary rounded-s-4xl')} />
              <Link href={item.path} className="flex items-center gap-3 px-4 py-2 cursor-pointer">
                <div className="flex items-center gap-3 px-4 py-1">
                  <GenerateIcon name={item.icon as IconName} />
                  <p className="text-base font-semibold">{item.label}</p>
                </div>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={handleLogout} variant="ghost" className="border w-full flex justify-start items-center gap-3">
          <LogOut />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
