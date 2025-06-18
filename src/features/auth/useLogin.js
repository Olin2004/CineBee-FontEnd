import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
        captcha: data.captcha, // người dùng vừa nhập (đúng tên trường là 'captcha')
      };
      const res = await login(payload);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('profile', JSON.stringify(res.data.user)); // Lưu profile vào localStorage
      dispatch(setAuth({ user: res.data.user, accessToken: res.data.accessToken }));
      dispatch(fetchProfile());
      setSuccess('Đăng nhập thành công!');
      toast(<CustomSuccessToast title="Thành công" message="Đăng nhập thành công!" />, {
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
      window.location.href = '/home-cinebee'; // Reload lại trang về trang chủ để header cập nhật ngay
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại!');
      fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error, success, captchaImg, fetchCaptcha };
}
