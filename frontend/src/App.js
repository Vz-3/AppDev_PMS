import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js";
import WelcomePage from "./pages/WelcomePage";
import Home from "./pages/Home"; // Import the Home component
import Tenants from "./pages/Tenants";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/home" element={<Home />} />{" "}
            {/* Use the imported Home component */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
