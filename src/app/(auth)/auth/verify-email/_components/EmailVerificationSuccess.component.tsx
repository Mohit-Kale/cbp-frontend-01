'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useAuthDialog } from '@/components/auth/useAuthDialog.hook'
// import { useSearchParams } from 'next/navigation'
// import { useEffect } from 'react'
// import { useLazyVerifyEmailQuery } from '@/redux/services/auth.api'
// import { Skeleton } from '@/components/ui/skeleton'

export default function EmailVerificationSuccess() {
  // const searchParams = useSearchParams()
  // const token = searchParams.get('token')

  // const [verifyEmail, { isLoading, isFetching, isError, isSuccess }] = useLazyVerifyEmailQuery()

  // useEffect(() => {
  //   if (token) {
  //     try {
  //       verifyEmail({ token })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  // }, [token])
  const { openAuthDialog } = useAuthDialog()

  return (
    <>
      {/* {isError && (
         
          )}

          {(isLoading || isFetching) && (
            <>
              <div className="space-y-6 ">
                <div className="flex justify-center items-center">
                  <Skeleton className="h-16 w-16 text-center rounded-full" />
                </div>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </>
          )} */}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col items-center text-center p-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full border border-blue-200 text-primary mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-xl font-semibold text-primary">Email Verified!</h1>

        <p className="text-sm text-muted-foreground mt-2 max-w-xs">
          Your email has been successfully verified. Welcome to
          <span className="text-primary font-medium ml-1">Board Tide</span>.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <Button className="w-full" onClick={() => openAuthDialog('signin')}>
          Login to Your Account
        </Button>
      </motion.div>
    </>
  )
}
