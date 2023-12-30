// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Register from './Components/Auth/Register.js';
import Login from './Components/Auth/Login.js';
import Dashboard from './Components/Dashboard.js';
// import PrivateRoute from './PrivateRoute';
import Header from './Header.js';
import AuthService from './Authservice.js';
import About from './Components/About.js';

  
const PrivateRoute = ({ element }) => {
  const isAuthenticated = AuthService.getCurrentUser() !== null;
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

function App() {  

  const isAuthenticated = AuthService.getCurrentUser() !== null;
  return (
    <>
    
    <Router>
    <Header/> 
      <Routes>
        
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        {/* <PrivateRoute path="/dashboard/*" element={<Dashboard />} /> */}
        <Route path="/login" element={<Login />} />
          {isAuthenticated ? (
            <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} />
          ) : (
            <Route path="/login" element={<Login/>} />
          )}
        {/* <Route path="/dashboard/*" element={<PrivateRoute element={<Dashboard />} />} /> */}

      </Routes>
    </Router>
    </>
    
  );
}

export default App;
