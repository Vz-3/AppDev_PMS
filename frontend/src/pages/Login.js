import React, { useState } from "react";
import axios from 'axios';
import "../styles/global.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post('http://localhost:7777/account/login', { 
        email: username, 
        password: password 
      });
      // Redirect based on user role
      console.log("Login successful:", response.data);
      const path = response.data.role === "owner" ? "/home" : "/tenanthome";
      sessionStorage.setItem("token", response.data['token'])
      window.location.href = path;
    } catch (err) {
      console.error("Login failed:", err.response || err.message);
      setError(err.response ? err.response.data.message : "Login failed!");
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="Login">
        <label>Login</label>
        <br />
      </div>
      <div className="credentials">
        <br />
        <br />
        <label htmlFor="user_pass">Username</label>
        <br />
        <input
          type="text"
          id="user_pass"
          className="tbox"
          placeholder="username123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="user_pwd">Password</label>
        <br />
        <input
          type="password"
          id="user_pwd"
          className="tbox"
          placeholder="passWord123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <br />
        <button
          type="submit"
          className="submit"
          onClick={handleLogin}
          disabled={!username || !password || loading}
        >
          {loading ? 'Logging in...' : 'Submit'}
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
