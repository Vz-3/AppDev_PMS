import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import WelcomePage from "./pages/WelcomePage";
import Home from "./pages/Home";
import Tenants from "./pages/Tenants";

import TenantHome from "./pages/TenantHome";
import Unit from "./pages/Unit"; // Assuming you have a Unit.js
import User from "./pages/User"; // Assuming you have a User.js
import "./styles/global.css";

import UserPage from "./pages/UserPage";
import Messages from "./pages/Messages.js";

import CustomNav from "./components/navbar.component.js";
import { useAuth } from "./AuthContext";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} /> {/* Owner's Dashboard */}
          <Route path="/tenants" element={<Tenants />} />{" "}
          {/* Managing tenants (owner) */}
          <Route path="#unit" element={<Unit />} />{" "}
          {/* Managing units (owner) */}
          <Route path="/user" element={<User />} />{" "}
          {/* Managing users (owner) */}
          <Route path="/tenanthome" element={<TenantHome />} />{" "}
          {/* Main dashboard for tenants */}
          {/* Redirecting unknown paths back to main page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
