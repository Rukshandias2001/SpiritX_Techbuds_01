import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Reuse or create a new CSS file

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    authError: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "username") validateUsername(value);
    if (name === "password") validatePassword(value);
  };

  const validateUsername = (username) => {
    let error = "";
    if (username.length < 8) {
      error = "Username must be at least 8 characters long";
    }
    setErrors({ ...errors, username: error });
  };

  const validatePassword = (password) => {
    let error = "";

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      error = "Password must contain at least one lowercase letter.";
    }
    // Check for at least one uppercase letter
    else if (!/[A-Z]/.test(password)) {
      error = "Password must contain at least one uppercase letter.";
    }
    // Check for at least one special character
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      error = "Password must contain at least one special character.";
    }
    // Check for minimum length
    else if (password.length < 8) {
      error = "Password must be at least 8 characters long.";
    }

    setErrors({ ...errors, password: error });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    if (!formData.username || !formData.password) {
      setErrors({ ...errors, authError: "Please fill in all fields" });
      return;
    }

   
    if (errors.username || errors.password) {
      setErrors({ ...errors, authError: "Please fix the errors before submitting." });
      return;
    }

    
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        
        localStorage.setItem("username", formData.username);
        localStorage.setItem("isLoggedIn", true);

        
        navigate("/WelcomePage");
      } else {
        setErrors({ ...errors, authError: data.message || "Login failed" });
      }
    } catch (error) {
      setErrors({ ...errors, authError: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-form">
          <h1>Login</h1>
          {errors.authError && <p className="auth-error">{errors.authError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInput}
                placeholder="Enter Username"
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInput}
                placeholder="Password"
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <button className="login-button">Login</button>
          </form>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}