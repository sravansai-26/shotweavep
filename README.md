Shotweave: Integrated Production Management System
🚀 1. Project Name & Elevator Pitch
Project Name: Shotweave: Integrated Production Management System

1-Line Elevator Pitch: Shotweave is an AI-powered financial and production OS that transforms film financing from reactive budgeting to proactive, predictive risk mitigation for regional cinema.

👥 2. Team & Contact Information
Role

Name

GitHub Handle

Email

Team Lead / Backend Architect

Vuppula Sravan Sai

@sravansai26

sai1234comon@gmail.com

Frontend / UX Specialist

Konda Pranith

@Hello-world07

pranithkondakp@gmail.com

AI/ML Specialist

Swayam Prakash

@swayamprakashm

mail4mswayam@gmail.com

Team Name

The Final Cut





📝 3. Technical Overview & Stack
Shotweave uses a unified Python/Flask backend for its heavy lifting (AI/API) and a modern React/Vite frontend for a cinematic user experience.

Component

Technology

Core Functionality

Frontend

React, Vite, Tailwind CSS, Framer Motion

Cinematic UI, Dynamic Role-Based Dashboards, Smooth Transitions.

Backend API

Python, Flask, Flask-CORS

Secure User Auth, REST Endpoints for all 4 roles.

AI/ML Core

SpaCy (NLP)

Script breakdown, location/character identification, scheduling estimates.

AI/ML Core

Scikit-learn

Predictive Regression Model for AI Risk Meter.

Database

MongoDB

Flexible NoSQL data storage for users, vendors, and production data.

⚙️ 4. How to Run Locally (Step-by-Step)
The project can be run natively (requires Python/Node) or via Docker Compose (recommended for a stable demo).

A. Prerequisites
Node.js (v18+) & NPM

Python (v3.10+) & pip

MongoDB Instance (Local or Cloud) running on port 27017.

B. Setup (Backend First)
Clone the repository:

git clone [https://github.com/sravansai-26/shotweavep.git](https://github.com/sravansai-26/shotweavep.git)
cd shotweavep

Configure Environment: Create a file named .env inside the src/server/ directory.

src/server/.env

MONGO_URI="mongodb://localhost:27017/shotweave" 

Run Backend (Flask/AI):

# Navigate to the server directory
cd src/server
# Activate virtual environment (Windows/PowerShell)
.\venv\Scripts\activate 
# Run the Flask app
python src/app.py 

(The backend will start on http://127.0.0.1:5000)

Run Frontend (React):

# Navigate to the client directory
cd ../client 
# Install dependencies (use this flag due to ESLint/Vite compatibility)
npm install --legacy-peer-deps
# Run the React development server
npm run dev

(The frontend will start on http://127.0.0.1:5173)

C. Testing & User Credentials
Access: Navigate to http://127.0.0.1:5173

Create Users: Go to /signup and create users for all four roles (Producer/CEO, Line Producer, 1st AD/Unit Manager, VFX Supervisor/Director) to test dynamic routing.

🌐 5. Deployment Instructions (Docker Compose)
The project includes Dockerfiles and a docker-compose.yml in the deployment/ folder for easy deployment.

Install Docker & Docker Compose.

Navigate to the deployment folder:

cd deployment

Run the services:

docker-compose up --build -d

Access: The application will be live at http://localhost:5173.

Live Demo URL / IP & Ports (For Judges)
Component

Status

Host/Port

Frontend (UI)

Live

[INSERT LIVE PUBLIC IP]:5173

Backend (API)

Live

[INSERT LIVE PUBLIC IP]:5000

Demo Video (if offline):

Yes

[INSERT LINK TO YOUTUBE/DRIVE VIDEO]

⚠️ 6. Known Limitations & TODOs (MVP Scope)
Category

Limitation

Future Work / TODO

AI/ML

Models are trained on mock data (for security and speed).

Train Scikit-learn model on industry-validated data sets. Implement NLP for regional languages.

Security

Passwords are stored in plain text in MongoDB (MVP scope).

Implement secure hashing (BCrypt) and JWT for token-based authentication.

Integration

Dashboards use mock input forms.

Implement real Daily Progress Report (DPR) to dynamically feed the Risk Meter.

LVR

Vendor Contact/Deal-Making is simulated.

Integrate actual email API for automated quote generation/acceptance.

7. License and Attributions
This project is licensed under the MIT License.
(See LICENSE file for full details.)

Attributions:

NLP Core: SpaCy

Predictive Analysis: Scikit-learn

UI/UX: Framer Motion and Tailwind CSS

Contact:
📧 cinehack.ai@gmail.com (for official event support)
📍 Team: The Final Cut — Hackathon Submission


### Next Steps (Commit & Push)

1.  **Save** the content above into your **`README.md`** file, overwriting the conflicted markers.
2.  **Run the final commands** in your terminal:

    ```bash
    # 1. Stage the resolved file
    git add README.md 

    # 2. Commit the merge resolution
    git commit --no-edit # This uses the default merge message

    # 3. Final Push
    git push origin main
