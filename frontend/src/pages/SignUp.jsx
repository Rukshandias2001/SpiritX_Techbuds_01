import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Add axios import
import "../styles/SignUp.css";
import BackgroundVideo1 from "../assets/bg7.mp4";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    currentPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    currentPassword: "",
    confirmPassword: "",
    authError: "",
  });
  const [hasError, setHasError] = useState(false); 

  const [passwordStrength, setPasswordStrength] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "userName") validateUserName(value);
    if (name === "currentPassword") validateCurrentPassword(value);
    if (name === "confirmPassword") validateConfirmPassword(value);

    checkForErrors();
  };

  const validateUserName = (userName) => {
    let error = "";
    if (userName.length < 8) {
      error = "Username must be at least 8 characters long";
    }
    setErrors({ ...errors, userName: error });
  };

  const validateCurrentPassword = (currentPassword) => {
    let error = "";
    const hasLowercase = /[a-z]/.test(currentPassword);
    const hasUppercase = /[A-Z]/.test(currentPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(currentPassword);

    if (currentPassword.length < 8) {
      error = "Password must be at least 8 characters long";
    } else if (!hasLowercase || !hasUppercase || !hasSpecialChar) {
      error =
        "Password must contain at least one lowercase, one uppercase, and one special character.";
    }

    if (
      currentPassword.length >= 8 &&
      hasLowercase &&
      hasUppercase &&
      hasSpecialChar
    ) {
      setPasswordStrength("Strong 💪");
    } else if (currentPassword.length >= 6) {
      setPasswordStrength("Medium 👍");
    } else {
      setPasswordStrength("Weak 👎");
    }

    if (currentPassword === "") {
      setPasswordStrength("");
    }

    setErrors({ ...errors, currentPassword: error });
  };

  const validateConfirmPassword = (confirmPassword) => {
    let error = "";
    if (confirmPassword !== formData.currentPassword) {
      error = "Passwords do not match";
    }
    setErrors({ ...errors, confirmPassword: error });
  };
  const checkForErrors = () => {
    setHasError(
      !!(errors.userName || errors.currentPassword || errors.confirmPassword || errors.authError)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (
      !formData.userName ||
      !formData.currentPassword ||
      !formData.confirmPassword
    ) {
      setErrors({ ...errors, authError: "Please fill in all fields" });
      return;
    }

    // Check for validation errors
    if (errors.userName || errors.currentPassword || errors.confirmPassword) {
      setErrors({ ...errors, authError: "Please fix the errors before submitting." });
      return;
    }

    // Check if passwords match
    if (formData.currentPassword !== formData.confirmPassword) {
      setErrors({ ...errors, authError: "Passwords do not match." });
      return;
    }

    
    setErrors({ ...errors, authError: "" });
    
    
    axios.post("http://localhost:5001/api/auth/signup", {
      username: formData.userName.trim(),
      password: formData.currentPassword.trim()
    })
    .then(response => {
     
      alert("Signup successful! Redirecting to login page...");
      
     
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    })
    .catch(error => {
      // Handle signup error
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
      setErrors({ ...errors, authError: errorMessage });
    });
  };

  return (
    <div className="signUp">
        <video autoPlay loop muted className="background-video-1">
              <source src={BackgroundVideo1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

       
      <div className={`security-header ${hasError ? "error-mode" : ""}`}>
        {hasError ? "⚠️ ERROR DETECTED - ACCESS RESTRICTED" : "🔒 ENCRYPTED ACCESS REQUIRED"}
      </div>

      <div className="blinking-alert">MONITORING LOGIN ATTEMPTS...</div>

      <div className="signUp-container">
        <div className="signUp-form">
          <h1>Sign Up</h1>
          {errors.authError && <p className="auth-error">{errors.authError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName}
                onChange={handleInput}
                placeholder="Enter Username"
              />
              {errors.userName && <p className="error">{errors.userName}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="currentPassword">Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleInput}
                placeholder="Password"
              />
              {errors.currentPassword && (
                <p className="error">{errors.currentPassword}</p>
              )}
              {formData.currentPassword && (
                <p className="password-strength">
                  Password Strength: <span>{passwordStrength}</span>
                </p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInput}
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>

            <button className="signUp-button">Sign Up</button>
          </form>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}