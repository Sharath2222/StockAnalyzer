// StockChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';

const StockChart = ({ timeSeriesData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chartData = timeSeriesData.map((data) => ({
      x: new Date(data.date).toLocaleDateString(), 
      y: data.close, 
    }));

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Stock Price',
            borderColor: 'rgb(75, 192, 192)',
            data: chartData,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Price',
            },
          },
        },
      },
    });

    // Cleanup chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [timeSeriesData]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default StockChart;
