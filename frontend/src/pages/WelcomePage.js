import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";
import '../styles/prev.css'; // Import your CSS file

function WelcomePage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/'); // Redirect to home page if already logged in
    }
  }, [isLoggedIn, navigate]); // Depend on isLoggedIn and navigate

  return (
    <body className="WelcomePage">
      <div className="greetings">
        <span>K</span>
        <span>M</span>
        <span>K</span>
        <span> </span>
        <span>H</span>
        <span>O</span>
        <span>M</span>
        <span>E</span>
        <span>S</span>
      </div>
      <div className="description">
        <span style={{ color: 'white' }}>Welcome to our apartment management system!</span>
      </div>
      {isLoggedIn ? (
        <div className="button">
          <Link to="/home">
            <button>Continue to Home</button>
          </Link>
        </div>
      ) : (
        <div className="button">
          <Link to="/login">
            <button>Continue</button>
          </Link>
        </div>
      )}
    </body>
  );
}

export default WelcomePage;