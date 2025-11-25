import EmailVerificationSuccess from './EmailVerificationSuccess.component'

interface PageProps {
  searchParams: {
    role?: string
  }
}

export default async function Page({ searchParams }: PageProps) {
  // await searchParams if necessary
  const params = await searchParams
  const rawRole = (params?.role || '').toUpperCase()

  // enforce valid roles
  const role: 'USER' | 'CONSULTANT' = rawRole === 'CONSULTANT' ? 'CONSULTANT' : 'USER'

  return <EmailVerificationSuccess role={role} />
}
