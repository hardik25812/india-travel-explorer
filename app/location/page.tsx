"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/SupabaseProvider"
import { MapPin, Share2, Clock, User } from "lucide-react"

// Mock data for emergency contacts
const mockEmergencyContacts = [
  { id: "1", name: "John Doe", phone: "+1234567890", relationship: "Family" },
  { id: "2", name: "Jane Smith", phone: "+0987654321", relationship: "Friend" },
]

// Mock data for location history
const mockLocationHistory = [
  {
    id: "1",
    latitude: 28.6139,
    longitude: 77.209,
    shared_with: ["1"],
    message: "At India Gate",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    latitude: 28.5244,
    longitude: 77.1855,
    shared_with: ["1", "2"],
    message: "At Qutub Minar",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
]

export default function LocationPage() {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { toast } = useToast()
  const { user, isLoading: isUserLoading } = useSupabase()
  const router = useRouter()

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

  const handleShareLocation = async () => {
    if (selectedContacts.length === 0) {
      toast({
        title: "No contacts selected",
        description: "Please select at least one contact to share your location with",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // For demo purposes, simulate location sharing
      setTimeout(() => {
        toast({
          title: "Location shared",
          description: "Your location has been shared successfully",
        })
        setIsLoading(false)
        setMessage("")
        setSelectedContacts([])
      }, 1500)
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to share location. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Location Sharing</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share2 className="mr-2 h-5 w-5 text-primary" />
              Share Your Location
            </CardTitle>
            <CardDescription>Share your current location with your emergency contacts</CardDescription>
          </CardHeader>
          <CardContent>
            {mockEmergencyContacts.length > 0 ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Select contacts to share with:</h3>
                  <div className="space-y-2">
                    {mockEmergencyContacts.map((contact) => (
                      <div key={contact.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={contact.id}
                          checked={selectedContacts.includes(contact.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedContacts([...selectedContacts, contact.id])
                            } else {
                              setSelectedContacts(selectedContacts.filter((id) => id !== contact.id))
                            }
                          }}
                        />
                        <Label htmlFor={contact.id} className="flex-1 cursor-pointer">
                          <span className="font-medium">{contact.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">({contact.relationship})</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Add a message (optional):</Label>
                  <Textarea
                    id="message"
                    placeholder="I'm at the hotel. Here's my location."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleShareLocation}
                  className="w-full"
                  disabled={isLoading || selectedContacts.length === 0}
                >
                  {isLoading ? "Sharing..." : "Share My Location"}
                </Button>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground mb-4">You don't have any emergency contacts yet</p>
                <Button asChild>
                  <Link href="/emergency/add">Add Emergency Contact</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Location History
            </CardTitle>
            <CardDescription>Your recently shared locations</CardDescription>
          </CardHeader>
          <CardContent>
            {mockLocationHistory.length > 0 ? (
              <div className="space-y-4">
                {mockLocationHistory.map((location) => (
                  <div key={location.id} className="border rounded-md p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-primary mr-2" />
                        <span className="font-medium">
                          {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{formatDate(location.created_at)}</span>
                    </div>
                    {location.message && <p className="text-sm mb-2">{location.message}</p>}
                    <div className="flex items-center text-xs text-muted-foreground">
                      <User className="h-3 w-3 mr-1" />
                      Shared with {location.shared_with.length} contact(s)
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-muted-foreground">No location history yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Location Sharing Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              <li>Share your location when traveling to remote areas</li>
              <li>Update your location regularly during long journeys</li>
              <li>Include a message with context about your location</li>
              <li>Make sure your emergency contacts know to expect location updates</li>
              <li>Check that your device's location services are enabled</li>
            </ul>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Your location data is only shared with the contacts you select
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
