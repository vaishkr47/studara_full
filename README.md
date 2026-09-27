# 🚀 STUDARA
### *Smart Tutorial & Unified Data-driven Academic Resource Advisor*

> **Empowering Smart Learning**
>
> A futuristic educational web application that provides academic guidance, skill-based learning, curated YouTube learning resources, and ethical AI assistance for students.

---

## 📌 Overview

STUDARA is a modern educational platform designed to help students learn effectively through structured academic guidance, skill development, and AI-powered assistance.

Unlike traditional educational platforms that focus only on content delivery, STUDARA focuses on:

- **Academic Learning Support**
- **Skill-Based Development**
- **Ethical AI Assistance**
- **Curated YouTube Learning Resources**
- **Student-Friendly Learning Experience**

---

## ✨ Features

### 📚 Structured Curriculum
- Organized learning pathways
- Topic-wise educational guidance
- Standard-wise learning support (Class 9, Class 10, Class 11, Class 12)

### 🚀 Skill-Based Learning
- Logical thinking development
- Problem-solving skills
- Career awareness guidance
- Practical learning approach

### 🤖 AI Learning Assistant
- Multi-criteria weighted scoring (Relevance 40%, Clarity 30%, Depth 30%)
- Simplifies difficult concepts
- Encourages self-learning
- Ethical AI hints and conceptual guidance

### 🎥 Smart Video Recommendations
- Grade-wise filtering
- Subject-wise filtering (Physics, Chemistry, Mathematics, Biology, Computer Science, Social Studies)
- Topic-wise filtering
- Displays top 3 relevant educational YouTube videos with real-time thumbnail enrichment

### 📱 Fully Responsive
- Mobile Friendly
- Tablet Friendly
- Desktop Friendly

---

## 🏗️ Pages

### 🏠 Home Page
- Hero Section
- Feature Cards
- Why STUDARA
- Skill Development
- AI Assistance Overview

### 🔐 Login & Register Page
- User Authentication Interface (JWT in HTTP-only Cookies + bcrypt)
- Glassmorphism Design
- Responsive Layout

### 📚 Learning Selection Page
Students can select:
- Grade / Class Level
- Subject
- Topic  
and start learning instantly.

### 🎥 Learning Resources Page
Displays:
- Top 3 AI-Ranked YouTube Videos
- AI Assistant Recommendations
- Save to Watch Later options

### 📖 About Page
- Mission & Vision
- Platform Overview & Social Impact
- Technology Badges

### 📞 Contact & Help Page
- Accordion FAQs
- Support Guidance

---

## 🎨 UI Design

Inspired by modern futuristic educational platforms.

### Color Palette

| Color | Hex |
|---|---|
| Black | `#050505` |
| Dark Crimson | `#24000A` |
| Wine Red | `#4A0014` |
| Neon Red | `#FF204E` |
| Soft Pink | `#FF4D6D` |
| White | `#FFFFFF` |

### Design Style
- Glassmorphism
- Neon Glow Effects
- Dark Theme
- Smooth Animations (Framer Motion + CSS Particles)
- Modern UI/UX

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React.js 19 (TypeScript)
- **Markup & Styling**: HTML5, CSS3, Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite 6

### Backend
- **Runtime**: Node.js & Express.js (TypeScript)
- **Security**: JWT (HTTP-only cookies) + `bcryptjs` password hashing

### APIs & AI Integration
- **YouTube Data API v3** (Server-side proxy)
- **AI Assistant API** (Google Gemini `gemini-2.0-flash` server-side proxy)

### Database
- **MongoDB Atlas** via Mongoose (User Accounts & Watch Later persistence)

---

## 📂 Project Structure

```text
studara/
│
├── frontend/                   # React 19 + TypeScript SPA
│   ├── public/
│   │   └── logo.png            # STUDARA Brand Logo
│   ├── src/
│   │   ├── App.tsx             # All SPA Pages, Router & Components
│   │   ├── index.css           # Glassmorphism & Neon Glow Design System
│   │   └── main.tsx            # React Entry Point
│   ├── .env                    # Frontend Config (VITE_API_BASE_URL)
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                    # Express.js + TypeScript REST API
│   ├── src/
│   │   ├── config/db.ts        # MongoDB Atlas Connection
│   │   ├── controllers/        # Auth, Video, & WatchLater Logic
│   │   ├── middleware/auth.ts  # HTTP-only Cookie JWT Verifier
│   │   ├── models/             # Mongoose User & WatchLater Schemas
│   │   ├── routes/             # Auth, Video, WatchLater, YouTube & AI Proxies
│   │   └── server.ts           # Express Server Entry Point
│   ├── .env.example            # Backend Environment Variables Template
│   ├── package.json
│   └── tsconfig.json
│
├── render.yaml                 # Render Deployment Config
└── README.md
```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/studara
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
AI_API_KEY=your_ai_api_key
YOUTUBE_API_KEY=your_youtube_api_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## ⚙️ Installation & Running the Application

### 1. Clone the repository
```bash
git clone https://github.com/vaishkr47/studara_full.git
cd studara_full
```

### 2. Run Backend
```bash
cd backend
npm install
npm run dev
```
*Runs on `http://localhost:5000`*

### 3. Run Frontend (in a new terminal)
```bash
cd frontend
npm install
npm run dev
```
*Runs on `http://localhost:5173`*

---

## 🏗️ Build for Production

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

### Backend
```bash
cd backend
npm run build
npm start
```

---

## ☁️ Deploy (free, for demo) — Render

Local development is unchanged. Deployment settings live only in `render.yaml`
and are active only when `NODE_ENV=production` (set by Render).

1. Sign in at https://render.com with GitHub.
2. **New → Blueprint** → pick this repo → Render reads `render.yaml`.
3. Fill in `MONGODB_URI`, `GEMINI_API_KEY`, `AI_API_KEY`, `YOUTUBE_API_KEY`
   (same values as `backend/.env`). `JWT_SECRET` is generated automatically.
4. In MongoDB Atlas → **Network Access**, allow `0.0.0.0/0` so Render can connect.
5. Open the `https://studara-xxxx.onrender.com` URL Render gives you.

The whole app (frontend + API) runs on that one URL. Free services sleep when idle,
so the first visit can take ~50 seconds to wake up.

---

## 🎯 Application Flow

```text
Home Page
    ↓
Login / Register Page
    ↓
Select Grade / Class Level
    ↓
Select Subject
    ↓
Select Topic
    ↓
Start Learning
    ↓
Recommended YouTube Videos
    ↓
AI Learning Assistant
```

---

## 🔮 Future Enhancements

- Student Dashboard & Personalization
- Progress Tracking & Learning Metrics
- Teacher & Mentor Portal
- Interactive Quiz & Assessment System
- Multi-language Support
- Personalized Learning Paths
- Enhanced AI Tutor Dialogue
- Firebase Authentication Integration

---

## 👩‍💻 Developed By

**STUDARA Development Team** 

- **Shravani N**
- **Chattu Srilakshmi**
- **Likitha R Naik**
- **Vaishnavi K R**
- **Tejaswini K**

**STUDARA — Learning with clarity. Skills with purpose.**

---

## ⭐ Support

If you like this project, please give it a ⭐ on GitHub!
