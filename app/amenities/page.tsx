"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Star, Utensils, Building, ExternalLink } from "lucide-react"
import Link from "next/link"
import { TajMahalAmenities } from "./taj-mahal"
import { IndiaGateAmenities } from "./india-gate"
import { GoldenTempleAmenities } from "./golden-temple"

export default function AmenitiesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Nearby Amenities</h1>
      <p className="text-muted-foreground mb-8">
        Find and compare hotels, restaurants, and other amenities near India's most popular landmarks.
      </p>
      
      <Tabs defaultValue="taj-mahal" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="taj-mahal">Taj Mahal</TabsTrigger>
          <TabsTrigger value="india-gate">India Gate</TabsTrigger>
          <TabsTrigger value="golden-temple">Golden Temple</TabsTrigger>
        </TabsList>
        
        <TabsContent value="taj-mahal">
          <TajMahalAmenities />
        </TabsContent>
        
        <TabsContent value="india-gate">
          <IndiaGateAmenities />
        </TabsContent>
        
        <TabsContent value="golden-temple">
          <GoldenTempleAmenities />
        </TabsContent>
      </Tabs>
    </div>
  )
}
