// src/components/Layout.js
import React from "react";
import { Link } from "react-router-dom";


const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">HackDaytonCTF</Link>
          <ul className="navbar-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">{children}</main>

      {/* Footer (Optional) */}
      <footer className="footer">
        <p>&copy; 2024 HackDayton CTF. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
