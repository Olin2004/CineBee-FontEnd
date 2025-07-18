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
- **Authentication:**
  - Uses HTTP-only cookies for secure authentication.
  - No tokens stored in localStorage for security.
  - Automatic cookie handling with `withCredentials: true`.

## Login/Logout Process

1. **Successful Login:**
   - Backend sets HTTP-only cookies automatically.
   - Frontend calls API with `withCredentials: true`.
   - dispatch(setAuth) updates Redux state.
   - fetchProfile() validates authentication status.
2. **When F5 or reopen app:**
   - App.js automatically calls fetchProfile() to check authentication.
   - If cookies are valid, user stays logged in.
   - If cookies are invalid/expired, user is logged out.
3. **Logout:**
   - Backend clears HTTP-only cookies via logout API.
   - dispatch(logout) resets Redux state.
   - No localStorage cleanup needed.

## Running the Project

```bash
npm i -f
npm start
```

Access http://localhost:3000

## Notes

- Project uses Tailwind CSS for modern, responsive UI.
- Separating UI/logic helps with maintenance, expansion, testing.
- Can expand with other features following existing patterns.

## MoMo Payment Integration

The CineBee system now supports MoMo payment integration for online ticket booking.

### Features

- **Secure Payment**: Integration with MoMo payment gateway for safe transactions.
- **Dual Payment Options**: Users can choose between cash payment at counter or online MoMo payment.
- **Real-time Processing**: Payment status tracking and result handling.

### Payment Flow

1. **User selects payment method** on booking page (Step 5):

   - **Cash Payment**: Book tickets, pay at counter before 30 minutes.
   - **MoMo Payment**: Pay immediately, receive e-tickets via email/SMS.

2. **MoMo Payment Process**:
   - User clicks "Thanh toán qua MoMo" button.
   - System calls `/v1/payments/momo/create` API with ticket ID.
   - User is redirected to MoMo payment page.
   - After payment, user returns to `/payment/momo/result` page.
   - System displays payment status and next steps.

### API Integration

- **Payment API**: `src/services/paymentAPI.js` handles all payment-related API calls.
- **Endpoints**: Centralized in `src/services/endpointsAPI.js`.
- **Error Handling**: Comprehensive error messages and user guidance.

### Components

- **Booking Page**: `src/pages/MainPage/Booking.js` - Main booking flow with payment options.
- **Payment Result**: `src/pages/Payment/MomoResultPage.js` - Handles MoMo payment results.
- **Demo Component**: `src/components/TicketPayment.js` - Standalone payment component example.

### Configuration

```javascript
// Example usage in your component
import { redirectToMomoPayment } from '../services/paymentAPI';

const handlePayment = async (ticketId) => {
  try {
    await redirectToMomoPayment(ticketId);
  } catch (error) {
    console.error('Payment failed:', error.message);
  }
};
```
