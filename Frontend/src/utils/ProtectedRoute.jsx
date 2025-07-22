// src/utils/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location, toast: 'Please log in first.' }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" state={{ toast: 'Access denied.' }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
