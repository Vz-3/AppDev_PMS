import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Dropdown } from "react-bootstrap";

function CustomNav() {
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
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg" expanded="true">
      <Container>
        <Navbar.Brand href="/">Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/Tenants">Tenants</Nav.Link>
            <Nav.Link href="/Units">Units</Nav.Link>
            <Nav.Link href="/Users">Users</Nav.Link>
          </Nav>
          <Nav>
            {/* Display user role dynamically */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                {userRole || "User"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {/* Handle logout directly in onClick */}
                <Dropdown.Item href="/Messages">
                  Messages
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}



export default CustomNav;
