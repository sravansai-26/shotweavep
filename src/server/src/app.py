from flask import Flask, request, jsonify
from flask_cors import CORS
from db import register_user, find_user, get_lvr_data
from ai_service import get_script_breakdown, predict_risk_score

app = Flask(__name__)
# Allow CORS from the React port (default 5173 or 3000)
CORS(app, resources={r"/api/*": {"origins": "*"}}) 

# --- 1. User Authentication Endpoints ---

@app.route('/api/signup', methods=['POST'])
def signup():
    """Endpoint for user registration."""
    data = request.json
    required_fields = ['name', 'email', 'username', 'password', 'role']
    if not all(field in data for field in required_fields):
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    result = register_user(data)
    if result["success"]:
        return jsonify({"success": True, "message": "User registered successfully. Please login."}), 201
    else:
        return jsonify({"success": False, "message": result["message"]}), 409 # Conflict

@app.route('/api/login', methods=['POST'])
def login():
    """Endpoint for user login and credential validation."""
    data = request.json
    if not data.get('username') or not data.get('password'):
        return jsonify({"success": False, "message": "Username and password required"}), 400
    
    result = find_user(data['username'], data['password'])
    if result["success"]:
        user = result["user"]
        # Return only safe user info and role
        return jsonify({"success": True, "message": "Login successful", "user": {"name": user['name'], "email": user['email'], "username": user['username'], "role": user['role']}}), 200
    else:
        return jsonify({"success": False, "message": result["message"]}), 401 # Unauthorized

# --- 2. Line Producer Endpoints (Operational Planning) ---

@app.route('/api/lp/breakdown', methods=['POST'])
def lp_script_breakdown():
    """Line Producer: NLP Script Breakdown."""
    script_text = request.json.get('script_text', '')
    if not script_text:
        return jsonify({"success": False, "message": "Script text is required"}), 400
    
    breakdown = get_script_breakdown(script_text)
    return jsonify({"success": True, "breakdown": breakdown}), 200

@app.route('/api/lp/lvr', methods=['GET'])
def lp_get_lvr():
    """Line Producer: Localized Vendor Rating (LVR) data."""
    lvr_data = get_lvr_data()
    return jsonify({"success": True, "vendors": lvr_data}), 200

# --- 3. Producer/CEO Endpoints (Financial Oversight) ---

@app.route('/api/ceo/risk_meter', methods=['POST'])
def ceo_risk_meter():
    """Producer/CEO: Scikit-learn Risk Prediction."""
    data = request.json
    required_fields = ['days_behind', 'cost_variance_pct', 'complexity_score']
    if not all(field in data for field in required_fields):
        return jsonify({"success": False, "message": "Missing AI input data"}), 400

    try:
        risk_result = predict_risk_score(
            data['days_behind'], 
            data['cost_variance_pct'], 
            data['complexity_score']
        )
        return jsonify({"success": True, "risk_analysis": risk_result}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# --- 4. Executor Endpoints (Daily Operations) ---
# For 1st AD/Unit Manager - Handles Daily Progress Reports (DPRs)

@app.route('/api/executor/dpr_submit', methods=['POST'])
def executor_submit_dpr():
    """Executor: Receives daily progress and expense logs."""
    data = request.json
    # In a real app, this data would be saved to a 'DailyReports' collection.
    required_fields = ['scenes_shot', 'daily_spend', 'delay_minutes']
    if not all(field in data for field in required_fields):
        return jsonify({"success": False, "message": "DPR missing required fields"}), 400
    
    print(f"DPR received from {data.get('user', 'Unknown')}: Scenes={data['scenes_shot']}, Spend={data['daily_spend']}")
    
    return jsonify({"success": True, "message": "Daily Progress Report logged successfully."}), 200


# --- 5. Creative Endpoints (VFX/Post-Production) ---
# For VFX Supervisor/Director - Handles asset tracking

@app.route('/api/creative/asset_status', methods=['POST'])
def creative_update_asset():
    """Creative: Updates status of a VFX/Post-Production asset."""
    data = request.json
    # In a real app, this updates the status in a 'VFXAssets' collection.
    required_fields = ['asset_id', 'new_status']
    if not all(field in data for field in required_fields):
        return jsonify({"success": False, "message": "Asset status update missing fields"}), 400
        
    print(f"Asset Status updated for ID {data['asset_id']}: Status={data['new_status']}")
    
    return jsonify({"success": True, "message": f"Asset {data['asset_id']} status updated to {data['new_status']}."}), 200


if __name__ == '__main__':
    # Initialize LVR data on startup
    get_lvr_data() 
    app.run(debug=True, port=5000)
