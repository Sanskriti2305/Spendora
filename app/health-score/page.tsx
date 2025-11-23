"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

const scoreData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 72 },
  { month: "Apr", score: 78 },
  { month: "May", score: 78 },
]

const scoreFactors = [
  { name: "Savings Ratio", value: 35, max: 100 },
  { name: "Budget Adherence", value: 28, max: 100 },
  { name: "Debt Payments", value: 15, max: 100 },
]

export default function HealthScorePage() {
  const currentScore = 78

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Financial Health Score</h1>
            <p className="text-foreground/70">Track your financial wellness like a credit score</p>
          </div>

          {/* Main Score Card */}
          <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-12 text-white shadow-fintech mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-white/80 text-lg">Your Financial Health Score</p>
                <div className="text-6xl font-bold">{currentScore}/100</div>
              </div>
              <TrendingUp className="w-20 h-20 opacity-50" />
            </div>
            <p className="text-white/90">
              Your score is <span className="font-bold">improving</span> - keep up the good habits!
            </p>
          </div>

          {/* Score Trend */}
          <div className="bg-white rounded-2xl p-8 shadow-fintech mb-12">
            <h3 className="text-xl font-bold mb-6 text-popover-foreground">Score Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={scoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Score Factors */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {scoreFactors.map((factor, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-fintech">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-popover-foreground">{factor.name}</h3>
                  <span className="text-2xl font-bold text-primary">{factor.value}</span>
                </div>
                <div className="bg-muted rounded-full h-3 overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: `${(factor.value / factor.max) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
              <div className="flex gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <h3 className="font-semibold text-green-900">Keep Doing Well</h3>
              </div>
              <ul className="space-y-2 text-green-800 text-sm">
                <li>✓ Your savings ratio is consistent</li>
                <li>✓ Monthly debt payments on track</li>
                <li>✓ No unusual spending detected</li>
              </ul>
            </div>

            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
              <div className="flex gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                <h3 className="font-semibold text-orange-900">Improve These</h3>
              </div>
              <ul className="space-y-2 text-orange-800 text-sm">
                <li>• Increase savings by 5% to boost score</li>
                <li>• Review subscriptions (5 active)</li>
                <li>• Set spending limit for dining</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
