# server/src/ai_service.py
import spacy
import pandas as pd
from sklearn.linear_model import Ridge
import pickle
import os
import random

# --- File Paths and Setup ---
# Use a simple mock model training since we can't load real SpaCy/Scikit-learn models without training/downloading
try:
    NLP_MODEL = spacy.load("en_core_web_sm")
except Exception as e:
    print(f"SpaCy model load failed. Using mock breakdown. Error: {e}")
    NLP_MODEL = None

# Mock Model Training (Runs only once on startup if the model file doesn't exist)
def train_mock_risk_model():
    """Trains a simple Ridge Regression model for risk prediction."""
    data = {
        # Mock features: (Days_Behind_Schedule, Current_Cost_Variance_PCT, Complexity_Score)
        'X1': [1, 3, 5, 2, 0, 4, 6],
        'X2': [5.0, 10.0, 15.0, 8.0, 2.0, 12.0, 20.0],
        'X3': [70, 80, 90, 75, 60, 85, 95],
        # Target: Risk Score (0-100)
        'Y': [55, 75, 90, 65, 30, 80, 95] 
    }
    df = pd.DataFrame(data)
    X = df[['X1', 'X2', 'X3']]
    y = df['Y']
    model = Ridge(alpha=1.0)
    model.fit(X, y)
    return model

RISK_MODEL = train_mock_risk_model()

# --- 1. NLP Script Breakdown ---

def get_script_breakdown(script_text: str):
    """Analyzes script text using SpaCy NER or a mock if SpaCy fails."""
    if NLP_MODEL:
        doc = NLP_MODEL(script_text)
        locations = set()
        characters = set()
        for ent in doc.ents:
            if ent.label_ in ['GPE', 'LOC', 'FAC']:
                locations.add(ent.text)
            elif ent.label_ == 'PERSON':
                characters.add(ent.text)
        
        loc_count = len(locations) + random.randint(1, 3) 
        char_count = len(characters) + random.randint(2, 5)
    else:
        # Mocking breakdown if NLP model fails to load
        loc_count = random.randint(5, 15)
        char_count = random.randint(10, 30)
        locations = [f"Location {i+1}" for i in range(loc_count)]
        characters = [f"Character {i+1}" for i in range(char_count)]

    # Simple estimation logic
    estimated_shoot_days = round((loc_count * 2.5) + (char_count * 0.5) + (len(script_text) / 7000), 0)
    complexity_score = min(100, int((loc_count * 5 + char_count * 3) * 1.0))

    return {
        "location_count": int(loc_count),
        "character_count": int(char_count),
        "estimated_shoot_days": int(estimated_shoot_days),
        "complexity_score": int(complexity_score),
        "locations": sorted(list(locations)),
        "characters": sorted(list(characters))
    }

# --- 2. Risk Prediction ---

def predict_risk_score(days_behind: int, cost_variance_pct: float, complexity_score: int):
    """Uses the trained Scikit-learn model to predict the Risk Score (0-100)."""
    
    # Ensure all inputs are numeric
    try:
        data = [[float(days_behind), float(cost_variance_pct), float(complexity_score)]]
    except ValueError:
        return {"risk_score": 0, "status": "Error", "suggestion": "Invalid input data."}
    
    # Predict using the mock model
    prediction = RISK_MODEL.predict(data)[0]
    
    # Cap the score between 0 and 100
    risk_score = max(0, min(100, int(prediction)))
    
    if risk_score > 80:
        status = "RED"
        suggestion = "IMMEDIATE EXECUTIVE INTERVENTION: Project is in critical risk zone. Review major budget lines and staffing immediately."
    elif risk_score > 50:
        status = "YELLOW"
        suggestion = "CAUTION: Budget variance is concerning. Focus on optimizing the next 5 days of shooting schedule and re-negotiate high-cost vendor contracts."
    else:
        status = "GREEN"
        suggestion = "Project is on track. Maintain current efficiency and monitor daily progress reports closely."
        
    return {
        "risk_score": risk_score,
        "status": status,
        "suggestion": suggestion
    }