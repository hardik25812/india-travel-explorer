import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Star, ExternalLink } from "lucide-react"
import Link from "next/link"

export function GoldenTempleAmenities() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Hotels Near Golden Temple</CardTitle>
          <CardDescription>Compare prices and amenities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Hyatt Amritsar</h3>
                  <div className="flex items-center text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">3.5km from Golden Temple</p>
                </div>
                <p className="font-bold">₹8,500/night</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Golden Tulip Amritsar</h3>
                  <div className="flex items-center text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">2km from Golden Temple</p>
                </div>
                <p className="font-bold">₹5,500/night</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Hotel Hong Kong Inn</h3>
                  <div className="flex items-center text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                    <Star className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">500m from Golden Temple</p>
                </div>
                <p className="font-bold">₹3,000/night</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="https://www.booking.com/landmark/in/golden-temple.html" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View All Hotels
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Restaurants Near Golden Temple</CardTitle>
          <CardDescription>Popular dining options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Bharawan Da Dhaba</h3>
                  <p className="text-sm text-muted-foreground">Punjabi, Vegetarian</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">8:00 AM - 11:00 PM</span>
                  </div>
                </div>
                <p className="font-bold">₹600 for two</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Kesar Da Dhaba</h3>
                  <p className="text-sm text-muted-foreground">Punjabi, Vegetarian</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">11:00 AM - 11:00 PM</span>
                  </div>
                </div>
                <p className="font-bold">₹700 for two</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Brothers' Dhaba</h3>
                  <p className="text-sm text-muted-foreground">Punjabi, North Indian</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">7:00 AM - 11:30 PM</span>
                  </div>
                </div>
                <p className="font-bold">₹650 for two</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="https://www.zomato.com/amritsar/restaurants-near-golden-temple" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View All Restaurants
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Other Amenities</CardTitle>
          <CardDescription>Useful services nearby</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Free Accommodation (Guru Ram Das Niwas)</h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Inside Golden Temple Complex</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">24 hours</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Langar (Free Community Kitchen)</h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Inside Golden Temple Complex</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">24 hours</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Jallianwala Bagh Memorial</h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">400m from Golden Temple</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">6:30 AM - 7:30 PM</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="https://www.goldentempleamritsar.org/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              More Information
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
