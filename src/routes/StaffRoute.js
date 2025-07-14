import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const StaffRoute = () => {
  const { isAuthenticated, profile } = useSelector((state) => state.auth);

  // Debug log
  console.log('StaffRoute - Auth state:', { isAuthenticated, profile });

  if (!isAuthenticated || !profile) {
    console.log('StaffRoute - Redirecting to login: not authenticated');
    return <Navigate to="/login" replace />;
  }
  // Allow STAFF, ADMIN
  if (!['STAFF', 'ADMIN'].includes(profile.role)) {
    console.log('StaffRoute - Redirecting to home: invalid role', profile.role);
    return <Navigate to="/home-cinebee" replace />;
  }

  console.log('StaffRoute - Access granted for role:', profile.role);
  return <Outlet />;
};

export default StaffRoute;
