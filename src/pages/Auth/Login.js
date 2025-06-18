import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as yup from 'yup';
import logo from '../../assets/Image/logo/CineBee.png';
import introVideo from '../../assets/video/intro.mp4';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import InputField from '../../components/Input/InputField';
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

  const onSubmit = (data) => {
    handleLogin(data);
    toast.success('Login successful!');
  };

  React.useEffect(() => {
    if (success) {
      toast.success(success || 'Login successful!');
    }
  }, [success]);

  return (
    <div className="min-h-screen flex font-sans overflow-hidden">
      {/* Left: Video intro + logo + slogan */}
      <div className="flex-1 relative hidden lg:flex items-end justify-center min-h-screen overflow-hidden">
        {/* Video background */}
        <video
          src={introVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
          style={{ opacity: 0.7 }}
        />
        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60 z-10"></div>
        {/* Animated background elements */}
        <div className="absolute inset-0 z-5">
          <div className="star star1 absolute">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="#fbbf24"
                opacity="0.6"
              />
            </svg>
          </div>
          <div className="star star2 absolute">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill="#60a5fa"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>
        {/* Logo + slogan with enhanced animations */}
        <div className="relative z-20 flex flex-col items-center mb-16 w-full px-8 animate-fade-in-up">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <img src={logo} alt="CineBee" className="w-44 mb-4 drop-shadow-2xl" />
          </div>
          <div className="text-xs text-white mt-2 tracking-widest font-light opacity-80">MEMON</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight drop-shadow-2xl text-center bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            WATCH GREAT MOVIES
          </h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-purple-400 leading-tight drop-shadow-2xl text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            EARN SWEET DISCOUNTS!
          </h3>
        </div>
      </div>

      {/* Right: Login form with enhanced styling */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#1a103d] via-[#1e1b4b] to-[#312e81] min-h-screen relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          ></div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl px-6 sm:px-8 py-8 sm:py-10 flex flex-col gap-0 border border-white/10 relative z-10 animate-fade-in-up"
          autoComplete="off"
        >
          {/* Form header with enhanced styling */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-white mb-3 tracking-wide bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              LOGIN
            </h1>
            <div className="text-sm text-gray-300 font-medium">Sign in with your account</div>
          </div>

          {/* Username field with enhanced styling */}
          <div className="mb-6 group">
            <label className="block text-white font-semibold mb-2 text-sm">Username</label>
            <div className="relative">
              <input
                {...register('username')}
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm placeholder-gray-400"
                placeholder="Enter your username"
                autoComplete="username"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-focus-within:from-purple-500/20 group-focus-within:to-cyan-500/20 transition-all duration-300 pointer-events-none"></div>
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

          {/* Password field with enhanced styling */}
          <div className="mb-6 group">
            <label className="block text-white font-semibold mb-2 text-sm">Password</label>
            <div className="relative">
              <InputField
                {...register('password')}
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm placeholder-gray-400"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-focus-within:from-purple-500/20 group-focus-within:to-cyan-500/20 transition-all duration-300 pointer-events-none"></div>
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
          </div>

          {/* Captcha field with enhanced styling */}
          <div className="mb-6 group">
            <label className="block text-sm font-semibold text-white mb-2">
              Please enter the characters below <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-3 items-center">
              <div className="relative flex-1">
                <input
                  {...register('captcha')}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 backdrop-blur-sm placeholder-gray-400"
                  placeholder={MESSAGES.LOGIN.CAPTCHA_PLACEHOLDER}
                  autoComplete="off"
                  style={{ minWidth: 0, height: 48, fontSize: 16 }}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-focus-within:from-purple-500/20 group-focus-within:to-cyan-500/20 transition-all duration-300 pointer-events-none"></div>
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
              <div className="flex items-center gap-2" style={{ height: 48 }}>
                {captchaImg && (
                  <div className="relative group/captcha">
                    <img
                      src={captchaImg}
                      alt="captcha"
                      className="h-12 w-28 rounded-xl border-2 border-white/20 bg-white object-contain shadow-lg transition-transform duration-300 group-hover/captcha:scale-105"
                      style={{ display: 'block' }}
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={fetchCaptcha}
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center justify-center border border-white/20 hover:border-white/40"
                  disabled={loadingCaptcha}
                  aria-label="Refresh captcha"
                  style={{ lineHeight: 0, width: 40, height: 40 }}
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    className={`transition-transform duration-300 ${
                      loadingCaptcha ? 'animate-spin' : 'hover:rotate-180'
                    }`}
                  >
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

          {/* Error and success messages with enhanced styling */}
          {error && (
            <div className="text-red-400 text-sm mt-2 mb-3 text-center bg-red-500/10 border border-red-500/20 rounded-xl py-2 px-3 backdrop-blur-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="text-green-400 text-sm mt-2 mb-3 text-center bg-green-500/10 border border-green-500/20 rounded-xl py-2 px-3 backdrop-blur-sm">
              {success}
            </div>
          )}

          {/* Submit button with enhanced styling */}
          <button
            type="submit"
            className="w-full mt-6 mb-6 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 shadow-lg hover:shadow-xl active:shadow-lg transition-all duration-300 transform active:scale-98 hover:scale-102 relative overflow-hidden group"
            disabled={loading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center justify-center">
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </span>
          </button>

          {/* Divider with enhanced styling */}
          <div className="flex items-center my-4 text-gray-400">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
            <span className="mx-4 text-xs font-medium">Or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
          </div>

          {/* Google Login Button */}
          <div className="mb-4">
            <GoogleLoginButton />
          </div>

          {/* Sign up link with enhanced styling */}
          <div className="text-xs text-gray-400 text-center">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-purple-400 underline hover:text-purple-300 transition-colors duration-200 font-medium"
            >
              Sign up now
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
