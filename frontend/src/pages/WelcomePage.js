import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/prev.css'; // Import your CSS file

function WelcomePage() {
  useEffect(() => {
    document.body.classList.add('welcome-page'); // Add the class to body when component mounts
    return () => {
      document.body.classList.remove('welcome-page'); // Remove the class when component unmounts
    };
  }, []);

  return (
    <div className="WelcomePage">
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
      <div className="button">
        <Link to="/login">
          <button>Continue</button>
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
