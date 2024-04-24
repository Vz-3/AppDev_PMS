import React from 'react';
import {Link} from 'react-router-dom'
import '../prev.css';
import Login from './Login';

function WelcomePage() {
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
        <span>Welcome to our apartment management system!</span>
      </div>
      <div className="button">
      <Link to="/login"><button>
              Continue 
            </button>
            </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
