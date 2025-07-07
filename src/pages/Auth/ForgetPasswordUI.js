import React from 'react';
import { Helmet } from 'react-helmet';
import { FaEnvelope, FaKey, FaLock } from 'react-icons/fa';
import InputField from '../../components/Input/InputField';

const stepsLabel = ['Nhập email', 'Nhập mã OTP', 'Đặt lại mật khẩu'];

const ForgetPasswordUI = ({
  step,
  email,
  setEmail,
  otp,
  setOtp,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  error,
  success,
  handleEmailSubmit,
  handleOtpSubmit,
  handlePasswordSubmit,
}) => (
  <>
    <Helmet>
      <title>Quên mật khẩu | CineBee</title>
    </Helmet>
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#1a103d] via-[#1e1b4b] to-[#312e81]">
      {/* Left: Banner/logo */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-[#2d1a4d] to-[#1e1b4b] relative">
        <img
          src={require('../../assets/Image/logo/CineBee.png')}
          alt="CineBee"
          className="w-48 mb-6 drop-shadow-2xl animate-fade-in-up"
        />
        <h2
          className="text-3xl font-extrabold mb-2 leading-tight drop-shadow-2xl text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-pink-600 bg-clip-text text-transparent animate-gradient-move animate-fade-in-bounce"
          style={{
            backgroundSize: '200% 200%',
            animation:
              'gradient-move 3s ease-in-out infinite, fade-in-bounce 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          Đặt lại mật khẩu
        </h2>
        <p className="text-lg text-white/80 mb-8 text-center max-w-xs">
          Bảo mật - Nhanh chóng - Dễ dàng
        </p>
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
          <span className="text-white/60 text-xs">© CineBee 2024</span>
        </div>
      </div>
      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-8 relative">
        <form
          className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl px-8 py-8 flex flex-col gap-0 border border-white/10 animate-fade-in-up"
          autoComplete="off"
          onSubmit={
            step === 0 ? handleEmailSubmit : step === 1 ? handleOtpSubmit : handlePasswordSubmit
          }
        >
          <div className="flex justify-center mb-6">
            {stepsLabel.map((s, idx) => (
              <div
                key={s}
                className={`flex-1 text-center py-2 px-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  idx === step
                    ? 'bg-gradient-to-r from-pink-400 to-yellow-300 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-gray-200'
                } ${idx > 0 ? 'ml-2' : ''}`}
              >
                {s}
              </div>
            ))}
          </div>
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
          {/* Step 1: Email */}
          {step === 0 && (
            <div className="mb-4 group animate-fade-in-up">
              <label className="block text-white font-semibold mb-2 text-sm">Email</label>
              <InputField
                icon={<FaEnvelope color="#f472b6" />}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email đăng ký"
                required
                className="w-full py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                autoFocus
              />
            </div>
          )}
          {/* Step 2: OTP */}
          {step === 1 && (
            <div className="mb-4 group animate-fade-in-up">
              <label className="block text-white font-semibold mb-2 text-sm">Mã OTP</label>
              <InputField
                icon={<FaKey color="#fbbf24" />}
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Nhập mã OTP gửi về email"
                required
                className="w-full py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm tracking-widest text-lg text-center"
                autoFocus
                maxLength={8}
              />
            </div>
          )}
          {/* Step 3: New password */}
          {step === 2 && (
            <>
              <div className="mb-4 group animate-fade-in-up">
                <label className="block text-white font-semibold mb-2 text-sm">Mật khẩu mới</label>
                <InputField
                  icon={<FaLock color="#38bdf8" />}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới"
                  required
                  className="w-full py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                  autoFocus
                />
              </div>
              <div className="mb-4 group animate-fade-in-up">
                <label className="block text-white font-semibold mb-2 text-sm">
                  Nhập lại mật khẩu
                </label>
                <InputField
                  icon={<FaLock color="#38bdf8" />}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                  required
                  className="w-full py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold text-lg shadow-lg hover:from-pink-600 hover:to-yellow-500 transition-all duration-300 mt-2 mb-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading
              ? 'Đang xử lý...'
              : step === 0
              ? 'Gửi mã OTP'
              : step === 1
              ? 'Xác thực OTP'
              : 'Đặt lại mật khẩu'}
          </button>
          <div className="text-center mt-2">
            <a href="/login" className="text-pink-300 hover:underline text-sm font-semibold">
              Quay lại đăng nhập
            </a>
          </div>
        </form>
      </div>
    </div>
  </>
);

export default ForgetPasswordUI;
