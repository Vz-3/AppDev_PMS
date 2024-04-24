import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js';
import WelcomePage from './pages/WelcomePage';
import Home from './pages/Home'; // Import the Home component

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} /> {/* Use the imported Home component */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
