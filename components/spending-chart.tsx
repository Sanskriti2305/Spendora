"use client"

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const data = [
  { category: "Food", value: 2800 },
  { category: "Shopping", value: 2200 },
  { category: "Transport", value: 1500 },
  { category: "Entertainment", value: 1200 },
  { category: "Utilities", value: 3500 },
  { category: "Health", value: 800 },
]

const COLORS = [
  "hsl(120 70% 60%)",
  "hsl(270 70% 60%)",
  "hsl(50 70% 60%)",
  "hsl(330 70% 60%)",
  "hsl(200 70% 60%)",
  "hsl(20 70% 60%)",
]

export function SpendingChart() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Bar Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--color-border))" />
            <XAxis type="number" stroke="hsl(var(--color-muted-foreground))" />
            <YAxis dataKey="category" type="category" stroke="#10b981" width={80} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--color-card))",
                border: `1px solid hsl(var(--color-border))`,
                borderRadius: "8px",
              }}
              formatter={(value) => `₹${value}`}
            />
            <Bar dataKey="value" fill="#10b981" radius={8} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
