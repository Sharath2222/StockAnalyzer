// src/components/Dashboard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../Dashboard';



describe('Dashboard component', () => {
  it('renders welcome message', () => {
    render(<Dashboard />);
    expect(screen.getByText(/welcome to stocks/i)).toBeInTheDocument();
  });

  it('adds a new widget on button click', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText(/add stocks widget/i));
    expect(screen.getByText(/stocks widget/i)).toBeInTheDocument();
  });

  it('toggles the theme on button click', () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText(/toggle theme/i));
    expect(screen.getByTestId('dashboard-container').classList.contains('dark')).toBe(true);
  });

  // Add more test cases based on your component's features and interactions
});
