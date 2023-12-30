import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About Component', () => {
  test('renders About page heading', () => {
    render(<About />);
    const headingElement = screen.getByText(/About Us/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders paragraphs with expected text', () => {
    render(<About />);
    const paragraph1 = screen.getByText(/Welcome to our About page!/i);
    const paragraph2 = screen.getByText(
      /Our mission is to provide high-quality solutions to our users./i
    );

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
});
