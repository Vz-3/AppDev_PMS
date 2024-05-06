import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar, Container, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TenantNavbar({ userRole, handleLogout }) {
    return (
        
        <Navbar bg="dark" variant="dark" fixed="top" expand="lg">
            <Container>
                <Navbar.Brand href="#Dashboard">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/TenantHome">Home</Nav.Link>
                        <Nav.Link href="/LeaseInfoPage">Lease</Nav.Link>
                        <Nav.Link href="/DocumentPage">Documents</Nav.Link>
                    </Nav>
                    <Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                {userRole || "User"}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={handleLogout}>
                                    <Link
                                        to="/Login"
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
    );
}

function TenantHome() {
    const [tenantInfo, setTenantInfo] = useState({ name: '', unit: {} });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTenantData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:7777/account/view');
                if (response.status === 200 && response.data) {
                    setTenantInfo({
                        name: response.data.name,
                        unit: response.data.unit
                    });
                } else {
                    throw new Error('Failed to fetch tenant data');
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
    
        fetchTenantData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <TenantNavbar userRole="Tenant" handleLogout={() => console.log('Log out logic here')} />
            <div className="tenant-home" style={{ paddingTop: '80px' }}>
                <h1>Welcome, {tenantInfo.name}</h1>
                <div className="lease-info">
                    <h2>Current Lease Information:</h2>
                    <p>Unit Number: {tenantInfo.unit.unitNo}</p>
                    <p>Lease Start Date: {new Date(tenantInfo.unit.leastStartDate).toLocaleDateString()}</p>
                    <p>Lease End Date: {new Date(tenantInfo.unit.leastEndDate).toLocaleDateString()}</p>
                    <p>Monthly Rent: ${tenantInfo.unit.unitMonthlyCost}</p>
                    <p>Payment Due Dates: {tenantInfo.unit.paymentHistory.map((payment, index) => 
                        <li key={index}>{new Date(payment.date).toLocaleDateString()}: ${payment.amount}</li>
                    )}</p>
                </div>
            </div>
        </>
    );
}

export default TenantHome;