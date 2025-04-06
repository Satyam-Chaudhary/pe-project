import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface PredictionResultProps {
  prediction: {
    predicted_class: number
    predicted_label: string
  } | null
  loading: boolean
}

export default function PredictionResult({ prediction, loading }: PredictionResultProps) {
  return (
    <Card className="bg-white border-gray-100 shadow-sm">
      <CardHeader>
        <CardTitle>Sleep Quality Prediction</CardTitle>
        <CardDescription className="text-gray-500">Based on your input data, our model predicts:</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-4" />
            <p className="text-gray-500">Analyzing your sleep data...</p>
          </div>
        ) : prediction ? (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center py-6">
              <div
                className={`text-4xl font-bold mb-2 ${
                  prediction.predicted_class >= 3
                    ? "text-green-500"
                    : prediction.predicted_class >= 2
                      ? "text-yellow-500"
                      : "text-red-500"
                }`}
              >
                {prediction.predicted_label}
              </div>
              <p className="text-gray-500 text-center">
                {prediction.predicted_class >= 3
                  ? "Great sleep quality! Keep up the good habits."
                  : prediction.predicted_class >= 2
                    ? "Moderate sleep quality. Some improvements could help."
                    : "Poor sleep quality. Consider adjusting your habits."}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <p>Submit your data to see prediction results</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

