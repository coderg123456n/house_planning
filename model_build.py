# model_build.py

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import r2_score
import joblib

# Load data
df = pd.read_csv("Bengaluru_House_Data.csv")

# Drop rows with too many missing values
df = df.drop(columns=["society", "balcony", "availability"])

# Drop rows with nulls in key columns
df = df.dropna()

# Feature Engineering
# Convert 'total_sqft' to float
def convert_sqft(x):
    try:
        return float(x)
    except:
        if '-' in x:
            tokens = x.split('-')
            return (float(tokens[0]) + float(tokens[1])) / 2
        return None

df['total_sqft'] = df['total_sqft'].apply(convert_sqft)
df = df.dropna(subset=['total_sqft'])

# Extract bhk as number
df['bhk'] = df['size'].apply(lambda x: int(x.split(' ')[0]))

# Remove extreme outliers
df = df[(df['total_sqft'] / df['bhk']) >= 300]

# Define X and y
X = df[['location', 'total_sqft', 'bath', 'bhk']]
y = df['price']

# Clean 'location' feature
X['location'] = X['location'].apply(lambda x: x.strip())
location_counts = X['location'].value_counts()
X['location'] = X['location'].apply(lambda x: 'other' if location_counts[x] <= 10 else x)

# Pipeline for preprocessing and regression
column_trans = ColumnTransformer([
    ('location_ohe', OneHotEncoder(handle_unknown='ignore'), ['location'])
], remainder='passthrough')

pipe = Pipeline([
    ('preprocessor', column_trans),
    ('model', LinearRegression())
])

# Train model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
pipe.fit(X_train, y_train)

# Evaluate model
y_pred = pipe.predict(X_test)
print("R^2 score on test set:", r2_score(y_test, y_pred))

# Save model and columns
joblib.dump(pipe, 'house_price_model.pkl')
joblib.dump(X.columns.tolist(), 'columns.pkl')

print("✅ Model and columns saved.")
