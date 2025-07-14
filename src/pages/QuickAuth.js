// Quick Auth Test - Quick authentication for testing purposes
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../store/authSlice';

const QuickAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quickLogin = (role) => {
    const mockUser = {
      id: 1,
      fullName: `Demo ${role}`,
      email: `demo.${role.toLowerCase()}@cinebee.com`,
      role: role,
      avatar: null,
    };

    dispatch(
      setAuth({
        user: mockUser,
        isAuthenticated: true,
      })
    );

    // Navigate to appropriate dashboard
    const dashboards = {
      STAFF: '/staff/dashboard',
      ADMIN: '/admin/dashboard',
    };

    navigate(dashboards[role]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          🚀 Quick Login for Demo
        </h2>{' '}
        <div className="space-y-4">
          <button
            onClick={() => quickLogin('STAFF')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
          >
            👨‍💼 Login as STAFF
          </button>

          <button
            onClick={() => quickLogin('ADMIN')}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200"
          >
            👨‍💻 Login as ADMIN
          </button>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            💡 Tip: Sau khi login, bạn có thể truy cập trực tiếp các URL dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickAuth;
