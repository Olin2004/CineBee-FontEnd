import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { isAuthenticated, profile } = useSelector((state) => state.auth);


  if (!isAuthenticated || !profile) {
    // Or show a loading spinner
    return <Navigate to="/login" replace />;
  }

 
  if (profile.role !== 'ADMIN') {
    // Redirect them to the home page if they are not an admin
    return <Navigate to="/home-cinebee" replace />;
  }


  return <Outlet />;
};

export default AdminRoute;
