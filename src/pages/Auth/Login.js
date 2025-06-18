import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import logo from '../../assets/Image/logo/CineBee.png';
import introVideo from '../../assets/video/intro.mp4';
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => handleLogin(data);

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left: Video intro + logo + slogan */}
      <div className="flex-1 relative hidden md:flex items-end justify-center min-h-screen overflow-hidden">
        {/* Video background */}
        <video
          src={introVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ opacity: 0.6 }}
        />
        {/* Overlay for darken effect */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        {/* Logo + slogan */}
        <div className="relative z-20 flex flex-col items-center mb-16 w-full px-8">
          <img src={logo} alt="CineBee" className="w-44 mb-4" />
          <div className="text-xs text-white mt-2 tracking-widest font-light">MEMON</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight drop-shadow text-center">
            WATCH GREAT MOVIES
          </h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-purple-400 leading-tight drop-shadow text-center">
            EARN SWEET DISCOUNTS!
          </h3>
        </div>
      </div>
      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center bg-[#1a103d] min-h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-[#211047]/90 rounded-2xl shadow-xl px-4 sm:px-8 py-8 sm:py-10 flex flex-col gap-0"
          autoComplete="off"
        >
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide text-center">
            LOGIN
          </h1>
          <div className="text-sm text-gray-300 mb-6 font-medium text-center">
            Sign in with your account
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-1">Username</label>
            <input
              {...register('username')}
              className="w-full px-4 py-3 rounded bg-[#2d2552] text-white border-none focus:ring-2 focus:ring-purple-400"
              placeholder="Username"
              autoComplete="username"
            />
            {errors.username && (
              <span className="text-red-400 text-xs">{errors.username.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-1">Password</label>
            <input
              {...register('password')}
              type="password"
              className="w-full px-4 py-3 rounded bg-[#2d2552] text-white border-none focus:ring-2 focus:ring-purple-400"
              placeholder="Password"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="text-red-400 text-xs">{errors.password.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white mb-2">
              Please enter the characters below <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                {...register('captcha')}
                className="w-full px-4 py-3 rounded bg-[#2d2552] text-white border-none focus:ring-2 focus:ring-purple-400"
                placeholder={MESSAGES.LOGIN.CAPTCHA_PLACEHOLDER}
                autoComplete="off"
                style={{ minWidth: 0, height: 48, fontSize: 16, flex: 1 }}
              />
              {errors.captcha && (
                <span className="text-red-400 text-xs">{errors.captcha.message}</span>
              )}
              <div className="flex items-center gap-2" style={{ height: 48 }}>
                {captchaImg && (
                  <img
                    src={captchaImg}
                    alt="captcha"
                    className="h-12 w-28 rounded border bg-white object-contain"
                    style={{ display: 'block' }}
                  />
                )}
                <button
                  type="button"
                  onClick={fetchCaptcha}
                  className="bg-white bg-opacity-80 p-1 rounded-full hover:bg-gray-200 transition flex items-center justify-center"
                  disabled={loadingCaptcha}
                  aria-label="Refresh captcha"
                  style={{ lineHeight: 0, width: 28, height: 28, padding: 0 }}
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M17.65 6.35A7.95 7.95 0 0 0 12 4V1L7 6l5 5V7c1.93 0 3.68.78 4.95 2.05A7 7 0 1 1 5.07 7.07"
                      stroke="#a78bfa"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {error && <div className="text-red-400 text-sm mt-2 mb-1 text-center">{error}</div>}
          {success && <div className="text-green-400 text-sm mt-2 mb-1 text-center">{success}</div>}
          <button
            type="submit"
            className="w-full mt-4 mb-4 py-3 rounded-lg font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-cyan-400 shadow-md hover:shadow-xl active:shadow-lg transition-transform duration-150 transform active:scale-95 hover:scale-105"
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Login'}
          </button>
          <div className="flex items-center my-3 text-gray-400">
            <div className="flex-1 h-px bg-[#2d2552]" />
            <span className="mx-3 text-xs">Or continue with</span>
            <div className="flex-1 h-px bg-[#2d2552]" />
          </div>
          {/* Google Login Button */}
          <GoogleLoginButton />
          <div className="text-xs text-gray-400 mt-2 text-center">
            Don't have an account?{' '}
            <a href="/register" className="text-purple-400 underline">
              Sign up now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
