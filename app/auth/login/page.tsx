// "use client"

// import { Suspense } from "react"
// import Link from "next/link"
// import { useSearchParams } from "next/navigation"
// import { ArrowRight, Heart } from "lucide-react"
// import { AuthForm } from "@/components/auth-form"

// export default function LoginPage() {
//   const searchParams = useSearchParams()
//   // Default redirect after login is now "/"
//   const redirectTo = searchParams.get("redirectTo") || "/"

//   return (
//     <Suspense
//       fallback={
//         <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
//           <div className="w-8 h-8 rounded-full bg-primary animate-pulse" />
//         </div>
//       }
//     >
//       <div className="min-h-screen bg-secondary/30 flex flex-col">
//         {/* Header */}
//         <header className="p-4">
//           <Link href="/" className="flex items-center gap-2 w-fit">
//             <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
//               <ArrowRight className="w-5 h-5 text-primary-foreground" />
//             </div>
//             <span className="font-serif text-xl font-bold text-foreground">
//               SHAPE<span className="text-primary">ethiopia</span>
//             </span>
//           </Link>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 flex items-center justify-center px-4 py-12">
//           <div className="w-full max-w-md space-y-8 text-center">
//             {/* Google Auth */}
//             <AuthForm mode="login" redirectTo={redirectTo} />
//           </div>
//         </main>
//       </div>
//     </Suspense>
//   )
// }




"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { AuthForm } from "@/components/auth-form"

function LoginContent() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || searchParams.get("redirectTo") || "/"

  return (
    <div className="min-h-screen bg-secondary/30 flex flex-col">
      {/* Header */}
      <header className="p-4">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold text-foreground">
            SHAPE<span className="text-primary">ethiopia</span>
          </span>
        </Link>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <AuthForm mode="login" redirectTo={redirectTo} />
        </div>
      </main>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-primary animate-pulse" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}
