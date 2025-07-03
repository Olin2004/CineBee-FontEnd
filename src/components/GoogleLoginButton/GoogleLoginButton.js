import { GoogleLogin } from '@react-oauth/google';
import React from 'react';
import { useGoogleLogin } from '../../features/auth/useGoogleLogin';

// UI component: only renders button and loading, doesn't handle internal logic
const GoogleLoginButton = () => {
  // Get logic from custom hook
  const { handleGoogleLogin, loading, setError } = useGoogleLogin();

  return (
    <>
      {/* GoogleLogin only receives callback, doesn't handle logic here */}
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          await handleGoogleLogin(credentialResponse.credential);
        }}
        onError={() => setError('Google login failed')}
        useOneTap
        width={'100%'}
      />
      {/* Display loading when processing login */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-[#00b14f] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
};

export default GoogleLoginButton;
