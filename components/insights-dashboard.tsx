"use client"

import { BarChart, Award } from "lucide-react"
import { SpendingChart } from "./spending-chart"
import { HealthScore } from "./health-score"
import { SmartSuggestions } from "./smart-suggestions"

export function InsightsDashboard() {
  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Your Spending Analytics</h2>
          <p className="text-muted-foreground">Deep insights into your financial habits</p>
        </div>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Spending Breakdown - Bar Chart */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-fintech">
            <div className="flex items-center gap-2">
              <BarChart className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Spend by Category (₹)</h3>
            </div>
            <SpendingChart />
          </div>

          {/* Health Score */}
          <HealthScore />
        </div>

        {/* Personality Section */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 space-y-4 shadow-fintech">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">Your Spending Personality</h3>
          </div>
          <div className="space-y-3">
            <div className="inline-block px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold">
              💎 Smart Saver
            </div>
            <p className="text-lg text-foreground max-w-2xl">
              You have excellent spending discipline! Your expenses are well-balanced across categories with strong
              control on discretionary spending. Keep up the financial mindfulness!
            </p>
          </div>
        </div>

        {/* Smart Suggestions */}
        <SmartSuggestions />
      </div>
    </div>
  )
}
