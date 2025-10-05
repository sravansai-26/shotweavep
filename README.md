# Shotweave: Integrated Production Management System

**1-Line Elevator Pitch:** Shotweave is an AI-powered financial and production OS that transforms film financing from reactive budgeting to proactive, predictive risk mitigation for regional cinema.

***

## 1. Team & Contact Information

| Role | Name | GitHub Handle | Email |
| :--- | :--- | :--- | :--- |
| **Team Lead / Backend Architect** | [Vuppula Sravan Sai] | `@sravansai26` | [sai1234comon@gmail.com] |
| **Frontend / UX Specialist** | [Konda Pranith] | `@Hello-world07` | [pranithkondakp@gmail.com] |
| **AI/ML Specialist** | [Swayam Prakash] | `@swayamprakashm` | [mail4mswayam@gmail.com] |
| **Team Name** | **The Final Cut** | | |

***

## 2. Technical Overview & Stack

Shotweave uses a unified **Python/Flask** backend for its heavy lifting (AI/API) and a modern **React/Vite** frontend for a cinematic user experience.

| Component | Technology | Core Functionality |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, **Framer Motion** | Cinematic UI, Role-Based Dashboards, Smooth Transitions. |
| **Backend API** | Python, Flask, Flask-CORS | Secure User Auth, REST Endpoints. |
| **AI/ML Core** | **SpaCy (NLP)** | Script breakdown, location/character identification, scheduling estimates. |
| **AI/ML Core** | **Scikit-learn** | Predictive Regression Model for **AI Risk Meter**. |
| **Database** | MongoDB | Flexible NoSQL data storage for users, vendors, and production data. |

***

## 3. How to Run Locally (Step-by-Step)

The project can be run natively (requires Python/Node) or via Docker Compose (recommended for a stable demo).

### A. Prerequisites

* Node.js (v18+) & NPM
* Python (v3.10+) & pip
* **MongoDB Instance** (Local or Cloud) running on port `27017`.

### B. Setup (Backend First)

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_GITHUB_REPO_URL]
    cd shotweave-repo
    ```

2.  **Configure Environment:** Create a file named **`.env`** inside the **`src/server/`** directory.

    *src/server/.env*
    ```
    MONGO_URI="mongodb://localhost:27017/shotweave" 
    ```

3.  **Run Backend (Flask/AI):**
    ```bash
    # Navigate to the server directory
    cd src/server
    # Activate virtual environment (Windows/PowerShell)
    .\venv\Scripts\activate 
    # Install dependencies (already done, but as a safeguard)
    pip install -r requirements.txt
    # Run the Flask app
    python src/app.py 
    ```
    *(The backend will start on **http://127.0.0.1:5000**)*

4.  **Run Frontend (React):**
    ```bash
    # Navigate to the client directory
    cd ../client 
    # Install dependencies (already done, but as a safeguard)
    npm install --legacy-peer-deps
    # Run the React development server
    npm run dev
    ```
    *(The frontend will start on **http://127.0.0.1:5173**)*

### C. Testing & User Credentials

* **Initial Test:** Navigate to `http://127.0.0.1:5173`
* **Create Users:** Go to `/signup` and create two users: one as **Producer/CEO** and one as **Line Producer**.
* **Login Test:** Use the created credentials to log in and confirm role-based routing to the respective dashboards.

***

## 4. Deployment Instructions (Docker Compose)

For a guaranteed, one-click scalable demonstration environment.

1.  **Install Docker & Docker Compose.**
2.  **Navigate to the deployment folder:**
    ```bash
    cd deployment
    ```
3.  **Run the services:**
    ```bash
    docker-compose up --build -d
    ```
    *(This builds the API and Client images and runs them.)*
4.  **Access:** The application will be live at `http://localhost:5173`.

### Live Demo URL / IP & Ports

| Component | Status | Host/Port |
| :--- | :--- | :--- |
| **Frontend (UI)** | **Live** | `[INSERT LIVE PUBLIC IP]:5173` |
| **Backend (API)** | **Live** | `[INSERT LIVE PUBLIC IP]:5000` |
| **Video Walkthrough** | **Yes** | `[INSERT LINK TO YOUTUBE/DRIVE VIDEO]` |

***

## 5. Known Limitations & TODOs (MVP Scope)

| Category | Limitation | Future Work / TODO |
| :--- | :--- | :--- |
| **AI/ML** | Models are trained on mock data (for security and speed). | Train Scikit-learn model on industry-validated data sets. Implement NLP for regional languages (e.g., Malayalam). |
| **Security** | Passwords are stored in plain text in MongoDB (MVP scope). | Implement secure hashing (BCrypt) and JWT for token-based authentication. |
| **UI** | Dashboards use mock input forms for Risk Meter. | Implement real Daily Progress Report (DPR) and expense logging to dynamically feed the Risk Meter. |
| **LVR** | Vendor Contact/Deal-Making is simulated. | Integrate actual email API for automated quote generation/acceptance. |

***

## 6. License and Attributions

This project is licensed under the [LICENSE NAME, e.g., MIT License].

Attributions:
* NLP Core: SpaCy
* Predictive Analysis: Scikit-learn
* UI/UX: Framer Motion