import React, { useState } from "react";

import "../styles/global.css"; // Import your CSS file

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if username or password is empty
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    // Implement login logic here (e.g., API call, validation)
    console.log("Logging in with:", username, password);

    // Assuming successful login:
    // Redirect to home page
    window.location.href = "/home";
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
        {/* Disable the submit button if username or password is empty */}
        <button
          type="submit"
          className="submit"
          onClick={handleLogin}
          disabled={!username || !password}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
