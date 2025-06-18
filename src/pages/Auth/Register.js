import React from 'react';
import { Link } from 'react-router-dom';
import { DateofBirth, FULLNAME, MailIcon, Password, PhoneIconImg } from '../../assets/icon/icon';
import GoogleLoginButton from '../../components/GoogleLoginButton/GoogleLoginButton';
import InputField from '../../components/Input/InputField';
import { useRegister } from '../../features/auth/useRegister';
import { toast } from 'sonner';

const Register = () => {
  const { form, error, handleChange, handleSubmit, setSuccess, setError, loading, success } = useRegister();

  React.useEffect(() => {
    if (success) {
      toast.success(success || 'Register successful!');
    }
  }, [success]);

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left: Background + Logo + Slogan */}
      <div
        className="flex-1 relative hidden md:flex bg-no-repeat bg-cover"
        style={{
          backgroundImage: "url('/assets/background/BackgroundImage.png')",
        }}
      >
        <div className="p-8">
          <img src="/assets/logo/logocenima.png" alt="Cinema Zino" className="w-44" />
          <div className="text-xs text-white mt-2 tracking-widest font-light">MEMON</div>
        </div>
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8 flex flex-col items-center"
          style={{ marginTop: '140px' }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight drop-shadow text-center">
            WATCH GREAT MOVIES
          </h2>
          <h3 className="text-2xl md:text-3xl font-extrabold text-purple-400 leading-tight drop-shadow text-center">
            EARN SWEET DISCOUNTS!
          </h3>
        </div>
      </div>
      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center bg-[#1a103d]">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#211047]/90 rounded-2xl shadow-xl px-4 sm:px-8 py-8 sm:py-10 flex flex-col gap-0"
          autoComplete="off"
        >
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-wide">SIGN IN</h1>
          <div className="text-sm text-gray-300 mb-6 font-medium">Sign in with email address</div>
          <InputField
            icon={<MailIcon />}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <InputField
            icon={<FULLNAME />}
            type="text"
            name="fullName"
            placeholder="Full name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <InputField
            icon={<PhoneIconImg />}
            type="tel"
            name="phoneNumber"
            placeholder="Phone"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
          <InputField
            icon={<Password />}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <div style={{ position: 'relative', marginBottom: 18 }}>
            <span
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
              }}
            >
              <DateofBirth />
            </span>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              required
              style={{
                background: '#2d2552',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 16px 12px 44px',
                fontSize: 16,
                width: '100%',
                outline: 'none',
              }}
            />
          </div>
          {error && <div className="text-red-400 text-sm mt-2 mb-1">{error}</div>}
          <button
            type="submit"
            className="w-full mt-4 mb-4 py-3 rounded-lg font-bold text-lg text-white bg-gradient-to-r from-purple-600 to-cyan-400 shadow-md hover:shadow-xl active:shadow-lg transition-transform duration-150 transform active:scale-95 hover:scale-105 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin mr-2 h-5 w-5 text-white"
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
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Signing up...
              </>
            ) : (
              'Sign up'
            )}
          </button>
          <div className="flex items-center my-3 text-gray-400">
            <div className="flex-1 h-px bg-[#2d2552]" />
            <span className="mx-3 text-xs">Or continue with</span>
            <div className="flex-1 h-px bg-[#2d2552]" />
          </div>
          {/* Google Login Button */}
          <GoogleLoginButton setSuccess={setSuccess} setError={setError} />
          <div className="text-xs text-gray-400 mt-4 text-center">
            If you already have an account,{' '}
            <Link to="/login" className="text-purple-400 underline">
              log in now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
