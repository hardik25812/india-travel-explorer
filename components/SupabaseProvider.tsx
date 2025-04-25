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
      // Check if the method exists and call it correctly
      if (typeof supabase.auth.signIn === 'function') {
        const { data, error } = await supabase.auth.signIn({ email, password })
        
        if (data?.user) {
          setUser(data.user as User)
        }
        
        return { error }
      } else {
        // Fallback to direct localStorage manipulation for demo purposes
        console.log('Using fallback authentication')
        const users = JSON.parse(localStorage.getItem('india_travel_users') || '[]')
        const user = users.find((u: any) => u.email === email && u.password === password)
        
        if (user) {
          // Remove password before storing in session
          const { password: _, ...safeUser } = user
          localStorage.setItem('india_travel_current_user', JSON.stringify(safeUser))
          setUser(safeUser as User)
          return { error: null }
        }
        
        return { error: { message: 'Invalid login credentials' } }
      }
    } catch (error) {
      console.error("Error signing in:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      // Check if the method exists and call it correctly
      if (typeof supabase.auth.signUp === 'function') {
        const { data, error } = await supabase.auth.signUp({ email, password, name })
        
        if (data?.user) {
          setUser(data.user as User)
        }
        
        return { error }
      } else {
        // Fallback to direct localStorage manipulation for demo purposes
        console.log('Using fallback registration')
        const users = JSON.parse(localStorage.getItem('india_travel_users') || '[]')
        
        // Check if user already exists
        if (users.some((u: any) => u.email === email)) {
          return { error: { message: 'User with this email already exists' } }
        }
        
        // Create new user
        const newUser = {
          id: `user-${Date.now()}`,
          email,
          name,
          password
        }
        
        // Add to users collection
        users.push(newUser)
        localStorage.setItem('india_travel_users', JSON.stringify(users))
        
        // Login the user (remove password)
        const { password: _, ...safeUser } = newUser
        localStorage.setItem('india_travel_current_user', JSON.stringify(safeUser))
        setUser(safeUser as User)
        
        return { error: null }
      }
    } catch (error) {
      console.error("Error signing up:", error)
      return { error }
    }
  }
  
  const signOut = async () => {
    try {
      if (typeof supabase.auth.signOut === 'function') {
        await supabase.auth.signOut()
      } else {
        // Fallback for demo mode
        localStorage.removeItem('india_travel_current_user')
      }
      
      setUser(null)
      
      // Redirect to home page after logout
      window.location.href = "/"
    } catch (error) {
      console.error("Error signing out:", error)
    }
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
