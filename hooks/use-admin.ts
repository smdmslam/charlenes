"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { auth } from "@/lib/firebase"

export function useAdmin() {
  const { user } = useAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false)
        setLoading(false)
        return
      }

      try {
        // Get the ID token to check custom claims
        const token = await user.getIdTokenResult()
        
        // Check if user has admin claim
        const adminClaim = token.claims.admin === true
        
        // Also check for specific admin email as fallback
        const adminEmail = user.email === "s.moralesmed@gmail.com"
        
        setIsAdmin(adminClaim || adminEmail)
      } catch (error) {
        console.error("Error checking admin status:", error)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    checkAdmin()
  }, [user])

  return { isAdmin, loading }
}
