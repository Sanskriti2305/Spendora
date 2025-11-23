"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Leaf, TrendingUp, Award } from "lucide-react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const carbonData = [
  { category: "Food Delivery", co2: 15.3 },
  { category: "Shopping Packages", co2: 8.2 },
  { category: "Ride Sharing", co2: 12.5 },
  { category: "Air Travel", co2: 0 },
  { category: "Groceries", co2: 3.8 },
]

const monthlyEmissions = [
  { month: "Jan", emissions: 45.3 },
  { month: "Feb", emissions: 48.1 },
  { month: "Mar", emissions: 42.7 },
  { month: "Apr", emissions: 39.8 },
  { month: "May", emissions: 35.2 },
]

const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"]

export default function CarbonFootprintPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Carbon Footprint Tracker</h1>
            <p className="text-foreground/70">See the environmental impact of your purchases</p>
          </div>

          {/* Main Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-fintech text-center">
              <Leaf className="w-10 h-10 text-green-600 mx-auto mb-4" />
              <p className="text-foreground/60 text-sm mb-2">This Month</p>
              <p className="text-3xl font-bold text-foreground">35.2 kg CO₂</p>
              <p className="text-sm text-green-600 mt-2">↓ 11.5% improvement</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-fintech text-center">
              <TrendingUp className="w-10 h-10 text-orange-600 mx-auto mb-4" />
              <p className="text-foreground/60 text-sm mb-2">This Year</p>
              <p className="text-3xl font-bold text-foreground">423 kg CO₂</p>
              <p className="text-sm text-orange-600 mt-2">≈ 1 flight</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-fintech text-center">
              <Award className="w-10 h-10 text-primary mx-auto mb-4" />
              <p className="text-foreground/60 text-sm mb-2">Eco Score</p>
              <p className="text-3xl font-bold text-primary">72/100</p>
              <p className="text-sm text-primary mt-2">Good</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-fintech">
              <h3 className="text-lg font-semibold mb-4 text-foreground">CO₂ by Category This Month</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={carbonData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, co2 }) => `${category}: ${co2}kg`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="co2"
                  >
                    {carbonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}kg CO₂`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-fintech">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Monthly Emissions Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyEmissions}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip formatter={(value) => `${value}kg CO₂`} />
                  <Bar dataKey="emissions" fill="#10b981" radius={8} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-green-900 mb-6">🌱 Eco-Friendly Tips</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <span className="text-2xl">🏠</span>
                <div>
                  <p className="font-semibold text-green-900">Cook at Home</p>
                  <p className="text-sm text-green-800">Saves 80% CO₂ vs delivery. Cook at home = ₹8,000/year saved</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">🚴</span>
                <div>
                  <p className="font-semibold text-green-900">Use Public Transport</p>
                  <p className="text-sm text-green-800">Saves 60% CO₂ vs ride-sharing. One month = 12kg CO₂ saved</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">🛍️</span>
                <div>
                  <p className="font-semibold text-green-900">Buy Less, Choose Well</p>
                  <p className="text-sm text-green-800">Fewer packages = less plastic waste and lower emissions</p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl">♻️</span>
                <div>
                  <p className="font-semibold text-green-900">Recycle Responsibly</p>
                  <p className="text-sm text-green-800">Offset 2kg CO₂ per item recycled instead of dumped</p>
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
