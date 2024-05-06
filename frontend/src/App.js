import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login.js";
import WelcomePage from "./pages/WelcomePage";
import Home from "./pages/Home"; // Import the Home component
import Tenants from "./pages/Tenants";
import UserPage from "./pages/UserPage";
import CustomNav from "./components/navbar.component.js";
import { useAuth } from "./pages/AuthContext";

function App() {
  const { isLoggedIn } = useAuth(true);

  return (
    <>
      {isLoggedIn && (
        <header>
          <CustomNav />
        </header>
      )}
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/home" element={<Home />} />{" "}
            {/* Use the imported Home component */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
