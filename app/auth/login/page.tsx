"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Chrome, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/"

  const handleGoogleSignIn = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const supabase = createClient()
      const callbackUrl = window.location.origin + "/auth/callback?redirectTo=" + encodeURIComponent(redirectTo)

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
        },
      })

      if (error) {
        throw error
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start Google sign in")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary/10 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md rounded-3xl border border-border bg-background/95 shadow-2xl shadow-slate-900/10">
        <CardHeader className="text-center px-10 pt-10">
          <CardTitle className="font-serif text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            Sign in to your account to continue making an impact
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 px-10 pb-6">
          <Button
            type="button"
            className="w-full justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing in with Google...
              </>
            ) : (
              <>
                <Chrome className="h-4 w-4" />
                Continue with Google
              </>
            )}
          </Button>

          {error ? <p className="text-sm text-center text-destructive">{error}</p> : null}
        </CardContent>

        <CardFooter className="flex flex-col gap-3 px-10 pb-10">
          <div className="text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Back to Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}