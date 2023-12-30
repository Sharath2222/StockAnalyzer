import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import StockChart from '../StockChart';

describe('StockChart', () => {
  it('renders without crashing', () => {
    const { container } = render(<StockChart timeSeriesData={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('renders a canvas element', () => {
    const { container } = render(<StockChart timeSeriesData={[]} />);
    const canvasElement = container.querySelector('canvas');
    expect(canvasElement).toBeInTheDocument();
  });

  it('renders a line chart with the provided time series data', () => {
    const timeSeriesData = [
      { date: '2023-01-01', close: 100 },
      { date: '2023-01-02', close: 120 },
    ];

    const { container } = render(<StockChart timeSeriesData={timeSeriesData} />);
    const canvasElement = container.querySelector('canvas');

    expect(canvasElement).toBeInTheDocument();
  });
});
