import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Button, Dropdown } from 'react-bootstrap';
import CustomNavbar from './Navbar'; // Import the CustomNavbar component
import '../styles/userpage.css';

function UserPage() {
    const [users, setUsers] = useState([{
        id: 1,
        name: "Placeholder",
        username: "placeholder",
        type: "Admin"
    }]); // Placeholder data
    const navigate = useNavigate();
    const data = useMemo(() => users, [users]);
    const columns = useMemo(() => [
        {
            Header: '#',
            accessor: (row, i) => i + 1,
            disableSortBy: true,
        },
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Username',
            accessor: 'username',
        },
        {
            Header: 'Type',
            accessor: 'type',
        },
        {
            Header: 'Action',
            Cell: ({ row }) => (
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Action
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => console.log('Manage user', row.original)}>Manage</Dropdown.Item>
                        <Dropdown.Item onClick={() => console.log('Delete user', row.original)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ),
            disableSortBy: true,
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable({ columns, data, initialState: { pageIndex: 0 } }, useSortBy, usePagination);

    useEffect(() => {
        // Uncomment below code to fetch users from an API
        // fetchUsers();
    }, []);

    // Simulated fetchUsers function
    const fetchUsers = async () => {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
    };

    return (
        <>
            <CustomNavbar userRole="Admin" handleLogout={() => console.log("Logging out")} /> {/* Pass appropriate props */}
            <Container className="user-container">
                <Button className="button-new-user" onClick={() => navigate('/create-user')}>+ New User</Button>
                <div className="table-container">
                    <table {...getTableProps()} className="table">
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {page.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="pagination">
                    <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                    <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                    <span>
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                    </span>
                </div>
            </Container>
        </>
    );
}

export default UserPage;