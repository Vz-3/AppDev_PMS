import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom"; 
import { Button } from "react-bootstrap"; 
import "../styles/tenants.css";

function Tenants() {
  const [userRole, setUserRole] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setUserRole("Admin");
  }, []);

  const handleLogout = () => {
    window.location.href = "/login"; 
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 50);
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
              <Nav.Link href="#Users">Users</Nav.Link>
            </Nav>
            <Nav>
              <Dropdown align="end">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  {userRole || "User"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
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

      <div>
        <Button className={`addTenantButton ${isClicked ? "clicked" : ""}`} onClick={handleClick}>
          <text>Add Tenant</text>
        </Button>
      </div>
      <Container className="tenantDashboard">
        <h2>Tenants</h2>
        <div className="tenantList">
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span>Arjay Aquino</span><br />
              <span>Unit Number: 212</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              {/* Placeholder image */}
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span>Lorem Ipsum</span><br />
              <span>Unit Number: 276</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Tenants;