
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report
import joblib
import sys
import sklearn
print(sklearn.__version__)

def clean_and_train_model(data_path, output_model_path):
    # Load dataset
    df = pd.read_csv(data_path)
    
    # Replace garbage values with NaN
    df.replace(['??', '?', 'three', 'a lot', 'none', 'tv', 'high', 'meh', 'stressed'], np.nan, inplace=True)

    # Drop rows with NaNs
    df.dropna(inplace=True)

    # Convert to numeric where possible
    df = df.apply(pd.to_numeric, errors='ignore')

    # Encode target variable
    if df['sleep_quality'].dtype == object:
        le = LabelEncoder()
        df['sleep_quality'] = le.fit_transform(df['sleep_quality'])

    # Split features and labels
    X = df.drop('sleep_quality', axis=1)
    y = df['sleep_quality']

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    # Save model
    joblib.dump(model, output_model_path)
    print(f"Model saved to {output_model_path}")

# Example usage
# clean_and_train_model("your_data.csv", "sleep_quality_model.pkl")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python train_sleep_model.py <data_csv_path> <output_model_path>")
    else:
        clean_and_train_model(sys.argv[1], sys.argv[2])
