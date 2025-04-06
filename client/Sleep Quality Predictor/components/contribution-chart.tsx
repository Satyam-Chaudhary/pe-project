"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface ContributionChartProps {
  userData: {
    caffeine: number
    exercise: number
    screenTime: number
    stressLevel: number
    awakenings: number
  }
}

export default function ContributionChart({ userData }: ContributionChartProps) {
  // Calculate contribution percentages (simplified model)
  const calculateContributions = () => {
    // Normalize values to create a distribution
    const caffeineImpact = Math.min(100, userData.caffeine) / 2
    const exerciseImpact = Math.max(0, 100 - userData.exercise)
    const screenTimeImpact = userData.screenTime * 10
    const stressImpact = userData.stressLevel * 10
    const awakeningsImpact = userData.awakenings * 15

    const total = caffeineImpact + exerciseImpact + screenTimeImpact + stressImpact + awakeningsImpact

    // Calculate percentages
    return [
      {
        name: "Caffeine",
        value: Math.round((caffeineImpact / total) * 100),
        color: "#cbd5e1",
      },
      {
        name: "Exercise",
        value: Math.round((exerciseImpact / total) * 100),
        color: "#94a3b8",
      },
      {
        name: "Screen Time",
        value: Math.round((screenTimeImpact / total) * 100),
        color: "#64748b",
      },
      {
        name: "Stress",
        value: Math.round((stressImpact / total) * 100),
        color: "#475569",
      },
      {
        name: "Awakenings",
        value: Math.round((awakeningsImpact / total) * 100),
        color: "#334155",
      },
    ]
  }

  const data = calculateContributions()

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p style={{ color: payload[0].payload.color }}>Contribution: {payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-gray-500">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

