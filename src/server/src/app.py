from flask import Flask, request, jsonify
from flask_cors import CORS
from db import register_user, find_user, get_lvr_data
from ai_service import predict_risk_score
import PyPDF2
import docx
import os
import random
from datetime import datetime, timedelta

app = Flask(__name__)
# Allow CORS from the React port (default 5173 or 3000)
CORS(app, resources={r"/api/*": {"origins": "*"}}) 

# --- Helper Functions for File Processing ---
def extract_text_from_pdf(file):
    """Extract text from a PDF file."""
    try:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        return text if text.strip() else None, "No readable text found in PDF" if not text.strip() else None
    except Exception as e:
        return None, f"PDF processing error: {str(e)}"

def extract_text_from_docx(file):
    """Extract text from a DOC/DOCX file."""
    try:
        doc = docx.Document(file)
        text = "\n".join([para.text for para in doc.paragraphs if para.text.strip()])
        return text if text.strip() else None, "No readable text found in DOC/DOCX" if not text.strip() else None
    except Exception as e:
        return None, f"DOCX processing error: {str(e)}"

def process_script_file(file):
    """Process uploaded script file and extract text."""
    if not file or not file.filename:
        return None, "No file provided"
    
    filename = file.filename.lower()
    if filename.endswith('.pdf'):
        text, error = extract_text_from_pdf(file)
    elif filename.endswith(('.doc', '.docx')):
        text, error = extract_text_from_docx(file)
    else:
        return None, "Unsupported file format. Please upload PDF or DOC/DOCX."
    
    return text, error

