# Cinema Zino Frontend

Cinema Zino is a modern web application built with React, Vite, TailwindCSS, and Material-UI. This project serves as a platform for users to browse, book, and manage movie tickets seamlessly.

## Project Structure

```
cinema-zino-frontend
├── public/
│   ├── index.html          # Main HTML file serving as the entry point
│   └── favicon.ico         # Favicon for the application
├── src/
│   ├── assets/             # Contains images and assets
│   │   ├── avatars/        # Default avatar images
│   │   └── images/         # Movie posters and logos
│   ├── components/         # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   ├── Input.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Pagination.jsx
│   │   ├── MovieCard.jsx
│   │   ├── RoomSelector.jsx
│   │   ├── SeatGrid.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── contexts/           # Context API for state management
│   │   └── AuthContext.jsx
│   ├── hooks/              # Custom hooks
│   │   ├── useAuth.js
│   │   └── useFetchAuth.js
│   ├── services/           # API service functions
│   │   ├── axiosInstance.js
│   │   ├── authService.js
│   │   ├── movieService.js
│   │   ├── bookingService.js
│   │   └── adminService.js
│   ├── utils/              # Utility functions
│   │   ├── formatters.js
│   │   └── validators.js
│   ├── routes/             # Route components
│   │   ├── PrivateRoute.jsx
│   │   └── AdminRoute.jsx
│   ├── pages/              # Application pages
│   │   ├── NonAuth/
│   │   ├── Auth/
│   │   └── Shared/
│   ├── App.jsx             # Main application component
│   └── main.jsx            # Entry point for the React application
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Getting Started

To get started with the Cinema Zino frontend application, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cinema-zino-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## Features

- User authentication (login, register, password recovery)
- Movie browsing and searching
- Booking tickets and viewing booking history
- Admin panel for managing movies and reports

## Technologies Used

- React
- Vite
- TailwindCSS
- Material-UI

## License

This project is licensed under the MIT License. See the LICENSE file for details.