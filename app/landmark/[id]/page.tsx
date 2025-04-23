import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, MapPin, Phone, AlertTriangle } from "lucide-react"
import SaveLandmarkButton from "@/components/SaveLandmarkButton"

// Mock data for landmarks
const mockLandmarks = [
  {
    id: "1",
    name: "Taj Mahal",
    location: "Agra, Uttar Pradesh",
    coordinates: { lat: 27.1751, lng: 78.0421 },
    description:
      "An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
    image_path: "/images/taj-mahal.png",
    map_image: "/images/taj-mahal-map.png",
    popularity: 5,
    guide_info:
      "Best visited during sunrise or sunset. Closed on Fridays. Entry fee varies for domestic and international tourists.",
    emergency_numbers: {
      police: "100",
      ambulance: "108",
      fire: "101",
      tourist_police: "1363",
    },
  },
  {
    id: "2",
    name: "India Gate",
    location: "New Delhi, Delhi",
    coordinates: { lat: 28.6129, lng: 77.2295 },
    description:
      "A war memorial located astride the Rajpath, on the eastern edge of the ceremonial axis of New Delhi. It was designed by Sir Edwin Lutyens, who was the main architect of New Delhi.",
    image_path: "/images/india-gate.jpg",
    popularity: 4,
    guide_info: "Best visited in the evening when it is illuminated. Free entry.",
    emergency_numbers: {
      police: "100",
      ambulance: "108",
      fire: "101",
      tourist_police: "1363",
    },
  },
  {
    id: "3",
    name: "Golden Temple",
    location: "Amritsar, Punjab",
    coordinates: { lat: 31.62, lng: 74.8765 },
    description:
      "A gurdwara located in the city of Amritsar, Punjab, India. It is the preeminent spiritual site of Sikhism. The temple is built around a man-made pool that was completed by the fourth Sikh Guru, Guru Ram Das, in 1577.",
    image_path: "/images/golden-temple.jpg",
    popularity: 5,
    guide_info: "Open 24 hours. Head covering is mandatory. Free entry.",
    emergency_numbers: {
      police: "100",
      ambulance: "108",
      fire: "101",
      tourist_police: "1363",
    },
  },
]

export default function LandmarkDetailPage({
  params,
}: {
  params: { id: string }
}) {
  // Find the landmark with the given ID
  const landmark = mockLandmarks.find((l) => l.id === params.id) || mockLandmarks[0]

  // Get nearby landmarks (excluding the current one)
  const nearbyLandmarks = mockLandmarks.filter((l) => l.id !== params.id)

  return (
    <div>
      <div
        className="landmark-header relative h-[50vh] flex items-end"
        style={{ backgroundImage: `url(${landmark.image_path})` }}
      >
        <div className="container relative z-10 pb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{landmark.name}</h1>
          <p className="text-xl text-white/90 mb-4">{landmark.location}</p>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500 hover:bg-green-600">Popularity: {landmark.popularity}/5</Badge>
            <SaveLandmarkButton landmarkId={landmark.id} />
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">About {landmark.name}</h2>
                <p className="mb-6 leading-relaxed">{landmark.description}</p>

                {landmark.guide_info && (
                  <div className="bg-primary/5 border-l-4 border-primary p-4 rounded mb-6">
                    <h3 className="flex items-center text-lg font-bold mb-2">
                      <Info className="mr-2 h-5 w-5 text-primary" />
                      Visitor Information
                    </h3>
                    <p>{landmark.guide_info}</p>
                  </div>
                )}

                <div className="bg-destructive/5 border-l-4 border-destructive p-4 rounded">
                  <h3 className="flex items-center text-lg font-bold mb-2">
                    <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                    Emergency Information
                  </h3>
                  {landmark.emergency_numbers ? (
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(landmark.emergency_numbers).map(([service, number]) => (
                        <div key={service} className="flex items-center justify-between">
                          <span className="capitalize">{service.replace("_", " ")}:</span>
                          <a href={`tel:${number}`} className="text-destructive hover:underline flex items-center">
                            <Phone className="mr-1 h-4 w-4" />
                            {number}
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No emergency information available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Location</h3>
                <div className="rounded mb-4 overflow-hidden">
                  {landmark.id === "1" && landmark.map_image ? (
                    <Image
                      src={landmark.map_image || "/placeholder.svg"}
                      alt={`Map of ${landmark.name}`}
                      width={400}
                      height={300}
                      className="w-full h-auto"
                    />
                  ) : (
                    <div className="bg-muted h-48 flex items-center justify-center">
                      <MapPin className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <p className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {landmark.location}
                </p>
                {landmark.coordinates && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Coordinates: {landmark.coordinates.lat.toFixed(4)}, {landmark.coordinates.lng.toFixed(4)}
                  </p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Add to Your Trip</h3>
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link href={`/landmark/${landmark.id}/directions`}>Get Directions</Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Nearby Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbyLandmarks.map((nearby) => (
              <Card key={nearby.id} className="overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-48">
                  <Image
                    src={nearby.image_path || "/placeholder.svg?height=200&width=400"}
                    alt={nearby.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{nearby.name}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {nearby.popularity}/5
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {nearby.description.length > 100
                      ? `${nearby.description.substring(0, 100)}...`
                      : nearby.description}
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/landmark/${nearby.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
