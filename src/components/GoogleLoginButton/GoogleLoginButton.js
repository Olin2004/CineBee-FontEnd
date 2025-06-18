import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { useGoogleLogin } from '../../features/auth/useGoogleLogin';

// UI component: chỉ render button và loading, không xử lý logic bên trong
const GoogleLoginButton = () => {
  // Lấy logic từ custom hook
  const { handleGoogleLogin, loading, setError } = useGoogleLogin();

  return (
    <>
      {/* GoogleLogin chỉ nhận callback, không xử lý logic ở đây */}
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          await handleGoogleLogin(credentialResponse.credential);
        }}
        onError={() => setError('Google login failed')}
        useOneTap
        width={'100%'}
      />
      {/* Hiển thị loading khi đang xử lý đăng nhập */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-[#00b14f] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default GoogleLoginButton;
