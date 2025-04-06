from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

# Load model
model = joblib.load("sleep_quality_model.pkl")

# App
app = FastAPI(title="Sleep Quality Predictor API")

# CORS middleware
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model
class SleepData(BaseModel):
    sleep_duration: float
    sleep_efficiency: float
    sleep_latency: float
    awakenings: int
    caffeine_mg: float
    exercise_min: float
    screen_time: float
    stress_level: int
    HRV: float

# Output model
class PredictionResponse(BaseModel):
    predicted_class: int
    predicted_label: str

# Root
@app.get("/")
def root():
    return {"message": "Welcome to the Sleep Quality Prediction API"}

# Predict endpoint
@app.post("/predict", response_model=PredictionResponse)
def predict_sleep_quality(data: SleepData):
    features = np.array([[ 
        data.sleep_duration,
        data.sleep_efficiency,
        data.sleep_latency,
        data.awakenings,
        data.caffeine_mg,
        data.exercise_min,
        data.screen_time,
        data.stress_level,
        data.HRV
    ]])

    prediction = model.predict(features)[0]
    label_map = {0: "Poor", 1: "Average", 2: "Good"}

    return {
        "predicted_class": int(prediction),
        "predicted_label": label_map.get(int(prediction), "Unknown")
    }
