import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaTicketAlt,
  FaHome,
  FaArrowLeft,
} from 'react-icons/fa';

const MomoResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentResult, setPaymentResult] = useState({
    success: false,
    message: '',
    orderInfo: '',
    amount: 0,
    transId: '',
  });

  useEffect(() => {
    const processPaymentResult = () => {
      // Đọc các query parameters từ URL
      const queryParams = new URLSearchParams(location.search);
      const resultCode = queryParams.get('resultCode');
      const message = queryParams.get('message');
      const orderInfo = queryParams.get('orderInfo');
      const amount = queryParams.get('amount');
      const transId = queryParams.get('transId');

      setTimeout(() => {
        if (resultCode === '0') {
          // Thanh toán thành công
          setPaymentResult({
            success: true,
            message: 'Thanh toán thành công! Cảm ơn bạn đã mua vé.',
            orderInfo: orderInfo || 'Thanh toán vé xem phim',
            amount: amount ? parseInt(amount) : 0,
            transId: transId || '',
          });
        } else {
          // Thanh toán thất bại
          setPaymentResult({
            success: false,
            message: message || 'Thanh toán thất bại. Vui lòng thử lại.',
            orderInfo: orderInfo || 'Thanh toán vé xem phim',
            amount: amount ? parseInt(amount) : 0,
            transId: transId || '',
          });
        }
        setIsLoading(false);
      }, 2000); // Simulate processing time
    };

    processPaymentResult();
  }, [location]);

  const handleGoToMyTickets = () => {
    navigate('/my-tickets');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleTryAgain = () => {
    navigate(-1); // Go back to previous page
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="mb-6"
            >
              <FaSpinner className="text-6xl text-purple-500 mx-auto" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Đang xử lý kết quả thanh toán...
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Vui lòng chờ trong giây lát</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4"
            >
              {paymentResult.success ? (
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <FaCheckCircle className="text-5xl text-green-600" />
                </div>
              ) : (
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                  <FaTimesCircle className="text-5xl text-red-600" />
                </div>
              )}
            </motion.div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {paymentResult.success ? 'Thanh toán thành công!' : 'Thanh toán thất bại'}
            </h1>
          </div>

          {/* Result Card */}
          <motion.div
            className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-6">
              {/* Message */}
              <div className="text-center">
                <p
                  className={`text-lg font-semibold ${
                    paymentResult.success ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {paymentResult.message}
                </p>
              </div>

              {/* Payment Details */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Chi tiết giao dịch
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Mô tả:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {paymentResult.orderInfo}
                    </span>
                  </div>
                  {paymentResult.amount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Số tiền:</span>
                      <span className="font-bold text-2xl text-red-600">
                        {paymentResult.amount.toLocaleString()}đ
                      </span>
                    </div>
                  )}
                  {paymentResult.transId && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Mã giao dịch:</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400">
                        {paymentResult.transId}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Thời gian:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date().toLocaleString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              {paymentResult.success && (
                <motion.div
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center gap-3 text-green-700 dark:text-green-300">
                    <FaTicketAlt className="text-xl" />
                    <div>
                      <p className="font-semibold">Vé đã được thêm vào tài khoản của bạn!</p>
                      <p className="text-sm">Bạn có thể xem chi tiết vé trong mục "Vé của tôi".</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {paymentResult.success ? (
              <>
                <motion.button
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGoToMyTickets}
                >
                  <FaTicketAlt />
                  Xem vé của tôi
                </motion.button>
                <motion.button
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-600 text-white font-bold rounded-2xl shadow-xl hover:bg-gray-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGoHome}
                >
                  <FaHome />
                  Về trang chủ
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTryAgain}
                >
                  <FaArrowLeft />
                  Thử lại
                </motion.button>
                <motion.button
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gray-600 text-white font-bold rounded-2xl shadow-xl hover:bg-gray-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGoHome}
                >
                  <FaHome />
                  Về trang chủ
                </motion.button>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MomoResultPage;
