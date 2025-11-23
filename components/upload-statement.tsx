"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileUp, Loader2, Download, AlertCircle } from "lucide-react"

// API URL - Change this when deploying
const API_URL = "http://127.0.0.1:8000"

interface Transaction {
  text: string
  category: string
  confidence: number
}

interface AnalyticsData {
  total_transactions: number
  category_breakdown: Record<string, number>
  category_percentages: Record<string, number>
  predictions: Transaction[]
}

export function UploadStatement() {
  const [uploaded, setUploaded] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("")
  
  // Data from API
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const processFile = async (file: File) => {
    setLoading(true)
    setError(null)
    setFileName(file.name)

    try {
      const text = await file.text()

      const lines = text.split("\n").filter(line => line.trim())
      
      // Skip header if exists
      const hasHeader = lines[0].toLowerCase().includes("text") || 
                       lines[0].toLowerCase().includes("transaction") ||
                       lines[0].toLowerCase().includes("description")
      
      const dataLines = hasHeader ? lines.slice(1) : lines
      const transactionTexts = dataLines.map(line => {
        // Handle CSV with commas in data
        const cleanLine = line.replace(/^["']|["']$/g, '').trim()
        return cleanLine
      }).filter(line => line.length > 0)

      if (transactionTexts.length === 0) {
        throw new Error("No valid transactions found in CSV")
      }

      // Call API for batch prediction
      const response = await fetch(`${API_URL}/analytics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transactions: transactionTexts }),
      })

      if (!response.ok) {
        throw new Error("Failed to process transactions")
      }

      const data: AnalyticsData = await response.json()
      setAnalytics(data)
      setTransactions(data.predictions)
      setUploaded(true)

    } catch (err) {
      console.error("Error processing file:", err)
      setError(err instanceof Error ? err.message : "Failed to process file. Make sure API is running.")
    } finally {
      setLoading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      /*if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        processFile(file)
      } else {
        setError("Please upload a CSV file")
      }*/
      // Accept ANY file now
      processFile(file)

    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  const handleDownloadResults = () => {
    if (!transactions.length) return

    const csvContent = "Transaction,Category,Confidence\n" + 
      transactions.map(t => 
        `"${t.text}","${t.category}",${t.confidence}`
      ).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "categorized_transactions.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      "Food & Dining": "bg-orange-500/20 text-orange-500",
      "Shopping": "bg-pink-500/20 text-pink-500",
      "Transportation": "bg-blue-500/20 text-blue-500",
      "Groceries": "bg-green-500/20 text-green-500",
      "Entertainment": "bg-purple-500/20 text-purple-500",
      "Healthcare": "bg-red-500/20 text-red-500",
      "Utilities": "bg-yellow-500/20 text-yellow-500",
      "Fuel": "bg-amber-500/20 text-amber-500",
      "Education": "bg-indigo-500/20 text-indigo-500",
      "Subscriptions": "bg-cyan-500/20 text-cyan-500",
    }
    return colors[category] || "bg-gray-500/20 text-gray-500"
  }

  return (
    <div className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Upload Bank Statement</h2>
          <p className="text-muted-foreground">Upload a CSV file to auto-categorise multiple transactions</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {!uploaded ? (
          /* Upload Box */
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
              dragActive ? "border-primary bg-primary/5" : "border-border bg-muted/30 hover:border-primary/50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="*/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                {loading ? (
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                ) : (
                  <Upload className="w-8 h-8 text-primary" />
                )}
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-foreground">
                  {loading ? "Processing..." : "Drop your CSV file here"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {loading ? fileName : "or click to browse from your computer"}
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-lg transition-all duration-300 ease-out disabled:opacity-50"
              >
                <FileUp className="w-4 h-4 inline mr-2" />
                {loading ? "Processing..." : "Select File"}
              </button>
            </div>
          </div>
        ) : (
          /* Results View */
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Table */}
              <div className="flex-1">
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="p-4 border-b border-border flex justify-between items-center">
                    <h3 className="font-semibold text-foreground">
                      Categorized Transactions ({transactions.length})
                    </h3>
                    <button
                      onClick={handleDownloadResults}
                      className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-all flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-muted/50 sticky top-0">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">#</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Transaction</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Confidence</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {transactions.map((t, idx) => (
                          <tr key={idx} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 text-sm text-muted-foreground">{idx + 1}</td>
                            {/*<td className="px-4 py-3 text-sm text-foreground max-w-xs truncate">{t.text}</td>*/}
                            <td className="px-4 py-3 text-sm text-foreground max-w-xs truncate">
                              {(() => {
                                //const parts = t.text.split(",")
                                const raw = t.text ?? ""
                                const parts = typeof raw === "string" ? raw.split(",") : []
                                const description = parts[1]?.trim() || "Unknown"
                                const amount = parts[2]?.trim() || ""
                                return `${description} ${amount ? " - ₹" + amount : ""}`
                              })()}
                            </td>

                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(t.category)}`}>
                                {t.category}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary rounded-full" 
                                    style={{ width: `${t.confidence}%` }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground">{t.confidence}%</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Summary Panel */}
              <div className="lg:w-72">
                <div className="bg-card border border-border rounded-xl p-4 space-y-4 sticky top-4">
                  <h3 className="font-semibold text-foreground">Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Transactions</span>
                      <span className="font-semibold text-foreground">{analytics?.total_transactions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Categories Found</span>
                      <span className="font-semibold text-foreground">
                        {analytics ? Object.keys(analytics.category_breakdown).length : 0}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <h4 className="text-sm font-medium text-foreground mb-3">Category Breakdown</h4>
                    <div className="space-y-2">
                      {analytics && Object.entries(analytics.category_breakdown)
                        .sort(([,a], [,b]) => b - a)
                        .map(([category, count]) => (
                          <div key={category} className="flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                              {category}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {count} ({analytics.category_percentages[category]}%)
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Re-upload Button */}
            <button
              onClick={() => {
                setUploaded(false)
                setTransactions([])
                setAnalytics(null)
                setError(null)
              }}
              className="w-full px-6 py-3 rounded-lg border-2 border-border text-foreground font-medium hover:bg-muted transition-all duration-300 ease-out"
            >
              Upload Another File
            </button>
          </div>
        )}
      </div>
    </div>
  )
}