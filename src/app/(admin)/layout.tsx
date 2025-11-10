import AdminHeader from '@/_layout/admin/adminHeader/AdminHeader'
import { AdminSidebar } from '@/_layout/admin/adminSidebar/AdminSideBar.component'
import AuthGuard from '@/components/authGruad/AuthGruad.component'
import { SidebarProvider } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard pageType="admin">
      <SidebarProvider>
        <div className="flex w-full">
          {/* Sidebar */}
          <div>
            <AdminSidebar />
          </div>
          {/* Main Content */}
          <div className="flex flex-col gap-6 px-4 md:px-6 py-4 w-full md:w-[calc(100%-16rem)]">
            {/* Header */}
            <AdminHeader />

            {/* Scrollable Content Area */}
            <section className="bg-white shadow-lg rounded-lg p-4 md:px-6 md:py-4">{children}</section>
          </div>
        </div>
      </SidebarProvider>
    </AuthGuard>
  )
}
