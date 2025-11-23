"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Users, TrendingDown, Award } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

const comparisonData = [
  { category: "Food", you: 35, peers: 28, budget: 30 },
  { category: "Shopping", you: 25, peers: 22, budget: 20 },
  { category: "Transport", you: 20, peers: 18, budget: 15 },
  { category: "Entertainment", you: 15, peers: 20, budget: 25 },
  { category: "Utilities", you: 5, peers: 12, budget: 10 },
]

const radarData = [
  { category: "Savings", you: 30, peers: 50 },
  { category: "Shopping", you: 25, peers: 22 },
  { category: "Dining", you: 35, peers: 28 },
  { category: "Transport", you: 20, peers: 18 },
  { category: "Entertainment", you: 15, peers: 20 },
]

export default function PeerComparisonPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Peer Comparison (Anonymous)</h1>
            <p className="text-foreground/70">Compare your spending with similar users in your age/income bracket</p>
          </div>

          {/* Comparison Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-fintech">
              <Users className="w-10 h-10 text-primary mb-4" />
              <p className="text-foreground/60 text-sm mb-2">Peer Group</p>
              <p className="text-2xl font-bold text-foreground">Ages 25-35, ₹30-50L/yr</p>
              <p className="text-sm text-foreground/60 mt-2">~14,283 users</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-fintech">
              <TrendingDown className="w-10 h-10 text-orange-600 mb-4" />
              <p className="text-foreground/60 text-sm mb-2">Your vs Peers</p>
              <p className="text-2xl font-bold text-orange-600">20% Higher Spending</p>
              <p className="text-sm text-orange-600 mt-2">On food & dining</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-fintech">
              <Award className="w-10 h-10 text-green-600 mb-4" />
              <p className="text-foreground/60 text-sm mb-2">Your Strength</p>
              <p className="text-2xl font-bold text-green-600">20% Better Savings</p>
              <p className="text-sm text-green-600 mt-2">Than peer average</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-fintech">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Spending Breakdown Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="category" type="category" stroke="#6b7280" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="you" fill="#8b5cf6" />
                  <Bar dataKey="peers" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-fintech">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Spending Profile</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="category" stroke="#6b7280" />
                  <PolarRadiusAxis stroke="#6b7280" />
                  <Radar name="You" dataKey="you" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  <Radar name="Peers" dataKey="peers" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-6">💡 Insights & Recommendations</h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white rounded-lg border-l-4 border-orange-500">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="font-semibold text-foreground">Food Spending is Higher</p>
                  <p className="text-sm text-foreground/60">
                    You spend 20% more on food & dining. Consider meal prep to save ₹2,000/month
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-lg border-l-4 border-green-500">
                <span className="text-2xl">✨</span>
                <div>
                  <p className="font-semibold text-foreground">Better at Saving</p>
                  <p className="text-sm text-foreground/60">You save 20% more than peers. Keep it up!</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-lg border-l-4 border-blue-500">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="font-semibold text-foreground">Entertainment Gap</p>
                  <p className="text-sm text-foreground/60">You spend 25% less on entertainment. Good control!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
