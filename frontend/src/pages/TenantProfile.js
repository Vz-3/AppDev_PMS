import React, { useEffect, useState, Component } from 'react';
import axios from 'axios';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/globalT.css';
import user from "../dashboard icons/user.png"

class TenantProfile extends Component {
    API_URL = "http://localhost:7777/"

    // Don't change this, unless you know what you're doing
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            show_value: false, // Added to initialize show_value state
        };
    }
    formatDate=(dateString)=> {
        const date = new Date(dateString);
        // Customize the format as needed
        return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Will be called when the component is mounted
    componentDidMount() {
        // Fetch information from the backend with the token
        fetch(this.API_URL + "account/view", { headers: { 'authorization': sessionStorage.getItem("token") } })
            // Then, covert the response to JSON
            .then(response => response.json())
            // Then, set the state of the component
            .then(message => {
                // Convert the message to a dictionary
                var result = Object.keys(message).reduce((result, key) => {
                    result[key] = {
                        value: message[key],
                    };
                    return result;
                }, {});
                // Set the state of the component
                this.setState({ data: result, show_value: true });
            })
            // Catch any error
            .catch(error => console.log(error));
    }

    // Function to handle logout
    handleLogout = () => {
        // Perform logout actions here
        // For example, clearing session storage and redirecting to the login page
        sessionStorage.removeItem("token");
        window.location.href = "/Login"; // Redirect to the login page
    }

    // Render the component
    render() {
        // Show the data if it's loaded
        if (this.state.show_value) {
            // Change this code below to display your data
            return (
                <>
                    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
                        <Container>
                            <Navbar.Brand href="#Dashboard">Logo</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/TenantHome">Home</Nav.Link>
                                    <Nav.Link href="/TenantProfile">Profile</Nav.Link>
                                    <Nav.Link href="/Contract">Contract</Nav.Link>
                                    <Nav.Link href="/Message">Message</Nav.Link>
                                </Nav>
                                <Nav>
                                    {/* Display user role dynamically */}
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                            {this.state.data && this.state.data['name'] && this.state.data['name']['value']['firstName'] ? this.state.data['name']['value']['firstName'] : "User"}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {/* Use Link component for logout */}
                                            <Dropdown.Item onClick={this.handleLogout}>
                                                Log Out
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <div className="tenant-home" style={{ paddingTop: '80px' }}>
                        <div className="lease-info">
                            <div className='pfp'>
                                <img src={user} alt="user" className="icon" />
                            </div>
                            <div className='labels'>
                                <label>Full Name:</label><br/>
                                <label>Email: </label><br/>
                                <label>Contact Num: </label><br/>
                                <label>Date of Birth: </label><br/>
                                <label>Role: </label><br/>
                            </div>
                            <div className='data'>
                                <label>{this.state.data['name']['value']['firstName']}</label><br/>
                                <label>{this.state.data['email']['value']}</label><br/>
                                <label>{this.state.data['contactNo']['value']}</label><br/>
                                <label>{this.formatDate(this.state.data['dateOfBirth']['value'])}</label><br/>
                                <label>{this.state.data['role']['value']}</label>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        // Shows loading message if the data is not yet loaded
        else {
            return (
                <>
                    <div className="tenant-home" style={{ paddingTop: '80px' }}>
                        <div className="lease-info">
                            <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
                                <Container>
                                    <Navbar.Brand href="#Dashboard">Logo</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="me-auto">
                                            <Nav.Link href="/TenantHome">Home</Nav.Link>
                                            <Nav.Link href="/TenantProfile">Profile</Nav.Link>
                                            <Nav.Link href="/Contract">Contract</Nav.Link>
                                            <Nav.Link href="/Message">/Message</Nav.Link>
                                        </Nav>
                                        <Nav>
                                            {/* Display user role dynamically */}
                                            <Dropdown align="end">
                                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                    Loading...
                                                </Dropdown.Toggle>
                                            </Dropdown>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                            <p>Loading...</p>
                        </div>
                    </div>
                </>
            )
        }
    }
}

export default TenantProfile;