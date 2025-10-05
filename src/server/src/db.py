from pymongo import MongoClient
import os
from dotenv import load_dotenv
import bcrypt
import time

load_dotenv()  # Load environment variables from .env

# Use consistent database name (shotweave instead of shotweavep)
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/shotweave") 

# Initialize MongoDB connection with retry logic
def connect_to_mongo():
    retries = 3
    for attempt in range(retries):
        try:
            client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
            # Ping the database to check the connection
            client.admin.command('ping') 
            print("MongoDB connection successful!")
            return client
        except Exception as e:
            print(f"MongoDB connection attempt {attempt + 1} failed: {e}")
            if attempt < retries - 1:
                time.sleep(2)  # Wait before retrying
            else:
                print("MongoDB connection failed after retries.")
                return None

client = connect_to_mongo()
db = client.shotweave if client else None

# Mock vendor data for fallback
MOCK_VENDORS = [
    {"name": "Prime Camera Rentals", "type": "Camera Unit", "lvr_score": 92, "reliability": "High", "price_competitiveness": "Good", "contact": "cam@prime.in"},
    {"name": "VFX Nexus Studios", "type": "VFX Unit", "lvr_score": 85, "reliability": "Medium", "price_competitiveness": "Average", "contact": "vfx@nexus.com"},
    {"name": "Kerala Lights Crew", "type": "Lighting Unit", "lvr_score": 78, "reliability": "Medium", "price_competitiveness": "Excellent", "contact": "klc@crew.net"},
    {"name": "South Sound Design", "type": "Sound Unit", "lvr_score": 95, "reliability": "High", "price_competitiveness": "Good", "contact": "sound@ssd.co"}
]

# --- User Management ---

def register_user(user_data):
    """Registers a new user (Name, Email, Username, Hashed Password, Role)."""
    if db is not None:
        try:
            # Check if username or email already exists
            if db.users.find_one({"$or": [{"username": user_data['username']}, {"email": user_data['email']}]}):
                return {"success": False, "message": "Username or email already exists."}
            
            # Hash the password
            hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())
            user_data['password'] = hashed_password.decode('utf-8')  # Store as string
            
            # Insert new user
            result = db.users.insert_one(user_data)
            return {"success": True, "user_id": str(result.inserted_id), "message": "User registered successfully."}
        except Exception as e:
            print(f"Database error during registration: {e}")
            return {"success": False, "message": f"Registration failed: {str(e)}"}
            
    return {"success": False, "message": "Database not connected. Please try again later."}

def find_user(username, password):
    """Finds a user by username and validates the password."""
    if db is not None:
        try:
            user = db.users.find_one({"username": username}, {"_id": 0})
            if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
                return {"success": True, "user": {
                    "name": user['name'],
                    "email": user['email'],
                    "username": user['username'],
                    "role": user['role']
                }}
            return {"success": False, "message": "Invalid username or password."}
        except Exception as e:
            print(f"Database error during login: {e}")
            return {"success": False, "message": f"Login failed: {str(e)}"}
            
    return {"success": False, "message": "Database not connected. Please try again later."}

# --- LVR Data Setup ---

def get_lvr_data():
    """Returns LVR data for the Line Producer dashboard."""
    if db is not None:
        try:
            # Seed mock data if vendors collection is empty
            if db.vendors.count_documents({}) == 0:
                db.vendors.insert_many(MOCK_VENDORS)
                print("Seeded mock vendor data.")
            
            # Retrieve all vendors, excluding MongoDB's internal ID
            return list(db.vendors.find({}, {"_id": 0}))
        except Exception as e:
            print(f"Database error during LVR retrieval: {e}")
            return MOCK_VENDORS  # Fallback to mock data
            
    print("Database not connected. Returning mock vendor data.")
    return MOCK_VENDORS