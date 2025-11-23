"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Zap } from "lucide-react"

const transactionExamples = [
  {
    transaction: "Starbucks, Andheri, 230 rupees",
    category: "Food & Dining",
    confidence: 92,
    tokens: [
      { text: "Starbucks", highlight: true, reason: "Brand name strongly indicates coffee shop" },
      { text: "Andheri", highlight: false, reason: "Location marker" },
      { text: "230 rupees", highlight: true, reason: "Amount typical for a coffee" },
    ],
    reasoning:
      "The model identified 'Starbucks' as a strong coffee brand indicator, combined with a ₹230 amount typical for individual beverages, leading to 'Food & Dining' categorization.",
  },
  {
    transaction: "Uber trip downtown, 12.50 USD",
    category: "Transport",
    confidence: 95,
    tokens: [
      { text: "Uber", highlight: true, reason: "Ride-sharing service indicator" },
      { text: "trip", highlight: true, reason: "Journey/travel keyword" },
      { text: "downtown", highlight: false, reason: "Location context" },
      { text: "12.50 USD", highlight: true, reason: "Amount typical for a ride" },
    ],
    reasoning:
      "Clear transport indicators: 'Uber' is explicitly a ride-sharing service, combined with 'trip' keyword and amount consistent with short-distance rides.",
  },
  {
    transaction: "Amazon Prime Video subscription 14.99/month",
    category: "Entertainment & Subscriptions",
    confidence: 98,
    tokens: [
      { text: "Amazon Prime Video", highlight: true, reason: "Streaming service name" },
      { text: "subscription", highlight: true, reason: "Recurring payment indicator" },
      { text: "14.99/month", highlight: true, reason: "Subscription amount format" },
    ],
    reasoning:
      "Extremely clear: 'Amazon Prime Video' is a well-known streaming service, combined with 'subscription' and '/month' format indicating recurring charges.",
  },
]

export default function ExplainabilityPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Explainability Dashboard</h1>
            <p className="text-foreground/70">Understand WHY transactions are categorized the way they are</p>
          </div>

          {/* Info Card */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-6 mb-12">
            <div className="flex gap-3">
              <Zap className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-purple-900">AI Transparency</p>
                <p className="text-sm text-purple-800">
                  Token highlighting shows which words the AI model used to make categorization decisions. This builds
                  trust and helps you understand the logic.
                </p>
              </div>
            </div>
          </div>

          {/* Transaction Examples */}
          <div className="space-y-8">
            {transactionExamples.map((example, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 shadow-fintech">
                {/* Transaction & Result */}
                <div className="mb-6">
                  <p className="text-sm text-foreground/60 mb-2">Transaction #{idx + 1}</p>
                  <div className="bg-muted p-4 rounded-lg mb-4 font-mono text-sm">"{example.transaction}"</div>

                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-foreground/60 text-sm mb-1">Predicted Category</p>
                      <p className="text-xl font-bold text-primary">{example.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground/60 text-sm mb-1">Confidence</p>
                      <p className="text-2xl font-bold text-accent">{example.confidence}%</p>
                    </div>
                  </div>
                </div>

                {/* Token Highlighting */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900 mb-3">Token Importance Breakdown</p>
                  <div className="flex flex-wrap gap-2">
                    {example.tokens.map((token, i) => (
                      <div key={i} className="group relative">
                        <span
                          className={`px-3 py-2 rounded-lg font-medium transition-all cursor-help ${
                            token.highlight
                              ? "bg-primary text-primary-foreground shadow-md"
                              : "bg-blue-100 text-blue-900"
                          }`}
                        >
                          {token.text}
                        </span>
                        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-foreground text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                          {token.reason}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reasoning */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-semibold text-green-900 mb-2">Model Reasoning</p>
                  <p className="text-sm text-green-800">{example.reasoning}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Why This Matters */}
          <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-indigo-900 mb-6">Why Explainability Matters 👀</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="font-semibold text-indigo-900 mb-2">🤝 Trust</p>
                <p className="text-sm text-indigo-800">
                  Understanding the model's logic builds confidence in categorization. You see exactly why a transaction
                  was categorized.
                </p>
              </div>
              <div>
                <p className="font-semibold text-indigo-900 mb-2">✅ Corrections</p>
                <p className="text-sm text-indigo-800">
                  When you see the reasoning, you can quickly spot errors and correct them, improving AI accuracy over
                  time.
                </p>
              </div>
              <div>
                <p className="font-semibold text-indigo-900 mb-2">🎓 Learning</p>
                <p className="text-sm text-indigo-800">
                  Understand patterns in your spending and how the AI identifies different transaction types.
                </p>
              </div>
              <div>
                <p className="font-semibold text-indigo-900 mb-2">🏆 Transparency</p>
                <p className="text-sm text-indigo-800">
                  Financial AI should be transparent. No black boxes - you know why every categorization happens.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
