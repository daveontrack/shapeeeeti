"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

function RedirectContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Redirect to /donate/success with all query parameters
    const params = searchParams.toString()
    router.replace(`/donate/success${params ? `?${params}` : ''}`)
  }, [router, searchParams])
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecting to donation receipt...</p>
      </div>
    </div>
  )
}

export default function DonationSuccessRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <RedirectContent />
    </Suspense>
  )
}