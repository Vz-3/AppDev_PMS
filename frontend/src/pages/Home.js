// Import necessary components and hooks
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom"; // Import Link component
import "../styles/home.container.css";
import check from "../dashboard icons/check.png"
import clock from "../dashboard icons/clock.png"
import envelope from "../dashboard icons/envelope.png"
import user from "../dashboard icons/user.png"

function Home() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch user role and update state
    // For demonstration, setting a default role
    setUserRole("Admin");
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions (e.g., clear session, remove tokens, etc.)
    // Assuming successful logout, redirect to login page
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="#Dashboard">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/Home">Home</Nav.Link>
              <Nav.Link href="/Tenants">Tenants</Nav.Link>
              <Nav.Link href="#Units">Units</Nav.Link>
              <Nav.Link href="/Users">Users</Nav.Link>
            </Nav>
            <Nav>
              {/* Display user role dynamically */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  {userRole || "User"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {/* Use Link component for logout */}
                  <Dropdown.Item onClick={handleLogout}>
                    <Link
                      to="/Login.js"
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      Log Out
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Your Home page content here */}
      <Container className="dashboard">
        <h2>Dashboard</h2>
        <div className="widgets">
          <div className="total">
            <img src={user} alt="user" className="icon" />
            <div className="wtext">
              Total Tenants: <br/>
              #
            </div>
          </div>
          <div className="due">
            <img src={clock} alt="clock" className="icon" />
            <div className="wtext">
              Due Payments <br/>
              #
            </div>
          </div>
          <div className="paid">
            <img src={check} alt="check" className="icon" />
            <div className="wtext">
              Paid Tenants <br/>
              #
            </div>
          </div>
          <div className="request">
            <img src={envelope} alt="envelope" className="icon" />
            <div className="wtext">
              Requests: <br/>
              #
            </div>
          </div>
        </div>
        <br/>
        <div className="dinformation">
          <div className="info">
            <h4>Tenant Information:</h4>
          </div>
          <div className="info">
           <h4>Due Payments:</h4>
          </div>
          <div className="info">
            <h4>Requests:</h4>
          </div>
        </div>
      </Container>
    </div>
    
  );
}

export default Home;
