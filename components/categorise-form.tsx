"use client"

import type React from "react"

import { useState } from "react"
import { BarChart3, Sparkles, Loader2 } from "lucide-react"
import { CategoryBadge } from "./category-badge"
import { TokenPill } from "./token-pill"

// API URL - Change this when deploying
const API_URL = "http://localhost:8000"

interface PredictionResult {
  transaction: string
  category: string
  confidence: number
  all_scores: Record<string, number>
}

interface ExplanationResult {
  prediction: PredictionResult
  key_words: string[]
  explanation: string
}

export function CategoriseForm() {
  const [input, setInput] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Real data from API
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [explanation, setExplanation] = useState<ExplanationResult | null>(null)
  const [topCategories, setTopCategories] = useState<{category: string, confidence: number}[]>([])
  const [tokens, setTokens] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setError(null)
    setSubmitted(false)

    try {
      // Call prediction API
      const predictResponse = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      })

      if (!predictResponse.ok) {
        throw new Error("Failed to get prediction")
      }

      const predictData: PredictionResult = await predictResponse.json()
      setPrediction(predictData)

      // Get top 3 categories from all_scores
      const sortedCategories = Object.entries(predictData.all_scores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 3)
        .map(([category, confidence]) => ({ category, confidence }))
      setTopCategories(sortedCategories)

      // Call explanation API
      const explainResponse = await fetch(`${API_URL}/explain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      })

      if (explainResponse.ok) {
        const explainData: ExplanationResult = await explainResponse.json()
        setExplanation(explainData)
        
        // Set tokens from input + highlighted keywords
        const inputTokens = input.split(/\s+/)
        setTokens(inputTokens)
      }

      setSubmitted(true)
    } catch (err) {
      setError("Failed to connect to API. Make sure the Python backend is running on localhost:8000")
      console.error("API Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl w-full space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Categorise a Single Transaction</h2>
          <p className="text-muted-foreground">Enter a transaction description to see instant AI categorization</p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: Starbucks Andheri 230rs"
              className="w-full px-6 py-4 rounded-lg border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 ease-out text-lg"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary text-primary-foreground hover:shadow-lg transition-all duration-300 ease-out disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-all duration-300 ease-out disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Categorise Transaction"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-500 text-sm">
            <p className="font-medium">⚠️ Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Results Card */}
        {submitted && prediction && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Category Badge */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Predicted Category
              </h3>
              <CategoryBadge category={prediction.category} confidence={prediction.confidence} />

              {/* Confidence Meter */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Confidence Score</span>
                  <span className="font-semibold text-foreground">{prediction.confidence}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" 
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Top Highlighted Tokens</h3>
              <div className="flex flex-wrap gap-2">
                {tokens.map((token, idx) => (
                  <TokenPill 
                    key={idx} 
                    text={token} 
                    highlight={explanation?.key_words?.some(kw => 
                      token.toLowerCase().includes(kw.toLowerCase())
                    ) || false} 
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                {explanation?.explanation || 
                  `The model identified key patterns in "${input}" to classify it as ${prediction.category}.`}
              </p>
            </div>

            {/* Alternative Categories */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-foreground">Other Possible Categories</h3>
              <div className="space-y-3">
                {topCategories.slice(1).map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CategoryBadge category={item.category} confidence={item.confidence} size="sm" />
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">{item.confidence}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Helper Text */}
        {!submitted && !loading && (
          <div className="bg-secondary/50 border border-secondary rounded-lg p-4 text-sm text-foreground">
            <p className="font-medium mb-2">💡 Try these examples:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• "Starbucks Coffee 350 INR"</li>
              <li>• "Uber ride 180 INR"</li>
              <li>• "Amazon Shopping 2500"</li>
              <li>• "Netflix subscription 499"</li>
              <li>• "HP Petrol 2000"</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}