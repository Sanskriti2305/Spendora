"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/categorise", label: "Categorise" },
    { href: "/upload", label: "Upload" },
    { href: "/personality", label: "Quiz" },
    { href: "/health-score", label: "Health Score" },
    { href: "/subscriptions", label: "Subscriptions" },
    { href: "/goals", label: "Goals" },
    { href: "/insights", label: "Insights" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-lg transition-all duration-300 ease-out group-hover:shadow-primary/50">
              <Zap className="w-5 h-5 text-background" />
            </div>
            <span className="font-bold text-lg gradient-text">Spendora</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-out ${
                  isActive(item.href) ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
