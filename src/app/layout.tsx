import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import RootLayoutComponent from '@/_layout/root/RootLayout.component'
import { ReduxProvider } from '@/_providers/ReduxProvider'
import AuthProvider from '@/_providers/AuthProvider'
import BProgressProviders from '@/_providers/BProgressProviders'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

export const metadata: Metadata = {
  title: 'BoardTide',
  description: 'Lovable Generated Project',
  icons: '/favicon.ico',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <BProgressProviders>
            <AuthProvider>
              <TooltipProvider>
                <RootLayoutComponent>{children}</RootLayoutComponent>
              </TooltipProvider>
            </AuthProvider>
          </BProgressProviders>
        </ReduxProvider>
        <Toaster position="top-right" theme="light" richColors={true} />
      </body>
    </html>
  )
}
