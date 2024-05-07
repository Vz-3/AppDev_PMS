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
    setTimeout(() => setIsClicked(true), 0);
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

      <div style={{ marginTop: 80, marginBottom: 20 }}>
        {/* Dropdown template */}
        <div className="dropdown-container">
          <div className="dropdown-btn" onClick={handleClick}>
            <img src="https://icons.veryicon.com/png/o/internet--web/industrial-icon/sort-2.png" style={{width: 20, height: 20, marginRight: 2}}/>
            Sort
          </div>
          {isClicked && (
            <div className="dropdown-content">
              {/* Dropdown items */}
              <Dropdown.Item onClick={handleClick} style={{fontSize: 15}}>Option 1</Dropdown.Item>
              <Dropdown.Item onClick={handleClick} style={{fontSize: 15}}>Option 2</Dropdown.Item>
              <Dropdown.Item onClick={handleClick} style={{fontSize: 15}}>Option 3</Dropdown.Item>
            </div>
          )}
        </div>
      </div>
      <Container className="tenantDashboard" style={{}}>
        <h2>Tenants</h2>
        <div className="tenantList">
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div><div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Arjay Aquino</b></span><br />
              <span>Unit Number: 212</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              {/* Placeholder image */}
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Lorem Ipsum</b></span><br />
              <span>Unit Number: 276</span><br />
              <span>Building: Beta</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              {/* Placeholder image */}
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Lorem Ipsum</b></span><br />
              <span>Unit Number: 276</span><br />
              <span>Building: Delta</span>
            </div>
          </div>
          <div className="tenantCell">
            <div className="imageContainer">
              {/* Placeholder image */}
              <img className="tenantImg" src="https://graduate.northeastern.edu/resources/wp-content/uploads/sites/4/2019/09/iStock-1150384596-2.jpg" alt="sample pic" />
            </div>
            <div className="tenantInfo">
              <span><b>Lorem Ipsum</b></span><br />
              <span>Unit Number: 276</span><br />
              <span>Building: Alpha</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Tenants;