def generate_dynamic_breakdown(script_text):
    """Generate a detailed script breakdown with scheduling."""
    if not script_text or not script_text.strip():
        return {
            'estimated_shoot_days': 0,
            'scene_count': 0,
            'location_count': 0,
            'character_count': 0,
            'visual_elements': [],
            'scenes': []
        }

    # Simulated NLP processing (replace with actual NLP, e.g., SpaCy, in production)
    lines = script_text.split('\n')
    scene_count = sum(1 for line in lines if line.strip().lower().startswith('scene'))
    scene_count = max(1, scene_count)  # Ensure at least one scene
    location_count = random.randint(max(1, scene_count // 3), scene_count)  # Estimate locations
    character_count = random.randint(5, 20)  # Simulate character detection
    estimated_shoot_days = max(1, scene_count // 5)  # Rough estimate: 5 scenes per day
    visual_elements = ['VFX shots', 'Practical effects', 'Stunt coordination'] if 'action' in script_text.lower() else ['Standard shots']

    # Generate detailed scene breakdown with scheduling
    scenes = []
    current_date = datetime.now()
    for i in range(scene_count):
        scenes.append({
            'scene_number': i + 1,
            'description': f"Scene {i + 1}: {random.choice(['Action sequence', 'Dialogue', 'Montage', 'Interior shot', 'Exterior shot'])}",
            'location': random.choice(['Studio', 'City Street', 'Forest', 'Office', 'Beach']),
            'scheduled_day': (current_date + timedelta(days=i // 5)).strftime('%Y-%m-%d'),
            'estimated_time': f"{random.randint(2, 8)} hours",
            'cast': random.sample(['Lead Actor', 'Supporting Actor', 'Extra 1', 'Extra 2'], random.randint(1, 4)),
            'crew': random.sample(['Director', 'Cinematographer', 'Gaffer', 'Sound Engineer', 'Production Assistant'], random.randint(3, 5)),
            'visual_elements': random.sample(visual_elements, random.randint(1, len(visual_elements)))
        })

    return {
        'estimated_shoot_days': estimated_shoot_days,
        'scene_count': scene_count,
        'location_count': location_count,
        'character_count': character_count,
        'visual_elements': visual_elements,
        'scenes': scenes
    }

# --- 1. User Authentication Endpoints ---

@app.route('/api/signup', methods=['POST'])
def signup():
    """Endpoint for user registration."""
    data = request.json
    required_fields = ['name', 'email', 'username', 'password', 'role']
    if not all(field in data for field in required_fields):
        return jsonify({"success": False, "message": "Missing required fields"}), 400

    try:
        result = register_user(data)
        if result["success"]:
            return jsonify({"success": True, "message": "User registered successfully. Please login."}), 201
        return jsonify({"success": False, "message": result["message"]}), 409  # Conflict
    except Exception as e:
        return jsonify({"success": False, "message": f"Registration error: {str(e)}"}), 500

@app.route('/api/login', methods=['POST'])
def login():
    """Endpoint for user login and credential validation."""
    data = request.json
    if not data.get('username') or not data.get('password'):
        return jsonify({"success": False, "message": "Username and password required"}), 400
    
    try:
        result = find_user(data['username'], data['password'])
        if result["success"]:
            user = result["user"]
            return jsonify({
                "success": True,
                "message": "Login successful",
                "user": {
                    "name": user['name'],
                    "email": user['email'],
                    "username": user['username'],
                    "role": user['role']
                }
            }), 200
        return jsonify({"success": False, "message": result["message"]}), 401  # Unauthorized
    except Exception as e:
        return jsonify({"success": False, "message": f"Login error: {str(e)}"}), 500

# --- 2. Line Producer Endpoints (Operational Planning) ---

@app.route('/api/lp/breakdown', methods=['POST'])
def lp_script_breakdown():
    """Line Producer: Process uploaded script file for detailed breakdown and scheduling."""
    if 'script_file' not in request.files:
        return jsonify({"success": False, "message": "No script file uploaded"}), 400
    
    file = request.files['script_file']
    if not file.filename:
        return jsonify({"success": False, "message": "No file selected"}), 400

    script_text, error = process_script_file(file)
    if script_text is None:
        return jsonify({"success": False, "message": f"Failed to process file: {error}"}), 400

    try:
        breakdown = generate_dynamic_breakdown(script_text)
        return jsonify({"success": True, "breakdown": breakdown}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Breakdown generation error: {str(e)}"}), 500

@app.route('/api/lp/lvr', methods=['GET'])
def lp_get_lvr():
    """Line Producer: Localized Vendor Rating (LVR) data."""
    try:
        lvr_data = get_lvr_data()
        return jsonify({"success": True, "vendors": lvr_data}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"LVR data error: {str(e)}"}), 500

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
        return jsonify({"success": False, "message": f"Risk prediction error: {str(e)}"}), 500

# --- 4. Executor Endpoints (Daily Operations) ---

@app.route('/api/executor/dpr_submit', methods=['POST'])
def executor_submit_dpr():
    """Executor: Receives daily progress and expense logs."""
    data = request.json
    required_fields = ['scenes_shot', 'daily_spend', 'delay_minutes']
    if not all(field in data for field in required_fields):
        return jsonify({"success": False, "message": "DPR missing required fields"}), 400
    
    try:
        print(f"DPR received from {data.get('user', 'Unknown')}: Scenes={data['scenes_shot']}, Spend={data['daily_spend']}")
        return jsonify({"success": True, "message": "Daily Progress Report logged successfully."}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"DPR submission error: {str(e)}"}), 500

# --- 5. Creative Endpoints (VFX/Post-Production) ---

@app.route('/api/creative/asset_status', methods=['POST'])
def creative_update_asset():
    """Creative: Updates status of a VFX/Post-Production asset."""
    data = request.json
    required_fields = ['asset_id', 'new_status']
    if not all(field in data for field in required_fields):
        return jsonify({"success": False, "message": "Asset status update missing fields"}), 400
        
    try:
        print(f"Asset Status updated for ID {data['asset_id']}: Status={data['new_status']}")
        return jsonify({"success": True, "message": f"Asset {data['asset_id']} status updated to {data['new_status']}."}), 200
    except Exception as e:
        return jsonify({"success": False, "message": f"Asset status update error: {str(e)}"}), 500

if __name__ == '__main__':
    try:
        # Initialize LVR data on startup
        get_lvr_data() 
        app.run(debug=True, port=5000)
    except Exception as e:
        print(f"Server startup error: {str(e)}")