import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Star, ExternalLink } from "lucide-react"
import Link from "next/link"

export function TajMahalAmenities() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Hotels Near Taj Mahal</CardTitle>
          <CardDescription>Compare prices and amenities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">The Oberoi Amarvilas</h3>
                  <div className="flex items-center text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">600m from Taj Mahal</p>
                </div>
                <p className="font-bold">₹30,000/night</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Taj Hotel & Convention Centre</h3>
                  <div className="flex items-center text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">2km from Taj Mahal</p>
                </div>
                <p className="font-bold">₹12,500/night</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Crystal Sarovar Premiere</h3>
                  <div className="flex items-center text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">3.5km from Taj Mahal</p>
                </div>
                <p className="font-bold">₹7,500/night</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="https://www.booking.com/landmark/in/taj-mahal.html" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View All Hotels
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Restaurants Near Taj Mahal</CardTitle>
          <CardDescription>Popular dining options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Pind Balluchi</h3>
                  <p className="text-sm text-muted-foreground">North Indian, Mughlai</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">11:00 AM - 11:00 PM</span>
                  </div>
                </div>
                <p className="font-bold">₹1,200 for two</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Esphahan</h3>
                  <p className="text-sm text-muted-foreground">Fine Dining, Indian</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">7:00 PM - 10:30 PM</span>
                  </div>
                </div>
                <p className="font-bold">₹4,000 for two</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Cafe Coffee Day</h3>
                  <p className="text-sm text-muted-foreground">Cafe, Beverages</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">9:00 AM - 9:00 PM</span>
                  </div>
                </div>
                <p className="font-bold">₹500 for two</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="https://www.zomato.com/agra/restaurants-near-taj-mahal" target="_blank" rel="noopener noreferrer">
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
              <h3 className="font-semibold">Tourist Information Center</h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Eastern Gate, Taj Mahal</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">8:00 AM - 5:00 PM</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Currency Exchange</h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Sadar Bazaar, 1.5km away</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">10:00 AM - 7:00 PM</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Medical Center</h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Apollo Pharmacy, Fatehabad Road</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">24 hours</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="https://www.tajmahal.gov.in/visitor-information.aspx" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              More Information
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
