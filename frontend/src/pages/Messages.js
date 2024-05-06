import "../styles/messages.css";
import "../styles/global.css";
import { Container } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNav from "../components/navbar.component";

function Messages() {

  return (
    <>
    <header>
      <CustomNav />
    </header>
    <div>
      <body>
        <Container className="bg">
            <h2>Messages</h2>
        </Container>
      </body>
    </div>
    </>
  );
}

export default Messages;
