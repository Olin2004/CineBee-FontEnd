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
        <title>{t('form.login')} | CineBee</title>
        <meta name="description" content={t('form.login') + ' ' + t('banner.book_now')} />
        <meta property="og:title" content="Đăng nhập CineBee" />
        <meta
          property="og:description"
          content="Đăng nhập để trải nghiệm CineBee - Xem phim, nhận ưu đãi!"
        />
        <meta property="og:image" content="/assets/logo/logocenima.png" />
      </Helmet>
      <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            <div className="absolute top-[40%] left-[20%] w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-[60%] right-[20%] w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[20%] left-[40%] w-72 h-72 bg-slate-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Left: Enhanced Banner/logo */}
        <div className="hidden lg:flex flex-1 flex-col items-center justify-center relative z-10">
          <div className="text-center space-y-6 max-w-md">
            <div className="relative">
              <img
                src={logo}
                alt="CineBee"
                className="w-32 h-32 mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
            </div>
            <div className="space-y-4">
              {' '}
              <h1 className="text-5xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                  CineBee
                </span>
              </h1>
              <h2 className="text-2xl font-semibold text-white/90">
                Trải nghiệm điện ảnh
                <br />
                <span className="text-purple-400">hoàn hảo</span>
              </h2>
              <p className="text-lg text-white/70 leading-relaxed">
                Đặt vé nhanh chóng • Giá cả hợp lý
                <br />
                Ưu đãi độc quyền • Dịch vụ tận tâm
              </p>
            </div>{' '}
            <div className="flex items-center justify-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">500K+</div>
                <div className="text-sm text-white/60">Khách hàng</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">50+</div>
                <div className="text-sm text-white/60">Rạp chiếu</div>
              </div>
              <div className="w-px h-12 bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">1000+</div>
                <div className="text-sm text-white/60">Phim hay</div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 text-center">
            <p className="text-white/40 text-sm">© 2024 CineBee. All rights reserved.</p>
          </div>
        </div>

        {/* Right: Enhanced Login form */}
        <div className="flex-1 flex items-center justify-center py-8 px-4 relative z-10">
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 relative overflow-hidden"
              autoComplete="off"
            >
              {/* Form header with gradient overlay */}{' '}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-blue-500"></div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                  <FaUserAlt className="text-white text-xl" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Chào mừng trở lại!</h1>
                <p className="text-gray-600 text-sm">Đăng nhập để tiếp tục trải nghiệm CineBee</p>
              </div>
              {/* Enhanced Username field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Email</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                    <FaUserAlt />
                  </div>
                  <input
                    {...register('username')}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50"
                    placeholder="admin@cinebee.com"
                    autoComplete="username"
                  />
                </div>
                {errors.username && (
                  <div className="flex items-center mt-2 text-blue-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.username.message}
                  </div>
                )}
              </div>
              {/* Enhanced Password field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Mật khẩu</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                    <FaLock />
                  </div>
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 focus:outline-none transition-colors"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-lg" />
                    ) : (
                      <FaEye className="text-lg" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="flex items-center mt-2 text-blue-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password.message}
                  </div>
                )}
                <div className="flex justify-end mt-2">
                  <Link
                    to="/forget-password"
                    className="text-sm text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
              </div>
              {/* Enhanced Captcha field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Mã xác nhận
                </label>
                <div className="flex items-center gap-3">
                  <input
                    {...register('captcha')}
                    className="flex-1 px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50"
                    placeholder="Nhập mã"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={fetchCaptcha}
                    className="relative overflow-hidden rounded-xl border-2 border-purple-200 hover:border-purple-400 p-2 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 group"
                    disabled={loadingCaptcha}
                  >
                    {loadingCaptcha ? (
                      <div className="w-20 h-12 flex items-center justify-center">
                        <div className="animate-spin w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                      </div>
                    ) : (
                      <div className="w-20 h-12 bg-gradient-to-r from-gray-100 to-gray-200 rounded border flex items-center justify-center">
                        {captchaImg ? (
                          <img src={captchaImg} alt="Captcha" className="max-w-full max-h-full" />
                        ) : (
                          <span className="text-gray-500 text-xs">Reload</span>
                        )}
                      </div>
                    )}
                  </button>
                </div>
                {errors.captcha && (
                  <div className="flex items-center mt-2 text-blue-500 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.captcha.message}
                  </div>
                )}
              </div>
              {/* Enhanced Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                {loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-pink-600/80 to-purple-600/80 flex items-center justify-center">
                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                )}
                <span className={loading ? 'opacity-0' : 'opacity-100'}>Đăng nhập</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              {/* Enhanced Google login */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">hoặc</span>
                  </div>
                </div>
                <div className="mt-4">
                  <GoogleLoginButton />
                </div>
              </div>
              {/* Enhanced Register link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 text-sm">
                  Chưa có tài khoản?{' '}
                  <Link
                    to="/register"
                    className="text-purple-600 hover:text-purple-800 font-semibold hover:underline transition-colors"
                  >
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
