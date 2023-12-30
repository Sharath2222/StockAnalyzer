// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockDetail from './StockDetail.js';
import Widget from './Widget.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './StockCard.css';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [allStockSymbols, setAllStockSymbols] = useState([]);
  const [displayedStockSymbols, setDisplayedStockSymbols] = useState([]);
  const [filterByPrice, setFilterByPrice] = useState('');
  const [sortOption, setSortOption] = useState(''); 
  const [widgets, setWidgets] = useState([
    { id: 1, type: 'Stocks' },
    { id: 2, type: 'News' },
  ]);
  const [theme, setTheme] = useState('light'); // Default: light

  useEffect(() => {
    const IEX_CLOUD_API_KEY = 'pk_72838550ccc14d1da6d2feb8b5b28873';
    const symbolsApiUrl = `https://api.iex.cloud/v1/data/core/REF_DATA?token=${IEX_CLOUD_API_KEY}`;

    const fetchStockSymbols = async () => {
      try {
        const symbolsResponse = await axios.get(symbolsApiUrl);
        const symbols = symbolsResponse.data.map((symbolData) => symbolData.symbol);
        setAllStockSymbols(symbols);
        setDisplayedStockSymbols(symbols.slice(0, 20));
      } catch (error) {
        console.error('Error fetching stock symbols:', error);
      }
    };

    fetchStockSymbols();
  }, []);

  const handleSymbolChange = (e) => {
    const searchTerm = e.target.value;
    const sortedSymbols = sortStocks(allStockSymbols, sortOption);
    const displayedSymbols = sortedSymbols
      .filter((stock) => stock.symbol.includes(searchTerm))
      .filter((stock) => !filterByPrice || stock.price <= parseFloat(filterByPrice))
      .slice(0, 10);
  
    setDisplayedStockSymbols(displayedSymbols);
    setSelectedSymbol(searchTerm);
  };
  

  const handlePriceFilterChange = (e) => {
    setFilterByPrice(e.target.value);
  };

  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    setSortOption(selectedSortOption);

    const sortedSymbols = sortStocks(displayedStockSymbols, selectedSortOption);
    setDisplayedStockSymbols(sortedSymbols);
  };

  const sortStocks = (stocks, sortOption) => {
    const stocksWithPrices = stocks.map((symbol) => ({
      symbol,  // Assuming symbol is a string
      price: 0, // Add the actual price property here
    }));

    if (sortOption === 'name') {
      return stocksWithPrices.slice().sort((a, b) => a.symbol.localeCompare(b.symbol));
    } else if (sortOption === 'price') {
      return stocksWithPrices.slice().sort((a, b) => a.price - b.price);
    }
    return stocksWithPrices.slice();
  };

  const addWidget = (type) => {
    const newId = new Date().getTime();
    const newWidget = { id: newId, type };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id) => {
    const updatedWidgets = widgets.filter((widget) => widget.id !== id);
    setWidgets(updatedWidgets);
  };

  const rearrangeWidgets = (startIndex, endIndex) => {
    const updatedWidgets = [...widgets];
    const [removed] = updatedWidgets.splice(startIndex, 1);
    updatedWidgets.splice(endIndex, 0, removed);
    setWidgets(updatedWidgets);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`dashboard-container ${theme}`}>
        <h2>Welcome to Stocks</h2>
        <div>
          <button onClick={() => addWidget('Stocks')}>Add Stocks Widget</button>
          <button onClick={() => addWidget('News')}>Add News Widget</button>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
        <div className="dashboard-widgets">
          {widgets.map((widget, index) => (
            <Widget
              key={widget.id}
              id={widget.id}
              type={widget.type}
              onRemove={() => removeWidget(widget.id)}
              index={index}
              onRearrange={rearrangeWidgets}
            />
          ))}
        </div>
        <label htmlFor="symbolDropdown">Select a symbol:</label>
        <select id="symbolDropdown" onChange={handleSymbolChange} value={selectedSymbol}>
          <option value="" disabled>
            Show all stocks
          </option>
          {allStockSymbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        <label htmlFor="priceFilter">Filter by price:</label>
        <input
          type="number"
          id="priceFilter"
          placeholder="Enter max price"
          value={filterByPrice}
          onChange={handlePriceFilterChange}
        />
        <label htmlFor="sortDropdown">Sort by:</label>
        <select id="sortDropdown" onChange={handleSortChange} value={sortOption}>
          <option value="">No sorting</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          {/* Add more sorting options as needed */}
        </select>
        <div className="stock-cards-grid">
          {displayedStockSymbols.map((symbol) => (
            <StockDetail key={symbol} symbol={symbol} />
          ))}
        </div>
        <div>
        </div>
      </div>
    </DndProvider>
  );
};

export default Dashboard;
