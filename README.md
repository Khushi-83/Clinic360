# Clinic360 - Medical Appointment System

A full-stack web application for booking doctor appointments, managing patients, and tracking medical history.

## 🚀 Live Demo
- **Frontend:** [Clinic360 Frontend](https://clinic360-1wn9.vercel.app/)
- **Backend API:** [Clinic360 API](https://clinic360-7rgl.onrender.com/)

## 📌 Features
- User authentication (Doctors & Patients)
- Patients can book appointments with doctors
- Doctors can manage their availability
- Secure JWT-based authentication
- Real-time chat for queries
- Admin panel for managing users

## 🛠️ Tech Stack
### **Frontend:**
- React.js, Redux Toolkit, React Router
- Tailwind CSS for styling

### **Backend:**
- Node.js, Express.js
- MongoDB (Mongoose ODM)
- JSON Web Tokens (JWT) for authentication

### **Hosting & Deployment:**
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🔧 Setup & Installation
### **1️⃣ Clone the repository**
```sh
 git clone https://github.com/Khushi-83/Clinic360.git
 cd Clinic360
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install  # Install dependencies
cp .env.example .env  # Configure environment variables
npm start  # Start the backend server
```

#### **Backend Environment Variables (.env)**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### **3️⃣ Frontend Setup**
```sh
cd frontend
npm install  # Install dependencies
npm start  # Start the frontend server
```

---

## 📌 API Usage Guide
### **🔹 User Authentication**
#### **1. Register a New User**
**Endpoint:** `POST /api/auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "patient"  
}
```
✅ **Response:**
```json
{
  "message": "User registered successfully",
  "token": "your_jwt_token"
}
```

#### **2. Login**
**Endpoint:** `POST /api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
✅ **Response:**
```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

### **🔹 Get All Doctors**
**Endpoint:** `GET /api/doctors`
✅ **Response:**
```json
[
  {
    "_id": "123abc",
    "name": "Dr. Smith",
    "specialty": "Cardiologist",
    "experience": 10
  }
]
```

### **🔹 Book an Appointment**
**Endpoint:** `POST /api/appointments`
```json
{
  "doctorId": "123abc",
  "patientId": "456def",
  "date": "2025-03-10T10:00:00Z"
}
```
✅ **Response:**
```json
{
  "message": "Appointment booked successfully",
  "appointmentId": "789xyz"
}
```

---

## 🚀 Deployment
### **Frontend (Vercel)**
```sh
vercel deploy
```
### **Backend (Render)**
```sh
git push origin main  # Auto-deploys backend
```

---

## 📞 Contact
For any issues or contributions, feel free to open an issue or contact me at **sinhakhushi0803@example.com**.

