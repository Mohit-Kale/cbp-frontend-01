import React from 'react'
import Footer from '@/_layout/common/footer/Footer.component'
import Header from '@/_layout/common/header/Header.component'
// import AuthGuard from '@/_authGuard/AuthGuard.component'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <AuthGuard pageType="auth"> */}
      <Header />
      {children}
      <Footer />
      {/* </AuthGuard> */}
    </>
  )
}
