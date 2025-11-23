import { PieChart, ShoppingBag, Zap, Activity, Utensils, TrendingUp } from "lucide-react"

interface CategoryBadgeProps {
  category: string
  confidence?: number
  size?: "sm" | "md"
}

const categoryConfig: Record<string, { icon: any; color: string; bgColor: string }> = {
  "Food & Dining": { icon: Utensils, color: "text-[hsl(120_70%_50%)]", bgColor: "bg-[hsl(120_70%_80%)]" },
  Shopping: { icon: ShoppingBag, color: "text-[hsl(270_70%_50%)]", bgColor: "bg-[hsl(270_70%_80%)]" },
  Transport: { icon: Zap, color: "text-[hsl(50_70%_50%)]", bgColor: "bg-[hsl(50_70%_80%)]" },
  Utilities: { icon: Activity, color: "text-[hsl(200_70%_50%)]", bgColor: "bg-[hsl(200_70%_80%)]" },
  Entertainment: { icon: TrendingUp, color: "text-[hsl(330_70%_50%)]", bgColor: "bg-[hsl(330_70%_80%)]" },
  Health: { icon: PieChart, color: "text-[hsl(20_70%_50%)]", bgColor: "bg-[hsl(20_70%_80%)]" },
}

export function CategoryBadge({ category, confidence, size = "md" }: CategoryBadgeProps) {
  const config = categoryConfig[category] || categoryConfig["Shopping"]
  const Icon = config.icon

  if (size === "sm") {
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${config.bgColor} ${config.color}`}
      >
        <Icon className="w-4 h-4" />
        {category}
      </div>
    )
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg text-base font-semibold ${config.bgColor} ${config.color}`}
    >
      <Icon className="w-5 h-5" />
      <span>{category}</span>
      {confidence && <span className="text-sm opacity-75">({confidence}%)</span>}
    </div>
  )
}
