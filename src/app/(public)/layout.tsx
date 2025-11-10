import React from 'react'
import Header from '@/_layout/common/header/Header.component'
import Footer from '@/_layout/common/footer/Footer.component'
import AuthGuard from '@/components/authGruad/AuthGruad.component'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard pageType="public">
      <>
        <Header />
        {children}
        <Footer />
      </>
    </AuthGuard>
  )
}
