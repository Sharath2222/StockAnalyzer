// StockDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DummyApiData from '../DummyApiData.js';
import { Modal, Button } from 'react-bootstrap';
import StockChart from './StockChart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const StockDetail = ({ symbol }) => {
  const [stockData, setStockData] = useState(null);
  const [dummyDataLoaded, setDummyDataLoaded] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [timeSeriesData, setTimeSeriesData] = useState(null);

  useEffect(() => {
    // Simulate loading dummy data
    const dummyDataTimeout = setTimeout(() => {
      setStockData(DummyApiData);
      setDummyDataLoaded(true);
    }, 1000); // Adjust the timeout as needed

    return () => clearTimeout(dummyDataTimeout);
  }, []);

  useEffect(() => {
    const IEX_CLOUD_API_KEY = 'pk_72838550ccc14d1da6d2feb8b5b28873';
    const stockApiUrl = `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_CLOUD_API_KEY}`;

    const fetchStockData = async () => {
      try {
        const stockResponse = await axios.get(stockApiUrl);
        setStockData(stockResponse.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    if (dummyDataLoaded) {
      // Fetch API data only if dummy data is loaded
      fetchStockData();
    }
  }, [symbol, dummyDataLoaded]);

  const handleViewChart = async () => {
    const IEX_CLOUD_API_KEY = 'pk_72838550ccc14d1da6d2feb8b5b28873';
    const timeSeriesApiUrl = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=${IEX_CLOUD_API_KEY}`;

    try {
      const timeSeriesResponse = await axios.get(timeSeriesApiUrl);
      setTimeSeriesData(timeSeriesResponse.data);
      setShowChart(true);
    } catch (error) {
      console.error('Error fetching time series data:', error);
    }
  };

  const handleCloseChart = () => {
    setShowChart(false);
  };

  return (
    <div className="stock-card">
      {dummyDataLoaded || stockData ? (
        <div>
          <h3>{stockData?.companyName || DummyApiData[0].companyName}</h3>
          <p>Symbol: {stockData?.symbol || DummyApiData[0].symbol}</p>
          <p>Latest Price: ${stockData?.latestPrice || DummyApiData[0].latestPrice}</p>
          <p>Change: ${stockData?.change || DummyApiData[0].change}</p>
          <p>Percent Change: {stockData?.changePercent || DummyApiData[0].changePercent}%</p>
          <button onClick={handleViewChart}>View Chart</button>
          {showChart && (
            <Modal show={showChart} onHide={handleCloseChart}>
              <Modal.Header closeButton>
                <Modal.Title>Stock Chart</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <StockChart timeSeriesData={timeSeriesData} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseChart}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockDetail;
