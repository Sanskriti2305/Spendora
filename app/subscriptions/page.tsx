"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Trash2, AlertTriangle } from "lucide-react"
import { useState } from "react"

const subscriptions = [
  { name: "Netflix", cost: 199, frequency: "Monthly", used: true, lastUsed: "Today", annual: 2388 },
  { name: "Spotify", cost: 119, frequency: "Monthly", used: false, lastUsed: "30 days ago", annual: 1428 },
  { name: "Amazon Prime", cost: 1499, frequency: "Yearly", used: true, lastUsed: "3 days ago", annual: 1499 },
  { name: "Disney+", cost: 149, frequency: "Monthly", used: false, lastUsed: "2 months ago", annual: 1788 },
  { name: "YouTube Premium", cost: 99, frequency: "Monthly", used: true, lastUsed: "Today", annual: 1188 },
]

export default function SubscriptionsPage() {
  const [dismissedSubscriptions, setDismissedSubscriptions] = useState<string[]>([])

  const activeSubscriptions = subscriptions.filter((s) => !dismissedSubscriptions.includes(s.name))
  const totalAnnualCost = activeSubscriptions.reduce((sum, s) => sum + s.annual, 0)
  const unusedSubscriptions = activeSubscriptions.filter((s) => !s.used)

  const handleDismiss = (name: string) => {
    setDismissedSubscriptions([...dismissedSubscriptions, name])
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Subscription Tracker & Killer</h1>
            <p className="text-fpopover-oreground/70">Track recurring subscriptions and save money</p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-fintech">
              <p className="text-popover-foreground/60 text-sm mb-2">Active Subscriptions</p>
              <p className="text-3xl font-bold text-primary">{activeSubscriptions.length}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-fintech">
              <p className="text-popover-foreground/60 text-sm mb-2">Monthly Cost</p>
              <p className="text-3xl font-bold text-accent">
                ₹{activeSubscriptions.reduce((sum, s) => sum + (s.frequency === "Monthly" ? s.cost : s.cost / 12), 0).toFixed(2)}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-fintech">
              <p className="text-popover-foreground/60 text-sm mb-2">Annual Cost</p>
              <p className="text-3xl font-bold text-orange-600">₹{totalAnnualCost}</p>
            </div>
          </div>

          {/* Unused Warning */}
          {unusedSubscriptions.length > 0 && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 mb-12">
              <div className="flex gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-orange-900">Unused Subscriptions</h3>
                  <p className="text-orange-700 text-sm">
                    You have {unusedSubscriptions.length} subscription(s) you haven't used recently
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Subscriptions List */}
          <div className="space-y-4">
            {activeSubscriptions.map((sub, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-fintech hover:shadow-lg transition-all duration-300 ease-out"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg text-popover-foreground">{sub.name}</h3>
                      {!sub.used && (
                        <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded">
                          UNUSED
                        </span>
                      )}
                      {sub.used && (
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <p className="text-popover-foreground/60 text-sm mb-3">Last used: {sub.lastUsed}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-popover-foreground/70">
                        ₹{sub.cost}/{sub.frequency}
                      </span>
                      <span className="text-primary font-semibold">₹{sub.annual}/year</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDismiss(sub.name)}
                    className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-all duration-300 ease-out"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
