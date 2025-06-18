import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CustomSuccessToast from '../../components/ui/Toast';
import { MESSAGES } from '../../constants/messages';
import { getCaptcha, login } from '../../services/authAPI';
import { setAuth } from '../../store/authSlice';
export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [captchaImg, setCaptchaImg] = useState(null);
  const [captchaKey, setCaptchaKey] = useState(null);
  const dispatch = useDispatch();

  const fetchCaptcha = async () => {
    setLoading(true);
    try {
      const res = await getCaptcha();
      setCaptchaImg(res.data.captchaImg);
      setCaptchaKey(res.data.captchaKey);
    } catch (err) {
      setError(MESSAGES.LOGIN.CAPTCHA_LOAD_FAIL);
    } finally {
      setLoading(false);
    }
  };

  // Call captcha when mount
  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleLogin = async (data) => {
    setLoading(true);
    setError('');

    try {
      // Call captcha again when submitting form (before login)
      await fetchCaptcha();

      const res = await login({
        email: data.email,
        password: data.password,
        captchaKey: captchaKey, // get from the most recent fetchCaptcha
        captcha: data.captcha, // user just entered (correct field name is 'captcha')
      });

      if (res.data.accessToken) {
        localStorage.setItem('profile', JSON.stringify(res.data.user)); // Save profile to localStorage
        dispatch(setAuth(res.data));
        setSuccess('Login successful!');
        toast(<CustomSuccessToast title="Success" message="Login successful!" />, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to home page
        setTimeout(() => {
          window.location.href = '/home-cinebee'; // Reload page to home to update header immediately
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, success, captchaImg, fetchCaptcha };
}
