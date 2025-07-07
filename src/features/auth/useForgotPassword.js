import { useState } from 'react';
import { forgetPassword, resetPassword, verifyOtp } from '../../services/authAPI';

const useForgotPassword = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [temporaryToken, setTemporaryToken] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Vui lòng nhập email hợp lệ!');
      return;
    }
    setLoading(true);
    try {
      const res = await forgetPassword(email);
      if (res?.status === 200) {
        setSuccess(res?.data?.message || 'Mã OTP đã được gửi về email!');
        setStep(1);
      } else {
        setError(res?.data?.message || 'Gửi email thất bại. Vui lòng thử lại!');
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || 'Gửi email thất bại. Vui lòng thử lại!'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!otp || otp.length < 4) {
      setError('Vui lòng nhập mã OTP hợp lệ!');
      return;
    }
    setLoading(true);
    try {
      const res = await verifyOtp(email, otp);
      if (res?.status === 200) {
        setSuccess(res?.data?.message || 'Xác thực OTP thành công!');
        setTemporaryToken(res?.data?.temporaryToken || '');
        setStep(2);
      } else {
        setError(res?.data?.message || 'Xác thực OTP thất bại. Vui lòng thử lại!');
      }
    } catch (err) {
      setError(
        err?.response?.data?.message || err?.message || 'Xác thực OTP thất bại. Vui lòng thử lại!'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e, onSuccess) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!password || password.length < 6) {
      setError('Mật khẩu phải từ 6 ký tự!');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu nhập lại không khớp!');
      return;
    }
    if (!temporaryToken) {
      setError('Thiếu mã xác thực. Vui lòng thử lại!');
      return;
    }
    setLoading(true);
    try {
      const res = await resetPassword(temporaryToken, password);
      if (res?.status === 200) {
        setSuccess(res?.data?.message || 'Đặt lại mật khẩu thành công!');
        if (onSuccess) onSuccess();
      } else {
        setError(res?.data?.message || 'Đặt lại mật khẩu thất bại. Vui lòng thử lại!');
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Đặt lại mật khẩu thất bại. Vui lòng thử lại!'
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep,
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
  };
};

export default useForgotPassword;
