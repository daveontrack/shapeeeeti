// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Chrome, Loader2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
// import { createClient } from "@/lib/supabase/client"

// export function AuthForm() {
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()
//   const { toast } = useToast()
//   const supabase = createClient()

//   const handleOAuthLogin = async () => {
//     setIsLoading(true)
//     try {
//       const { error } = await supabase.auth.signInWithOAuth({
//         provider: "google",
//         options: { redirectTo: `${window.location.origin}/auth/callback` },
        
//       })

//       // `${window.location.origin}/auth/callback?next=${redirectTo}`

//       if (error) {
//         toast({
//           title: "Authentication Failed",
//           description: error.message,
//           variant: "destructive",
//         })
//       }
//     } catch (error) {
//       toast({
//         title: "Authentication Failed",
//         description: "An unexpected error occurred. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="w-full max-w-md mx-auto space-y-6 text-center mt-20">
//       <h1 className="text-2xl font-bold">Welcome Back</h1>
//       <p className="text-muted-foreground">
//         Sign in to your account to continue making an impact
//       </p>

//       <Button
//         type="button"
//         size="lg"
//         className="w-full h-12 text-base font-medium"
//         onClick={handleOAuthLogin}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//         ) : (
//           <Chrome className="mr-2 h-5 w-5" />
//         )}
//         Continue with Google
//       </Button>

//       <Button
//         type="button"
//         variant="outline"
//         className="w-full h-12 mt-2"
//         onClick={() => router.push("/")}
//       >
//         Back to Home
//       </Button>
//     </div>
//   )
// }

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Chrome, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { createClient } from "@/lib/supabase/client"

export function AuthForm({ redirectTo = "/" }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClient()

  const handleOAuthLogin = async () => {
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // ✅ PASS destination here
          redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
        },
      })

      if (error) {
        toast({
          title: "Authentication Failed",
          description: error.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Authentication Failed",
        description: "Unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 text-center mt-20">
      <h1 className="text-2xl font-bold">Welcome Back</h1>

      <p className="text-muted-foreground">
        Sign in to your account to continue making an impact
      </p>

      <Button
        type="button"
        size="lg"
        className="w-full h-12 text-base font-medium"
        onClick={handleOAuthLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Chrome className="mr-2 h-5 w-5" />
        )}
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full h-12 mt-2"
        onClick={() => router.push("/")}
      >
        Back to Home
      </Button>
    </div>
  )
}