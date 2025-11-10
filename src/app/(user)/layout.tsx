// import CustomerHeader from '@/_layout/consultant/consultantHeader/ConsultantHeader.component'
import UserHeader from '@/_layout/user/userHeader/UserHeader.component'
import AuthGuard from '@/components/authGruad/AuthGruad.component'
import { Container } from '@/components/ui/container'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard pageType="user">
      <div>
        <UserHeader />
        <Container>{children}</Container>
      </div>
    </AuthGuard>
  )
}
