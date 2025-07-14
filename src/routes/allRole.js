import { lazy, Suspense } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';
import AdminRoute from './AdminRoute';
import StaffRoute from './StaffRoute';
import AdminDashboardLayout from '../layouts/AdminDashboardLayout';
import StaffLayout from '../layouts/StaffLayout';

// Lazy load components for better performance
const Home = lazy(() => import('../pages/MainPage/Home'));
const Login = lazy(() => import('../pages/Auth/Login'));
const Register = lazy(() => import('../pages/Auth/Register'));
const ForgetPassword = lazy(() => import('../pages/Auth/ForgetPassword'));
const SearchResultPage = lazy(() => import('../pages/MainPage/SearchResultPage'));
const MyTickets = lazy(() => import('../pages/MainPage/MyTickets'));
const BookingPage = lazy(() => import('../pages/MainPage/Booking'));
const MomoResultPage = lazy(() => import('../pages/Payment/MomoResultPage'));

// Admin Dashboard Components
const DashboardModern = lazy(() => import('../pages/Admin/Dashbroad/DashboardModern'));
const ImprovedDashboard = lazy(() => import('../pages/Admin/Dashbroad/ImprovedDashboard'));
const AdminMovies = lazy(() => import('../pages/Admin/Dashbroad/AdminMovies'));
const AddMovieForm = lazy(() => import('../pages/Admin/Dashbroad/AddMovieForm'));
const AdminAnalytics = lazy(() => import('../pages/Admin/AdminAnalytics'));
const BookingManagement = lazy(() => import('../pages/Admin/Dashbroad/BookingManagement'));
const ImprovedBookingManagement = lazy(() =>
  import('../pages/Admin/Dashbroad/ImprovedBookingManagement')
);
const ShowtimeManagement = lazy(() => import('../pages/Admin/Dashbroad/ShowtimeManagement'));
const ImprovedShowtimeManagement = lazy(() =>
  import('../pages/Admin/Dashbroad/ImprovedShowtimeManagement')
);
const TheaterManagement = lazy(() => import('../pages/Admin/Dashbroad/TheaterManagement'));
const UserManagement = lazy(() => import('../pages/Admin/Dashbroad/UserManagement'));
const PromotionManagement = lazy(() => import('../pages/Admin/Dashbroad/PromotionManagement'));
const ReviewManagement = lazy(() => import('../pages/Admin/Dashbroad/ReviewManagement'));

// Staff Components
const StaffDashboard = lazy(() => import('../pages/Staff/StaffDashboard'));
const TicketSales = lazy(() => import('../pages/Staff/TicketSales'));
const StaffOrders = lazy(() => import('../pages/Staff/StaffOrders'));

// Role-based Components
const RoleDashboard = lazy(() => import('../components/RoleDashboard'));
const QuickAuth = lazy(() => import('../pages/QuickAuth'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Wrapper component for lazy loaded routes
const LazyRoute = ({ children }) => <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;

// All application routes
const userRoutes = [
  // Admin Routes - Protected by AdminRoute
  {
    element: <AdminRoute />,
    children: [
      {
        element: <AdminDashboardLayout />,
        children: [
          {
            path: '/admin/dashboard',
            element: (
              <LazyRoute>
                <DashboardModern />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/dashboard-improved',
            element: (
              <LazyRoute>
                {' '}
                <ImprovedDashboard />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/movies',
            element: (
              <LazyRoute>
                <AdminMovies />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/movies/add',
            element: (
              <LazyRoute>
                <AddMovieForm />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/analytics',
            element: (
              <LazyRoute>
                <AdminAnalytics />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/bookings',
            element: (
              <LazyRoute>
                <BookingManagement />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/bookings-improved',
            element: (
              <LazyRoute>
                <ImprovedBookingManagement />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/showtimes',
            element: (
              <LazyRoute>
                <ShowtimeManagement />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/showtimes-improved',
            element: (
              <LazyRoute>
                <ImprovedShowtimeManagement />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/theaters',
            element: (
              <LazyRoute>
                <TheaterManagement />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/users',
            element: (
              <LazyRoute>
                <UserManagement />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/promotions',
            element: (
              <LazyRoute>
                <PromotionManagement />
              </LazyRoute>
            ),
          },
          {
            path: '/admin/reviews',
            element: (
              <LazyRoute>
                <ReviewManagement />
              </LazyRoute>
            ),
          },
        ],
      },
    ],
  },

  // Staff Routes - Protected by StaffRoute
  {
    element: <StaffRoute />,
    children: [
      {
        element: <StaffLayout />,
        children: [
          {
            path: '/staff/dashboard',
            element: (
              <LazyRoute>
                <StaffDashboard />
              </LazyRoute>
            ),
          },
          {
            path: '/staff/ticket-sales',
            element: (
              <LazyRoute>
                <TicketSales />
              </LazyRoute>
            ),
          },
          {
            path: '/staff/orders',
            element: (
              <LazyRoute>
                <StaffOrders />
              </LazyRoute>
            ),
          },
        ],
      },
    ],
  },

  // Public Routes with MainLayout
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
        path: '/dashboard',
        element: (
          <LazyRoute>
            <RoleDashboard />
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
      {
        path: '/search',
        element: (
          <LazyRoute>
            <SearchResultPage />
          </LazyRoute>
        ),
      },
      {
        path: '/my-tickets',
        element: (
          <LazyRoute>
            <MyTickets />
          </LazyRoute>
        ),
      },
      {
        path: '/booking/:id',
        element: (
          <LazyRoute>
            <BookingPage />
          </LazyRoute>
        ),
      },
      {
        path: '/booking',
        element: (
          <LazyRoute>
            <BookingPage />
          </LazyRoute>
        ),
      },
      {
        path: '/payment/momo/result',
        element: (
          <LazyRoute>
            <MomoResultPage />
          </LazyRoute>
        ),
      },
      {
        path: '/quick-auth',
        element: (
          <LazyRoute>
            <QuickAuth />
          </LazyRoute>
        ),
      },
    ],
  },

  // Auth Routes with AuthLayout
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
      {
        path: '/forget-password',
        element: (
          <LazyRoute>
            <ForgetPassword />
          </LazyRoute>
        ),
      },
    ],
  },
];

export default userRoutes;
