import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import SloganBar from '../components/Header/SloganBar';

const MainLayout = () => (
  <>
    <SloganBar />
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default MainLayout;
