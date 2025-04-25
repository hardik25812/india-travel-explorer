"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Camera, Compass, MapPin, Phone } from "lucide-react"
import { useSupabase } from "@/components/SupabaseProvider"

// Mock data for the dashboard
const mockData = {
  searchHistory: [
    { id: "1", search_type: "image", result_landmark_id: "1", landmarks: { name: "Taj Mahal" } },
    { id: "2", search_type: "name", result_landmark_id: "2", landmarks: { name: "India Gate" } },
    { id: "3", search_type: "image", result_landmark_id: "3", landmarks: { name: "Golden Temple" } },
  ],
  savedPlaces: [
    { id: "1", landmark_id: "1", landmarks: { name: "Taj Mahal" } },
    { id: "2", landmark_id: "2", landmarks: { name: "India Gate" } },
  ],
  emergencyContacts: [
    { id: "1", name: "Rajesh Kumar", phone: "+1234567890", relationship: "Family" },
    { id: "2", name: "Priya Sharma", phone: "+0987654321", relationship: "Friend" },
  ],
  recommendedLandmarks: [
    {
      id: "1",
      name: "Taj Mahal",
      description: "An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra.",
      image_path: "/images/taj-mahal.png",
      popularity: 5,
    },
    {
      id: "2",
      name: "India Gate",
      description:
        "A war memorial located astride the Rajpath, on the eastern edge of the ceremonial axis of New Delhi.",
      image_path: "/images/india-gate.jpg",
      popularity: 4,
    },
    {
      id: "3",
      name: "Golden Temple",
      description:
        "A gurdwara located in the city of Amritsar, Punjab. It is the preeminent spiritual site of Sikhism.",
      image_path: "/images/golden-temple.jpg",
      popularity: 5,
    },
  ],
}

export default function DashboardPage() {
  const { user, isLoading } = useSupabase()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if user is logged in
    const checkAuth = () => {
      // Check both localStorage keys for compatibility
      const currentUser = localStorage.getItem('india_travel_current_user')
      const demoUser = localStorage.getItem('demoUser')
      
      // If we have a user in either storage location and no user in state, set it manually
      if ((currentUser || demoUser) && !user) {
        try {
          // Try to parse the user from either storage location
          const userData = currentUser ? JSON.parse(currentUser) : JSON.parse(demoUser || '{}')
          if (userData && userData.id) {
            // This will trigger a re-render with the user set
            console.log('Setting user from localStorage:', userData)
            // No need to set user here as the SupabaseProvider should handle it
          }
        } catch (e) {
          console.error('Error parsing user data:', e)
        }
      }
      
      // If not loading and no user, redirect to login
      if (!isLoading && !user && !currentUser && !demoUser) {
        router.push("/login")
      }
    }

    checkAuth()

    // Add a small delay to ensure the auth state is properly checked
    const timer = setTimeout(checkAuth, 500)

    return () => clearTimeout(timer)
  }, [user, isLoading, router])

  // Don't render anything on the server to avoid hydration mismatch
  if (!isClient) {
    return null
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="container py-8 flex justify-center items-center min-h-[60vh]">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="container py-8 flex flex-col justify-center items-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
        <p className="text-muted-foreground mb-6">Please log in to access your dashboard</p>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name || user?.email || "User"}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Compass className="mr-2 h-5 w-5 text-primary" />
              Recent Searches
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockData.searchHistory.length > 0 ? (
              <ul className="space-y-2">
                {mockData.searchHistory.map((search) => (
                  <li key={search.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center">
                      {search.search_type === "image" ? (
                        <Camera className="mr-2 h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Compass className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{search.landmarks?.name || "Unknown search"}</span>
                    </div>
                    {search.landmarks && (
                      <Link href={`/landmark/${search.result_landmark_id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No recent searches</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/search">Search More</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Saved Places
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockData.savedPlaces.length > 0 ? (
              <ul className="space-y-2">
                {mockData.savedPlaces.map((place) => (
                  <li key={place.id} className="flex items-center justify-between border-b pb-2">
                    <span>{place.landmarks?.name}</span>
                    <Link href={`/landmark/${place.landmark_id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No saved places</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/search">Explore Places</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-primary" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockData.emergencyContacts.length > 0 ? (
              <ul className="space-y-2">
                {mockData.emergencyContacts.map((contact) => (
                  <li key={contact.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p>{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                    </div>
                    <a href={`tel:${contact.phone}`}>
                      <Button variant="outline" size="sm" className="text-destructive border-destructive">
                        <Phone className="h-4 w-4 mr-1" /> Call
                      </Button>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">No emergency contacts</p>
            )}
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/emergency/add">Add Contact</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Your Travel Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Map will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/search/image">
                <Camera className="mr-2 h-4 w-4" /> Identify Landmark
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/location">
                <MapPin className="mr-2 h-4 w-4" /> Share Location
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/emergency">
                <Phone className="mr-2 h-4 w-4" /> Emergency Services
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link href="/search">
                <Compass className="mr-2 h-4 w-4" /> Explore Nearby
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your interests and popular destinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockData.recommendedLandmarks.map((landmark) => (
              <Card key={landmark.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={landmark.image_path || "/placeholder.svg?height=200&width=400"}
                    alt={landmark.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{landmark.name}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {landmark.popularity}/5
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {landmark.description.length > 100
                      ? `${landmark.description.substring(0, 100)}...`
                      : landmark.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href={`/landmark/${landmark.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
