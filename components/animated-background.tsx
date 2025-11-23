"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const symbols = ["💰", "💵", "💳", "📈", "💎"]
  const [items, setItems] = useState<any[]>([])

  useEffect(() => {
    const randomItems = Array.from({ length: 30 }).map(() => ({
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 3}s`,
    }))
    setItems(randomItems)

    const resizeCanvas = () => {
      const canvas = document.querySelector("canvas") as HTMLCanvasElement
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    return () => window.removeEventListener("resize", resizeCanvas)
  }, [])

  return (
    <div className="money-background">
      {items.map((style, i) => (
        <div key={i} className="money-item" style={style}>
          {symbols[i % symbols.length]}
        </div>
      ))}

      <canvas className="fixed top-0 left-0 w-full h-screen pointer-events-none z-0" />
    </div>
  )
}
