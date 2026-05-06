# ResumeAI — Full-Stack Resume Builder

A professional, AI-powered Resume Builder SaaS application with a modern dark UI.

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React 18 + Vite + Tailwind  |
| Backend    | Node.js + Express.js        |
| Database   | MongoDB + Mongoose          |
| HTTP Client| Axios                       |

---

## Project Structure

```
resume-builder/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateResume.jsx
│   │   │   ├── AnalyzeResume.jsx
│   │   │   └── JobRecommendations.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── StatsCard.jsx
│   │   │   └── ResumeCard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
│
└── server/                  # Express backend
    ├── config/
    │   └── db.js
    ├── models/
    │   ├── User.js
    │   ├── Resume.js
    │   └── Job.js
    ├── controllers/
    │   ├── userController.js
    │   ├── resumeController.js
    │   └── jobController.js
    ├── routes/
    │   ├── userRoutes.js
    │   ├── resumeRoutes.js
    │   └── jobRoutes.js
    ├── server.js
    └── package.json
```

---

## Quick Start

### 1. Start the Backend

```bash
cd server
cp .env.example .env        # edit MONGODB_URI if needed
npm install
npm run dev
# → Runs on http://localhost:5000
```

### 2. Start the Frontend

```bash
cd client
npm install
npm run dev
# → Runs on http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint                    | Description              |
|--------|-----------------------------|--------------------------|
| GET    | /api/health                 | Server health check      |
| POST   | /api/users/register         | Register new user        |
| GET    | /api/users/:id              | Get user profile         |
| GET    | /api/resumes                | Get all resumes          |
| POST   | /api/resumes                | Create resume            |
| GET    | /api/resumes/:id            | Get single resume        |
| PUT    | /api/resumes/:id            | Update resume            |
| DELETE | /api/resumes/:id            | Delete resume            |
| POST   | /api/resumes/:id/analyze    | AI ATS analysis          |
| POST   | /api/resumes/:id/duplicate  | Duplicate resume         |
| GET    | /api/jobs                   | Get all jobs             |
| POST   | /api/jobs/match             | AI job matching          |

---

## Pages

| Route                  | Page                    |
|------------------------|-------------------------|
| `/`                    | Landing Page            |
| `/dashboard`           | Dashboard Overview      |
| `/dashboard/create`    | Create Resume (wizard)  |
| `/dashboard/analyze`   | AI Resume Analyzer      |
| `/dashboard/jobs`      | Job Recommendations     |

---

## Design System

| Token          | Value       |
|----------------|-------------|
| Background     | `#0f172a`   |
| Cards          | `#1e293b`   |
| Surface        | `#0d1424`   |
| Accent         | `#6366f1`   |
| Text           | `#e2e8f0`   |
| Muted text     | `#64748b`   |
| Border         | `#334155`   |

---

## Environment Variables

```env
# server/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume_builder
NODE_ENV=development
JWT_SECRET=your_secret_here
OPENAI_API_KEY=your_openai_key_here   # for AI features
```
