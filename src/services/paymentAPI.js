import axios from 'axios';
import { ENDPOINTS_PAYMENT } from './endpointsAPI';
import { API_BASE_URL } from './apiConfig';

// Tạo instance axios với cấu hình cơ bản cho payment
const paymentAPI = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Tự động gửi cookie HttpOnly
  timeout: 30000, // 30 giây timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để xử lý lỗi chung
paymentAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Payment API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Tạo thanh toán MoMo
 * @param {number} ticketId - ID của vé cần thanh toán (phải là số)
 * @returns {Promise<string>} - payUrl để chuyển hướng
 */
export const createMomoPayment = async (ticketId) => {
  try {
    // Ensure ticketId is a number for Java backend compatibility
    const numericTicketId = typeof ticketId === 'string' ? parseInt(ticketId) : ticketId;

    if (isNaN(numericTicketId)) {
      throw new Error('ticketId phải là một số hợp lệ');
    }

    const paymentData = {
      ticketId: numericTicketId,
    };

    const response = await paymentAPI.post(ENDPOINTS_PAYMENT.MOMO_CREATE, paymentData);

    const { payUrl } = response.data;

    if (!payUrl) {
      throw new Error('Không thể lấy được đường dẫn thanh toán từ server');
    }

    return payUrl;
  } catch (error) {
    // Xử lý các loại lỗi khác nhau
    if (error.response?.status === 401) {
      throw new Error('Bạn cần đăng nhập để thực hiện thanh toán');
    } else if (error.response?.status === 404) {
      throw new Error('Không tìm thấy thông tin vé');
    } else if (error.response?.status === 400) {
      throw new Error(error.response?.data?.message || 'Thông tin thanh toán không hợp lệ');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Kết nối bị timeout. Vui lòng thử lại');
    } else {
      throw new Error(error.response?.data?.message || 'Đã có lỗi xảy ra khi tạo thanh toán');
    }
  }
};

/**
 * Xử lý chuyển hướng sang trang thanh toán MoMo
 * @param {number} ticketId - ID của vé cần thanh toán (phải là số)
 */
export const redirectToMomoPayment = async (ticketId) => {
  try {
    const payUrl = await createMomoPayment(ticketId);
    window.location.href = payUrl;
  } catch (error) {
    throw error; // Re-throw để component có thể xử lý hiển thị lỗi
  }
};

/**
 * Kiểm tra trạng thái thanh toán (optional - để kiểm tra với backend)
 * @param {string} orderId - ID đơn hàng từ MoMo
 * @returns {Promise<Object>} - thông tin trạng thái thanh toán
 */
export const checkPaymentStatus = async (orderId) => {
  try {
    const response = await paymentAPI.get(`${ENDPOINTS_PAYMENT.MOMO_STATUS}/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể kiểm tra trạng thái thanh toán');
  }
};

/**
 * Lấy lịch sử thanh toán của user (optional)
 * @returns {Promise<Array>} - danh sách lịch sử thanh toán
 */
export const getPaymentHistory = async () => {
  try {
    const response = await paymentAPI.get(ENDPOINTS_PAYMENT.PAYMENT_HISTORY);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Không thể lấy lịch sử thanh toán');
  }
};

export default paymentAPI;
