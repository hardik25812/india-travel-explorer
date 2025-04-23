import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">India Travel Explorer</h3>
            <p className="text-sm text-muted-foreground">
              Discover the rich heritage and breathtaking landscapes of India with our travel recommendation system.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-foreground transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-muted-foreground hover:text-foreground transition-colors">
                  Emergency
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/search/image" className="text-muted-foreground hover:text-foreground transition-colors">
                  Image Recognition
                </Link>
              </li>
              <li>
                <Link href="/location" className="text-muted-foreground hover:text-foreground transition-colors">
                  Location Sharing
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="text-muted-foreground hover:text-foreground transition-colors">
                  Emergency Services
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Email: info@indiatravelexplorer.com</li>
              <li className="text-muted-foreground">Phone: +91 123 456 7890</li>
              <li className="text-muted-foreground">Address: New Delhi, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} India Travel Explorer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
