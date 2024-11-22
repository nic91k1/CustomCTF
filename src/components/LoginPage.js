import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = { username, password };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/login", // Use localhost or backend URL
        user
      );
      const token = response.data.token;

      // Save the token in localStorage
      localStorage.setItem("token", token);


      // Redirect to the dashboard after login
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password"); // Set error message
    }
  };

  return (
    <Layout>
      <div className="login-signup">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {/* Display error message with styling */}
        {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
      </div>
    </Layout>
  );
}

export default LoginPage;
