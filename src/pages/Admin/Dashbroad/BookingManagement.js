import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Button,
  Space,
  Input,
  DatePicker,
  Select,
  Modal,
  message,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { FaTicketAlt, FaPrint, FaEnvelope } from 'react-icons/fa';
import SEO from '../../../components/SEO/SEO';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { confirm } = Modal;

// Mock data for bookings
const mockBookings = Array(50)
  .fill()
  .map((_, index) => ({
    id: `B${23980 + index}`,
    userId: `U${10000 + Math.floor(Math.random() * 5000)}`,
    userName: ['Nguyễn Văn A', 'Trần Thị B', 'Lê Văn C', 'Phạm Thị D', 'Hoàng Văn E'][
      Math.floor(Math.random() * 5)
    ],
    movieId: `M${1000 + Math.floor(Math.random() * 100)}`,
    movieTitle: ['Robot Revolution', 'Pandora Adventure', 'Mada', 'Survival Race', 'The Last Hope'][
      Math.floor(Math.random() * 5)
    ],
    showtime: new Date(
      2025,
      6,
      10 + Math.floor(Math.random() * 14),
      12 + Math.floor(Math.random() * 10),
      [0, 15, 30, 45][Math.floor(Math.random() * 4)]
    ),
    bookingDate: new Date(2025, 6, 5 + Math.floor(Math.random() * 10)),
    theater: [
      'CGV Vincom Center',
      'Beta Cineplex Mỹ Đình',
      'Lotte Cinema Hà Nội',
      'Galaxy Cinema Nguyễn Du',
    ][Math.floor(Math.random() * 4)],
    seats: Array(1 + Math.floor(Math.random() * 3))
      .fill()
      .map(
        () =>
          `${String.fromCharCode(65 + Math.floor(Math.random() * 8))}${
            1 + Math.floor(Math.random() * 10)
          }`
      )
      .join(', '),
    ticketCount: 1 + Math.floor(Math.random() * 3),
    totalAmount: (1 + Math.floor(Math.random() * 3)) * 90000,
    paymentMethod: ['Credit Card', 'Momo', 'ZaloPay', 'Bank Transfer'][
      Math.floor(Math.random() * 4)
    ],
    status: ['completed', 'pending', 'cancelled'][Math.floor(Math.random() * 3)],
  }));

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: null,
    status: null,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Load booking data
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filter the mock data based on filters
        let filteredData = [...mockBookings];

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredData = filteredData.filter(
            (booking) =>
              booking.id.toLowerCase().includes(searchLower) ||
              booking.userName.toLowerCase().includes(searchLower) ||
              booking.movieTitle.toLowerCase().includes(searchLower)
          );
        }

        if (filters.dateRange) {
          const [startDate, endDate] = filters.dateRange;
          filteredData = filteredData.filter((booking) => {
            const bookingDate = new Date(booking.bookingDate);
            return bookingDate >= startDate && bookingDate <= endDate;
          });
        }

        if (filters.status) {
          filteredData = filteredData.filter((booking) => booking.status === filters.status);
        }

        // Sort by booking date (newest first)
        filteredData.sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));

        setBookings(filteredData);
        setPagination({
          ...pagination,
          total: filteredData.length,
        });
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
        message.error('Không thể tải dữ liệu đặt vé');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [filters, pagination.current, pagination.pageSize]);

  // Handle table pagination change
  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setFilters({
      ...filters,
      search: value,
    });
    setPagination({
      ...pagination,
      current: 1, // Reset to first page on new search
    });
  };

  // Handle date range change
  const handleDateRangeChange = (dates) => {
    setFilters({
      ...filters,
      dateRange: dates,
    });
    setPagination({
      ...pagination,
      current: 1,
    });
  };

  // Handle status filter change
  const handleStatusChange = (value) => {
    setFilters({
      ...filters,
      status: value,
    });
    setPagination({
      ...pagination,
      current: 1,
    });
  };

  // Reset all filters
  const handleClearFilters = () => {
    setFilters({
      search: '',
      dateRange: null,
      status: null,
    });
    setPagination({
      ...pagination,
      current: 1,
    });
  };

  // Show booking details
  const showBookingDetails = (booking) => {
    Modal.info({
      title: `Chi tiết đặt vé #${booking.id}`,
      width: 600,
      content: (
        <div className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Người đặt:</p>
                <p className="font-medium">{booking.userName}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phim:</p>
                <p className="font-medium">{booking.movieTitle}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Rạp chiếu:</p>
                <p className="font-medium">{booking.theater}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Suất chiếu:</p>
                <p className="font-medium">
                  {booking.showtime.toLocaleString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Ghế:</p>
                <p className="font-medium">{booking.seats}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Số lượng vé:</p>
                <p className="font-medium">{booking.ticketCount}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Tổng tiền:</p>
                <p className="font-medium text-green-600">{formatCurrency(booking.totalAmount)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phương thức thanh toán:</p>
                <p className="font-medium">{booking.paymentMethod}</p>
              </div>
            </div>

            <div className="border-t pt-4 mt-2">
              <p className="text-gray-500 text-sm">Trạng thái:</p>
              <div className="mt-1">
                {booking.status === 'completed' && (
                  <Tag color="success" className="px-3 py-1">
                    Hoàn thành
                  </Tag>
                )}
                {booking.status === 'pending' && (
                  <Tag color="warning" className="px-3 py-1">
                    Đang xử lý
                  </Tag>
                )}
                {booking.status === 'cancelled' && (
                  <Tag color="error" className="px-3 py-1">
                    Đã hủy
                  </Tag>
                )}
              </div>
            </div>
          </div>
        </div>
      ),
      okText: 'Đóng',
    });
  };

  // Confirm booking
  const confirmBooking = (bookingId) => {
    confirm({
      title: 'Xác nhận đặt vé',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xác nhận đặt vé này?',
      onOk() {
        // In a real app, you would call an API here
        setTimeout(() => {
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking.id === bookingId ? { ...booking, status: 'completed' } : booking
            )
          );
          message.success('Đã xác nhận đặt vé thành công');
        }, 500);
      },
    });
  };

  // Cancel booking
  const cancelBooking = (bookingId) => {
    confirm({
      title: 'Hủy đặt vé',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn hủy đặt vé này?',
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        // In a real app, you would call an API here
        setTimeout(() => {
          setBookings((prevBookings) =>
            prevBookings.map((booking) =>
              booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
            )
          );
          message.success('Đã hủy đặt vé thành công');
        }, 500);
      },
    });
  };

  // Table columns
  const columns = [
    {
      title: 'Mã đặt vé',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span className="font-medium">{id}</span>,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Phim',
      dataIndex: 'movieTitle',
      key: 'movieTitle',
      ellipsis: true,
    },
    {
      title: 'Suất chiếu',
      key: 'showtime',
      render: (_, record) =>
        record.showtime.toLocaleString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      title: 'Số ghế',
      dataIndex: 'ticketCount',
      key: 'ticketCount',
      align: 'center',
    },
    {
      title: 'Tổng tiền',
      key: 'totalAmount',
      align: 'right',
      render: (_, record) => formatCurrency(record.totalAmount),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <>
          {record.status === 'completed' && <Tag color="success">Hoàn thành</Tag>}
          {record.status === 'pending' && <Tag color="warning">Đang xử lý</Tag>}
          {record.status === 'cancelled' && <Tag color="error">Đã hủy</Tag>}
        </>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => showBookingDetails(record)}
            />
          </Tooltip>

          {record.status === 'pending' && (
            <>
              <Tooltip title="Xác nhận">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  size="small"
                  onClick={() => confirmBooking(record.id)}
                />
              </Tooltip>
              <Tooltip title="Hủy">
                <Button
                  danger
                  icon={<CloseOutlined />}
                  size="small"
                  onClick={() => cancelBooking(record.id)}
                />
              </Tooltip>
            </>
          )}

          {record.status === 'completed' && (
            <>
              <Tooltip title="In vé">
                <Button icon={<FaPrint size={12} />} size="small" />
              </Tooltip>
              <Tooltip title="Gửi email">
                <Button icon={<FaEnvelope size={12} />} size="small" />
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <SEO
        title="Quản lý đặt vé | CineBee Admin"
        description="Quản lý đặt vé - CineBee Admin Dashboard"
      />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FaTicketAlt className="mr-2 text-blue-500" />
          Quản lý đặt vé
        </h1>

        <div className="flex space-x-2">
          <Button type="default" icon={<FaPrint size={14} />}>
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Input
              placeholder="Tìm kiếm mã đặt vé, tên khách hàng..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={filters.search}
              onChange={handleSearchChange}
              allowClear
            />
          </div>

          <div>
            <RangePicker
              placeholder={['Từ ngày', 'Đến ngày']}
              format="DD/MM/YYYY"
              value={filters.dateRange}
              onChange={handleDateRangeChange}
              className="w-full"
            />
          </div>

          <div>
            <Select
              placeholder="Trạng thái"
              value={filters.status}
              onChange={handleStatusChange}
              allowClear
              className="w-full"
            >
              <Option value="completed">Hoàn thành</Option>
              <Option value="pending">Đang xử lý</Option>
              <Option value="cancelled">Đã hủy</Option>
            </Select>
          </div>

          <div className="flex items-center">
            <Button onClick={handleClearFilters}>Xóa bộ lọc</Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          dataSource={bookings}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
          loading={loading}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default BookingManagement;
