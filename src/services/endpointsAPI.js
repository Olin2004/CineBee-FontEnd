// AUTH
export const ENDPOINTS_REGISTER = '/auth/register';
export const ENDPOINTS_LOGIN = '/auth/login';
export const ENDPOINTS_LOGOUT = '/auth/logout';
export const ENDPOINTS_CAPTCHA = '/auth/captcha';
export const LOGIN_GOOGLE = '/auth/google';
export const ENDPOINTS_REFRESH_TOKEN = '/auth/refresh-token';
export const ENDPOINTS_FORGET_PASSWORD = 'auth/forgot-password';
export const ENDPOINTS_VERIFY_OTP = '/auth/verify-otp';
export const ENDPOINTS_RESET_PASSWORD = '/auth/reset-password';
// PROFILE
export const ENDPOINTS_PROFILE = '/profile';

//movies
export const ENDPOINTS_TRENDING_MOVIES = '/movies/trending';
export const ENDPOINTS_SEARCH_MOVIES = '/movies/search';
export const ENDPOINTS_ADD_MOVIE_NEW = '/movies/add-new-film';
export const ENDPOINTS_UPDATE_MOVIE = '/movies/update-film';
export const ENDPOINTS_DELETE_MOVIE = '/movies/delete-film';
export const ENDPOINTS_GET_BANER_ACTIVE = '/banner/active';
export const ENDPOINTS_GET_LIST_MOVIES = '/movies/list-movies';

//payment
export const ENDPOINTS_PAYMENT = {
  MOMO_CREATE: '/v1/payments/momo/create',
  MOMO_STATUS: '/v1/payments/momo/status',
  PAYMENT_HISTORY: '/v1/payments/history',
};
