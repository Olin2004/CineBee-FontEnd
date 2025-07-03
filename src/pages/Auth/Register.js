import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {
  FaBirthdayCake,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaPhone,
  FaUserAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import logo from '../../assets/Image/logo/CineBee.png';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import { useRegister } from '../../features/auth/useRegister';

const Register = () => {
  const { form, error, handleChange, handleSubmit, loading, success } = useRegister();
  const [showPassword, setShowPassword] = React.useState(false);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (success) {
      toast.success(success || 'Register successful!');
    }
  }, [success]);

  return (
    <>
      <Helmet>
        <title>{t('signup.register')} | CineBee</title>
        <meta name="description" content={t('signup.register') + ' ' + t('banner.book_now')} />
        <meta property="og:title" content="Đăng ký CineBee" />
        <meta
          property="og:description"
          content="Đăng ký tài khoản CineBee để nhận ưu đãi, đặt vé và xem phim dễ dàng!"
        />
        <meta property="og:image" content="/assets/logo/logocenima.png" />
      </Helmet>
      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#1a103d] via-[#1e1b4b] to-[#312e81]">
        {/* Left: Logo + slogan (desktop) */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-[#2d1a4d] to-[#1e1b4b] relative">
          <img src={logo} alt="CineBee" className="w-48 mb-6 drop-shadow-2xl animate-fade-in-up" />
          <h2 className="text-3xl font-extrabold text-white mb-2 leading-tight drop-shadow-2xl text-center bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            Đăng ký tài khoản CineBee
          </h2>
          <p className="text-lg text-white/80 mb-8 text-center max-w-xs">
            Đặt vé - Nhận ưu đãi - Xem phim dễ dàng
          </p>
          <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
            <span className="text-white/60 text-xs">© CineBee 2024</span>
          </div>
        </div>
        {/* Right: Form */}
        <div className="flex-1 flex items-center justify-center min-h-screen py-8 px-4 sm:px-8">
          <div className="w-full max-w-md">
            {/* Logo + slogan (mobile) */}
            <div className="flex flex-col items-center mb-6 md:hidden">
              <img src={logo} alt="CineBee" className="w-32 mb-2 drop-shadow-2xl" />
              <h2 className="text-2xl font-extrabold text-white mb-1 text-center bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Đăng ký tài khoản CineBee
              </h2>
              <p className="text-base text-white/80 text-center max-w-xs">
                Đặt vé - Nhận ưu đãi - Xem phim dễ dàng
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-8 flex flex-col gap-0 border border-white/10 animate-fade-in-up"
              autoComplete="off"
            >
              <div className="text-center mb-6">
                <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {t('signup.register')}
                </h1>
                <div className="text-sm text-gray-300 font-medium mb-2">
                  {t('signup.register')} {t('banner.book_now')}
                </div>
              </div>
              {/* Email */}
              <div className="mb-4 group">
                <label className="block text-white font-semibold mb-2 text-sm">
                  {t('form.email')}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder={t('form.email')}
                    autoComplete="email"
                  />
                </div>
              </div>
              {/* Full name */}
              <div className="mb-4 group">
                <label className="block text-white font-semibold mb-2 text-sm">
                  {t('form.full_name')}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaUserAlt />
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder={t('form.full_name')}
                    autoComplete="name"
                  />
                </div>
              </div>
              {/* Phone */}
              <div className="mb-4 group">
                <label className="block text-white font-semibold mb-2 text-sm">
                  {t('form.phone')}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaPhone />
                  </span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder={t('form.phone')}
                    autoComplete="tel"
                  />
                </div>
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
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder={t('form.password')}
                    autoComplete="new-password"
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
              </div>
              {/* Date of Birth */}
              <div className="mb-4 group">
                <label className="block text-white font-semibold mb-2 text-sm">Ngày sinh</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaBirthdayCake />
                  </span>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                    style={{ fontSize: 15 }}
                  />
                </div>
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
                {loading ? t('common.loading', 'Đang đăng ký...') : t('signup.register')}
              </button>
              {/* Login link */}
              <div className="text-center mt-2">
                <span className="text-white/80 text-sm">
                  {t('signup.have_account', 'Đã có tài khoản?')}
                </span>
                <Link to="/login" className="text-pink-300 hover:underline text-sm font-semibold">
                  {t('login.login')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
