import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProfile } from '../services/authAPI';

const initialState = {
  user: null,
  accessToken: null,
  profile: null,
  isAuthenticated: false,
};

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async () => {
  return await getProfile();
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      // If there's an accessToken and profile returns a valid object, authenticate login
      state.isAuthenticated = !!state.accessToken && !!action.payload && !!action.payload.id;
    });
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
