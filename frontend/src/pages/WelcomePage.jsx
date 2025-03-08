import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css"; 

const WelcomePage = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
  
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");


    navigate("/login");
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Hello, {username}!</h1>
        <p className="welcome-message">Welcome to your personalized dashboard.</p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;