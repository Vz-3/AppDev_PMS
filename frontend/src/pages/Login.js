import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext"; // Ensure this path is correct
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAuth();

  // Effect for auto-logout when accessing login page if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      logout();
    }
  }, [isLoggedIn, logout]); // Depend on isLoggedIn to ensure correct triggering

  const handleLogin = (event) => {
    event.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    console.log("Attempting to log in with:", username, password);
    login(); // Update the context and localStorage
    navigate("/home", { replace: true }); // Navigate to home and replace current entry in the history stack
  };

  return (
    <div className="card">
      <form onSubmit={handleLogin}>
        <div className="Login">
          <label>Login</label>
          <br />
        </div>
        <div className="credentials">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="tbox"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="tbox"
          />
          <button
            type="submit"
            className="submit"
            disabled={!username || !password}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
