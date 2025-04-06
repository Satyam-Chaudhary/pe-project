import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Call the FastAPI backend at /predict
    const fastApiResponse = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sleep_duration: data.sleepDuration,
        sleep_efficiency: data.sleepEfficiency,
        sleep_latency: data.sleepLatency,
        awakenings: data.awakenings,
        caffeine_mg: data.caffeine,
        exercise_min: data.exercise,
        screen_time: data.screenTime,
        stress_level: data.stressLevel,
        HRV: data.hrv,
      }),
    })

    if (!fastApiResponse.ok) {
      throw new Error("Failed to get prediction from FastAPI")
    }

    const result = await fastApiResponse.json()

    return NextResponse.json(result)
  } catch (error) {
    console.error("Prediction error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
