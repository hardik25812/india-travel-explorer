"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Compass, Search } from "lucide-react"

export default function SearchByNamePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsLoading(true)
      router.push(`/search/results?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="container py-16 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Search by Name</h1>
      <p className="text-center text-muted-foreground mb-8">
        Enter the name of a landmark or location in India to find detailed information
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Find a Landmark</CardTitle>
          <CardDescription>Search for famous places, monuments, or natural wonders</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch}>
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="e.g. Taj Mahal, India Gate, Golden Temple..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !searchQuery.trim()}>
                {isLoading ? "Searching..." : "Search"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            <Compass className="inline h-4 w-4 mr-1" />
            Discover India's rich heritage and culture
          </p>
        </CardFooter>
      </Card>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Popular Searches</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Taj Mahal", "India Gate", "Golden Temple", "Qutub Minar", "Hawa Mahal", "Gateway of India"].map(
            (place) => (
              <Button
                key={place}
                variant="outline"
                className="justify-start"
                onClick={() => {
                  setSearchQuery(place)
                  router.push(`/search/results?q=${encodeURIComponent(place)}`)
                }}
              >
                <Search className="mr-2 h-4 w-4" />
                {place}
              </Button>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
