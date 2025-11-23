export function HealthScore() {
  const score = 78
  const getScoreColor = (score: number) => {
    if (score >= 80) return { bg: "bg-[hsl(120_70%_40%)]", text: "text-[hsl(120_70%_30%)]", label: "Excellent" }
    if (score >= 60) return { bg: "bg-[hsl(50_70%_30%)]", text: "text-[hsl(50_70%_40%)]", label: "Good" }
    return { bg: "bg-[hsl(20_70%_30%)]", text: "text-[hsl(20_70%_30%)]", label: "Needs Attention" }
  }

  const scoreInfo = getScoreColor(score)

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-fintech flex flex-col">
      <h3 className="font-semibold text-foreground flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-primary" />
        Financial Health Score
      </h3>

      {/* Big Score Display */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(var(--color-muted))" strokeWidth="12" />
            {/* Filled circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke={scoreInfo.bg.split("[")[1].split("]")[0]}
              strokeWidth="12"
              strokeDasharray={`${(score / 100) * 565} 565`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold ${scoreInfo.text}`}>{score}</span>
            <span className="text-sm text-muted-foreground">/100</span>
          </div>
        </div>
      </div>

      {/* Score Label */}
      <div className="text-center">
        <div className={`inline-block px-3 py-1 rounded-full font-semibold text-sm ${scoreInfo.bg} text-white`}>
          {scoreInfo.label}
        </div>
        <p className="text-sm text-muted-foreground mt-2">Your spending is well-managed and sustainable</p>
      </div>
    </div>
  )
}
