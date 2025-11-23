import { Navbar } from "@/components/navbar"
import { UploadStatement } from "@/components/upload-statement"
import { Footer } from "@/components/footer"

export default function UploadPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <UploadStatement />
      <Footer />
    </main>
  )
}
