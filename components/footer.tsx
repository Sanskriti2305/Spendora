"use client"

import { Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

const navItems = [
  { href: "/categorise", label: "Categorise" },
  { href: "/personality", label: "Personality Quiz" },
  { href: "/health-score", label: "Health Score" },
  { href: "/subscriptions", label: "Subscriptions" },
]

const featureItems = [
  { href: "/mood-tracker", label: "Mood Tracker" },
  { href: "/carbon-footprint", label: "Carbon Footprint" },
  { href: "/peer-comparison", label: "Peer Compare" },
  { href: "/explainability", label: "Explainability" },
]

const socialLinks = [
  { href: "#", icon: Github },
  { href: "#", icon: Twitter },
  { href: "#", icon: Linkedin },
]

const footerLinks = [
  { href: "#", label: "Privacy" },
  { href: "#", label: "Terms" },
  { href: "#", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg gradient-text mb-3">Spendora</h3>
            <p className="text-sm text-foreground/60">AI-powered spending insights for smarter financial decisions.</p>
          </div>

          {/* Product */}
          <div>
            <p className="font-semibold text-foreground mb-4">Product</p>
            <ul className="space-y-2 text-sm text-foreground/60">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary transition-all duration-300 ease-out">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <p className="font-semibold text-foreground mb-4">Features</p>
            <ul className="space-y-2 text-sm text-foreground/60">
              {featureItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary transition-all duration-300 ease-out">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-semibold text-foreground mb-4">Follow Us</p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon
                return (
                  <a
                    href={link.href}
                    className="text-foreground/60 hover:text-primary transition-all duration-300 ease-out"
                    key={`${link.href}-${index}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-foreground/60">
          <p>Built by SlytherCode • Spendora</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            {footerLinks.map((link, index) => (
              <a href={link.href} className="hover:text-primary transition-all duration-300 ease-out" key={`${link.href}-${index}`}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
