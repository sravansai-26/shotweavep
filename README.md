---

### 🎬 ShotWeave


**AI-powered Production OS for the Film Industry**  
Built to simplify film production workflows — from pre-production planning to post-production insights.

---

### 🚀 Overview

ShotWeave is a smart production management system designed for modern filmmakers.  
It connects every role in the filmmaking process — producers, directors, crew, and editors — on one AI-driven platform.

With tools for scheduling, budgeting, communication, and creative collaboration, ShotWeave helps streamline production and cut down inefficiencies across the board.

---

### 🧩 Project Structure

```bash
shotweavep/
├── README.md
├── client/          # Frontend (React + TypeScript)
├── server/          # Backend (Python/Node)
├── docker-compose.yml
├── .gitignore

```
---

### ⚙️ How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/sravansai-26/shotweavep.git
cd shotweavep
```

### 2. Run with Docker (Recommended)

```
docker-compose up --build
```

This spins up both the client and server automatically.

### 3. Or Run Manually

Frontend
```bash
cd client
npm install
npm run dev
```

Backend
```bash
cd server
pip install -r requirements.txt
python main.py
```

---

### 🔐 Environment Variables

Create a .env file in both the client and server directories.

Example:
```
DATABASE_URL=
API_KEY=
FIREBASE_CONFIG=
PORT=5000
```

---

### 🧠 Features (Planned + In Progress)

🎥 Production scheduling and role-based task boards

🧾 Budget and resource tracking

💬 Unified communication for crew and departments

🤖 AI-driven project insights (timeline, cost, and risk prediction)

☁️ Cloud sync and real-time collaboration

🔒 Secure authentication and data handling



---

### 🧪 Known Limitations / TODOs

Add Firebase + AI module integration

Improve mobile responsiveness for dashboard

Deploy backend to cloud (Render / AWS / Railway)

Connect file storage for scripts and assets



---

### 👥 Team

ShotWeave is built by a small team of film-tech enthusiasts working to bridge cinema and technology.


---

### 📄 License

This project is under the MIT License.
Feel free to use, modify, and contribute.


---

### 🌐 Links

**GitHub:** 

[https://github.com/sravansai-26/shotweavep.git](https://github.com/sravansai-26/shotweavep.git)

**Project:**

**ShotWeave** — AI-powered Production OS for the Film Industry


---
