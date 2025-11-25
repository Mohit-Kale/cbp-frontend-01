import EmailVerificationSuccess from './EmailVerificationSuccess.component'

interface PageProps {
  searchParams: {
    role?: string
  }
}

export default function Page({ searchParams }: PageProps) {
  const rawRole = (searchParams?.role || '').toUpperCase()

  // enforce valid roles
  const role: 'USER' | 'CONSULTANT' = rawRole === 'CONSULTANT' ? 'CONSULTANT' : 'USER'

  return <EmailVerificationSuccess role={role} />
}
