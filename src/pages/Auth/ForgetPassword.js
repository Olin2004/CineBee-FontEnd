import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useForgotPassword from '../../features/auth/useForgotPassword';
import ForgetPasswordUI from './ForgetPasswordUI';

const ForgetPassword = () => {
  const forgot = useForgotPassword();
  const navigate = useNavigate();

  useEffect(() => {
    if (forgot.success && forgot.step === 2) {
      // Nếu đặt lại mật khẩu thành công, chuyển về login sau 1.5s
      const timeout = setTimeout(() => navigate('/login'), 1500);
      return () => clearTimeout(timeout);
    }
  }, [forgot.success, forgot.step, navigate]);

  return <ForgetPasswordUI {...forgot} />;
};

export default ForgetPassword;
