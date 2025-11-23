"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Frown, Meh, Smile, HeartIcon } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { useState } from "react"

const moodData = [
  { date: "Mon", mood: 3, spending: 450 },
  { date: "Tue", mood: 4, spending: 320 },
  { date: "Wed", mood: 2, spending: 890 },
  { date: "Thu", mood: 3, spending: 520 },
  { date: "Fri", mood: 2, spending: 1200 },
  { date: "Sat", mood: 4, spending: 380 },
  { date: "Sun", mood: 3, spending: 290 },
]

const moodOptions = [
  { icon: Frown, label: "Very Stressed", value: 1, color: "text-red-600" },
  { icon: Meh, label: "Stressed", value: 2, color: "text-orange-600" },
  { icon: Smile, label: "Neutral", value: 3, color: "text-yellow-600" },
  { icon: Smile, label: "Happy", value: 4, color: "text-green-600" },
  { icon: HeartIcon, label: "Very Happy", value: 5, color: "text-primary" },
]

export default function MoodTrackerPage() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Spending Mood Tracker</h1>
            <p className="text-foreground/70">
              Track emotional state when making purchases to identify spending triggers
            </p>
          </div>

          {/* Mood Input */}
          <div className="bg-white rounded-2xl p-8 shadow-fintech mb-12">
            <h3 className="text-xl font-semibold mb-6 text-foreground">How are you feeling today?</h3>
            <div className="flex gap-4 justify-center flex-wrap">
              {moodOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    onClick={() => setSelectedMood(option.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                      selectedMood === option.value
                        ? "bg-primary text-primary-foreground shadow-lg scale-110"
                        : "bg-muted hover:bg-primary/10"
                    }`}
                  >
                    <Icon className={`w-8 h-8 ${selectedMood !== option.value ? option.color : ""}`} />
                    <span className="text-sm font-semibold">{option.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mood vs Spending Chart */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-fintech">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Mood vs Spending Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} name="Mood Level" />
                  <Line type="monotone" dataKey="spending" stroke="#f59e0b" strokeWidth={2} name="Spending (₹)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-fintech">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Spending by Mood</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={moodData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mood" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip formatter={(value) => `₹${value}`} />
                  <Bar dataKey="spending" radius={8}>
                    {moodData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.mood <= 2 ? "#ef4444" : entry.mood === 3 ? "#f59e0b" : "#10b981"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-orange-900 mb-4">Key Finding</h3>
            <div className="space-y-3 text-orange-900">
              <p className="text-lg font-semibold">You spend 40% more when stressed</p>
              <p className="text-sm opacity-90">
                On Fridays when you're stressed, your average spending jumps to ₹1,200 vs ₹380 on calm days.
              </p>
              <div className="pt-4 flex gap-3">
                <span className="px-4 py-2 bg-orange-200 rounded-lg font-semibold">💡 Tip:</span>
                <span className="pt-2">Try taking a 15-minute walk before making purchases when stressed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
