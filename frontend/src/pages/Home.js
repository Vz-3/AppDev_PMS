// Import necessary components and hooks
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom"; // Import Link component
import "../styles/home.container.css";
import UnitPrompt from "./prompts/unitPrompt";
import DuePaymentPrompt from "./prompts/duePrompt";
import check from "../dashboard icons/check.png"
import clock from "../dashboard icons/clock.png"
import envelope from "../dashboard icons/envelope.png"
import user from "../dashboard icons/user.png"


function Home() {
  const [userRole, setUserRole] = useState(null);
  const [unitInfo, setUnitInfo] = useState([]);
  const [duePayments, setDuePayments] = useState([]);

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

  const handleAddUnit = (newUnit) => {
    // Add the new unit information to the state
    setUnitInfo([...unitInfo, newUnit]);
  };

  const handleAddDuePayment = (newDuePayment) => {
    // Add the new due payment to the state
    setDuePayments([...duePayments, newDuePayment]);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="/Home">Logo</Navbar.Brand>
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
        <div className="widgetsbox">
          <div className="widgets">
            <img src={user} alt="user" className="icon" />
            <div className="wtext">
              Total Tenants: <br/>
              # {/*set Total Tenants*/}
            </div>
          </div>
          <div className="widgets">
            <img src={clock} alt="clock" className="icon" />
            <div className="wtext">
              Due Payments:<br/>
              # {/*set Total Due*/}
            </div>
          </div>
          <div className="widgets">
            <img src={check} alt="check" className="icon" />
            <div className="wtext">
              Paid Tenants: <br/>
              # {/*set Total Paid*/}
            </div>
          </div>
          <div className="widgets">
            <img src={envelope} alt="envelope" className="icon" />
            <div className="wtext">
              Requests: <br/>
              # {/*set Total Something*/}
            </div>
          </div>
        </div>
        <br/>
        <div className="dinformation">
          <div className="info">
            <h4>Unit Active Information:</h4>
            <div className="infobox" id="unitinfobox">
              {unitInfo.map((unit, index) => (
                <div key={index} className="tinfo">
                  <div className="unitnum">{unit.unitNumber}</div>
                  <div className="stext">
                    Number of Tenants: {unit.numTenants}
                    <br />
                    Type of Unit: {unit.unitType}
                  </div>
                </div>
              ))}
              <UnitPrompt onAddUnit={handleAddUnit} />
              <Nav.Link href="/Units" className="tsee">
                See more...
              </Nav.Link>
            </div> 
          </div>
          <div className="info">
            <h4>Due Payments:</h4>
            <div className="infobox">
              {duePayments.map((duePayment, index) => (
                <div key={index} className="tinfo">
                  <div className="unitnum">{duePayment.unitNumber}</div>
                  <div className="stext">
                    Total Payment: {duePayment.totalPayment} <br />
                    Due Date: {duePayment.dueDate}
                  </div>
                </div>
                ))}
              </div>
            <DuePaymentPrompt onAddDuePayment={handleAddDuePayment} />
          </div>
          <div className="info">
            <h4>Requests:</h4>
            <div className="infobox">
              <div className="tinfo">
                <div className="unitnum">
                  2E
                </div>
                <div className="stext">
                  Message:
                  <br/>
                  Arjay
                </div>
              </div>
              <div className="tinfo">
                <div className="unitnum">
                  4D
                </div>
                <div className="stext">
                  Message:
                  <br/>
                  Ellis
                </div>
              </div>
              <div className="tinfo">
                <div className="unitnum">
                  2F
                </div>
                <div className="stext">
                  Message:
                  <br/>
                  Jek
                </div>
              </div>
              <div className="tinfo">
                <div className="unitnum">
                  3A
                </div>
                <div className="stext">
                  Message:
                  <br/>
                  Von
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
