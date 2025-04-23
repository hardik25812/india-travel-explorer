"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientSupabaseClient, isSupabaseConfigured } from "@/lib/supabase"

type User = {
  id: string
  email: string
  name?: string
}

type SupabaseContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, name?: string) => Promise<{ error: any }>
  signOut: () => void
  usingDemoMode: boolean
}

const SupabaseContext = createContext<SupabaseContextType>({
  user: null,
  isLoading: true,
  signIn: () => Promise.resolve({ error: null }),
  signUp: () => Promise.resolve({ error: null }),
  signOut: () => {},
  usingDemoMode: true
})

export const useSupabase = () => useContext(SupabaseContext)

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // Create Supabase client (now using localStorage)
  const supabase = createClientSupabaseClient()
  
  // Always in demo mode now
  const usingDemoMode = true

  useEffect(() => {
    // Check for user in localStorage
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        
        if (data?.user) {
          setUser(data.user as User)
        }
        
        setIsLoading(false)
      } catch (error) {
        console.error("Error checking user:", error)
        setIsLoading(false)
      }
    }

    // Initial check
    checkUser()

    // Listen for storage events (for multi-tab support)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'india_travel_current_user') {
        if (event.newValue) {
          try {
            const userData = JSON.parse(event.newValue)
            setUser(userData)
          } catch (e) {
            console.error("Error parsing user data:", e)
          }
        } else {
          setUser(null)
        }
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signIn({ email, password })
      
      if (data?.user) {
        setUser(data.user as User)
      }
      
      return { error }
    } catch (error) {
      console.error("Error signing in:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password, name })
      
      if (data?.user) {
        setUser(data.user as User)
      }
      
      return { error }
    } catch (error) {
      console.error("Error signing up:", error)
      return { error }
    }
  }
  
  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)

    // Redirect to home page after logout
    window.location.href = "/"
  }

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    usingDemoMode
  }

  return <SupabaseContext.Provider value={value}>{children}</SupabaseContext.Provider>
}
