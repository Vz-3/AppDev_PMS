import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import WelcomePage from "./pages/WelcomePage";
import Home from "./pages/Home";
import Tenants from "./pages/Tenants";
import TenantMessages from "./pages/TenantMessages";
import TenantHome from "./pages/TenantHome";
import Unit from "./pages/Unit";
import User from "./pages/User";
import Contract from "./pages/Contract";
import TenantProfile from "./pages/TenantProfile";
import UserPage from "./pages/UserPage";
import "./styles/global.css";

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
          <Route path="/unit" element={<Unit />} />{" "}
          {/* Managing units (owner) */}
          <Route path="/user" element={<User />} />{" "}
          <Route path="/userpage" element={<UserPage />} />{" "}
          {/* Managing users (owner) */}
          <Route path="/tenanthome" element={<TenantHome />} />{" "}
          {/* Main dashboard for tenants */}
          <Route path="/tenantmessages" element={<TenantMessages />} />
          {""}
          <Route path="/tenantprofile" element={<TenantProfile />} />
          {""}
          <Route path="/contract" element={<Contract />} />
          {""}
          {/* Redirecting unknown paths back to main page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
