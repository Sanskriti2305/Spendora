import { CategoryBadge } from "./category-badge"

const mockTransactions = [
  { description: "Starbucks Coffee Shop", amount: 230, category: "Food & Dining", confidence: 92 },
  { description: "Amazon Online Shopping", amount: 1500, category: "Shopping", confidence: 88 },
  { description: "Uber Trip Downtown", amount: 450, category: "Transport", confidence: 95 },
  { description: "Netflix Subscription", amount: 499, category: "Entertainment", confidence: 99 },
  { description: "McDonald's Fast Food", amount: 350, category: "Food & Dining", confidence: 91 },
  { description: "Electricity Bill Payment", amount: 2500, category: "Utilities", confidence: 87 },
]

export function StatementTable() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-fintech">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Description</th>
              <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Category</th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockTransactions.map((tx, idx) => (
              <tr key={idx} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 text-sm text-foreground font-medium">{tx.description}</td>
                <td className="px-4 py-3 text-sm font-semibold text-foreground text-right">₹{tx.amount}</td>
                <td className="px-4 py-3 text-sm">
                  <CategoryBadge category={tx.category} confidence={tx.confidence} size="sm" />
                </td>
                <td className="px-4 py-3 text-sm text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${tx.confidence}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground w-8">{tx.confidence}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
