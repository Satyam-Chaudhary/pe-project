
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

from sklearn.impute import SimpleImputer


df = pd.read_csv('PE_SLEEP_DATASET.csv')
df.head()

df = df.dropna(subset=['sleep_quality'])

invalid_entries = ['??', 'NA', 'na', 'N/A', 'n/a', '--', '']
df.replace(invalid_entries, pd.NA, inplace=True)

for col in df.columns:
    if col != 'sleep_quality':
        df[col] = pd.to_numeric(df[col], errors='coerce')

print(df['sleep_quality'].unique())

df = df[df['sleep_quality'].isin(['Good', 'Bad'])]

# Check again to confirm
print(df['sleep_quality'].unique())
df.shape

print(df.isnull().sum())

df = df.dropna()
print("Remaining rows:", len(df))

features = [
    'sleep_duration',  'sleep_latency',
    'awakenings', 'caffeine_mg', 'exercise_min',
    'screen_time', 'stress_level', 'HRV'
]
target = 'sleep_quality'

X = df[features]
y = df[target]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

from sklearn.ensemble import RandomForestClassifier
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)

from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# Accuracy Score
print("✅ Accuracy:", accuracy_score(y_test, y_pred))

print("\n📋 Classification Report:\n")
print(classification_report(y_test, y_pred))

cm = confusion_matrix(y_test, y_pred, labels=['Good', 'Bad'])

plt.figure(figsize=(5,4))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=['Good', 'Bad'], yticklabels=['Good', 'Bad'])
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("🧪 Confusion Matrix")
plt.tight_layout()
plt.show()

importances = model.feature_importances_
feature_names = X_train.columns

feat_df = pd.DataFrame({
    'Feature': feature_names,
    'Importance': importances
}).sort_values(by='Importance', ascending=False)

plt.figure(figsize=(8,5))
sns.barplot(data=feat_df, x='Importance', y='Feature', palette='viridis')
plt.title("🌟 Feature Importance (Random Forest)")
plt.tight_layout()
plt.show()

import joblib

# Save trained model to a file
joblib.dump(model, 'sleep_quality_model.pkl')
print("✅ Model successfully saved as sleep_quality_model.pkl")
