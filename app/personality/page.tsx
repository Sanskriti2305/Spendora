"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Brain } from "lucide-react"

const questions = [
  {
    q: "When you see something you want, what do you do?",
    options: [
      { text: "Research and wait for sales", type: "Saver" },
      { text: "Buy it immediately", type: "Spender" },
      { text: "Consider if I really need it", type: "Balanced" },
    ],
  },
  {
    q: "How often do you check your bank balance?",
    options: [
      { text: "Daily", type: "Saver" },
      { text: "Rarely", type: "Spender" },
      { text: "Weekly", type: "Balanced" },
    ],
  },
  {
    q: "When you get paid, you usually:",
    options: [
      { text: "Save most of it", type: "Saver" },
      { text: "Spend it on fun things", type: "Spender" },
      { text: "Split between saving and spending", type: "Balanced" },
    ],
  },
  {
    q: "Your approach to unplanned purchases:",
    options: [
      { text: "Almost never make them", type: "Saver" },
      { text: "Make them frequently", type: "Impulsive" },
      { text: "Occasional and thoughtful", type: "Balanced" },
    ],
  },
  {
    q: "Financial goals are:",
    options: [
      { text: "Very important, track them closely", type: "Saver" },
      { text: "Not really on my radar", type: "Spender" },
      { text: "Important but flexible", type: "Balanced" },
    ],
  },
]

const personalities = {
  Saver: {
    title: "The Saver",
    emoji: "🏦",
    description:
      "You're financially responsible and think before you spend. You prioritize savings and long-term goals.",
    tips: [
      "You're doing great! Keep maintaining those savings habits",
      "Consider investing your savings to grow wealth faster",
      "Don't be too restrictive - occasional treats are healthy",
    ],
    color: "from-green-400 to-emerald-600",
  },
  Spender: {
    title: "The Spender",
    emoji: "💳",
    description: "You enjoy life and tend to spend on things that make you happy. Money is for enjoying!",
    tips: [
      "Try setting a small savings target - even 10% of income helps",
      "Use the subscription tracker to cut unnecessary recurring costs",
      "Set budget limits for discretionary spending categories",
    ],
    color: "from-orange-400 to-red-600",
  },
  Balanced: {
    title: "The Balanced",
    emoji: "⚖️",
    description: "You have a healthy balance between saving and spending. You're financially conscious but enjoy life.",
    tips: [
      "Your approach is ideal - maintain this balance",
      "Set ambitious savings goals to boost your financial health",
      "Track your mood when spending to identify patterns",
    ],
    color: "from-blue-400 to-cyan-600",
  },
  Impulsive: {
    title: "The Impulsive Spender",
    emoji: "⚡",
    description: "You make spontaneous purchases and follow your emotions. Your spending is tied to your mood.",
    tips: [
      "Try the mood tracker to understand spending triggers",
      "Use the 24-hour rule before making purchases over ₹500",
      "Set up smart alerts to notify you of unusual spending",
    ],
    color: "from-purple-400 to-pink-600",
  },
}

export default function PersonalityPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null)

  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type]
    setAnswers(newAnswers)

    if (step < questions.length - 1) {
      setStep(step + 1)
    } else {
      const counts = newAnswers.reduce((acc: Record<string, number>, type) => {
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {})
      const personality = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
      setResult(personality)
    }
  }

  const handleRetake = () => {
    setStep(0)
    setAnswers([])
    setResult(null)
  }

  if (result) {
    const personality = personalities[result as keyof typeof personalities]
    return (
      <main className="min-h-screen flex flex-col">
        <Navbar />
        <section className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-7xl mb-6">{personality.emoji}</div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">{personality.title}</h1>
            <p className="text-xl text-foreground/70 mb-8">{personality.description}</p>

            <div className={`bg-gradient-to-r ${personality.color} rounded-2xl p-8 text-black mb-12`}>
              <h3 className="text-2xl font-bold mb-4">Your Personalized Tips</h3>
              <ul className="space-y-3 text-left">
                {personality.tips.map((tip, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-bold">→</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handleRetake}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 ease-out"
            >
              Retake Quiz
            </button>
          </div>
        </section>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4 text-foreground">Spending Personality Quiz</h1>
            <p className="text-foreground/70">Discover your financial personality in 5 quick questions</p>
            <div className="mt-6 bg-primary/10 rounded-full h-2 w-full max-w-xs mx-auto overflow-hidden">
              <div
                className="bg-primary h-full transition-all"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-popover-foreground/60 mt-2">
              {step + 1} of {questions.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-fintech">
            <h2 className="text-2xl font-bold mb-8 text-popover-foreground">{questions[step].q}</h2>
            <div className="space-y-3">
              {questions[step].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(option.type)}
                  className="w-full p-4 text-left rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 ease-out font-medium text-popover-foreground"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
