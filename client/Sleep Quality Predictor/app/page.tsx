"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Loader2 } from "lucide-react"
import PredictionResult from "@/components/prediction-result"
import ComparisonChart from "@/components/comparison-chart"
import ContributionChart from "@/components/contribution-chart"

export default function Home() {
  const [formData, setFormData] = useState({
    sleepDuration: 7,
    sleepEfficiency: 85,
    sleepLatency: 25,
    awakenings: 2,
    caffeine: 100,
    exercise: 30,
    screenTime: 3,
    stressLevel: 5,
    hrv: 55,
  })

  const [prediction, setPrediction] = useState<null | {
    predicted_class: number
    predicted_label: string
  }>(null)

  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: Number.parseFloat(value),
    }))
  }

  const handleSliderChange = (name: string, value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value[0],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sleep_duration: formData.sleepDuration,
          sleep_efficiency: formData.sleepEfficiency,
          sleep_latency: formData.sleepLatency,
          awakenings: formData.awakenings,
          caffeine_mg: formData.caffeine,
          exercise_min: formData.exercise,
          screen_time: formData.screenTime,
          stress_level: formData.stressLevel,
          HRV: formData.hrv,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      setPrediction(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Sleep Quality Predictor</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="bg-white border-gray-100 shadow-sm">
            <CardHeader>
              <CardTitle>Enter Your Sleep Data</CardTitle>
              <CardDescription className="text-gray-500">
                Fill in the form below to predict your sleep quality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sleepDuration">Sleep Duration (hours)</Label>
                      <Input
                        id="sleepDuration"
                        name="sleepDuration"
                        type="number"
                        step="0.1"
                        min="0"
                        value={formData.sleepDuration}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sleepEfficiency">Sleep Efficiency (%)</Label>
                      <Input
                        id="sleepEfficiency"
                        name="sleepEfficiency"
                        type="number"
                        step="1"
                        min="0"
                        max="100"
                        value={formData.sleepEfficiency}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sleepLatency">Sleep Latency (minutes)</Label>
                      <Input
                        id="sleepLatency"
                        name="sleepLatency"
                        type="number"
                        step="1"
                        min="0"
                        value={formData.sleepLatency}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="awakenings">Awakenings</Label>
                      <Input
                        id="awakenings"
                        name="awakenings"
                        type="number"
                        step="1"
                        min="0"
                        value={formData.awakenings}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="caffeine">Caffeine (mg)</Label>
                      <Input
                        id="caffeine"
                        name="caffeine"
                        type="number"
                        step="1"
                        min="0"
                        value={formData.caffeine}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="exercise">Exercise (minutes)</Label>
                      <Input
                        id="exercise"
                        name="exercise"
                        type="number"
                        step="1"
                        min="0"
                        value={formData.exercise}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="screenTime">Screen Time (hours)</Label>
                      <Input
                        id="screenTime"
                        name="screenTime"
                        type="number"
                        step="0.5"
                        min="0"
                        value={formData.screenTime}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hrv">HRV (Heart Rate Variability)</Label>
                      <Input
                        id="hrv"
                        name="hrv"
                        type="number"
                        step="1"
                        min="0"
                        value={formData.hrv}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="stressLevel">Stress Level</Label>
                      <span className="text-gray-500">{formData.stressLevel} / 10</span>
                    </div>
                    <Slider
                      id="stressLevel"
                      min={0}
                      max={10}
                      step={1}
                      value={[formData.stressLevel]}
                      onValueChange={(value) => handleSliderChange("stressLevel", value)}
                      className="py-4"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    "Predict Sleep Quality"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-8">
            <PredictionResult prediction={prediction} loading={loading} />

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-8">
              <Card className="bg-white border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle>Your Sleep Metrics vs. Ideal Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <ComparisonChart userData={formData} />
                </CardContent>
              </Card>

              {/* {prediction && (
                <Card className="bg-white border-gray-100 shadow-sm">
                  <CardHeader>
                    <CardTitle>Sleep Quality Factors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ContributionChart userData={formData} />
                  </CardContent>
                </Card>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
