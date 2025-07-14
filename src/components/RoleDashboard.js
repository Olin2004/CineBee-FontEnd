// Role-based Dashboard Router - Automatically routes users to their appropriate dashboard
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RoleDashboard = () => {
  const { isAuthenticated, profile } = useSelector((state) => state.auth);

  if (!isAuthenticated || !profile) {
    return <Navigate to="/login" replace />;
  }
  // Redirect to appropriate dashboard based on role
  const roleDashboards = {
    STAFF: '/staff/dashboard',
    ADMIN: '/admin/dashboard',
  };

  const dashboardPath = roleDashboards[profile.role];

  if (dashboardPath) {
    return <Navigate to={dashboardPath} replace />;
  }

  // Default redirect for unrecognized roles
  return <Navigate to="/home-cinebee" replace />;
};

export default RoleDashboard;
