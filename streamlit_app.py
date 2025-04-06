import streamlit as st
import requests

st.set_page_config(page_title="Sleep Quality Predictor", page_icon="🛌")
st.title("🛌 Sleep Quality Predictor")


sleep_duration = st.number_input("Sleep Duration (hours)", min_value=0.0, max_value=24.0, step=0.1)
sleep_efficiency = st.number_input("Sleep Efficiency (%)", min_value=0.0, max_value=100.0, step=0.1)
sleep_latency = st.number_input("Sleep Latency (minutes)", min_value=0.0, max_value=180.0, step=1.0)
awakenings = st.number_input("Number of Awakenings", min_value=0, max_value=10, step=1)
caffeine_mg = st.number_input("Caffeine Intake (mg)", min_value=0.0, max_value=1000.0, step=1.0)
exercise_min = st.number_input("Exercise Duration (minutes)", min_value=0.0, max_value=300.0, step=1.0)
screen_time = st.number_input("Screen Time Before Bed (hours)", min_value=0.0, max_value=10.0, step=0.1)
stress_level = st.slider("Stress Level (1-10)", min_value=1, max_value=10)
HRV = st.number_input("Heart Rate Variability (HRV)", min_value=0.0, max_value=200.0, step=1.0)

if st.button("Predict Sleep Quality"):

    payload = {
        "sleep_duration": sleep_duration,
        "sleep_efficiency": sleep_efficiency,
        "sleep_latency": sleep_latency,
        "awakenings": awakenings,
        "caffeine_mg": caffeine_mg,
        "exercise_min": exercise_min,
        "screen_time": screen_time,
        "stress_level": stress_level,
        "HRV": HRV
    }

    try:
 
        response = requests.post("http://127.0.0.1:8000/predict", json=payload)

        if response.status_code == 200:
            result = response.json()
            st.success(f"🧠 Predicted Sleep Quality: **{result['predicted_label']}** (Class {result['predicted_class']})")
        else:
            st.error("❌ Prediction failed. Please check your API and inputs.")
    except Exception as e:
        st.error(f"⚠️ Error connecting to API: {e}")
