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
import MessagePrompt from "./prompts/messagePrompt";
import check from "../dashboard icons/check.png"
import clock from "../dashboard icons/clock.png"
import envelope from "../dashboard icons/envelope.png"
import user from "../dashboard icons/user.png"
import CustomNav from "../components/navbar.component";
import SendMessageButton from "./prompts/messagePrompt";

function Home() {
  const [userRole, setUserRole] = useState(null);
  const [unitInfo, setUnitInfo] = useState([]);
  const [duePayments, setDuePayments] = useState([]);
  const [messages, setMessages] = useState([]);

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
    // Check if the new unit already exists in the unitInfo array
    if (unitInfo.some(unit => unit.unitNumber === newUnit.unitNumber)) {
      // If it exists, alert the user or handle it accordingly
      alert("Unit already exists");
      return;
    }
  
    // Add the new unit information to the state
    setUnitInfo([newUnit, ...unitInfo]);
  };

  const handleAddDuePayment = (newDuePayment) => {
    // Add the new due payment to the state
    setDuePayments([newDuePayment, ...duePayments]);
  };

  const handleAddMessage = (newMessage) => {
    // Add the new message to the messages array
    setMessages([...messages, newMessage]);
  };
  
  const truncateMessage = (msg, maxLength) => {
    return msg.length > maxLength ? msg.substring(0, maxLength) + "..." : msg;
  };

  const [expandedMessages, setExpandedMessages] = useState([]);

  const toggleExpandedMessage = (index) => {
    setExpandedMessages((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  }

  const totalTenants = unitInfo.reduce((total, unit) => total + parseInt(unit.numTenants), 0);
  return (
    <>
    <header>
      <CustomNav />
    </header>

      {/* Your Home page content here */}
      <Container className="dashboard">
        <h2>Dashboard</h2>
        <div className="widgetsbox">
          <div className="widgets">
            <img src={user} alt="user" className="icon" />
            <div className="wtext">
              Total Tenants: <br/>
              {totalTenants}
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
              <div className="scroll">
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
              </div>
              <UnitPrompt onAddUnit={handleAddUnit} />
              <Nav.Link href="/Units" className="tsee">
                See more...
              </Nav.Link>
            </div> 
          </div>
          <div className="info">
            <h4>Due Payments:</h4>
            <div className="infobox">
            <div className="scroll">
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
            </div>
            <DuePaymentPrompt onAddDuePayment={handleAddDuePayment} />
          </div>
          <div className="info">
            <h4>Announcements:</h4>
            <div className="infobox">
              <div className="scroll">
              {messages.map((message, index) => (
                  <div key={index} className="tinfo">
                    <div className="unitnum">{message.unitNumber}</div>
                    <div className="stext">
                      {message.title} <br />
                      {expandedMessages[index]
                        ? message.message
                        : truncateMessage(message.message, 50)}{" "}
                      {/* Truncate message */}
                      {message.message.length > 50 && (
                        <button
                          onClick={() => toggleExpandedMessage(index)}
                          className="showMoreBtn"
                        >
                          {expandedMessages[index] ? "Show Less" : "Show More"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <MessagePrompt onAddMessage={handleAddMessage} />
            <Nav.Link href="/Messages" className="tsee">
              See more...
            </Nav.Link>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Home;
