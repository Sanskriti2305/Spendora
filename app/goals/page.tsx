"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Target } from "lucide-react"

const goals = [
  { name: "iPhone 16", target: 100000, saved: 42500, deadline: "Dec 2025", priority: "high" },
  { name: "Vacation Trip", target: 50000, saved: 18750, deadline: "Mar 2026", priority: "medium" },
  { name: "Emergency Fund", target: 200000, saved: 125000, deadline: "Dec 2026", priority: "high" },
  { name: "Gaming PC", target: 150000, saved: 45000, deadline: "Jun 2026", priority: "low" },
]

export default function GoalsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Goal-Based Savings Tracker</h1>
            <p className="text-foreground/70">Set goals and track your progress</p>
          </div>

          <div className="space-y-6">
            {goals.map((goal, i) => {
              const progress = (goal.saved / goal.target) * 100
              const remaining = goal.target - goal.saved
              const priorityColor =
                goal.priority === "high"
                  ? "text-red-600"
                  : goal.priority === "medium"
                    ? "text-orange-600"
                    : "text-blue-600"

              return (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-fintech">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-popover-foreground mb-2">{goal.name}</h3>
                      <div className="flex gap-4 text-sm text-popover-foreground/60">
                        <span>Target: ₹{goal.target.toLocaleString()}</span>
                        <span>Deadline: {goal.deadline}</span>
                        <span className={`font-semibold ${priorityColor}`}>
                          Priority: {goal.priority.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <Target className="w-6 h-6 text-primary" />
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-popover-foreground/70">Progress</span>
                      <span className="font-semibold text-popover-foreground">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="bg-muted rounded-full h-4 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-full transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-foreground/60 mb-1">Saved</p>
                      <p className="font-bold text-primary">₹{goal.saved.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-foreground/60 mb-1">Remaining</p>
                      <p className="font-bold text-orange-600">₹{remaining.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-foreground/60 mb-1">Monthly Target</p>
                      <p className="font-bold text-accent">₹{(remaining / 3).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
