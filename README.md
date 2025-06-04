# MERN Stack User Authentication & Shop Dashboard (with Dynamic Subdomains)

## ✨ Project Overview

A full-stack MERN application featuring user authentication, dynamic shop subdomain routing, and session persistence across subdomains.

---

## 🚀 Features

### 1. Signup Page

* Register with username, password, and at least **3 unique shop names**.
* Shop names are globally unique across users.
* Password policy:

  * Minimum 8 characters
  * At least 1 number
  * At least 1 special character

### 2. Signin Page

* Login with username and password.
* "Remember Me" checkbox:

  * Checked: session lasts 7 days
  * Unchecked: session lasts 30 minutes
* Validation messages for invalid login

### 3. Dashboard

* Displays logged-in user's email and shop names.
* Profile icon opens a dropdown with:

  * Shop name list
  * Logout button with confirmation

### 4. Dynamic Shop Dashboards (via Subdomains)

* Clicking a shop redirects to:
  `http://<shopname>.localhost:5173`
* Directly visiting the shop subdomain (in new tab) still works securely.
* Token/session is shared across subdomains.
* Shows loading spinner while verifying session

---

## 📂 Folder Structure

```
project-root/
├── client/               # 9amsolution_task_frontend
│   ├── public/
│   ├── src/
│   └── vite.config.js
├── server/               # 9amsolution_task_backend
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── config.env/
│   ├── app.js
│   └── index.js
└── README.md
```

---

## ⚙️ Tech Stack

* **Frontend**: React (Vite), Axios, React Router DOM, Tailwind CSS
* **Backend**: Node.js, Express, MongoDB, Mongoose, JWT
* **Auth**: JWT Access Tokens + HttpOnly localstorage
* **Session**: Cross-subdomain localstorage handling

---

## ❓ How to Run the Project

### Prerequisites

* Node.js v18+
* MongoDB

### 1. Clone the Repository and Setup Backend

```bash
git clone https://github.com/sariothossain1011/9amsolution_task_backend.git
cd 9amsolution_task_backend
cp config.env
# Edit config.env with your MongoDB URI and JWT secrets
npm install
npm run dev
```

### 1. Clone the Repository and Setup Frontend

```bash
git clone https://github.com/sariothossain1011/9amsolution_task_frontend.git
cd 9amsolution_task_frontend
npm install
npm run dev
```

### 4. Local Subdomain Testing

```
127.0.0.1 beautyhub.localhost
127.0.0.1 grocerypoint.localhost
127.0.0.1 fashionmart.localhost
```

Then visit:

```
http://beautyhub.localhost:5173
```

---

## ⚖️ API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint   | Description          |
| ------ | ---------- | -------------------- |
| POST   | /signup    | Register new user    |
| POST   | /signin    | Login user           |
| GET    | /user-info | Get user profile     |
| POST   | /logout    | Clear session localstorage |

---

## 📅 Session & Security

* JWT stored in **HttpOnly cookie** with `Domain=.localhost` for subdomain support.
* CORS enabled with `credentials: true`
* Token checked on every page load for persistent auth

---

## 🌐 Live Demo

* **Frontend**: [https://9amsolution-task-frontend.vercel.app](https://9amsolution-task-frontend.vercel.app/)
* **Backend**: [https://9amsolution-task-backend.vercel.app/](https://9amsolution-task-backend.vercel.app/)

---

## 📓 Environment Variables

### server/.env.example

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```
