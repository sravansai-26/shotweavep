
---

# 🎬 ShotWeave

**AI-powered Production OS for the Film Industry**
Built to simplify film production workflows — from pre-production planning to post-production insights.

---

## 🚀 Overview

**ShotWeave** is a smart production management system designed for modern filmmakers.
It connects every role in the filmmaking process — producers, directors, crew, and editors — on one AI-driven platform.

With tools for **scheduling, budgeting, communication,** and **creative collaboration**, ShotWeave streamlines production and reduces inefficiencies across all stages of filmmaking.

---

## 🧩 Project Structure

```bash
shotweavep/
├── README.md
├── client/              # Frontend (React + TypeScript)
├── server/              # Backend (Python/Node)
├── docker-compose.yml   # Container setup
├── .gitignore
```

---

## ⚙️ Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sravansai-26/shotweavep.git
cd shotweavep
```

### 2. Run with Docker (Recommended)

```bash
docker-compose up --build
```

> This will automatically spin up both the frontend and backend containers.

### 3. Run Manually (Alternative)

#### Frontend

```bash
cd client
npm install
npm run dev
```

#### Backend

```bash
cd server
pip install -r requirements.txt
python main.py
```

---

## 🔐 Environment Variables

Create a `.env` file in both the `client/` and `server/` directories.

Example:

```
DATABASE_URL=
API_KEY=
FIREBASE_CONFIG=
PORT=5000
```

---

## 🧠 Features (Planned + In Progress)

* 🎥 **Production scheduling** and role-based task boards
* 🧾 **Budget** and resource tracking
* 💬 **Unified communication** for crew and departments
* 🤖 **AI-driven insights** — timeline, cost, and risk prediction
* ☁️ **Cloud sync** and real-time collaboration
* 🔒 **Secure authentication** and data handling

---

## 🧪 Known Limitations / TODOs

* Integrate Firebase + AI modules
* Improve dashboard mobile responsiveness
* Deploy backend to cloud (Render / AWS / Railway)
* Connect file storage for scripts and media assets

---

## 👥 Team

**ShotWeave** is built by a small team of film-tech enthusiasts working to bridge **cinema and technology**.

---

## 📄 License

This project is licensed under the **MIT License**.
Feel free to use, modify, and contribute.

---

## 🌐 Links

🔗 **GitHub Repository:** 
[https://github.com/sravansai-26/shotweavep](https://github.com/sravansai-26/shotweavep)

🎞️ **Project:** 
*ShotWeave — AI-powered Production OS for the Film Industry*

---
