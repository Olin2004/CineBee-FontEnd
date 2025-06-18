import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Slide, toast } from 'react-toastify';
import CustomSuccessToast from '../../components/ui/Toast';
import { MESSAGES } from '../../constants/messages';
import { loginGoogle } from '../../services/authAPI';
import { setAuth } from '../../store/authSlice';

export function useGoogleLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();

  const handleGoogleLogin = async (credential) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await loginGoogle(credential);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(setAuth({ user: res.data.user, accessToken: res.data.accessToken }));

      // dispatch(fetchProfile());
      setSuccess(MESSAGES.LOGIN.SUCCESS);
      toast(<CustomSuccessToast title="Success" message={MESSAGES.LOGIN.SUCCESS} />, {
        position: 'top-right',
        autoClose: 1800,
        transition: Slide,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        hideProgressBar: true,
        style: {
          minWidth: 320,
          borderRadius: 12,
          boxShadow: '0 2px 12px #0001',
        },
      });
      // Reload page to home to update header immediately
      window.location.href = '/home-cinebee'; // Reload page to home to update header immediately
    } catch (err) {
      setLoading(false);
      setError(
        err?.response?.data?.message ||
          err?.response?.message ||
          err?.message ||
          MESSAGES.LOGIN.FAIL
      );
      toast(error, { type: 'error' });
    }
  };

  return { handleGoogleLogin, loading, error, success, setError, setSuccess };
}
