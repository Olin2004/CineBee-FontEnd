// src/routes/allRole.js
import React from 'react';
import Dasbash from '../pages/Auth/Admin/Dasbash';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Home from '../pages/NonAuth/Home';
// import Authmiddleware from './middleware/Authmiddleware'; // Nếu muốn dùng middleware

// Định nghĩa các route cho từng loại user
const routes = [
  {
    path: '/',
    element: <Home />,
    // public: true
  },
  {
    path: '/login',
    element: <Login />,
    // public: true
  },
  {
    path: '/register',
    element: <Register />,
    // public: true
  },
  {
    path: '/admin/dashboard',
    element: <Dasbash />,
    // middleware: Authmiddleware, // Nếu muốn bảo vệ route này
  },
];

export default routes;
