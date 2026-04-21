'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState, useCallback } from 'react'

export function useAuthRedirect() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(false)

  const redirectToLoginIfNeeded = useCallback(async (targetPath: string = '/volunteer') => {
    setIsChecking(true)
    
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        // User is not authenticated, redirect to login with redirect parameter
        router.push(`/auth/login?redirect=${encodeURIComponent(targetPath)}`)
      } else {
        // User is authenticated, redirect to target path
        router.push(targetPath)
      }
    } catch (error) {
      console.error('Auth check error:', error)
      // On error, redirect to login as fallback
      router.push(`/auth/login?redirect=${encodeURIComponent(targetPath)}`)
    } finally {
      setIsChecking(false)
    }
  }, [router])

  return { redirectToLoginIfNeeded, isChecking }
}
