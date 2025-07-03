import { api } from './apiConfig';

import {
  ENDPOINTS_CAPTCHA,
  ENDPOINTS_LOGIN,
  ENDPOINTS_LOGOUT,
  ENDPOINTS_REGISTER,
  LOGIN_GOOGLE,
} from './endpointsAPI';
// authentication ENDPOINTS calls
export const registerUser = async (userData) => {
  return api.post(ENDPOINTS_REGISTER, userData);
};
export const login = async (userData) => {
  return api.post(ENDPOINTS_LOGIN, userData);
};

export const logoutUser = async () => {
  const accessToken = localStorage.getItem('accessToken');
  return api.post(
    ENDPOINTS_LOGOUT,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export const getCaptcha = async () => {
  return api.get(ENDPOINTS_CAPTCHA);
};
export const loginGoogle = async (idToken) => {
  return api.post(LOGIN_GOOGLE, { idToken });
};

export const getProfile = async () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return null;
  try {
    const res = await api.get('/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
};
