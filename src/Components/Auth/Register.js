// src/components/Auth/Register.js
import React, { useState } from 'react';
import AuthService from '../../Authservice.js';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap'; // Import Bootstrap components if not already done

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.register(formData);
    navigate('/login');
  };

  return (
    <Card>
      <Card.Body>
        <h2>Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formFirstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Register;
