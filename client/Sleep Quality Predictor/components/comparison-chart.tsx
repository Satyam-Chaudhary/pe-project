"use client"

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface ComparisonChartProps {
  userData: {
    sleepDuration: number
    sleepEfficiency: number
    sleepLatency: number
    stressLevel: number
    hrv: number
  }
}

export default function ComparisonChart({ userData }: ComparisonChartProps) {
  // Ideal values for comparison
  const idealValues = {
    sleepDuration: 7.5,
    sleepEfficiency: 90,
    sleepLatency: 20,
    stressLevel: 4,
    hrv: 60,
  }

  // Prepare data for the chart
  const data = [
    {
      name: "Sleep Duration",
      user: userData.sleepDuration,
      ideal: idealValues.sleepDuration,
      unit: "hours",
    },
    {
      name: "Sleep Efficiency",
      user: userData.sleepEfficiency,
      ideal: idealValues.sleepEfficiency,
      unit: "%",
    },
    {
      name: "Sleep Latency",
      user: userData.sleepLatency,
      ideal: idealValues.sleepLatency,
      unit: "min",
    },
    {
      name: "Stress Level",
      user: userData.stressLevel,
      ideal: idealValues.stressLevel,
      unit: "/10",
    },
    {
      name: "HRV",
      user: userData.hrv,
      ideal: idealValues.hrv,
      unit: "",
    },
  ]

  // Custom tooltip to show units
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = data.find((item) => item.name === label)
      const unit = dataPoint?.unit || ""

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value} {unit}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} barGap={10}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} />
          <YAxis tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#d1d5db" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "10px" }} />
          <Bar dataKey="user" name="Your Value" fill="#94a3b8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="ideal" name="Ideal Value" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

