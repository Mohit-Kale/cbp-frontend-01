// app/auth/sign-in-error/page.tsx
'use client'
import { paths } from '@/navigate/paths'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function SignInErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-primary mb-4">Login Failed</h1>

        <p className="text-gray-600">
          {error
            ? decodeURIComponent(error) // error message jo tu throw karega
            : 'Something went wrong. Please try again.'}
        </p>

        <Link href={paths.home()} className="mt-6 inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition">
          Back to home
        </Link>
      </div>
    </div>
  )
}
