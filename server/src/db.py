# server/src/db.py
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env

# Replace with your actual MongoDB connection string
# For local dev: "mongodb://localhost:27017/shotweavep"
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/shotweavep") 

try:
    client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    # Ping the database to check the connection
    client.admin.command('ping') 
    db = client.shotweave
    print("MongoDB connection successful!")
except Exception as e:
    print(f"MongoDB connection failed: {e}")
    db = None

# --- User Management ---

def register_user(user_data):
    """Registers a new user (Name, Email, Username, Hashed Password, Role)."""
    # FIX APPLIED HERE: Changed 'if db:' to 'if db is not None:'
    if db is not None:
        # Check if username or email already exists
        if db.users.find_one({"$or": [{"username": user_data['username']}, {"email": user_data['email']}]}):
            return {"success": False, "message": "Username or Email already exists."}
        
        # Insert new user
        result = db.users.insert_one(user_data)
        return {"success": True, "user_id": str(result.inserted_id)}
    return {"success": False, "message": "Database not connected."}

def find_user(username, password):
    """Finds a user by username and validates the password."""
    # FIX APPLIED HERE: Changed 'if db:' to 'if db is not None:'
    if db is not None:
        # In a real app, password should be securely hashed and compared
        user = db.users.find_one({"username": username, "password": password}, {"_id": 0})
        if user:
            return {"success": True, "user": user}
        else:
            return {"success": False, "message": "Invalid username or password."}
    return {"success": False, "message": "Database not connected."}

# --- LVR Data Setup (Mock) ---

def get_lvr_data():
    """Returns mock LVR data for the Line Producer dashboard."""
    # FIX APPLIED HERE: Changed 'if db:' to 'if db is not None:'
    if db is not None: 
        # Check if vendors collection is empty and seed data
        if db.vendors.count_documents({}) == 0:
            vendors = [
                {"name": "Prime Camera Rentals", "type": "Camera Unit", "lvr_score": 92, "reliability": "High", "price_competitiveness": "Good", "contact": "cam@prime.in"},
                {"name": "VFX Nexus Studios", "type": "VFX Unit", "lvr_score": 85, "reliability": "Medium", "price_competitiveness": "Average", "contact": "vfx@nexus.com"},
                {"name": "Kerala Lights Crew", "type": "Lighting Unit", "lvr_score": 78, "reliability": "Medium", "price_competitiveness": "Excellent", "contact": "klc@crew.net"},
                {"name": "South Sound Design", "type": "Sound Unit", "lvr_score": 95, "reliability": "High", "price_competitiveness": "Good", "contact": "sound@ssd.co"}
            ]
            db.vendors.insert_many(vendors)
    
    # FIX APPLIED HERE: Changed 'if db:' to 'if db is not None:'
    if db is not None:
        # Retrieve all vendors, excluding MongoDB's internal ID
        return list(db.vendors.find({}, {"_id": 0}))
    return []