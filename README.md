---

# Shotweave: Integrated Production Management System

---
### **1. Project Name & Elevator Pitch**

**Project Name:** Shotweave: Integrated Production Management System

**1-Line Elevator Pitch:** Shotweave is an AI-powered financial and production OS that transforms film financing from reactive budgeting to proactive, predictive risk mitigation for regional cinema.

---

### **2. Project Folder Structure**

```bash
shotweavep/
├── README.md
├── assets
│   ├── The-Final-Cut_Team.pptx
│   └── shotweavefinaldemo.mp4
├── deployment
│   ├── ENDPOINTS.md
│   └── docker-compose.yml
├── pages
├── scripts
│   ├── seed_db.py
│   └── start.sh
├── src
│   ├── client
│   │   ├── public
│   │   │   └── vite.svg
│   │   └── src
│   └── server
├── .gitignore
├── App.css
├── App.tsx
├── Dockerfile
├── README.md
├── eslint.config.js
├── index.css
├── index.html
├── main.tsx
├── nginx.conf
├── package-lock.json
└── package.json
```

---

### **3. Team & Contact Information**

| Role                          | Name               | GitHub Handle   | Email                                                       |
| ----------------------------- | ------------------ | --------------- | ----------------------------------------------------------- |
| Team Lead / Backend Architect | Vuppula Sravan Sai | @sravansai26    | [sai1234comon@gmail.com](mailto:sai1234comon@gmail.com)     |
| Frontend / UX Specialist      | Konda Pranith      | @Hello-world07  | [pranithkondakp@gmail.com](mailto:pranithkondakp@gmail.com) |
| AI/ML Specialist              | Swayam Prakash     | @swayamprakashm | [mail4mswayam@gmail.com](mailto:mail4mswayam@gmail.com)     |
| **Team Name**                 | **The Final Cut**  |                 |                                                             |

---

### **4. Technical Overview & Stack**

Shotweave leverages a unified Python/Flask backend for AI processing and API handling, paired with a modern React/Vite frontend to deliver a cinematic user experience.

| Component       | Technology                               | Core Functionality                                                         |
| --------------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| **Frontend**    | React, Vite, Tailwind CSS, Framer Motion | Cinematic UI, Dynamic Role-Based Dashboards, Smooth Transitions            |
| **Backend API** | Python, Flask, Flask-CORS                | Secure User Auth (with **BCrypt Hashing**), REST Endpoints for all 4 roles |
| **AI/ML Core**  | SpaCy (NLP)                              | Script breakdown, location/character identification, scheduling estimates  |
| **AI/ML Core**  | Scikit-learn                             | Predictive Regression Model for AI Risk Meter                              |
| **Database**    | MongoDB                                  | Flexible NoSQL data storage for users, vendors, and production data        |

---

### **5. How to Run Locally (Step-by-Step)**

The project can be run either natively (requires Python/Node) or via Docker Compose (recommended for stable demo environments).

#### A. Prerequisites

* Node.js (v18+) & NPM
* Python (v3.10+) & pip
* MongoDB Instance (Local or Cloud) running on port 27017.

#### B. Setup (Backend First)

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sravansai-26/shotweavep.git
   cd shotweavep
   ```

2. **Configure Environment:** Create a `.env` file in the project root or inside the `src/server/` directory.

   ```bash
   # src/server/.env (or project root .env)
   MONGO_URI="mongodb://localhost:27017/shotweave"
   ```

3. **Run Backend (Flask/AI):**

   ```bash
   # Navigate to the server directory
   cd src/server
   # Install dependencies (ensure a virtual environment is active)
   pip install -r requirements.txt
   # Run the Flask app
   python app.py
   ```

   *(The backend will be available at [http://127.0.0.1:5000](http://127.0.0.1:5000))*

4. **Run Frontend (React):**

   ```bash
   # Navigate to the client directory
   cd ../client
   # Install dependencies (use this flag for common ESLint/Vite compatibility issues)
   npm install --legacy-peer-deps
   # Run the React development server
   npm run dev
   ```

   *(The frontend will be available at [http://127.0.0.1:5173](http://127.0.0.1:5173))*

#### C. Testing & User Credentials

* **Access:** Navigate to [http://127.0.0.1:5173](http://127.0.0.1:5173)
* **Create Users:** Visit `/signup` and create users for all four roles (Producer/CEO, Line Producer, 1st AD/Unit Manager, VFX Supervisor/Director) to test dynamic routing.

---

### **6. Deployment & Endpoints (REQUIRED)**

Explicit service endpoints are listed in the required format.

#### A. IP Address & Port Reporting

Refer to the table in [deployment/ENDPOINTS.md](deployment/ENDPOINTS.md).

> **Note:** If you cannot host the application publicly, a demonstration video is available.

#### B. Docker Compose (For Validation)

The project includes Dockerfiles and a `docker-compose.yml` file for automated setup, which is the recommended method for validation.

1. **Install Docker & Docker Compose.**

2. **Run the services:**

   ```bash
   docker-compose up --build -d
   ```

3. **Access:** The application will be live at [http://localhost:5173](http://localhost:5173).

#### C. Demonstration and Documentation Assets

| Component                           | Status | File Path                          |
| ----------------------------------- | ------ | ---------------------------------- |
| **Demo Video (Offline Submission)** | Yes    | **assets/shotweavefinaldemo.mp4**  |
| **Project Presentation**            | Yes    | **assets/The-Final-Cut_Team.pptx** |

---

### **7. Known Limitations & TODOs (MVP Scope)**

| Category        | Limitation                                                       | Future Work / TODO                                                                             |
| --------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **AI/ML**       | Models are trained on mock data (for security and speed).        | Train Scikit-learn model on industry-validated datasets. Implement NLP for regional languages. |
| **Security**    | MongoDB URI requires local configuration in `.env`.              | Implement token-based (JWT) authentication.                                                    |
| **Integration** | Dashboards use mock input forms for the Risk Meter calculation.  | Implement a real Daily Progress Report (DPR) to dynamically feed the Risk Meter model.         |
| **LVR**         | Vendor contact/deal-making is simulated via a client-side delay. | Integrate actual email API for automated quote generation/acceptance.                          |

---

### **8. License and Attributions**

This project is licensed under the **MIT License**. (See the `LICENSE` file for full details.)

**Attributions:**

* **NLP Core:** SpaCy
* **Predictive Analysis:** Scikit-learn
* **UI/UX:** Framer Motion and Tailwind CSS

---

### **Contact:**

* 📧 [cinehack.ai@gmail.com](mailto:cinehack.ai@gmail.com) (for official event support)
* 📍 Team: The Final Cut — Hackathon Submission

---
