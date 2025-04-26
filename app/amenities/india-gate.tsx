import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Star, ExternalLink } from "lucide-react"
import Link from "next/link"

export function IndiaGateAmenities() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Hotels Near India Gate</CardTitle>
          <CardDescription>Compare prices and amenities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">The Lalit New Delhi</h3>
                  <div className="flex items-center text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">2.5km from India Gate</p>
                </div>
                <p className="font-bold">₹12,000/night</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Le Meridien New Delhi</h3>
                  <div className="flex items-center text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">1.8km from India Gate</p>
                </div>
                <p className="font-bold">₹14,500/night</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">The Imperial New Delhi</h3>
                  <div className="flex items-center text-amber-500 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">3km from India Gate</p>
                </div>
                <p className="font-bold">₹18,000/night</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="https://www.booking.com/landmark/in/india-gate.html" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              View All Hotels
            </Link>
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Restaurants Near India Gate</CardTitle>
          <CardDescription>Popular dining options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Pandara Road Food Street</h3>
                  <p className="text-sm text-muted-foreground">North Indian, Street Food</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">12:00 PM - 12:00 AM</span>
                  </div>
                </div>
                <p className="font-bold">₹800 for two</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">United Coffee House</h3>
                  <p className="text-sm text-muted-foreground">Multi-cuisine, Classic</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">10:00 AM - 11:30 PM</span>
                  </div>
                </div>
                <p className="font-bold">₹2,000 for two</p>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold">Connaught Place Restaurants</h3>
                  <p className="text-sm text-muted-foreground">Various Cuisines</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-4 w-4" />
                    <span className="text-xs">11:00 AM - 11:00 PM</span>
                  </div>
                </div>
                <p className="font-bold">₹1,500 for two</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="https://www.zomato.com/ncr/india-gate-delhi-restaurants" target="_blank" rel="noopener noreferrer">
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
              <h3 className="font-semibold">National Gallery of Modern Art</h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Jaipur House, Near India Gate</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">10:00 AM - 5:00 PM (Closed on Mondays)</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Metro Station</h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Central Secretariat, 1km away</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm">6:00 AM - 11:00 PM</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold">Public Toilets</h3>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Near Children's Park, India Gate</span>
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
            <Link href="https://delhitourism.gov.in/delhitourism/tourist_place/india_gate.jsp" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              More Information
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
