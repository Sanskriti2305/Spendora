import { Navbar } from "@/components/navbar"
import { CategoriseForm } from "@/components/categorise-form"
import { Footer } from "@/components/footer"

export default function CategorisePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <CategoriseForm />
      <Footer />
    </main>
  )
}
