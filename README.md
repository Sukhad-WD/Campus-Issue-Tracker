# 🎓 Campus Issue Tracking System

A full-stack web application that allows students to report, track, and manage campus-related issues efficiently. It provides an admin panel for monitoring and resolving issues with role-based access control.

---

## 🚀 Features

* 🔐 User Authentication (JWT-based)
* 📝 Report campus issues
* 🔍 Search and filter issues
* 📊 Admin dashboard for issue management
* 🔄 Update issue status (Admin only)
* 👥 Role-based access (User/Admin)

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* CSS

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB (Mongoose)

**Authentication:**

* JSON Web Token (JWT)
* bcrypt (password hashing)

---

## 📂 Project Structure

```
frontend/
backend/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/campus-issue-tracker.git
cd campus-issue-tracker
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🌐 Deployment

* Frontend deployed on **Vercel**
* Backend deployed on **Render**

---

## 📌 API Endpoints

### Auth

* POST `/api/users/register`
* POST `/api/users/login`

### Issues

* GET `/api/issues`
* POST `/api/issues`
* PUT `/api/issues/:id/status`

---

## 🔐 Security

* Passwords hashed using bcrypt
* JWT-based authentication
* Protected routes using middleware

---

## 📖 Project Description

This system improves transparency and efficiency in handling campus issues by providing a centralized platform for reporting and tracking problems. It reduces manual effort and ensures faster resolution through proper issue management.

---

## 👨‍💻 Author

**Sukhad Mehrotra**
 
