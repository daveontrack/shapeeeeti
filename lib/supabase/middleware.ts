// import { createServerClient } from '@supabase/ssr'
// import { NextResponse, type NextRequest } from 'next/server'

// export async function updateSession(request: NextRequest) {

//   const supabaseResponse = NextResponse.next({
//     request,
//   })

//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
//   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY


//   // For testing: temporarily force protection even without env vars
//   // Remove this block once Supabase is properly configured
//   const isTesting = true
//   if (isTesting) {
//     // Define protected routes that require authentication
//     const protectedPaths = ['/dashboard']

//     // Check if the current request path is protected
//     const isProtectedRoute = protectedPaths.some(path =>
//       request.nextUrl.pathname.startsWith(path)
//     )

//     // For testing: check if user is authenticated, redirect only if not
//     if (isProtectedRoute) {
//       // If Supabase is configured, check authentication
//       if (supabaseUrl && supabaseAnonKey) {
//         const supabase = createServerClient(
//           supabaseUrl,
//           supabaseAnonKey,
//           {
//             cookies: {
//               getAll() {
//                 return request.cookies.getAll()
//               },
//               setAll(cookiesToSet) {
//                 cookiesToSet.forEach(({ name, value }) =>
//                   request.cookies.set(name, value),
//                 )
//                 const response = NextResponse.next({
//                   request,
//                 })
//                 cookiesToSet.forEach(({ name, value, options }) =>
//                   response.cookies.set(name, value, options),
//                 )
//               },
//             },
//           },
//         )

//         const {
//           data: { user },
//         } = await supabase.auth.getUser()

//         if (!user) {
//           const url = request.nextUrl.clone()
//           url.pathname = '/auth/login'
//           url.searchParams.set('redirectTo', request.nextUrl.pathname)
//           return NextResponse.redirect(url)
//         }
//       } else {
//         // If Supabase not configured, check for any auth-related cookies (for testing)
//         const cookies = request.cookies.getAll()
//         const hasAuthCookie = cookies.some(cookie =>
//           cookie.name.includes('auth') ||
//           cookie.name.includes('session') ||
//           cookie.name.includes('token') ||
//           cookie.name.startsWith('sb-')
//         )

//         if (!hasAuthCookie) {
//           const url = request.nextUrl.clone()
//           url.pathname = '/auth/login'
//           url.searchParams.set('redirectTo', request.nextUrl.pathname)
//           return NextResponse.redirect(url)
//         }
//       }
//     }
//   }

//   // If environment variables are not set, skip authentication
//   if (!supabaseUrl || !supabaseAnonKey) {
//     return supabaseResponse
//   }

//   const supabase = createServerClient(
//     supabaseUrl,
//     supabaseAnonKey,
//     {
//       cookies: {
//         getAll() {
//           return request.cookies.getAll()
//         },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value }) =>
//             request.cookies.set(name, value),
//           )
//           const response = NextResponse.next({
//             request,
//           })
//           cookiesToSet.forEach(({ name, value, options }) =>
//             response.cookies.set(name, value, options),

//           supabaseResponse = NextResponse.next({
//             request,
//           })
//           // cookiesToSet.forEach(({ name, value, options }) =>
//           //   supabaseResponse.cookies.set(name, value, options),

//            )
//         },
//       },
//     },
//   )
//   // Get the current user session
//   const {
//     data: { user },
//   } = await supabase.auth.getUser()
//   // Define protected routes that require authentication
//   const protectedPaths = ['/dashboard']

//   // Check if the current request path is protected
//   const isProtectedRoute = protectedPaths.some(path =>
//     request.nextUrl.pathname.startsWith(path)
//   )

//   // If accessing a protected route without authentication, redirect to login
//   if (isProtectedRoute && !user) {
//     const url = request.nextUrl.clone()
//     url.pathname = '/auth/login'
//     // Preserve the original destination for post-login redirect
//   // Protect dashboard routes
//   const protectedPaths = ['/dashboard']
//   const isProtectedRoute = protectedPaths.some(path => 
//     request.nextUrl.pathname.startsWith(path)
//   )

//   if (isProtectedRoute && !user) {
//     const url = request.nextUrl.clone()
//     url.pathname = '/auth/login'
//     // Add redirect parameter to return to the original page after login
//     url.searchParams.set('redirectTo', request.nextUrl.pathname)
//     return NextResponse.redirect(url)
//   }

//   return supabaseResponse
// }
//   }


import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Define protected routes
  const protectedPaths = ['/dashboard']
  const isProtectedRoute = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  // If route is protected, check authentication
  if (isProtectedRoute) {
    let user = null

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          },
        },
      })

      const { data } = await supabase.auth.getUser()
      user = data.user
    } else {
      // Fallback for testing without Supabase
      const cookies = request.cookies.getAll()
      const hasAuthCookie = cookies.some(cookie =>
        cookie.name.includes('auth') ||
        cookie.name.includes('session') ||
        cookie.name.includes('token') ||
        cookie.name.startsWith('sb-')
      )
      if (hasAuthCookie) user = {} // dummy user
    }

    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }
  }

  // If not a protected route or user is authenticated
  return supabaseResponse
}
