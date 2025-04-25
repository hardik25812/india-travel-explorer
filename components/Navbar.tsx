"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSupabase } from "./SupabaseProvider"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { MapPin, Camera, Compass, User, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const { user, signOut } = useSupabase()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Journey Junction</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden p-2" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-rose-500 to-indigo-700 p-6 no-underline outline-none focus:shadow-md"
                        href="/search"
                      >
                        <div className="mt-4 mb-2 text-lg font-medium text-white">Discover India</div>
                        <p className="text-sm leading-tight text-white/90">
                          Explore the rich heritage and breathtaking landscapes of India
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <Link href="/search/image" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4" />
                          <div className="text-sm font-medium leading-none">Image Search</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Identify landmarks by uploading images
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/search/name" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Compass className="h-4 w-4" />
                          <div className="text-sm font-medium leading-none">Name Search</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Find landmarks by name or location
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link href="/location" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <div className="text-sm font-medium leading-none">Location Sharing</div>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Share your location with friends and family
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/emergency" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Emergency</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">
                  <User className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="outline" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
            <nav className="container py-6">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/"
                    className={cn("block py-2 text-lg", pathname === "/" ? "font-bold text-primary" : "")}
                    onClick={toggleMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search"
                    className={cn("block py-2 text-lg", pathname === "/search" ? "font-bold text-primary" : "")}
                    onClick={toggleMenu}
                  >
                    Search
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search/image"
                    className={cn("block py-2 text-lg", pathname === "/search/image" ? "font-bold text-primary" : "")}
                    onClick={toggleMenu}
                  >
                    Image Search
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search/name"
                    className={cn("block py-2 text-lg", pathname === "/search/name" ? "font-bold text-primary" : "")}
                    onClick={toggleMenu}
                  >
                    Name Search
                  </Link>
                </li>
                <li>
                  <Link
                    href="/location"
                    className={cn("block py-2 text-lg", pathname === "/location" ? "font-bold text-primary" : "")}
                    onClick={toggleMenu}
                  >
                    Location Sharing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/emergency"
                    className={cn("block py-2 text-lg", pathname === "/emergency" ? "font-bold text-primary" : "")}
                    onClick={toggleMenu}
                  >
                    Emergency
                  </Link>
                </li>
                <li className="pt-4 border-t">
                  {user ? (
                    <>
                      <Link
                        href="/dashboard"
                        className={cn("block py-2 text-lg", pathname === "/dashboard" ? "font-bold text-primary" : "")}
                        onClick={toggleMenu}
                      >
                        Dashboard
                      </Link>
                      <button
                        className="block py-2 text-lg text-destructive"
                        onClick={() => {
                          signOut()
                          toggleMenu()
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className={cn("block py-2 text-lg", pathname === "/login" ? "font-bold text-primary" : "")}
                        onClick={toggleMenu}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className={cn("block py-2 text-lg", pathname === "/register" ? "font-bold text-primary" : "")}
                        onClick={toggleMenu}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
