// Role-based UI Router - Routes users to appropriate interface based on their role
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RoleBasedRouter = () => {
  const { isAuthenticated, profile } = useSelector((state) => state.auth);

  if (!isAuthenticated || !profile) {
    return <Navigate to="/login" replace />;
  }
  // Route users to their appropriate interface based on role
  switch (profile.role) {
    case 'STAFF':
      return <Navigate to="/staff/dashboard" replace />;
    case 'ADMIN':
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/home-cinebee" replace />;
  }
};

export default RoleBasedRouter;
