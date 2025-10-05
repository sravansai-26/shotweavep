import random
import pickle
import os
import pandas as pd
from sklearn.linear_model import Ridge

# --- File Paths and Setup ---
MODEL_PATH = "risk_model.pkl"

# Mock Model Training (Runs only once if the model file doesn't exist)
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
    
    # Save the model to avoid retraining
    with open(MODEL_PATH, 'wb') as f:
        pickle.dump(model, f)
    return model

# Load or train the risk model
def load_risk_model():
    """Loads the risk model if it exists, otherwise trains a new one."""
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, 'rb') as f:
            return pickle.load(f)
    return train_mock_risk_model()

RISK_MODEL = load_risk_model()

# --- Risk Prediction ---

def predict_risk_score(days_behind: int, cost_variance_pct: float, complexity_score: int):
    """Uses the trained Scikit-learn model to predict the Risk Score (0-100)."""
    
    # Ensure all inputs are numeric
    try:
        data = [[float(days_behind), float(cost_variance_pct), float(complexity_score)]]
    except ValueError:
        return {"risk_score": 0, "status": "Error", "suggestion": "Invalid input data. All inputs must be numeric."}
    
    try:
        # Predict using the model
        prediction = RISK_MODEL.predict(data)[0]
        
        # Cap the score between 0 and 100
        risk_score = max(0, min(100, int(prediction)))
        
        # Determine status and suggestion
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
    except Exception as e:
        return {"risk_score": 0, "status": "Error", "suggestion": f"Prediction failed: {str(e)}"}