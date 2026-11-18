import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    // Strictly isolate Admin and Customer panels:
    // If Admin attempts to visit Customer storefront -> send to Admin Dashboard
    // If Customer attempts to visit Admin panel -> send to Customer Restaurants
    const destination = currentUser?.role === 'Admin' ? '/admin/dashboard' : '/restaurants';
    return <Navigate to={destination} replace />;
  }

  return children;
}
