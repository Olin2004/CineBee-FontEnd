import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { isAuthenticated, profile } = useSelector((state) => state.auth);

  if (!isAuthenticated || !profile) {
    return <Navigate to="/login" replace />;
  }

  // Allow only ADMIN
  if (profile.role !== 'ADMIN') {
    return <Navigate to="/home-cinebee" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
