"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, Upload, ImageIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function SearchByImagePage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientSupabaseClient()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive",
      })
      return
    }

    setSelectedImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedImage) return

    setIsLoading(true)

    try {
      // In a real app, we would upload the image and process it with AI
      // For demo purposes, we'll just redirect to a random landmark
      const { data: landmarks } = await supabase
        .from("landmarks")
        .select("id")
        .order("popularity", { ascending: false })
        .limit(10)

      if (landmarks && landmarks.length > 0) {
        // Simulate AI processing time
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Pick a random landmark
        const randomIndex = Math.floor(Math.random() * landmarks.length)
        const landmarkId = landmarks[randomIndex].id

        // Add to search history if user is logged in
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session?.user) {
          await supabase.from("search_history").insert({
            user_id: session.user.id,
            search_type: "image",
            result_landmark_id: landmarkId,
          })
        }

        router.push(`/landmark/${landmarkId}`)
      } else {
        throw new Error("No landmarks found")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process image. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-16 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">Identify a Landmark</h1>
      <p className="text-center text-muted-foreground mb-8">
        Upload an image of an Indian landmark to identify it and get detailed information
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Upload an Image</CardTitle>
          <CardDescription>Take a photo of a landmark or upload an existing image</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">Select Image</Label>
              <Input id="image" type="file" accept="image/*" onChange={handleImageChange} disabled={isLoading} />
              <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, GIF (Max size: 5MB)</p>
            </div>

            {preview && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="relative h-64 w-full overflow-hidden rounded-md border">
                  <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading || !selectedImage}>
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  <Camera className="mr-2 h-4 w-4" />
                  Identify Landmark
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Upload</h3>
            <p className="text-sm text-muted-foreground">Upload a photo of a landmark you want to identify</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Process</h3>
            <p className="text-sm text-muted-foreground">Our AI analyzes the image to identify the landmark</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold mb-2">Discover</h3>
            <p className="text-sm text-muted-foreground">Get detailed information about the landmark</p>
          </div>
        </div>
      </div>
    </div>
  )
}
