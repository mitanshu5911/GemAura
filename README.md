# 💎 GemAura – AI-Based Gemstone Recommendation Platform

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Full%20Stack-green" />
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-orange" />
  <img src="https://img.shields.io/badge/Frontend-React%20+%20Tailwind-blue" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20+%20Express-success" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen" />
</p>

GemAura is a modern AI-powered gemstone recommendation platform that combines **traditional Vedic astrology concepts** with **Google Gemini AI** to provide personalized gemstone suggestions based on a user's birth details and life goals.

The application delivers an elegant user experience with premium UI, intelligent recommendations, recommendation history, and AI-generated explanations.

---

# ✨ Features

## 🤖 AI Gemstone Recommendation
- Personalized gemstone suggestions using Google Gemini AI.
- Considers:
  - Full Name
  - Date of Birth
  - Birth Time
  - Birth Place
  - User Goal

---

## 💎 Premium Recommendation Report

Each recommendation includes:

- Recommended Gemstone
- Associated Planet
- AI-generated explanation
- Purchase links
- Gemstone image
- Birth details summary

---

## 📜 Recommendation History

Users can:

- View all previous recommendations
- Open any previous recommendation
- Access detailed recommendation reports
- Navigate through a clean history interface

---

## 📊 Dashboard

Displays:

- Total Users
- Total Recommendations
- AI Statistics
- Quick navigation
- CTA for generating new recommendations

---

## 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

---

## 🎨 Modern UI

- Tailwind CSS
- Framer Motion animations
- Lucide React icons
- Glassmorphism design
- Luxury gold & cream theme
- Responsive layouts

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Framer Motion
- Lucide React
- Axios
- Context API

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Google Gemini SDK (`@google/genai`)

---

## AI

- Google Gemini 2.5 Flash
- Prompt Engineering
- Structured JSON Responses
- Retry Mechanism
- AI-based Vedic gemstone recommendations

---

# 📂 Project Structure

```text
GemAura/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── Server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
│
├── AI_USAGE.md
├── README.md
└── .gitignore
```

---

# 🏗 Architecture

```text
                ┌────────────────────┐
                │     React Frontend │
                └──────────┬─────────┘
                           │
                     REST API Calls
                           │
                ┌──────────▼─────────┐
                │  Express Backend   │
                └──────────┬─────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
 Authentication     Google Gemini AI      MongoDB
   (JWT Auth)        Recommendation      (History &
                      Generation           Users)
```

---

# 🚀 Setup Instructions

## 1. Clone Repository

```bash
git clone <repository-url>
cd GemAura
```

---

## 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret

GEMINI_API_KEY=your_google_gemini_api_key
```

Run backend:

```bash
npm run dev
```

---

## 3. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

# 🔑 API Overview

## Authentication

- `POST /auth/register`
- `POST /auth/login`

---

## Recommendation

- `POST /recommendation`
- `GET /recommendation/:recommendationId`
- `GET /recommendation/history`

---

## Dashboard

- `GET /dashboard/stats`

---

# 🧠 AI Workflow

```text
User Inputs Birth Details
            │
            ▼
Construct AI Prompt
            │
            ▼
Google Gemini API
            │
            ▼
AI Generates Recommendation
            │
            ▼
Validate JSON Response
            │
            ▼
Store in MongoDB
            │
            ▼
Display Premium Recommendation UI
```

---

# ⚠️ Assumptions

- Birth details are provided accurately by the user.
- AI recommendations are generated using prompt-based reasoning and traditional Vedic astrology concepts.
- Exact astronomical chart calculations are approximated when unavailable.
- Purchase links returned by AI may vary depending on available information.

---

# 🔒 Security

- JWT-based authentication
- Environment variables for secrets
- Protected backend routes
- API keys stored outside source control
- `.env` excluded via `.gitignore`

---

# 📈 Future Improvements

- Complete Kundli generation
- Real-time planetary calculations
- Birth chart visualization
- PDF report export
- Favorite recommendations
- Email reports
- Multi-language support
- Admin analytics dashboard
- Recommendation confidence scores
- AI chat assistant for gemstone guidance

---

# 📄 AI Usage

See **`AI_USAGE.md`** for detailed documentation about:

- Gemini integration
- Prompt engineering
- AI workflow
- JSON response format
- Security considerations
- Traditional astrology disclaimer

---

# 👨‍💻 Developed With

- React.js
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- Google Gemini AI
- Framer Motion
- Lucide React

---

# 📜 Disclaimer

GemAura provides gemstone recommendations inspired by traditional Vedic astrology concepts and AI-assisted analysis. The results are intended for informational purposes only and should not be considered guaranteed outcomes, professional astrological advice, medical guidance, legal advice, or financial advice.