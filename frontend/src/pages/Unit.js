import "../styles/units.css";

import { Container } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNav from "../components/navbar.component";

function Units() {

  return (
    <>
    <header>
      <CustomNav />
    </header>
    <div>
      <body>
        <Container className="bg">
            <h2>Units</h2>
            <div className="unitbar">
                <ul>
                    <a href="/Active">Active</a>
                    <a href="/Inactive">Inactive</a>
                </ul>
            </div>
            
        </Container>
      </body>
    </div>
    </>
  );
}

export default Units;