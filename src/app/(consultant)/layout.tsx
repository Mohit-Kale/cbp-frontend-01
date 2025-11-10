import CustomerHeader from '@/_layout/consultant/consultantHeader/ConsultantHeader.component'
import AuthGuard from '@/components/authGruad/AuthGruad.component'
import { Container } from '@/components/ui/container'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard pageType="consultant">
      <div>
        <CustomerHeader />
        <Container>{children}</Container>
      </div>
    </AuthGuard>
  )
}
