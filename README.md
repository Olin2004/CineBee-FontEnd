# Cinema Zino Frontend

## Introduction

This is an online movie streaming web project, built with ReactJS, Redux Toolkit, Tailwind CSS and modern separated UI/logic architecture, easy to maintain.

## Main Directory Structure

```
src/
  assets/           # Images, videos, icons
  components/       # UI components (Header, Footer, Search, ...)
  constants/        # Common constants
  features/         # Custom hooks for logic (auth, profile, ...)
  layouts/          # Layouts (MainLayout, AuthLayout)
  pages/            # Main pages (Home, Login, Register, ...)
  routes/           # Route definitions, layout separation
  services/         # API calls (authAPI, apiConfig, ...)
  store/            # Redux store, slice
  utils/            # Utility functions (formatDate, ...)
  App.js            # Initialize app, read localStorage, set Redux
  index.js          # Entry point
```

## Architecture & How It Works

- **UI (components/):** Only renders interface, receives props/hooks, doesn't handle complex logic.
- **Logic (features/):** Custom hooks (useLogin, useGoogleLogin, ...) handle API calls, validation, toast, ...
- **Service (services/):** Only calls APIs, doesn't handle UI.
- **Redux (store/):** Manages global state (auth, theme, ...), doesn't call APIs directly in UI.
- **Layout (layouts/):** MainLayout (with Header, Footer), AuthLayout (without Header).
- **Route (routes/):** Clearly distinguishes which routes use which layout, doesn't repeat Header.
- **Login storage:**
  - After successful login: save accessToken + user to localStorage.
  - When app loads: read localStorage again, set Redux back (App.js).
  - When logout: clear localStorage, reset Redux.

## Login/Logout Process

1. **Successful Login:**
   - Save accessToken and user to localStorage.
   - dispatch(setAuth) updates Redux.
   - (Can call fetchProfile to sync profile from BE).
2. **When F5 or reopen app:**
   - App.js reads localStorage, sets Redux back, maintains login status.
3. **Logout:**
   - Remove accessToken, user from localStorage.
   - dispatch(logout) resets Redux.

## Running the Project

```bash
pnpm install
pnpm start
```

Access http://localhost:3000

## Notes

- Project uses Tailwind CSS for modern, responsive UI.
- Separating UI/logic helps with maintenance, expansion, testing.
- Can expand with other features following existing patterns.
