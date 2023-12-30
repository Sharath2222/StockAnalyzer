// Auth/Login.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Auth/Login';

describe('Login component', () => {
  it('renders login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('submits the form with correct data', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'testpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(consoleLogMock).toHaveBeenCalledWith('login successfull');
  });

  it('displays error message with incorrect data', () => {
    // Mock the console.log method
    const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'invaliduser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'invalidpassword' } });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Assert that console.log was called with the expected error message
    expect(consoleLogMock).toHaveBeenCalledWith('Invalid username or password');

    // Restore the original implementation of console.log
    consoleLogMock.mockRestore();
  });
});
