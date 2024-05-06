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
  const [isClicked, setIsClicked] = useState(false);


  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(true), 0);
  };

  return (
    <div>

      <div style={{ marginTop: 40, marginBottom: 20 }}>
        {/* Dropdown template */}
        <div className="dropdown-container">
          <div className="dropdown-btn" onClick={handleClick}>
            <img src="https://icons.veryicon.com/png/o/internet--web/industrial-icon/sort-2.png" style={{width: 20, height: 20, marginRight: 2}}/>
            Sort
          </div>
          {isClicked && (
            <div className="dropdown-content">
              {/* Dropdown items */}
              <Dropdown.Item onClick={handleClick}>Option 1</Dropdown.Item>
              <Dropdown.Item onClick={handleClick}>Option 2</Dropdown.Item>
              <Dropdown.Item onClick={handleClick}>Option 3</Dropdown.Item>
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