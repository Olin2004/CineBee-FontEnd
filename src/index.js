import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './i18n';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="254949369735-abek7ini3etgg8hn6vc9mhvt0k1mnoaj.apps.googleusercontent.com">
    <Provider store={store}>
      <HelmetProvider>
        <React.StrictMode>
          <App />
          <ToastContainer />
        </React.StrictMode>
      </HelmetProvider>
    </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
