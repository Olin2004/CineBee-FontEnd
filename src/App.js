import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import userRoutes from './routes/allRole';
import { fetchProfile, setAuth, logout } from './store/authSlice';

// Loading component
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const queryClient = new QueryClient();

function AuthInitializer({ setLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const profileResult = await dispatch(fetchProfile());
        if (profileResult.payload && profileResult.payload.id) {
          dispatch(setAuth({ user: profileResult.payload, isAuthenticated: true }));
        } else {
          dispatch(logout());
          // Don't auto-redirect to login, let user browse public pages
          // Only redirect to login when they try to access protected routes
        }
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, [dispatch, navigate, setLoading]);
  return null;
}

function App() {
  const [loading, setLoading] = React.useState(true);
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthInitializer setLoading={setLoading} />
        {loading ? (
          <LoadingFallback />
        ) : (
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {userRoutes.map((route, idx) => (
                <Route key={idx} element={route.element}>
                  {route.children &&
                    route.children.map((child, cidx) => (
                      <Route key={cidx} path={child.path} element={child.element}>
                        {child.children &&
                          child.children.map((grandchild, gidx) => (
                            <Route key={gidx} path={grandchild.path} element={grandchild.element} />
                          ))}
                      </Route>
                    ))}
                </Route>
              ))}
            </Routes>
          </Suspense>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default React.memo(App);
