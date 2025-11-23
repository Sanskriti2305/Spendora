import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground text-pretty">
            Smart AI Transaction Categorisation
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Upload your transactions, auto-categorise them with AI, and get personalised spending insights in seconds.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/categorise"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-all duration-300 ease-out group"
          >
            Categorise Transaction
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/upload"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out"
          >
            Upload Statement
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/insights"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 rounded-lg bg-muted text-foreground font-semibold hover:shadow-lg transition-all duration-300 ease-out"
          >
            View Insights
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src="https://cdn.pixabay.com/video/2020/12/14/59134-491926072_large.mp4" type="video/mp4" />
        </video>

        {/* Illustration Placeholder */}
        <div className="pt-8">
          <div className="relative h-64 sm:h-80 w-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-border flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl" />
            </div>
            <div className="relative text-center space-y-2">
              <div className="text-5xl">💰</div>
              <p className="text-muted-foreground font-medium">Financial Intelligence at Your Fingertips</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
