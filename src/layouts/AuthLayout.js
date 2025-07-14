import React from 'react';
import { Outlet } from 'react-router-dom';
import SEO from '../components/SEO/SEO';

const AuthLayout = () => {
  return (
    <>
      <SEO
        title="CineBee - Authentication"
        description="Login or register to access CineBee movie booking platform"
      />
      <Outlet />
    </>
  );
};

export default AuthLayout;
