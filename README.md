
# 🔗 Link Analytics Dashboard

A full-stack Micro-SaaS application to shorten URLs and track their analytics – similar to Bitly. Built using React, Node.js, Express, and MongoDB, the dashboard offers real-time tracking, QR code generation, and device/browser breakdown analytics.

---

## 🚀 Features

- ✅ User Authentication (JWT)
- ✅ URL Shortening with shortCode redirection
- ✅ QR Code generation for every short link
- ✅ Click Analytics (Total clicks, breakdown by device/browser)
- ✅ Pagination and Search support
- ✅ Expiry status for short links
- ✅ Protected routes and error handling

---

## 🖥️ Live Links

- **Frontend** (Vercel): (https://dacoid-assign-five.vercel.app)  
- **Backend** (Render): (https://url-shortener-api-im11.onrender.com)

---

## 🔐 Test Credentials

- **Email**: `intern@dacoid.com`  
- **Password**: `Test123`

---

## 🧑‍💻 Tech Stack

| Tech      | Usage          |
|-----------|----------------|
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | MongoDB (Mongoose) |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🧪 API Endpoints

### Auth
- `POST /api/auth/login` - User login   

### Link
- `POST /api/links/shorten` - Create short link  
- `GET /api/links/user-links` - Get user’s shortened links  
- `GET /:code` - Redirect to original URL and log analytics  

### Analytics
- `GET /api/analytics/device-browser-breakdown` - Breakdown by device and browser

---

## 📦 Getting Started Locally

### 1. Clone the repo

```bash
git clone https://github.com/Na1an-Gu7ar/DacoidAssign.git
cd DacoidAssignment
```

---

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

```bash
npm start
```

---

### 3. Setup Frontend

```bash
cd ../Frontend
npm install
```

Create a `.env` file in the frontend folder:

```env
VITE_API_URL=http://localhost:3000/api
```

```bash
npm run dev
```

---

## 📌 Notes

- All protected routes require JWT token via cookies
- Make sure both frontend and backend are running for full functionality
- Redirection and QR code links work using backend-deployed URL

---
