interface TokenPillProps {
  text: string
  highlight?: boolean
}

export function TokenPill({ text, highlight = false }: TokenPillProps) {
  return (
    <div
      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
        highlight ? "bg-primary text-primary-foreground ring-2 ring-primary/50" : "bg-muted text-muted-foreground"
      }`}
    >
      {text}
    </div>
  )
}
