import React, { useState } from "react";
import { useAuth } from "./AuthContext"; // Ensure this path is correct
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useAuth(); // Access the authentication state
  const navigate = useNavigate(); // Instantiate the useNavigate hook

  const handleLogin = (event) => {
    event.preventDefault();
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }
    console.log("Logging in with:", username, password);
    setIsLoggedIn(true); // Update the login state
    navigate("/home"); // Use navigate instead of window.location.href
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
         disabled={!username || !password}>
          Submit
        </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
