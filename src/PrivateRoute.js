// PrivateRoute.js
import React from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
import AuthService from './Authservice'; // Adjust the import path based on your project structure

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = AuthService.getCurrentUser() !== null;

  return isAuthenticated ? <Routes> <Route {...rest} element={element} /></Routes> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
