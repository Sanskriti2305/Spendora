"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Heart, Zap, Target, AlertCircle, Brain, Users, Leaf, Receipt, Eye, Loader2 } from "lucide-react"
import Link from "next/link"

const API_URL = "http://localhost:8000"

const spendingData = [
  { month: "Jan", actual: 2400, budget: 2400 },
  { month: "Feb", actual: 1398, budget: 2210 },
  { month: "Mar", actual: 2210, budget: 2290 },
  { month: "Apr", actual: 2290, budget: 2000 },
  { month: "May", actual: 2000, budget: 2181 },
]

const COLORS = ["#a7f34a", "#fbbf24", "#ef4444", "#a78bfa", "#06b6d4", "#f97316", "#ec4899", "#14b8a6", "#8b5cf6", "#64748b"]

const features = [
  { icon: Brain, title: "Spending Personality Quiz", desc: "Discover if you're a Saver, Spender, or Balanced", href: "/personality" },
  { icon: Users, title: "Peer Comparison", desc: "See how you compare with similar users anonymously", href: "/peer-comparison" },
  { icon: Zap, title: "Subscription Tracker", desc: "Find and manage recurring subscriptions easily", href: "/subscriptions" },
  { icon: TrendingUp, title: "Financial Health Score", desc: "Track your financial wellness with a 0-100 score", href: "/health-score" },
  { icon: AlertCircle, title: "Smart Alerts & Nudges", desc: "Get warnings before you overspend", href: "/insights" },
  { icon: Heart, title: "Spending Mood Tracker", desc: "Correlate emotions with spending habits", href: "/mood-tracker" },
  { icon: Leaf, title: "Carbon Footprint", desc: "See the environmental impact of your purchases", href: "/carbon-footprint" },
  { icon: Receipt, title: "Receipt Scanner", desc: "Upload receipts and auto-categorize items", href: "/receipt-scanner" },
  { icon: Target, title: "Savings Goals", desc: "Set goals and track progress toward them", href: "/goals" },
  { icon: Eye, title: "Explainability Dashboard", desc: "Understand why transactions are categorized", href: "/explainability" },
]

export default function Home() {
  const [apiStatus, setApiStatus] = useState<"loading" | "online" | "offline">("loading")
  const [categories, setCategories] = useState<string[]>([])
  const [categoryData, setCategoryData] = useState([
    { name: "Food & Dining", value: 35 },
    { name: "Shopping", value: 25 },
    { name: "Transport", value: 20 },
    { name: "Entertainment", value: 15 },
    { name: "Others", value: 5 },
  ])

  useEffect(() => {
    // Check API status
    const checkAPI = async () => {
      try {
        const response = await fetch(`${API_URL}/`)
        if (response.ok) {
          setApiStatus("online")
          
          // Fetch categories
          const catResponse = await fetch(`${API_URL}/categories`)
          if (catResponse.ok) {
            const data = await catResponse.json()
            setCategories(data.categories)
            
            // Create sample category data for pie chart
            const sampleData = data.categories.slice(0, 5).map((cat: string, idx: number) => ({
              name: cat,
              value: Math.floor(Math.random() * 30) + 10
            }))
            setCategoryData(sampleData)
          }
        }
      } catch (error) {
        setApiStatus("offline")
      }
    }
    checkAPI()
  }, [])

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* API Status Banner */}
      {apiStatus === "offline" && (
        <div className="bg-red-500/10 border-b border-red-500/30 px-4 py-2 text-center">
          <span className="text-red-500 text-sm">
            ⚠️ Backend API is offline. Run <code className="bg-red-500/20 px-1 rounded">python api.py</code> to enable AI features.
          </span>
        </div>
      )}
      {apiStatus === "online" && (
        <div className="bg-green-500/10 border-b border-green-500/30 px-4 py-2 text-center">
          <span className="text-green-500 text-sm">
            ✅ AI Model Connected - {categories.length} categories available
          </span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src="https://cdn.pixabay.com/video/2020/12/14/59134-491926072_large.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold badge-glow border border-primary/30">
                AI-Powered Financial Insights
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 gradient-text">Understand Your Spending Habits</h1>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              Spendora uses DistilBERT AI to automatically categorize transactions, analyze spending patterns, and help you make
              smarter financial decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/categorise"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 ease-out"
              >
                Start Categorizing
              </Link>
              <Link
                href="/upload"
                className="bg-card text-foreground px-8 py-3 rounded-lg font-semibold border-2 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 ease-out"
              >
                Upload Statement
              </Link>
            </div>
          </div>

          {/* Featured Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-16">
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border card-hover">
              <div className="text-sm text-foreground/60 mb-2">Model Status</div>
              <div className="text-2xl font-bold text-primary flex items-center gap-2">
                {apiStatus === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                {apiStatus === "online" && "🟢 Online"}
                {apiStatus === "offline" && "🔴 Offline"}
              </div>
              <div className="text-sm text-muted-foreground mt-2">DistilBERT Model</div>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border card-hover">
              <div className="text-sm text-foreground/60 mb-2">Categories</div>
              <div className="text-3xl font-bold text-accent">{categories.length || 10}</div>
              <div className="text-sm text-green-400 mt-2">✓ All Active</div>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border card-hover">
              <div className="text-sm text-foreground/60 mb-2">Model Accuracy</div>
              <div className="text-3xl font-bold text-primary">90%</div>
              <div className="text-sm text-green-400 mt-2">📈 Macro F1 Score</div>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-lg border border-border card-hover">
              <div className="text-sm text-foreground/60 mb-2">Processing</div>
              <div className="text-3xl font-bold text-green-400">Real-time</div>
              <div className="text-sm text-green-400 mt-2">⚡ Instant Results</div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid lg:grid-cols-2 gap-6 mb-16">
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Spending Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#a7f34a" strokeWidth={2} />
                  <Line type="monotone" dataKey="budget" stroke="#6b7280" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Categories Supported</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Features Grid */}
          <div>
            <h2 className="text-3xl font-bold text-center mb-4 gradient-text">10 Unique Features</h2>
            <p className="text-center text-foreground/60 mb-12">Everything you need to master your finances</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <Link
                    key={idx}
                    href={feature.href}
                    className="bg-card rounded-2xl p-6 shadow-lg border border-border card-hover text-center block"
                  >
                    <div className="flex justify-center mb-3">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-foreground/60">{feature.desc}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}