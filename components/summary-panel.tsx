import { TrendingUp, Zap } from "lucide-react"

export function SummaryPanel() {
  return (
    <div className="space-y-4">
      {/* Total Transactions */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-2">
        <p className="text-sm text-muted-foreground font-medium">Total Transactions</p>
        <p className="text-3xl font-bold text-foreground">6</p>
      </div>

      {/* Most Spent Category */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4 space-y-2">
        <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Most Spent Category
        </p>
        <p className="text-2xl font-bold text-primary">Food & Dining</p>
        <p className="text-xs text-muted-foreground">₹580 (25.6%)</p>
      </div>

      {/* Highest Bill */}
      <div className="bg-card border border-border rounded-xl p-4 space-y-2">
        <p className="text-sm text-muted-foreground font-medium flex items-center gap-2">
          <Zap className="w-4 h-4" />
          Highest Bill Item
        </p>
        <p className="text-xl font-bold text-foreground">Electricity Bill</p>
        <p className="text-sm text-muted-foreground">₹2,500</p>
      </div>

      {/* Insights */}
      <div className="bg-secondary/50 border border-secondary rounded-xl p-4 space-y-3">
        <p className="text-sm font-semibold text-foreground">Quick Insights</p>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Average transaction: ₹595</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Total spending: ₹5,529</span>
          </li>
          <li className="flex gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Recurring expenses: 2</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
