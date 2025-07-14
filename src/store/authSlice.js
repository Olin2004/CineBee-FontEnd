import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProfile } from '../services/authAPI';

const initialState = {
  user: null,
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
      state.profile = action.payload.user; // Đồng bộ profile với user
      state.isAuthenticated = action.payload.isAuthenticated || true;
    },
    logout(state) {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      // Nếu profile trả về data hợp lệ thì user đã đăng nhập
      state.isAuthenticated = !!action.payload && !!action.payload.id;
    });
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
