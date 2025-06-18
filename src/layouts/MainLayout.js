import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default MainLayout;
