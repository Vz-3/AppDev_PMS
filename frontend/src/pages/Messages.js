
import "../styles/messages.css";

import { Navbar, Nav, Dropdown, Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link component
import "bootstrap/dist/css/bootstrap.min.css";

function Messages() {
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
                    <Dropdown.Item>
                      <Link
                        to="/Messages.js"
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        Messages
                      </Link>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>

      <body>
        <Container className="bg">
            <h2>Messages</h2>
        </Container>
      </body>
    </div>
  );
}

export default Messages;
