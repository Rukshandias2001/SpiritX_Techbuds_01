# SpiritX_Techbuds_01
# Login System - README

## 🚀 Instructions to Run the Project

### Prerequisites
- Node.js (v16 or later)
- MongoDB (Local or Cloud, e.g., MongoDB Atlas)
- Express.js
- React.js
- Axios

### Steps to Run
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/your-repo/login-system.git
   cd login-system
   ```

2. **Backend Setup:**
   - Navigate to the `backend` directory:
     ```sh
     cd backend
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the server:
     ```sh
     nodemon server.js
     ```

3. **Frontend Setup:**
   - Navigate to the `frontend` directory:
     ```sh
     cd ../frontend
     ```
   - Install dependencies:
     ```sh
     npm install
     ```
   - Start the React app:
     ```sh
     npm start
     ```

4. Open `http://localhost:3000` in your browser to test the login system.

---

## 🗄️ Database Setup and Configuration

### Using MongoDB Atlas (Cloud)
1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Set up a new cluster and create a database.
3. Obtain the connection string and update `.env` in the backend:
   ```env
NODE_ENV=development
PORT=5001
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
MONGO_URI=mongodb+srv://root:ASDfgh1234@cluster0.7vhw3.mongodb.net/Question01
   ```
4. Restart the backend server:
   ```sh
   nodemon server.js
   ```

### Using Local MongoDB
1. Install MongoDB and start the service:
   ```sh
   mongod --dbpath /path-to-data-folder
   ```
2. Update `.env` file with:
   ```env
   MONGO_URI=mongodb://localhost:27017/loginDB
   ```
3. Restart the backend:
   ```sh
   npm start
   ```

---

## 📌 Assumptions
- The UI is designed with a cyberpunk/hacker theme to create an immersive experience.
- Users must have a username and a strong password to register.
- Passwords require at least one uppercase letter, one lowercase letter, and one special character.
- Login attempts are monitored to prevent unauthorized access.
- The system assumes that a valid username and password must match before allowing access.

---

## ✨ Additional Features Implemented
- **Password Strength Indicator:**
  - Shows "Weak", "Medium", or "Strong" feedback in real-time.
- **Real-time Input Validation:**
  - Validates username and password before submission.
- **Encrypted Storage:**
  - Passwords are hashed using bcrypt before storing in MongoDB.
- **Cyberpunk UI Elements:**
  - Animated "Access Granted"/"Access Denied" messages.
  - Background video with a futuristic theme.
- **Logout Mechanism:**
  - Clears authentication data on logout.
- **Error Handling:**
  - Displays user-friendly error messages if login fails.



