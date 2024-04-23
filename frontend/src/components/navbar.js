import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Nbar(){

    return(
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#Dashboard">Logo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#Home">Home</Nav.Link>
            <Nav.Link href="#Tenants">#Tenants</Nav.Link>
            <Nav.Link href="#Units">#Units</Nav.Link>
            <Nav.Link href="#Users">#Users</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default Nbar