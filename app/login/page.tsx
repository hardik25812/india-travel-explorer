"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useSupabase } from "@/components/SupabaseProvider"
import { FcGoogle } from "react-icons/fc"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { signIn } = useSupabase()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Direct localStorage manipulation for demo purposes
      // This is a simplified approach for the demo
      if (email === 'demo@example.com' && password === 'password') {
        // Create a demo user
        const demoUser = {
          id: 'demo-user-1',
          email: 'demo@example.com',
          name: 'Demo User'
        }
        
        // Store in both localStorage keys to ensure compatibility
        localStorage.setItem('india_travel_current_user', JSON.stringify(demoUser))
        localStorage.setItem('demoUser', JSON.stringify(demoUser))
        
        toast({
          title: "Login successful",
          description: "You have been logged in successfully.",
        })

        // Force a hard navigation to ensure page reload and state reset
        window.location.href = '/dashboard'
      } else {
        throw new Error('Invalid login credentials')
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      // Direct localStorage manipulation for demo purposes
      // Create a demo Google user
      const googleUser = {
        id: 'google-user-1',
        email: 'demo@example.com',
        name: 'Demo Google User'
      }
      
      // Store in both localStorage keys to ensure compatibility
      localStorage.setItem('india_travel_current_user', JSON.stringify(googleUser))
      localStorage.setItem('demoUser', JSON.stringify(googleUser))
      
      toast({
        title: "Login successful",
        description: "You have been logged in with Google successfully.",
      })

      // Force a hard navigation to ensure page reload and state reset
      window.location.href = '/dashboard'
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during Google login.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container max-w-md py-16">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">Enter your credentials to sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" type="button" className="w-full" onClick={handleGoogleLogin}>
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
