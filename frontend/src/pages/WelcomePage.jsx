import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css"; 
import BackgroundVideo2 from "../assets/bg9.mp4";

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
       <video autoPlay loop muted className="background-video">
        <source src={BackgroundVideo2} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="access-granted">✅ ACCESS GRANTED</div>

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