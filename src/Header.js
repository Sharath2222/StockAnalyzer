// Header.js
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from './Authservice.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const user = AuthService.getCurrentUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.logout();
    // Redirect to the login page after logout
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/home">
        Stock App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {user && (
            <Nav.Link as={Link} to="/dashboard">
              Home
            </Nav.Link>
          )}
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          {user ? (
            <>
              <Nav.Link disabled>Hi, {user.username}</Nav.Link>
              <Button variant="link" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
