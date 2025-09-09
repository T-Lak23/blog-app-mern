Here’s a clean, **updated README** for your MERN Blog Admin Panel project, all in one go:

---

# 📝 MERN Blog Admin Panel

A full-stack blog management app built with **MongoDB**, **Express**, **React (Vite)**, and **Node.js**.
Designed for a single predefined admin to manage posts and comments, while registered users can engage through commenting.
Built with **modular logic, secure access control, and a smooth user experience**.

---

## 🧰 Tech Stack

**Frontend**

- React + Vite
- TailwindCSS
- React Hot Toast

**Backend**

- Express.js
- MongoDB + Mongoose

**Auth & Security**

- JWT + Cookies (admin-only login)
- Helmet, Rate Limiting (login/register only)
- CORS

**Deployment**

- Render (Static Site + Web Service)

---

## 📦 Features

### 🛡️ Admin Capabilities

- Full CRUD for blog posts
- Manage post status: `published`, `draft`, etc.
- Approve, reject, or delete comments
- Bulk delete all comments or comments on a specific post
- Dashboard with key stats:

  - Total posts
  - Published vs Draft posts
  - Pending & Approved comments
  - Recent posts

### 👤 User Capabilities

- Register → automatically assigned `user` role
- Add comments on posts
- Delete only their own comments
- Comments require admin approval before being visible

### 🔍 UX Enhancements

- Pagination for posts and comments
- Category-based filtering
- Search on homepage and admin panel
- Human-readable timestamps (e.g., _"3 minutes ago"_)

---

## 🛠️ Setup Instructions

### 1️⃣ Backend

```bash
cd backend
npm install
```

Create a `.env` file with the following variables:

```env
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret
NODE_ENV=development
IMAGEKIT_URL_ENDPOINT=your_url
IMAGEKIT_PUBLIC_KEY=your_public_key
IMAGEKIT_PRIVATE_KEY=your_private_key
GEMINI_API_KEY=your_api_key
CLIENT_ORIGIN=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
```

For development:

```bash
npm run dev
```

For production build:

```bash
npm run build
```

---

## 🔐 Admin Creation (One-Time Setup)

This app uses a **predefined admin account**.
To create your own admin, add the following snippet in your `index.js` (or server entry file), run the app once, then **remove/comment out** to prevent extra admin creation.

```js
import { User } from "./models/userModel.js"; // adjust path if needed

const createAdmin = async () => {
  try {
    const existing = await User.findOne({ email: "user@gmail.com" });
    if (existing) {
      console.log("Admin already exists");
      return;
    }

    const admin = await User.create({
      name: "Your Name",
      email: "your_email@gmail.com",
      password: "yourStrongPassword",
      role: "admin",
    });

    console.log("✅ Admin created:", admin.email);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
};

createAdmin(); // Run once, then remove
```

---

## 📌 Notes

- Only **one admin** is supported.
- Regular users cannot upgrade themselves to admin.
- Secure your `.env` keys and never commit them.
- Comments require admin approval before showing up publicly.

---
