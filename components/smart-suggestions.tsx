import { Lightbulb, TrendingDown, Target, AlertCircle } from "lucide-react"

const suggestions = [
  {
    icon: TrendingDown,
    title: "Reduce Food Spending",
    description:
      "You spend too much on food. Try meal prepping and eating at home more often to save ₹400-500 per month.",
    priority: "high",
  },
  {
    icon: Target,
    title: "Shopping Control",
    description:
      "Shopping expenses exceed 18% of your budget. Set a monthly limit and use wish lists to avoid impulse purchases.",
    priority: "medium",
  },
  {
    icon: AlertCircle,
    title: "Entertainment Alert",
    description: "Your entertainment subscriptions total ₹1,200/month. Review and cancel unused services.",
    priority: "low",
  },
  {
    icon: Lightbulb,
    title: "Savings Opportunity",
    description: "By optimizing your spending, you could save ₹2,000-3,000 monthly. Consider an emergency fund.",
    priority: "high",
  },
]

export function SmartSuggestions() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-fintech">
      <h3 className="font-semibold text-foreground text-lg flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-primary" />
        Smart Suggestions
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, idx) => {
          const Icon = suggestion.icon
          const priorityColors = {
            high: "border-red-200 bg-red-50",
            medium: "border-yellow-200 bg-yellow-50",
            low: "border-blue-200 bg-blue-50",
          }

          return (
            <div
              key={idx}
              className={`border-l-4 rounded-lg p-4 space-y-2 transition-all duration-300 ease-out hover:shadow-md ${
                priorityColors[suggestion.priority as keyof typeof priorityColors]
              }`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground">{suggestion.title}</h4>
                  <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
