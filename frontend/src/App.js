import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.js'
import WelcomePage from './pages/WelcomePage';


function App() {

  return (
    <>
    
    <div className="App">

      <BrowserRouter>      
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

    </div>
    </>
  );
}

export default App;
