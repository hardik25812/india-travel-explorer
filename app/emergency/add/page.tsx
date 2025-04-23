"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/SupabaseProvider"
import { ArrowLeft, Phone, User } from "lucide-react"
import Link from "next/link"

export default function AddEmergencyContactPage() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [relationship, setRelationship] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user, isLoading: isUserLoading } = useSupabase()

  useEffect(() => {
    setIsClient(true)
    if (!isUserLoading && !user) {
      router.push("/login")
    }
  }, [user, isUserLoading, router])

  // Don't render anything on the server to avoid hydration mismatch
  if (!isClient) {
    return null
  }

  // Redirect if not logged in
  if (!user) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)

    try {
      // For demo purposes, simulate adding a contact
      setTimeout(() => {
        toast({
          title: "Contact added",
          description: "Emergency contact has been added successfully",
        })
        router.push("/emergency")
      }, 1000)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add contact. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md py-8">
      <Link href="/emergency" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Emergency Contacts
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Add Emergency Contact</CardTitle>
          <CardDescription>Add someone who can be contacted in case of emergency</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Contact name"
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 1234567890"
                  className="pl-10"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Input
                id="relationship"
                placeholder="Family, Friend, etc."
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Contact"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">This contact will be available offline in case of emergency</p>
        </CardFooter>
      </Card>
    </div>
  )
}
