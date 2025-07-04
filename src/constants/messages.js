// Centralized messages for the app
export const MESSAGES = {
  SIGNUP: {
    FILL_REQUIRED: 'Please fill in all required fields.',
    INVALID_EMAIL: 'Invalid email format.',
    PASSWORD_SHORT: 'Password must be at least 6 characters.',
    SUCCESS: 'Sign up successful!',
    FAIL: 'Sign up failed. Please try again.',
  },
  LOGIN: {
    FILL_REQUIRED: 'Please enter all information and captcha code.',
    CAPTCHA_LOAD_FAIL: 'Cannot load captcha. Please try again.',
    SUCCESS: 'Login successful!',
    FAIL: 'Login failed. Please try again.',
    CAPTCHA_REFRESH: 'Refresh captcha',
    CAPTCHA_LOADING: 'Loading...',
    CAPTCHA_PLACEHOLDER: 'Enter captcha code',
    USER_BLOCKED: 'Your account has been blocked or is inactive!',
  },
  STATUS: {
    ACTIVE: 'Active now',
    BANNED: 'Banned',
    UNDEFINED: 'Undefined',
  },
  SIDEBAR: {
    DASHBOARD: 'Dashboard',
    USERS: 'User Management',
    MOVIES: 'Movie Management',
    STATISTICS: 'Statistics',
    SETTINGS: 'Settings',
    LOGOUT: 'Logout',
  },
  HEADER: {
    HOME: 'Home',
    GENRES: 'Genres',
    MOVIES: 'Movies',
    NOW_SHOWING: 'Now Showing',
    SHOWTIMES: 'Showtimes',
    PAID: 'Paid',
    TOP_10_3D: 'Top 10 3D',
    HIGHLY_RATED: 'Highly Rated',
    ACCOUNT_MANAGEMENT: 'Account management',
    SETTINGS: 'Settings',
    LOGOUT: 'Logout',
  },
  COMMON: {
    LOGOUT: 'Logout',
    ERROR: 'An error occurred. Please try again.',
    SUCCESS: 'Operation successful!',
    CONFIRM: 'Are you sure?',
    CANCEL: 'Cancel',
    SAVE: 'Save',
    EDIT: 'Edit',
    DELETE: 'Delete',
    UPDATE: 'Update',
    CREATE: 'Create',
    SEARCH: 'Search',
    NO_DATA: 'No data available.',
  },
};
