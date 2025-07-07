import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import CustomSuccessToast from '../../components/ui/Toast';
import { MESSAGES } from '../../constants/messages';
import { getCaptcha, login } from '../../services/authAPI';
import { fetchProfile, setAuth } from '../../store/authSlice';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [captchaImg, setCaptchaImg] = useState(null);
  const [captchaKey, setCaptchaKey] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  // Gọi captcha khi mount
  useEffect(() => {
    fetchCaptcha();
  }, []);

  // Gọi lại captcha khi submit form (trước khi login)
  const handleLogin = async (data) => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const payload = {
        username: data.username,
        password: data.password,
        captchaKey: captchaKey, // lấy từ lần fetchCaptcha gần nhất
        captcha: data.captcha,
      };
      const res = await login(payload);

      // Kiểm tra userStatus
      if (res.data.userStatus !== 'ACTIVE') {
        setError(MESSAGES.LOGIN.USER_BLOCKED);
        setLoading(false);
        return;
      }

      dispatch(setAuth({ isAuthenticated: true }));
      await dispatch(fetchProfile());
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setSuccess(MESSAGES.LOGIN.SUCCESS);
      toast(
        <CustomSuccessToast title={MESSAGES.LOGIN.SUCCESS} message={MESSAGES.LOGIN.SUCCESS} />,
        {
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
        }
      );
      // Lấy role từ profile sau khi fetchProfile
      const profile = queryClient.getQueryData(['profile']);
      const userRole = profile?.role || res.data.role;
      console.log('Profile:', profile);
      console.log('userRole:', userRole);
      if (userRole === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else if (userRole) {
        navigate('/home-cinebee', { replace: true });
      } // Nếu không có role thì không chuyển hướng
    } catch (err) {
      setError(err.response?.data?.message || MESSAGES.LOGIN.FAIL);
      fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, success, captchaImg, fetchCaptcha };
}
