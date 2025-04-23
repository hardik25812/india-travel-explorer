import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, MapPin, Phone } from "lucide-react"

// Mock data for popular landmarks
const popularLandmarks = [
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
    description: "A war memorial located astride the Rajpath, on the eastern edge of the ceremonial axis of New Delhi.",
    image_path: "/images/india-gate.jpg",
    popularity: 4,
  },
  {
    id: "3",
    name: "Golden Temple",
    description: "A gurdwara located in the city of Amritsar, Punjab. It is the preeminent spiritual site of Sikhism.",
    image_path: "/images/golden-temple.jpg",
    popularity: 5,
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="hero-section relative h-[70vh] flex items-center justify-center">
        <div className="container relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover India's Wonders</h1>
          <p className="text-xl md:text-2xl mb-8">Explore the rich heritage and breathtaking landscapes of India</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/search">Explore Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm" asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 container">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="transition-all hover:shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Camera className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Image Recognition</h3>
              <p className="text-muted-foreground">
                Upload images to identify famous Indian landmarks and get detailed information.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Location Sharing</h3>
              <p className="text-muted-foreground">
                Share your location with friends and family for safety and coordination.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-all hover:shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="mb-4 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Emergency Services</h3>
              <p className="text-muted-foreground">Quick access to emergency contacts and local emergency services.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularLandmarks.map((landmark) => (
              <Card key={landmark.id} className="overflow-hidden transition-all hover:shadow-lg">
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
                    <h3 className="text-xl font-bold">{landmark.name}</h3>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {landmark.popularity}/5
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {landmark.description.length > 100
                      ? `${landmark.description.substring(0, 100)}...`
                      : landmark.description}
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/landmark/${landmark.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 container text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Explore India?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of travelers discovering the beauty and culture of India with our comprehensive travel guide.
        </p>
        <Button size="lg" asChild>
          <Link href="/search">Start Exploring</Link>
        </Button>
      </section>
    </div>
  )
}
