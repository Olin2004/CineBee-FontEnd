import { api } from './apiConfig';

import {
  ENDPOINTS_CAPTCHA,
  ENDPOINTS_FORGET_PASSWORD,
  ENDPOINTS_LOGIN,
  ENDPOINTS_LOGOUT,
  ENDPOINTS_REGISTER,
  ENDPOINTS_RESET_PASSWORD,
  ENDPOINTS_VERIFY_OTP,
  LOGIN_GOOGLE,
} from './endpointsAPI';
// authentication ENDPOINTS calls
// authentication ENDPOINTS calls
export const registerUser = async (userData) => {
  return api.post(ENDPOINTS_REGISTER, userData, { withCredentials: true });
};

export const login = async (userData) => {
  return api.post(ENDPOINTS_LOGIN, userData, { withCredentials: true });
};

export const logoutUser = async () => {
  // Gửi request logout để backend xóa cookie
  return api.post(ENDPOINTS_LOGOUT, {}, { withCredentials: true });
};

export const getCaptcha = async () => {
  return api.get(ENDPOINTS_CAPTCHA);
};
export const forgetPassword = async (email) => {
  return api.post(ENDPOINTS_FORGET_PASSWORD, { email });
};
export const verifyOtp = async (email, otp) => {
  return api.post(ENDPOINTS_VERIFY_OTP, { email, otp });
};

export const loginGoogle = async (idToken) => {
  return api.post(LOGIN_GOOGLE, { idToken }, { withCredentials: true });
};

export const getProfile = async () => {
  try {
    const res = await api.get('/profile', { withCredentials: true });
    return res.data;
  } catch (err) {
    return null;
  }
};

export const resetPassword = async (temporaryToken, newPassword) => {
  return api.post(ENDPOINTS_RESET_PASSWORD, { temporaryToken, newPassword });
};
