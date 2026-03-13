## HiddenInbox – Anonymous Messaging Web App

HiddenInbox is a full‑stack web application that lets users create a private handle, share it with others, and receive anonymous notes. It gives users complete control over their messages and profile.

### Tech Stack

- **Frontend**: React, TypeScript, Vite, React Router
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (via Mongoose)

---

## 1. Prerequisites

- **Node.js**: v18+ recommended
- **npm**: v9+ (comes with recent Node)
- **MongoDB**: local instance or MongoDB Atlas connection string

---

## 2. Environment Variables

There are **two** environments to configure:

- **Backend** (`backend/.env`)
- **Frontend** (`frontend/.env`)

Sample files are provided:

- `backend/.env.example`
- `frontend/.env.example`

Copy and adjust them:

```bash
cd backend
cp .env.example .env

cd ../frontend
cp .env.example .env
```

### Backend `.env`

- **MONGO_URI**: MongoDB connection string  
  - Example: `mongodb://127.0.0.1:27017/hiddeninbox`
- **JWT_SECRET**: any strong random string used to sign auth tokens

### Frontend `.env`

- **VITE_API_URL**: Base URL of the backend API  
  - For local dev: `http://localhost:5000`

If `VITE_API_URL` is omitted, the frontend will fall back to `http://localhost:5000` by default.

---

## 3. Installation

From the project root:

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

---

## 4. Running the App Locally

### 4.1 Start the Backend (API)

From the `backend` folder:

```bash
cd backend
npm run dev
```

This starts an Express server with TypeScript support on **port 5000** by default:

- Base URL: `http://localhost:5000`
- Health check: `GET /` → `"HiddenInbox backend running"`

### 4.2 Start the Frontend (React)

In a separate terminal, from the `frontend` folder:

```bash
cd frontend
npm run dev
```

Vite will output a URL similar to:

- `http://localhost:5173`

Open that URL in your browser.

---

## 5. Core Features  

- **Authentication**
  - Sign up with name, email, username, password
  - Login with email and password
  - Auth token is stored in `localStorage`
- **Public Profile**
  - Public URL: `/u/:username`
  - Anyone can send an anonymous message without logging in
- **Dashboard**
  - View all messages sent to your account
  - See basic stats (total messages, last 7 days, first/latest message dates)
  - Copy your public profile link
  - Delete individual messages
- **UI**
  - **Premium Glassmorphism:** A modern, depth-focused interface using backdrop blurs and curated gradients.
  - **Tailwind CSS:** Fully migrated and optimized for performance and consistency.
  - **Mobile-First Responsive Layouts:** Optimized for all screen sizes with centered hero sections and stacked interactive elements.
  - **Theme Support:** Native light/dark mode toggle persisted for user preference.

---

## 6. Project Structure (High-Level)

```text
backend/
  src/
    controllers/   # auth + message controllers
    middleware/    # auth middleware (JWT)
    models/        # Mongoose models: User, Message
    routes/        # /api/auth, /api/messages
    utils/         # DB connection helper
    server.ts      # Express app entry

frontend/
  src/
    components/    # Reusable UI components (Button, Input, Layout, Navbar)
    pages/         # Landing, Login, Signup, Dashboard, PublicProfile
    config.ts      # API_BASE_URL helper using VITE_API_URL
    App.tsx        # Router setup
    index.css      # Theme and layout styles
```
