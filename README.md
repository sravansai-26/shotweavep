---

# 🎬 ShotWeave — AI-powered Production OS for the Film Industry
---

**Team:**  
- V. Sravan Sai — Team Lead / Backend Developer ([github.com/sravansai-26](https://github.com/sravansai-26))
- k. Pranith — Product & Frontend Engineer ([github.com/Hello-world07](https://github.com/Hello-world07))  
- M. Swayam Prakash — Product & Frontend Engineer ([github.com/swayam-prakash](https://github.com/swayam-prakash))  

---

## 🚀 Elevator Pitch
ShotWeave is an **AI-powered Production OS** built for the film industry.  
It unifies pre-production planning, on-set execution, and post-production insights into one connected workspace — helping filmmakers plan 40% faster, cut costs by 25%, and collaborate seamlessly across all production stages.

---

## 🌐 Live Demo

- **Frontend URL / IP:** `http://203.0.113.12:80`  
- **API Server URL / IP:** `http://203.0.113.12:3000/api`  
- **Endpoints:** see [`deployment/ENDPOINTS.md`](deployment/ENDPOINTS.md)  
- **Demo Video (if offline):** [`assets/demo.mp4`](assets/demo.mp4)  

---

## ⚙️ Quick Start (Local Setup)

### 1. Clone the Repository
```bash
git clone https://github.com/sravansai-26/shotweavep.git
cd shotweavep
```

2. Create .env files

Create .env in both client/ and server/ directories using .env.example.

3. Run with Docker (Recommended)
```
docker compose up --build
```

4. Access locally

Frontend: 
http://localhost:5173

Backend: 
http://localhost:5000



---

🧪 Tests

Run Unit/Integration Tests
```
npm install
npm test
```
(Add test scripts or commands for backend once implemented)


---

🔐 Environment Variables

Variable	Description
```
PORT	Server port
DATABASE_URL	Database connection string
FIREBASE_CONFIG	Firebase credentials
OPENAI_API_KEY	For AI insights module
JWT_SECRET	Authentication secret key
```


---

🧩 Features

🎥 Smart Scheduling & Role-Based Tasking — plan and assign with AI recommendations

💬 Unified Crew Communication — single chat and file hub for all departments

📊 AI Insights — cost, timeline, and resource optimization powered by analytics

☁️ Real-Time Collaboration — all updates synced across crew and departments

🧾 Budget Management — transparent cost tracking and version history



---

⚠️ Known Limitations / TODOs

AI module for script breakdown under active development

Limited offline support in current version

Need optimization for large datasets (>1k tasks)

To be deployed on cloud (Render / Railway)



---

🧭 Deployment

Service	Protocol	Host/IP	Port	Example URL

Web Frontend	http	203.0.113.12	80	http://203.0.113.12/
API Server	http	203.0.113.12	3000	http://203.0.113.12:3000/api
Database	tcp	203.0.113.13	5432	N/A


(See full table in deployment/ENDPOINTS.md)


---

📄 License

This project is licensed under the MIT License.
See LICENSE for details.


---

🫱 Consent for Local Access

By submitting this project, we consent to event organizers and judges accessing the listed local endpoints while connected to the event Wi-Fi for evaluation purposes.
We understand that organizers will not access private data and will only use provided credentials.


---

🖇️ Attributions

UI built with React + TailwindCSS

Backend: Node.js / Python microservices

AI layer: OpenAI API integration

Maps: Google Maps Platform

Firebase: Auth & real-time database



---

📂 Related Files

deployment/ENDPOINTS.md — All IPs and ports

assets/presentation.pdf — Final pitch deck

assets/demo.mp4 — Demo video walkthrough



---

Contact:
📧 cinehack.ai@gmail.com (for official event support)
📍 Team: The Final Cut — Hackathon Submission for CineHack.ai 2025

---
