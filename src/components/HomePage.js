// src/components/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate to handle button click

const HomePage = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleGetStarted = () => {
    navigate("/register"); // Navigate to the registration page when the button is clicked
  };

  return (
    <div className="homepage">
      <h1>Welcome to the HackDayton CTF!</h1>
      <p>Get ready for the ultimate hacking challenge!</p>
      <button onClick={handleGetStarted}>Get Started</button> {/* Button that navigates to Register */}
    </div>
  );
};

export default HomePage;
