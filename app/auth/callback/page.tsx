// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import { createClient } from "@/lib/supabase/client"
// import { Loader2 } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

// export default function AuthCallbackPage() {
//   const [isLoading, setIsLoading] = useState(true)
//   const router = useRouter()
//   const { toast } = useToast()

//   useEffect(() => {
//     const handleCallback = async () => {
//       const supabase = createClient()

//       try {
//         const { data, error } = await supabase.auth.getSession()

//         if (error) {
//           throw error
//         }

//         if (!data?.session) {
//           toast({
//             title: "Authentication needed",
//             description: "Could not complete OAuth callback. Please sign in again.",
//             variant: "destructive",
//           })
//           router.replace("/auth/login")
//           return
//         }
//         const params = new URLSearchParams(window.location.search)
//         const redirectTo = params.get("redirectTo") || "/"

//         toast({
//           title: "Signed in successfully",
//           description: "Redirecting to your destination...",
//         })
//         router.replace(redirectTo)

//         toast({
//           title: "Signed in successfully",
//           description: "Redirecting to your dashboard...",
//         })
//         router.replace("/")
//       } catch (error) {
//         toast({
//           title: "OAuth callback failed",
//           description: error instanceof Error ? error.message : "Please try logging in again.",
//           variant: "destructive",
//         })
//         router.replace("/auth/login")
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     handleCallback()
//   }, [router, toast])

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="h-8 w-8 animate-spin text-primary" />
//       </div>
//     )
//   }

//   return null
// }



"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AuthCallbackPage() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase.auth.getSession()

        if (error || !data?.session) {
          throw new Error("No session found")
        }

        // ✅ IMPORTANT: use "next"
        const next = searchParams.get("next") || "/"

        toast({
          title: "Signed in successfully",
          description: "Redirecting...",
        })

        // ✅ SINGLE redirect
        router.replace(next)
      } catch (error) {
        toast({
          title: "OAuth callback failed",
          description:
            error instanceof Error
              ? error.message
              : "Please try logging in again.",
          variant: "destructive",
        })

        router.replace("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    handleCallback()
  }, [router, searchParams, toast])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return null
}