import React, { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Tag,
  Input,
  Button,
  Space,
  DatePicker,
  Select,
  Dropdown,
  Badge,
  Modal,
  Tooltip,
  Form,
  Row,
  Col,
  Drawer,
  Divider,
} from 'antd';
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaTicketAlt,
  FaPrint,
  FaEllipsisV,
  FaRegClock,
  FaUserAlt,
  FaFilm,
  FaChair,
  FaMoneyBillWave,
  FaTrash,
  FaSave,
  FaExclamationCircle,
  FaInfoCircle,
  FaDownload,
} from 'react-icons/fa';
import SEO from '../../../components/SEO/SEO';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ImprovedBookingManagement = () => {
  // State variables
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [viewBookingDetails, setViewBookingDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  // Mock data for initial load
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockData = generateMockBookings(50);
      setBookings(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Generate mock bookings data
  const generateMockBookings = (count) => {
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const movies = [
      'Robot Revolution',
      'Pandora Adventure',
      'Mada',
      'Survival Race',
      'City of Dreams',
      'The Last Hope',
      'Quantum Journey',
      'Silent Night',
    ];
    const theaters = [
      'CGV Vincom Center',
      'Beta Cineplex Mỹ Đình',
      'Lotte Cinema Hà Nội',
      'Galaxy Cinema Nguyễn Du',
    ];
    const paymentMethods = ['Credit Card', 'MoMo', 'ZaloPay', 'Bank Transfer', 'Cash'];

    const result = [];

    for (let i = 1; i <= count; i++) {
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));

      const day = randomDate.getDate().toString().padStart(2, '0');
      const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
      const year = randomDate.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const movie = movies[Math.floor(Math.random() * movies.length)];
      const theater = theaters[Math.floor(Math.random() * theaters.length)];
      const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
      const seatCount = Math.floor(Math.random() * 5) + 1;
      const seatPrice = 90000;

      let seats = [];
      for (let j = 0; j < seatCount; j++) {
        const row = String.fromCharCode(65 + Math.floor(Math.random() * 10));
        const num = Math.floor(Math.random() * 15) + 1;
        seats.push(`${row}${num}`);
      }

      result.push({
        id: `B${23000 + i}`,
        user: `Khách hàng ${i}`,
        movie,
        theater,
        date: formattedDate,
        time: `${Math.floor(Math.random() * 8) + 12}:${Math.floor(Math.random() * 6)}0`,
        seats: seats.join(', '),
        amount: seatCount * seatPrice,
        status,
        payment: paymentMethod,
        phone: `09${Math.floor(Math.random() * 90000000) + 10000000}`,
        email: `customer${i}@example.com`,
        roomNumber: Math.floor(Math.random() * 10) + 1,
        createdAt: new Date(randomDate).toISOString(),
      });
    }

    return result;
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Filter bookings based on search text, status, and date range
  const filteredBookings = bookings.filter((booking) => {
    // Search text filter
    const searchMatch =
      booking.id.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.user.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.movie.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.phone?.toLowerCase().includes(searchText.toLowerCase()) ||
      booking.email?.toLowerCase().includes(searchText.toLowerCase());

    // Status filter
    const statusMatch = statusFilter === 'all' || booking.status === statusFilter;

    // Date range filter
    let dateMatch = true;
    if (dateRange && dateRange[0] && dateRange[1]) {
      const bookingDate = new Date(booking.createdAt);
      const startDate = dateRange[0].startOf('day').toDate();
      const endDate = dateRange[1].endOf('day').toDate();

      dateMatch = bookingDate >= startDate && bookingDate <= endDate;
    }

    return searchMatch && statusMatch && dateMatch;
  });

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // View booking details
  const viewBooking = (booking) => {
    setViewBookingDetails(booking);
    setShowDetails(true);
  };

  // Prepare to cancel booking
  const prepareCancel = (bookingId) => {
    setCancelBookingId(bookingId);
    setShowCancelModal(true);
  };

  // Confirm cancel booking
  const confirmCancelBooking = () => {
    // In a real app, this would be an API call
    setBookings(
      bookings.map((booking) =>
        booking.id === cancelBookingId ? { ...booking, status: 'cancelled' } : booking
      )
    );

    setShowCancelModal(false);
    setCancelBookingId(null);
    setCancelReason('');
  };

  // Export bookings as CSV
  const exportBookings = () => {
    // In a real app, this would generate and download a CSV/Excel file
    alert('Đang xuất dữ liệu đặt vé...');
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
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Phim',
      dataIndex: 'movie',
      key: 'movie',
      ellipsis: true,
    },
    {
      title: 'Rạp',
      dataIndex: 'theater',
      key: 'theater',
      ellipsis: true,
    },
    {
      title: 'Ngày chiếu',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Giờ',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <span className="font-medium">{formatCurrency(amount)}</span>,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          pending: { color: 'warning', label: 'Chờ xác nhận' },
          confirmed: { color: 'processing', label: 'Đã xác nhận' },
          completed: { color: 'success', label: 'Hoàn thành' },
          cancelled: { color: 'error', label: 'Đã hủy' },
        };

        return <Tag color={statusConfig[status].color}>{statusConfig[status].label}</Tag>;
      },
      filters: [
        { text: 'Chờ xác nhận', value: 'pending' },
        { text: 'Đã xác nhận', value: 'confirmed' },
        { text: 'Hoàn thành', value: 'completed' },
        { text: 'Đã hủy', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button type="text" icon={<FaEye />} size="small" onClick={() => viewBooking(record)} />
          </Tooltip>

          {(record.status === 'pending' || record.status === 'confirmed') && (
            <Tooltip title="Hủy đặt vé">
              <Button
                type="text"
                danger
                icon={<FaTrash />}
                size="small"
                onClick={() => prepareCancel(record.id)}
              />
            </Tooltip>
          )}

          {(record.status === 'confirmed' || record.status === 'completed') && (
            <Tooltip title="In vé">
              <Button type="text" icon={<FaPrint />} size="small" />
            </Tooltip>
          )}

          <Dropdown
            menu={{
              items: [
                { key: '1', label: 'Xem chi tiết', icon: <FaEye /> },
                ...(record.status === 'pending'
                  ? [{ key: '2', label: 'Xác nhận đặt vé', icon: <FaSave /> }]
                  : []),
                ...(record.status === 'confirmed' || record.status === 'completed'
                  ? [{ key: '3', label: 'In vé', icon: <FaPrint /> }]
                  : []),
                ...(record.status === 'pending' || record.status === 'confirmed'
                  ? [{ key: '4', label: 'Hủy đặt vé', icon: <FaTrash />, danger: true }]
                  : []),
              ],
              onClick: ({ key }) => {
                if (key === '1') viewBooking(record);
                if (key === '4') prepareCancel(record.id);
              },
            }}
            trigger={['click']}
          >
            <Button type="text" icon={<FaEllipsisV />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <>
      <SEO
        title="Quản lý đặt vé - CineBee Admin"
        description="Quản lý đặt vé xem phim trên hệ thống CineBee"
      />

      <div className="booking-management">
        {/* Page header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Quản lý đặt vé</h1>
            <p className="text-gray-500">Quản lý tất cả đặt vé xem phim trên hệ thống</p>
          </div>
          <Button
            type="primary"
            icon={<FaDownload />}
            onClick={exportBookings}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Xuất dữ liệu
          </Button>
        </div>

        {/* Filter section */}
        <Card className="mb-6 shadow-sm">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <Input.Search
                placeholder="Tìm kiếm mã, tên khách hàng, phim..."
                allowClear
                enterButton={<FaSearch />}
                size="large"
                onSearch={handleSearch}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Status filter */}
            <div>
              <Select
                placeholder="Trạng thái"
                style={{ width: 160 }}
                size="large"
                value={statusFilter}
                onChange={setStatusFilter}
              >
                <Select.Option value="all">Tất cả trạng thái</Select.Option>
                <Select.Option value="pending">Chờ xác nhận</Select.Option>
                <Select.Option value="confirmed">Đã xác nhận</Select.Option>
                <Select.Option value="completed">Hoàn thành</Select.Option>
                <Select.Option value="cancelled">Đã hủy</Select.Option>
              </Select>
            </div>

            {/* Date range */}
            <div>
              <RangePicker size="large" onChange={setDateRange} />
            </div>
          </div>
        </Card>

        {/* Table card */}
        <Card className="shadow-sm">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <Badge count={filteredBookings.length} showZero className="mr-2" />
              <span className="text-gray-500">Hiển thị {filteredBookings.length} đặt vé</span>
            </div>
            <div className="flex items-center">
              <Button icon={<FaFilter />} className="mr-2">
                Lọc nâng cao
              </Button>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={filteredBookings}
            rowKey="id"
            loading={loading}
            pagination={{
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '50', '100'],
              showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} đặt vé`,
            }}
          />
        </Card>

        {/* Booking details drawer */}
        <Drawer
          title={`Chi tiết đặt vé #${viewBookingDetails?.id}`}
          placement="right"
          width={600}
          onClose={() => setShowDetails(false)}
          open={showDetails}
          extra={
            <Space>
              {viewBookingDetails?.status === 'confirmed' && (
                <Button type="primary" icon={<FaPrint />}>
                  In vé
                </Button>
              )}
              {(viewBookingDetails?.status === 'pending' ||
                viewBookingDetails?.status === 'confirmed') && (
                <Button
                  danger
                  icon={<FaTrash />}
                  onClick={() => {
                    setShowDetails(false);
                    prepareCancel(viewBookingDetails?.id);
                  }}
                >
                  Hủy đặt vé
                </Button>
              )}
            </Space>
          }
        >
          {viewBookingDetails && (
            <div className="booking-details">
              {/* Status tag */}
              <div className="mb-6">
                {(() => {
                  const statusConfig = {
                    pending: { color: 'warning', label: 'Chờ xác nhận' },
                    confirmed: { color: 'processing', label: 'Đã xác nhận' },
                    completed: { color: 'success', label: 'Hoàn thành' },
                    cancelled: { color: 'error', label: 'Đã hủy' },
                  };

                  return (
                    <Tag
                      color={statusConfig[viewBookingDetails.status].color}
                      className="text-base px-3 py-1"
                    >
                      {statusConfig[viewBookingDetails.status].label}
                    </Tag>
                  );
                })()}
              </div>

              {/* Customer details */}
              <section className="mb-6">
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FaUserAlt className="mr-2 text-blue-500" />
                  Thông tin khách hàng
                </h3>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div className="text-gray-500">Họ tên</div>
                    <div className="font-medium">{viewBookingDetails.user}</div>
                  </Col>
                  <Col span={12}>
                    <div className="text-gray-500">Số điện thoại</div>
                    <div className="font-medium">{viewBookingDetails.phone || 'Không có'}</div>
                  </Col>
                  <Col span={24}>
                    <div className="text-gray-500">Email</div>
                    <div className="font-medium">{viewBookingDetails.email || 'Không có'}</div>
                  </Col>
                </Row>
              </section>

              <Divider />

              {/* Movie details */}
              <section className="mb-6">
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FaFilm className="mr-2 text-purple-500" />
                  Thông tin phim
                </h3>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div className="text-gray-500">Tên phim</div>
                    <div className="font-medium">{viewBookingDetails.movie}</div>
                  </Col>
                  <Col span={12}>
                    <div className="text-gray-500">Rạp chiếu</div>
                    <div className="font-medium">{viewBookingDetails.theater}</div>
                  </Col>
                  <Col span={8}>
                    <div className="text-gray-500">Ngày chiếu</div>
                    <div className="font-medium">{viewBookingDetails.date}</div>
                  </Col>
                  <Col span={8}>
                    <div className="text-gray-500">Giờ chiếu</div>
                    <div className="font-medium">{viewBookingDetails.time}</div>
                  </Col>
                  <Col span={8}>
                    <div className="text-gray-500">Phòng</div>
                    <div className="font-medium">Phòng {viewBookingDetails.roomNumber}</div>
                  </Col>
                </Row>
              </section>

              <Divider />

              {/* Booking details */}
              <section className="mb-6">
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FaTicketAlt className="mr-2 text-yellow-500" />
                  Thông tin đặt vé
                </h3>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div className="text-gray-500">Mã đặt vé</div>
                    <div className="font-medium">{viewBookingDetails.id}</div>
                  </Col>
                  <Col span={12}>
                    <div className="text-gray-500">Thời gian đặt</div>
                    <div className="font-medium flex items-center">
                      <FaRegClock className="mr-1 text-gray-400" />
                      {new Date(viewBookingDetails.createdAt).toLocaleString('vi-VN')}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="text-gray-500">Ghế</div>
                    <div className="font-medium">
                      <div className="flex flex-wrap gap-1 mt-1">
                        {viewBookingDetails.seats.split(', ').map((seat, index) => (
                          <Tag key={index} className="flex items-center">
                            <FaChair className="mr-1" /> {seat}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="text-gray-500">Phương thức thanh toán</div>
                    <div className="font-medium">{viewBookingDetails.payment}</div>
                  </Col>
                </Row>
              </section>

              <Divider />

              {/* Payment details */}
              <section>
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FaMoneyBillWave className="mr-2 text-green-500" />
                  Thông tin thanh toán
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="text-gray-500">Số lượng vé</div>
                    <div>{viewBookingDetails.seats.split(', ').length} vé</div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="text-gray-500">Giá vé</div>
                    <div>{formatCurrency(90000)}/vé</div>
                  </div>
                  {Math.random() > 0.5 && (
                    <div className="flex justify-between mb-2 text-green-600">
                      <div>Giảm giá</div>
                      <div>-{formatCurrency(Math.floor(Math.random() * 50000))}</div>
                    </div>
                  )}
                  <Divider className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <div>Tổng thanh toán</div>
                    <div>{formatCurrency(viewBookingDetails.amount)}</div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </Drawer>

        {/* Cancel booking modal */}
        <Modal
          title={
            <div className="flex items-center text-red-500">
              <FaExclamationCircle className="mr-2" />
              Xác nhận hủy đặt vé
            </div>
          }
          open={showCancelModal}
          onCancel={() => {
            setShowCancelModal(false);
            setCancelBookingId(null);
            setCancelReason('');
          }}
          footer={[
            <Button
              key="back"
              onClick={() => {
                setShowCancelModal(false);
                setCancelBookingId(null);
                setCancelReason('');
              }}
            >
              Hủy bỏ
            </Button>,
            <Button key="submit" danger type="primary" onClick={confirmCancelBooking}>
              Xác nhận hủy
            </Button>,
          ]}
        >
          <div className="mb-4">
            <div className="flex items-center text-gray-700 mb-2">
              <FaInfoCircle className="mr-2 text-blue-500" />
              Bạn đang hủy đặt vé có mã: <span className="font-medium ml-1">{cancelBookingId}</span>
            </div>
            <p className="text-gray-500">
              Hành động này không thể hoàn tác. Vui lòng nhập lý do hủy đặt vé:
            </p>
          </div>
          <Form layout="vertical">
            <Form.Item
              label="Lý do hủy"
              required
              rules={[{ required: true, message: 'Vui lòng nhập lý do hủy' }]}
            >
              <TextArea
                rows={4}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Nhập lý do hủy đặt vé..."
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default ImprovedBookingManagement;
