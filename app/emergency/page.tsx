"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Plus, User, AlertTriangle } from "lucide-react"
import { useSupabase } from "@/components/SupabaseProvider"

// Mock data for emergency contacts
const mockEmergencyContacts = [
  { id: "1", name: "John Doe", phone: "+1234567890", relationship: "Family" },
  { id: "2", name: "Jane Smith", phone: "+0987654321", relationship: "Friend" },
]

export default function EmergencyPage() {
  const { user, isLoading } = useSupabase()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Don't render anything on the server to avoid hydration mismatch
  if (!isClient) {
    return null
  }

  // Redirect if not logged in
  if (!user) {
    return null
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Emergency Services</h1>
        <Button asChild>
          <Link href="/emergency/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Contact
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card className="border-destructive">
            <CardHeader className="bg-destructive/5">
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                Emergency Numbers in India
              </CardTitle>
              <CardDescription>Important contact numbers for emergencies in India</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="font-medium">Police</div>
                  <a href="tel:100" className="flex items-center text-destructive hover:underline">
                    <Phone className="mr-1 h-4 w-4" />
                    100
                  </a>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="font-medium">Ambulance</div>
                  <a href="tel:108" className="flex items-center text-destructive hover:underline">
                    <Phone className="mr-1 h-4 w-4" />
                    108
                  </a>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="font-medium">Fire</div>
                  <a href="tel:101" className="flex items-center text-destructive hover:underline">
                    <Phone className="mr-1 h-4 w-4" />
                    101
                  </a>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="font-medium">Women Helpline</div>
                  <a href="tel:1091" className="flex items-center text-destructive hover:underline">
                    <Phone className="mr-1 h-4 w-4" />
                    1091
                  </a>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <div className="font-medium">Tourist Helpline</div>
                  <a href="tel:1363" className="flex items-center text-destructive hover:underline">
                    <Phone className="mr-1 h-4 w-4" />
                    1363
                  </a>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-medium">Emergency Unified Number</div>
                  <a href="tel:112" className="flex items-center text-destructive hover:underline">
                    <Phone className="mr-1 h-4 w-4" />
                    112
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                Your Emergency Contacts
              </CardTitle>
              <CardDescription>People to contact in case of emergency</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {mockEmergencyContacts.length > 0 ? (
                <div className="space-y-4">
                  {mockEmergencyContacts.map((contact) => (
                    <div key={contact.id} className="flex justify-between items-center pb-2 border-b">
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-muted-foreground">{contact.relationship}</div>
                      </div>
                      <a href={`tel:${contact.phone}`} className="flex items-center text-destructive hover:underline">
                        <Phone className="mr-1 h-4 w-4" />
                        {contact.phone}
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">You haven't added any emergency contacts yet</p>
                  <Button asChild>
                    <Link href="/emergency/add">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Contact
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                These contacts will be available offline in case of emergency
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Safety Tips for Travelers in India</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              <li>Keep a copy of your passport and visa with you at all times</li>
              <li>Register with your country's embassy or consulate in India</li>
              <li>Be cautious when using ATMs and keep your valuables secure</li>
              <li>Use reputable transportation services, especially at night</li>
              <li>Stay hydrated and be cautious about street food and water</li>
              <li>Research local customs and dress appropriately</li>
              <li>Share your itinerary with family or friends</li>
              <li>Purchase travel insurance that covers medical emergencies</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
