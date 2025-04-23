"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Mock data for search results
const mockLandmarks = [
  {
    id: "1",
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    description:
      "An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
    image_path: "/images/taj-mahal.png",
    popularity: 5,
  },
  {
    id: "2",
    name: "India Gate",
    location: "New Delhi, Delhi",
    description:
      "A war memorial located astride the Rajpath, on the eastern edge of the ceremonial axis of New Delhi. It was designed by Sir Edwin Lutyens, who was the main architect of New Delhi.",
    image_path: "/images/india-gate.jpg",
    popularity: 4,
  },
  {
    id: "3",
    name: "Golden Temple",
    location: "Amritsar, Punjab",
    description:
      "A gurdwara located in the city of Amritsar, Punjab, India. It is the preeminent spiritual site of Sikhism. The temple is built around a man-made pool that was completed by the fourth Sikh Guru, Guru Ram Das, in 1577.",
    image_path: "/images/golden-temple.jpg",
    popularity: 5,
  },
]

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [landmarks, setLandmarks] = useState<typeof mockLandmarks>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to search for landmarks
    setIsLoading(true)
    setTimeout(() => {
      // Filter landmarks based on search query
      const filteredLandmarks = mockLandmarks.filter(
        (landmark) =>
          landmark.name.toLowerCase().includes(query.toLowerCase()) ||
          landmark.location.toLowerCase().includes(query.toLowerCase()),
      )
      setLandmarks(filteredLandmarks)
      setIsLoading(false)
    }, 1000)
  }, [query])

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-muted-foreground mb-8">Showing results for "{query}"</p>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      ) : landmarks.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">No landmarks found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find any landmarks matching "{query}". Try a different search term.
          </p>
          <Button asChild>
            <Link href="/search">Back to Search</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landmarks.map((landmark) => (
            <Card key={landmark.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-48">
                <Image
                  src={landmark.image_path || "/placeholder.svg?height=200&width=400"}
                  alt={landmark.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{landmark.name}</h3>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {landmark.popularity}/5
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{landmark.location}</p>
                <p className="mb-4">
                  {landmark.description.length > 150
                    ? `${landmark.description.substring(0, 150)}...`
                    : landmark.description}
                </p>
                <Button className="w-full" asChild>
                  <Link href={`/landmark/${landmark.id}`}>View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
