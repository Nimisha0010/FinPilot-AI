# FinPilot AI

**FinPilot AI** is a full-stack personal finance management application built with the MERN stack. It allows users to manage income, expenses, budgets, and view financial insights through a centralized dashboard.

## Tech Stack

**Frontend**

* React.js
* Vite
* Tailwind CSS
* JavaScript

**Backend**

* Node.js
* Express.js
* REST APIs
* JWT Authentication
* bcryptjs

**Database**

* MongoDB
* MongoDB Atlas
* Mongoose

**Tools**

* Git & GitHub
* Postman
* VS Code

## Architecture

```text
React + Vite
     │
     │ REST API
     ▼
Node.js + Express
     │
     ├── Authentication
     ├── Controllers
     ├── Routes
     └── Middleware
     │
     ▼
Mongoose
     │
     ▼
MongoDB Atlas
```

## Features

* JWT-based user authentication
* Secure password hashing with bcrypt
* Protected API routes
* Personal finance dashboard
* Income management
* Expense tracking
* Budget management
* Financial data visualization
* AI-powered financial insights
* User-specific financial data

## Project Structure

```text
FinPilot-AI/
│
├── client/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── .env
│
└── README.md
```

## Authentication

FinPilot AI uses JWT-based authentication.

```text
Register/Login
      ↓
Express API
      ↓
bcrypt Password Verification
      ↓
JWT Generation
      ↓
Authenticated Requests
      ↓
Protected API Routes
```

## API

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Expenses

```text
GET    /api/expenses
POST   /api/expenses
PUT    /api/expenses/:id
DELETE /api/expenses/:id
```

### Income

```text
GET    /api/income
POST   /api/income
PUT    /api/income/:id
DELETE /api/income/:id
```

### Budgets

```text
GET    /api/budgets
POST   /api/budgets
PUT    /api/budgets/:id
DELETE /api/budgets/:id
```

## Setup

### 1. Clone

```bash
git clone https://github.com/Nimisha0010/FinPilot-AI.git
cd FinPilot-AI
```

### 2. Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run dev
```

### 3. Frontend

```bash
cd client
npm install
npm run dev
```

## Environment Variables

```text
MONGO_URI     MongoDB Atlas connection string
JWT_SECRET    Secret used for JWT authentication
PORT          Backend server port
```

> Keep `.env` out of version control.

## Development Status

* [x] MERN architecture
* [x] MongoDB Atlas integration
* [x] User authentication
* [x] Password hashing
* [x] JWT generation
* [x] React dashboard
* [x] Income module
* [x] Budget module
* [x] AI insights UI
* [ ] Complete expense CRUD
* [ ] Advanced AI analysis
* [ ] Production deployment
