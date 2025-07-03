import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
// import themeReducer from './themeSlice'; // This file has been deleted, so comment or remove this line

const store = configureStore({
  reducer: {
    auth: authReducer,
    // theme: themeReducer, // Replace or remove themeReducer usage if needed
  },
});

export default store;
