import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import '../index.css'; // Import your CSS file

function Home() {
  useEffect(() => {
    document.body.classList.add('home-page'); // Add the class to body when component mounts
    return () => {
      document.body.classList.remove('home-page'); // Remove the class when component unmounts
    };
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="#Dashboard">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#Home">Home</Nav.Link>
              <Nav.Link href="#Tenants">Tenants</Nav.Link>
              <Nav.Link href="#Units">Units</Nav.Link>
              <Nav.Link href="#Users">Users</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="home-content">
        <h1>Subuin mo tite ko Ellis!</h1>
        {/* Add more content as needed */}
      </div>
      {/* Your Home page content here */}
    </div>
  );
}

export default Home;
