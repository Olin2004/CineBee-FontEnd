import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash, FaLock, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import * as yup from 'yup';
import logo from '../../assets/Image/logo/CineBee.png';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import { MESSAGES } from '../../constants/messages';
import { useLogin } from '../../features/auth/useLogin';

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  captcha: yup.string().required('Captcha is required'),
});

const Login = () => {
  const { handleLogin, loading, error, success, captchaImg, fetchCaptcha, loadingCaptcha } =
    useLogin();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = (data) => {
    if (!data.captcha || data.captcha.trim() === '') {
      setError('captcha', { type: 'manual', message: MESSAGES.LOGIN.CAPTCHA_PLACEHOLDER });
      toast.error(MESSAGES.LOGIN.CAPTCHA_PLACEHOLDER);
      return;
    }
    handleLogin(data);
  };

  const onError = (formErrors) => {
    const firstError = Object.values(formErrors)[0];
    if (firstError && firstError.message) {
      toast.error(firstError.message);
    }
  };

  React.useEffect(() => {
    if (success) {
      toast.success(success || 'Login successful!');
    }
  }, [success]);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  React.useEffect(() => {
    // Nếu có lỗi validate, hiện toast lỗi đầu tiên
    const firstError = Object.values(errors)[0];
    if (firstError && firstError.message) {
      toast.error(firstError.message);
    }
  }, [errors]);

  return (
    <>
      <Helmet>
        <title>{t('login.login')} | CineBee</title>
        <meta name="description" content={t('login.login') + ' ' + t('banner.book_now')} />
        <meta property="og:title" content="Đăng nhập CineBee" />
        <meta
          property="og:description"
          content="Đăng nhập để trải nghiệm CineBee - Xem phim, nhận ưu đãi!"
        />
        <meta property="og:image" content="/assets/logo/logocenima.png" />
      </Helmet>
      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#1a103d] via-[#1e1b4b] to-[#312e81]">
        {/* Left: Banner/logo */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-[#2d1a4d] to-[#1e1b4b] relative">
          <img src={logo} alt="CineBee" className="w-48 mb-6 drop-shadow-2xl animate-fade-in-up" />
          <h2 className="text-3xl font-extrabold text-white mb-2 leading-tight drop-shadow-2xl text-center bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Đặt vé xem phim trực tuyến
          </h2>
          <p className="text-lg text-white/80 mb-8 text-center max-w-xs">
            Nhanh chóng - Tiện lợi - Ưu đãi hấp dẫn
          </p>
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
            <span className="text-white/60 text-xs">© CineBee 2024</span>
          </div>
        </div>
        {/* Right: Login form */}
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-8 relative">
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-8 flex flex-col gap-0 border border-white/10 animate-fade-in-up"
            autoComplete="off"
          >
            <div className="text-center mb-6">
              <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {t('login.login')}
              </h1>
              <div className="text-sm text-gray-300 font-medium mb-2">
                {t('login.login')} {t('banner.book_now')}
              </div>
            </div>
            {/* Username */}
            <div className="mb-4 group">
              <label className="block text-white font-semibold mb-2 text-sm">
                {t('form.email')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaUserAlt />
                </span>
                <input
                  {...register('username')}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                  placeholder={t('form.email')}
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <span className="text-red-400 text-xs mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.username.message}
                </span>
              )}
            </div>
            {/* Password */}
            <div className="mb-4 group">
              <label className="block text-white font-semibold mb-2 text-sm">
                {t('form.password')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <FaLock />
                </span>
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                  placeholder={t('form.password')}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-400 focus:outline-none"
                  tabIndex={-1}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-400 text-xs mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password.message}
                </span>
              )}
              <div className="flex justify-end mt-1">
                <Link to="/forgot-password" className="text-xs text-pink-300 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            {/* Captcha */}
            <div className="mb-4 group">
              <label className="block text-white font-semibold mb-2 text-sm">Mã xác nhận</label>
              <div className="flex items-center gap-2">
                <input
                  {...register('captcha')}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Nhập mã xác nhận"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={fetchCaptcha}
                  className="rounded-lg border border-pink-400 px-2 py-1 bg-white/20 hover:bg-pink-400/20 transition-colors duration-200"
                  disabled={loadingCaptcha}
                  tabIndex={-1}
                >
                  {loadingCaptcha ? '...' : <img src={captchaImg} alt="captcha" className="h-10" />}
                </button>
              </div>
              {errors.captcha && (
                <span className="text-red-400 text-xs mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.captcha.message}
                </span>
              )}
            </div>
            {/* Google login */}
            <div className="mb-4">
              <GoogleLoginButton />
            </div>
            {/* Hiển thị message lỗi/thành công từ API dưới form */}
            {error && (
              <div className="flex items-center justify-center gap-2 text-red-700 bg-red-100/80 border border-red-400 rounded-xl py-2 px-3 mb-3 shadow-sm animate-fade-in-up">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="#fee2e2"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01"
                  />
                </svg>
                <span className="font-semibold text-sm">{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center justify-center gap-2 text-green-700 bg-green-100/80 border border-green-400 rounded-xl py-2 px-3 mb-3 shadow-sm animate-fade-in-up">
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="#bbf7d0"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
                <span className="font-semibold text-sm">{success}</span>
              </div>
            )}
            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold text-lg shadow-lg hover:from-pink-600 hover:to-yellow-500 transition-all duration-300 mt-2 mb-2"
              disabled={loading}
            >
              {loading ? t('common.loading', 'Đang đăng nhập...') : t('login.login')}
            </button>
            {/* Register link */}
            <div className="text-center mt-2">
              <span className="text-white/80 text-sm">
                {t('login.no_account', 'Chưa có tài khoản?')}
              </span>
              <Link to="/register" className="text-pink-300 hover:underline text-sm font-semibold">
                {t('signup.register')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
