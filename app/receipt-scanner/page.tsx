"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Camera, Upload, CheckCircle } from "lucide-react"
import { useState } from "react"

interface ScannedItem {
  name: string
  category: string
  price: number
}

const scannedReceipts = [
  {
    id: 1,
    store: "Big Basket",
    date: "May 15, 2024",
    total: 1250,
    items: [
      { name: "Milk", category: "Groceries", price: 120 },
      { name: "Bread", category: "Groceries", price: 45 },
      { name: "Vegetables", category: "Groceries", price: 380 },
      { name: "Chicken", category: "Groceries", price: 705 },
    ] as ScannedItem[],
  },
  {
    id: 2,
    store: "Mumbai Pizza House",
    date: "May 14, 2024",
    total: 580,
    items: [
      { name: "Margherita Pizza", category: "Food & Dining", price: 350 },
      { name: "Soft Drinks", category: "Food & Dining", price: 150 },
      { name: "Garlic Bread", category: "Food & Dining", price: 80 },
    ] as ScannedItem[],
  },
]

export default function ReceiptScannerPage() {
  const [scanned, setScanned] = useState(false)

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-foreground">Receipt Scanner (OCR)</h1>
            <p className="text-foreground/70">Upload receipt photos to auto-extract and categorize items</p>
          </div>

          {!scanned ? (
            <div className="bg-white rounded-2xl p-12 shadow-fintech text-center space-y-6 mb-12">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Camera className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Scan Receipt</h3>
                <p className="text-foreground/60">Upload a photo of any receipt to auto-categorize items</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setScanned(true)}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-lg transition-all duration-300 ease-out"
                >
                  <Camera className="w-5 h-5" />
                  Take Photo
                </button>
                <button
                  onClick={() => setScanned(true)}
                  className="flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition-all duration-300 ease-out"
                >
                  <Upload className="w-5 h-5" />
                  Upload Image
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <button onClick={() => setScanned(false)} className="text-primary font-semibold hover:underline">
                ← Scan Another Receipt
              </button>
            </div>
          )}

          {/* Scanned Receipts */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">Recent Scanned Receipts</h2>
            <div className="space-y-6">
              {scannedReceipts.map((receipt) => (
                <div key={receipt.id} className="bg-white rounded-2xl p-6 shadow-fintech">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{receipt.store}</h3>
                      <p className="text-sm text-foreground/60">{receipt.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">₹{receipt.total}</p>
                      <div className="flex items-center gap-1 text-green-600 text-sm mt-1">
                        <CheckCircle className="w-4 h-4" />
                        Categorized
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {receipt.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-semibold text-foreground">{item.name}</p>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">{item.category}</span>
                        </div>
                        <p className="font-semibold text-foreground">₹{item.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
