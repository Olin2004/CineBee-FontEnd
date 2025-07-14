// Staff Orders Management - View and manage customer orders
import React, { useState } from 'react';
import { FaSearch, FaEye, FaCheck, FaTimes, FaPrint, FaFilter } from 'react-icons/fa';

const StaffOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: 'ORD001',
      customer: 'Nguyễn Văn A',
      phone: '0901234567',
      movie: 'Điều Ước Cuối Cùng',
      showtime: '19:30 - 15/07/2025',
      theater: 'Theater 1',
      seats: ['A1', 'A2'],
      total: 300000,
      status: 'completed',
      paymentMethod: 'cash',
      createdAt: '2025-07-15 18:45',
      staff: 'Nhân viên 1',
    },
    {
      id: 'ORD002',
      customer: 'Trần Thị B',
      phone: '0912345678',
      movie: 'Siêu Sao Nguyên Thúy',
      showtime: '21:00 - 15/07/2025',
      theater: 'Theater 2',
      seats: ['B5'],
      total: 150000,
      status: 'pending',
      paymentMethod: 'card',
      createdAt: '2025-07-15 19:15',
      staff: 'Nhân viên 2',
    },
    {
      id: 'ORD003',
      customer: 'Lê Văn C',
      phone: '0923456789',
      movie: 'Robot Revolution',
      showtime: '16:00 - 16/07/2025',
      theater: 'Theater 3',
      seats: ['C3', 'C4', 'C5'],
      total: 540000,
      status: 'cancelled',
      paymentMethod: 'cash',
      createdAt: '2025-07-15 15:30',
      staff: 'Nhân viên 1',
    },
    {
      id: 'ORD004',
      customer: 'Phạm Thị D',
      phone: '0934567890',
      movie: 'Gia Đình Siêu Quậy',
      showtime: '14:30 - 16/07/2025',
      theater: 'Theater 1',
      seats: ['D1', 'D2'],
      total: 240000,
      status: 'completed',
      paymentMethod: 'card',
      createdAt: '2025-07-15 13:20',
      staff: 'Nhân viên 3',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Chờ xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handlePrintReceipt = (order) => {
    alert(`
Hóa đơn: ${order.id}
Khách hàng: ${order.customer}
Phim: ${order.movie}
Suất chiếu: ${order.showtime}
Ghế: ${order.seats.join(', ')}
Tổng tiền: ${order.total.toLocaleString()}đ
Phương thức: ${order.paymentMethod === 'cash' ? 'Tiền mặt' : 'Thẻ'}
    `);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản lý đơn hàng</h1>
        <p className="text-gray-600">Xem và quản lý các đơn hàng đặt vé của khách hàng</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm theo mã đơn, tên khách hàng, số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phim
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Suất chiếu
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ghế
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{order.id}</div>
                    <div className="text-sm text-gray-500">{order.createdAt}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.movie}</div>
                    <div className="text-sm text-gray-500">{order.theater}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.showtime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.seats.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-green-600">{order.total.toLocaleString()}đ</div>
                    <div className="text-sm text-gray-500 capitalize">
                      {order.paymentMethod === 'cash' ? 'Tiền mặt' : 'Thẻ'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Xem chi tiết"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handlePrintReceipt(order)}
                        className="text-green-600 hover:text-green-900 transition-colors"
                        title="In hóa đơn"
                      >
                        <FaPrint />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Chi tiết đơn hàng</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-700">Mã đơn:</span>
                <span className="ml-2 text-gray-900">{selectedOrder.id}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Khách hàng:</span>
                <span className="ml-2 text-gray-900">{selectedOrder.customer}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Số điện thoại:</span>
                <span className="ml-2 text-gray-900">{selectedOrder.phone}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phim:</span>
                <span className="ml-2 text-gray-900">{selectedOrder.movie}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Suất chiếu:</span>
                <span className="ml-2 text-gray-900">{selectedOrder.showtime}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Rạp:</span>
                <span className="ml-2 text-gray-900">{selectedOrder.theater}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Ghế:</span>
                <span className="ml-2 text-gray-900">{selectedOrder.seats.join(', ')}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Tổng tiền:</span>
                <span className="ml-2 font-bold text-green-600">
                  {selectedOrder.total.toLocaleString()}đ
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Phương thức thanh toán:</span>
                <span className="ml-2 text-gray-900">
                  {selectedOrder.paymentMethod === 'cash' ? 'Tiền mặt' : 'Thẻ'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Nhân viên xử lý:</span>
                <span className="ml-2 text-gray-900">{selectedOrder.staff}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Trạng thái:</span>
                <span
                  className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    selectedOrder.status
                  )}`}
                >
                  {getStatusText(selectedOrder.status)}
                </span>
              </div>
            </div>

            <div className="flex space-x-2 mt-6">
              <button
                onClick={() => handlePrintReceipt(selectedOrder)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <FaPrint />
                <span>In hóa đơn</span>
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffOrders;
