"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "./SupabaseProvider"
import { useRouter } from "next/navigation"

export default function SaveLandmarkButton({ landmarkId }: { landmarkId: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useSupabase()
  const { toast } = useToast()
  const router = useRouter()

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to save this landmark",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setIsLoading(true)

    try {
      // For demo purposes, simulate saving the landmark
      setTimeout(() => {
        toast({
          title: "Landmark saved",
          description: "This landmark has been added to your saved places",
        })
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save landmark. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="secondary"
      className="bg-white/20 backdrop-blur-sm hover:bg-white/30"
      onClick={handleSave}
      disabled={isLoading}
    >
      <Bookmark className="mr-2 h-4 w-4" />
      {isLoading ? "Saving..." : "Save"}
    </Button>
  )
}
