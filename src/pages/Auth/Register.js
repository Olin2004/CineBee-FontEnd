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
        <title>{t('form.register')} | CineBee</title>
        <meta name="description" content={t('form.register') + ' ' + t('banner.book_now')} />
        <meta property="og:title" content="Đăng ký CineBee" />
        <meta
          property="og:description"
          content="Đăng ký tài khoản CineBee để nhận ưu đãi, đặt vé và xem phim dễ dàng!"
        />
        <meta property="og:image" content="/assets/logo/logocenima.png" />
      </Helmet>

      <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background elements */}{' '}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] opacity-50">
            <div className="absolute top-[30%] left-[15%] w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-[70%] right-[15%] w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[10%] left-[50%] w-72 h-72 bg-slate-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>
        {/* Left: Enhanced Banner */}
        <div className="hidden lg:flex flex-1 flex-col items-center justify-center relative z-10">
          <div className="text-center space-y-6 max-w-md">
            <div className="relative">
              <img
                src={logo}
                alt="CineBee"
                className="w-32 h-32 mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            </div>

            <div className="space-y-4">
              {' '}
              <h1 className="text-5xl font-bold text-white leading-tight">
                Tham gia
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-blue-500 bg-clip-text text-transparent">
                  CineBee
                </span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Khởi đầu hành trình
                <br />
                <span className="text-purple-400">điện ảnh tuyệt vời</span>
              </p>
              <div className="text-lg text-white/70 space-y-2">
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Đăng ký miễn phí hoàn toàn
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Nhận ưu đãi độc quyền
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-slate-400 rounded-full mr-3"></span>
                  Trải nghiệm xem phim tốt nhất
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 text-center">
            <p className="text-white/40 text-sm">© 2024 CineBee. All rights reserved.</p>
          </div>
        </div>
        {/* Right: Enhanced Register form */}
        <div className="flex-1 flex items-center justify-center py-8 px-4 relative z-10 overflow-y-auto">
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 relative overflow-hidden my-8"
              autoComplete="off"
            >
              {/* Form header with gradient overlay */}{' '}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-blue-500"></div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                  <FaUserAlt className="text-white text-xl" />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Tạo tài khoản mới</h1>
                <p className="text-gray-600 text-sm">Điền thông tin để bắt đầu với CineBee</p>
              </div>
              {/* Email field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Email</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                    <FaEnvelope />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50"
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>
              {/* Full Name field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Họ và tên</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                    <FaUserAlt />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50"
                    placeholder="Nguyễn Văn A"
                    autoComplete="name"
                  />
                </div>
              </div>
              {/* Phone field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">
                  Số điện thoại
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                    <FaPhone />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50"
                    placeholder="0901234567"
                    autoComplete="tel"
                  />
                </div>
              </div>
              {/* Date of Birth field */}
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Ngày sinh</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                    <FaBirthdayCake />
                  </div>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50"
                    autoComplete="bday"
                  />
                </div>
              </div>
              {/* Password field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Mật khẩu</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500 transition-colors">
                    <FaLock />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-gray-800 placeholder-gray-400 bg-gray-50/50"
                    placeholder="••••••••"
                    autoComplete="new-password"
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
                <p className="text-xs text-gray-500 mt-1">
                  Ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số
                </p>
              </div>
              {/* Error message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}
              {/* Register button */}{' '}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-blue-700 hover:from-purple-700 hover:via-blue-700 hover:to-blue-800 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
              >
                {loading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 via-blue-600/80 to-blue-700/80 flex items-center justify-center">
                    <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                  </div>
                )}
                <span className={loading ? 'opacity-0' : 'opacity-100'}>Tạo tài khoản</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </button>
              {/* Google register */}
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
              {/* Login link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                  Đã có tài khoản?{' '}
                  <Link
                    to="/login"
                    className="text-purple-600 hover:text-purple-800 font-semibold hover:underline transition-colors"
                  >
                    Đăng nhập ngay
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

export default Register;
