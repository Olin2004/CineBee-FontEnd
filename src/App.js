import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Scrollbar from 'react-smooth-scrollbar';
import './App.css';
import userRoutes from './routes/allRole';
import { fetchProfile, setAuth } from './store/authSlice';

// Loading component
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    const initializeAuth = async () => {
      try {
        if (accessToken) {
          dispatch(setAuth({ accessToken }));
          await dispatch(fetchProfile());
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (loading) return <LoadingFallback />;

  return (
    <QueryClientProvider client={queryClient}>
      <Scrollbar damping={0.08} alwaysShowTracks>
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {userRoutes.map((route, idx) => (
                <Route key={idx} element={route.element}>
                  {route.children &&
                    route.children.map((child, cidx) => (
                      <Route key={cidx} path={child.path} element={child.element} />
                    ))}
                </Route>
              ))}
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Scrollbar>
    </QueryClientProvider>
  );
}

export default React.memo(App);
