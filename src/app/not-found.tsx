'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background via-background to-muted/20">
      <Card className="text-center border-2 shadow-lg bg-gradient-to-br from-primary/5 via-background to-accent/5  max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-6xl font-black text-primary mb-2">404</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-semibold text-muted-foreground mb-8">Oops! The page you’re looking for doesn’t exist.</p>
          <Link href="/" passHref>
            <Button size="lg" className="px-8 py-6 text-lg font-bold shadow-md hover:bg-primary/90">
              Return to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
