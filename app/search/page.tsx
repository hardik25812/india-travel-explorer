import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Compass } from "lucide-react"

export default function SearchPage() {
  return (
    <div className="container py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-12">Find Your Next Destination</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/search/name" className="block">
          <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Compass className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Search by Name</h2>
              <p className="text-muted-foreground">
                Search for landmarks by name or location. Find detailed information about famous places in India.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/search/image" className="block">
          <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Camera className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Search by Image</h2>
              <p className="text-muted-foreground">
                Upload an image to identify a landmark. Our AI will recognize famous Indian landmarks from your photos.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Choose Search Method</h3>
            <p className="text-muted-foreground">Select whether you want to search by name or upload an image</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Enter Details</h3>
            <p className="text-muted-foreground">Type a name or upload your photo of an Indian landmark</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Discover</h3>
            <p className="text-muted-foreground">Get detailed information about the landmark and plan your visit</p>
          </div>
        </div>
      </div>
    </div>
  )
}
