import React, { useState, useEffect } from 'react';
import '../index.css'; // Import your CSS file

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    document.body.classList.add('login-page'); // Add the class to body when component mounts
    return () => {
      document.body.classList.remove('login-page'); // Remove the class when component unmounts
    };
  }, []);

  const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Implement login logic here (e.g., API call, validation)
    console.log("Logging in with:", username, password);

    // Assuming successful login:
    window.location.href = "/home"; // Redirect to home page on success
  };

  return (
    <div className="card">
      <div className="Login">
        <label>Login</label><br />
      </div>
      <div className="credentials">
        <br />
        <br />
        <label htmlFor="user_pass">Username</label><br />
        <input
          type="text"
          id="user_pass"
          className="tbox"
          placeholder=". . ."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <br />
        <label htmlFor="user_pwd">Password</label><br />
        <input
          type="password"
          id="user_pwd"
          className="tbox"
          placeholder=". . ."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <br />
        <br />
        <button type="submit" className="submit" onClick={handleLogin}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
