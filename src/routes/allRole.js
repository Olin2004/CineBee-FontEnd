import { lazy, Suspense } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

// Lazy load pages
const Home = lazy(() => import('../pages/MainPage/Home'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));

// Loading component
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Wrapper component for lazy loaded routes
const LazyRoute = ({ children }) => <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;

const userRoutes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <LazyRoute>
            <Home />
          </LazyRoute>
        ),
      },
      {
        path: '/home-cinebee',
        element: (
          <LazyRoute>
            <Home />
          </LazyRoute>
        ),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: (
          <LazyRoute>
            <Login />
          </LazyRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <LazyRoute>
            <Register />
          </LazyRoute>
        ),
      },
    ],
  },
];

export default userRoutes;
