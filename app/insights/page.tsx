import { Navbar } from "@/components/navbar"
import { InsightsDashboard } from "@/components/insights-dashboard"
import { Footer } from "@/components/footer"

export default function InsightsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <InsightsDashboard />
      <Footer />
    </main>
  )
}
