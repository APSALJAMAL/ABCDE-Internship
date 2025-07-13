

# ABCDE-Internship

<img width="808" height="731" alt="image" src="https://github.com/user-attachments/assets/841ed18e-b662-4949-8592-75bf6aca4093" />

**Full Stack Developer Internship Project**

This repository contains the source code, Postman collection, and instructions to set up and run the project, as well as interact with the API.

---

## 📂 Project Structure

```
/backend       # Node.js / Express API
/frontend      # React / Vite frontend
/README.md
```

---

## ✅ Prerequisites

* Node.js (v14+ recommended)
* npm or yarn
* MongoDB (local or Atlas)

---

## 🚀 How to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/yourproject.git
cd yourproject
```

### 2️⃣ Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd ../frontend
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in `/backend` with:

```ini
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
VITE_APP_BASE_URL=http://localhost:5000/api
```

### 4️⃣ Start the Servers

**Backend:**

```bash
npm run dev
```

**Frontend:**

```bash
npm run dev
```

---

## 🧪 Testing the API

* Import the provided **Postman\_Collection.json** into Postman.
* Ensure your backend server is running on [http://localhost:5000](http://localhost:5000) (or your configured port).
* Use the collection to test endpoints such as:

  * User Registration
  * Login
  * CRUD operations
  * Protected routes with JWT

---

## 📫 Postman Collection

The `Postman_Collection.json` file includes:

✅ All available API endpoints
✅ Example request bodies
✅ Auth tokens (where applicable)
✅ Environment variables for easy setup

---

## 📖 Notes

* Make sure MongoDB is running or accessible remotely.
* CORS is configured to allow requests from the frontend.
* JWT is used for authentication on protected routes.


