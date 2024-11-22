// src/components/RegisterPage.js
import React, { useState } from "react";
import axios from "axios";
import Layout from "./Layout";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = { username, password };
    try {
      await axios.post("http://localhost:5000/api/register", user);
      // Redirect to login or homepage after successful registration
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <Layout>
      <div className="login-signup">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
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
          <button type="submit">Register</button>
        </form>
        {error && <div>{error}</div>}
      </div>
    </Layout>
  );
}

export default RegisterPage;
