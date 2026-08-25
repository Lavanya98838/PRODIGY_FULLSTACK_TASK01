# 🔐 MyAuth — Secure Employee Authentication System

A production-ready employee authentication system built with the **MERN stack**, featuring JWT-based login, role-based access control, and a clean, responsive UI. Deployed and live.

🔗 **Live Demo:** [myauthentapp.vercel.app/login](https://myauthentapp.vercel.app/login)

---

## 🚀 Features

- **JWT Authentication** — Secure login and session management using JSON Web Tokens
- **Role-Based Access Control (RBAC)** — Different views and permissions based on user role
- **Employee Management** — Register, view, and manage employee accounts
- **Protected Routes** — Frontend and backend route guards for unauthorized access prevention
- **Responsive UI** — Clean, mobile-friendly interface built with React

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JWT (JSON Web Tokens) |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

```
MyAuth_Application/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── App.js
    └── public/
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js
- MongoDB (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/Lavanya98838/MyAuth_Application.git
cd MyAuth_Application

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

### Run Locally

```bash
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm start
```

---

## 🌐 Deployment

- **Frontend** → Vercel
- **Backend** → Render
- **Database** → MongoDB Atlas

---

## 👩‍💻 Developer

Built by **Lavanya** — Integrated MCA Graduate, IIPS DAVV, Indore
