import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import userRoutes from './routes/allRole';
import { fetchProfile, setAuth } from './store/authSlice';

// Loading component
const LoadingFallback = () => (
  <div className="w-full h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    let user = null;
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) user = JSON.parse(userStr);
    } catch (e) {
      user = null;
    }

    const initializeAuth = async () => {
      try {
        if (accessToken && user) {
          dispatch(setAuth({ user, accessToken }));
          await dispatch(fetchProfile());
        } else if (accessToken && !user) {
          const res = await dispatch(fetchProfile()).unwrap();
          if (res) {
            localStorage.setItem('user', JSON.stringify(res));
            dispatch(setAuth({ user: res, accessToken }));
          }
        }
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (loading) return <LoadingFallback />;

  return (
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
  );
}

export default React.memo(App);
