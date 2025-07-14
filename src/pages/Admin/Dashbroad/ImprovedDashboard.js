import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Tag, Progress, Dropdown, Button, Statistic } from 'antd';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import {
  FaUsers,
  FaFilm,
  FaTicketAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaTheaterMasks,
  FaChartLine,
  FaEllipsisV,
  FaRegClock,
  FaExclamationTriangle,
  FaChevronUp,
  FaChevronDown,
  FaChevronRight,
  FaDownload,
  FaSync,
  FaInfoCircle,
} from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ImprovedDashboard = () => {
  // Current day for filtering
  const today = new Date();
  const dayOptions = ['Hôm nay', 'Tuần này', 'Tháng này', 'Năm nay'];
  const [selectedDay, setSelectedDay] = useState('Hôm nay');

  // Mock data
  const [stats, setStats] = useState({
    totalUsers: 1284,
    userGrowth: 5.2,
    totalMovies: 467,
    movieGrowth: 2.5,
    totalTickets: 8902,
    ticketGrowth: 8.4,
    totalRevenue: 15780000,
    revenueGrowth: 12.8,
    todayBookings: 143,
    todayBookingGrowth: 15.3,
    upcomingShowtimes: 56,
    occupancyRate: 72,
  });

  // Format date for chart labels
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit' }).format(date);
  };

  // Generate last 7 days for chart
  const getLast7Days = () => {
    const dates = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(formatDate(date));
    }
    return dates;
  };

  // Revenue chart data
  const revenueData = {
    labels: getLast7Days(),
    datasets: [
      {
        label: 'Doanh thu (triệu VND)',
        data: [2.5, 3.1, 2.8, 5.2, 4.3, 4.9, 6.1],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  // Ticket sales chart data
  const ticketData = {
    labels: getLast7Days(),
    datasets: [
      {
        label: 'Vé bán ra',
        data: [120, 145, 135, 210, 195, 240, 280],
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4,
      },
    ],
  };

  // Movie categories chart data
  const movieCategoryData = {
    labels: ['Hành động', 'Tình cảm', 'Hài', 'Kinh dị', 'Khoa học viễn tưởng', 'Hoạt hình'],
    datasets: [
      {
        data: [35, 25, 15, 10, 10, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Top movies data
  const [mostBookedMovies] = useState([
    {
      id: 1,
      title: 'Robot Revolution',
      bookings: 458,
      revenue: 45800000,
      poster: 'https://image.tmdb.org/t/p/w500/8ZbybiGYe8XM4WGmGlhF0ec5R7u.jpg',
      growth: 15.3,
    },
    {
      id: 2,
      title: 'Pandora Adventure',
      bookings: 389,
      revenue: 38900000,
      poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
      growth: 12.8,
    },
    {
      id: 3,
      title: 'Mada',
      bookings: 302,
      revenue: 30200000,
      poster: 'https://image.tmdb.org/t/p/w500/4J2QfK1Z8gKTMv1r5zFhQ6FvP1g.jpg',
      growth: 8.5,
    },
    {
      id: 4,
      title: 'Survival Race',
      bookings: 275,
      revenue: 27500000,
      poster: 'https://image.tmdb.org/t/p/w500/bOFaAXmWWXC3Rbv4u4uM9ZSzRXP.jpg',
      growth: -2.1,
    },
    {
      id: 5,
      title: 'City of Dreams',
      bookings: 218,
      revenue: 21800000,
      poster: 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
      growth: 5.7,
    },
  ]);

  // Recent bookings data
  const [recentBookings] = useState([
    {
      id: 'B23981',
      user: 'Nguyễn Văn A',
      movie: 'Robot Revolution',
      date: '13/07/2025',
      time: '19:30',
      seats: 'D7, D8',
      amount: 180000,
      status: 'completed',
      payment: 'Credit Card',
    },
    {
      id: 'B23982',
      user: 'Trần Thị B',
      movie: 'Pandora Adventure',
      date: '13/07/2025',
      time: '20:00',
      seats: 'F5',
      amount: 90000,
      status: 'pending',
      payment: 'MoMo',
    },
    {
      id: 'B23983',
      user: 'Lê Văn C',
      movie: 'Mada',
      date: '12/07/2025',
      time: '18:15',
      seats: 'C3, C4, C5',
      amount: 270000,
      status: 'completed',
      payment: 'Bank Transfer',
    },
    {
      id: 'B23984',
      user: 'Phạm Thị D',
      movie: 'Survival Race',
      date: '12/07/2025',
      time: '21:30',
      seats: 'H9',
      amount: 90000,
      status: 'cancelled',
      payment: 'Cash',
    },
    {
      id: 'B23985',
      user: 'Hoàng Văn E',
      movie: 'Robot Revolution',
      date: '11/07/2025',
      time: '15:45',
      seats: 'A10, A11',
      amount: 180000,
      status: 'completed',
      payment: 'Credit Card',
    },
  ]);

  // Theater performance data
  const [theaterPerformance] = useState([
    { id: 1, name: 'CGV Vincom Center', bookings: 1240, occupancy: 89 },
    { id: 2, name: 'Beta Cineplex Mỹ Đình', bookings: 980, occupancy: 76 },
    { id: 3, name: 'Lotte Cinema Hà Nội', bookings: 845, occupancy: 72 },
    { id: 4, name: 'Galaxy Cinema Nguyễn Du', bookings: 756, occupancy: 68 },
  ]);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(value);
  };

  // Filter menu
  const filterMenu = {
    items: dayOptions.map((day) => ({
      key: day,
      label: day,
    })),
    onClick: ({ key }) => setSelectedDay(key),
  };

  // Updates stats when selected day changes
  useEffect(() => {
    // In a real app, you would fetch data based on the selected time frame
    // This is a simulation with mock data
    if (selectedDay === 'Tuần này') {
      setStats((prev) => ({
        ...prev,
        totalRevenue: 62500000,
        revenueGrowth: 8.3,
        totalTickets: 3245,
        ticketGrowth: 5.6,
        todayBookings: 580,
        todayBookingGrowth: 7.2,
      }));
    } else if (selectedDay === 'Tháng này') {
      setStats((prev) => ({
        ...prev,
        totalRevenue: 243800000,
        revenueGrowth: 15.8,
        totalTickets: 12450,
        ticketGrowth: 12.1,
        todayBookings: 2340,
        todayBookingGrowth: 9.8,
      }));
    } else if (selectedDay === 'Năm nay') {
      setStats((prev) => ({
        ...prev,
        totalRevenue: 1875000000,
        revenueGrowth: 22.5,
        totalTickets: 98750,
        ticketGrowth: 18.7,
        todayBookings: 15680,
        todayBookingGrowth: 24.3,
      }));
    } else {
      // Hôm nay (default)
      setStats((prev) => ({
        ...prev,
        totalRevenue: 15780000,
        revenueGrowth: 12.8,
        totalTickets: 8902,
        ticketGrowth: 8.4,
        todayBookings: 143,
        todayBookingGrowth: 15.3,
      }));
    }
  }, [selectedDay]);

  // Booking table columns
  const bookingColumns = [
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
      render: (movie) => <span className="font-medium">{movie}</span>,
    },
    {
      title: 'Ngày',
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
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          completed: 'success',
          pending: 'warning',
          cancelled: 'error',
        };

        const labels = {
          completed: 'Hoàn thành',
          pending: 'Đang xử lý',
          cancelled: 'Đã hủy',
        };

        return <Tag color={colors[status]}>{labels[status]}</Tag>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: () => (
        <Dropdown
          menu={{
            items: [
              { key: '1', label: 'Xem chi tiết' },
              { key: '2', label: 'In vé' },
              { key: '3', label: 'Hủy đặt vé', danger: true },
            ],
          }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button type="text" icon={<FaEllipsisV />} size="small" />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Page header with filter */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">
            Chào mừng trở lại! Đây là tổng quan hoạt động của hệ thống.
          </p>
        </div>
        <div className="flex space-x-3">
          <Dropdown menu={filterMenu} placement="bottomRight">
            <Button>
              {selectedDay} <FaChevronDown className="ml-1" size={12} />
            </Button>
          </Dropdown>
          <Button
            type="primary"
            className="bg-blue-600 hover:bg-blue-700"
            icon={<FaDownload className="mr-1" />}
          >
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm h-full">
            <Statistic
              title={
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Doanh thu</span>
                  <div className="p-2 rounded-full bg-green-100">
                    <FaMoneyBillWave className="text-green-600" />
                  </div>
                </div>
              }
              value={formatCurrency(stats.totalRevenue)}
              valueStyle={{ color: '#3f8600', fontSize: '24px', fontWeight: 'bold' }}
              prefix={<></>}
              suffix={
                <div
                  className={`text-sm font-medium ml-2 flex items-center ${
                    stats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stats.revenueGrowth >= 0 ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
                  {Math.abs(stats.revenueGrowth)}%
                </div>
              }
            />
            <div className="mt-4 text-sm text-gray-500">So với thời gian trước</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm h-full">
            <Statistic
              title={
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Vé đã bán</span>
                  <div className="p-2 rounded-full bg-purple-100">
                    <FaTicketAlt className="text-purple-600" />
                  </div>
                </div>
              }
              value={stats.totalTickets}
              valueStyle={{ color: '#722ed1', fontSize: '24px', fontWeight: 'bold' }}
              prefix={<></>}
              suffix={
                <div
                  className={`text-sm font-medium ml-2 flex items-center ${
                    stats.ticketGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stats.ticketGrowth >= 0 ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
                  {Math.abs(stats.ticketGrowth)}%
                </div>
              }
            />
            <div className="mt-4 text-sm text-gray-500">So với thời gian trước</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm h-full">
            <Statistic
              title={
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Đặt vé hôm nay</span>
                  <div className="p-2 rounded-full bg-blue-100">
                    <FaRegClock className="text-blue-600" />
                  </div>
                </div>
              }
              value={stats.todayBookings}
              valueStyle={{ color: '#1890ff', fontSize: '24px', fontWeight: 'bold' }}
              prefix={<></>}
              suffix={
                <div
                  className={`text-sm font-medium ml-2 flex items-center ${
                    stats.todayBookingGrowth >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stats.todayBookingGrowth >= 0 ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
                  {Math.abs(stats.todayBookingGrowth)}%
                </div>
              }
            />
            <div className="mt-4 text-sm text-gray-500">So với hôm qua</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm h-full">
            <Statistic
              title={
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Tỷ lệ lấp đầy</span>
                  <div className="p-2 rounded-full bg-yellow-100">
                    <FaTheaterMasks className="text-yellow-600" />
                  </div>
                </div>
              }
              value={stats.occupancyRate}
              valueStyle={{ color: '#faad14', fontSize: '24px', fontWeight: 'bold' }}
              suffix="%"
            />
            <Progress
              percent={stats.occupancyRate}
              status="active"
              strokeColor={{
                '0%': '#faad14',
                '100%': '#d48806',
              }}
              className="mt-2"
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <Card
            title="Doanh thu 7 ngày gần đây"
            bordered={false}
            className="shadow-sm h-full"
            extra={
              <Button
                type="text"
                icon={<FaSync size={14} />}
                size="small"
                className="flex items-center"
              >
                Làm mới
              </Button>
            }
          >
            <Line
              data={revenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `Doanh thu: ${context.raw} triệu VND`;
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function (value) {
                        return value + ' tr';
                      },
                    },
                  },
                },
              }}
              height={250}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            title="Phân bổ theo thể loại phim"
            bordered={false}
            className="shadow-sm h-full"
            extra={
              <Tooltip title="Tỷ lệ phim theo thể loại đang chiếu">
                <Button type="text" icon={<FaInfoCircle />} size="small" />
              </Tooltip>
            }
          >
            <div className="flex justify-center" style={{ height: 250 }}>
              <Doughnut
                data={movieCategoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  },
                  cutout: '60%',
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Top Movies & Bookings Row */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card
            title="Top phim ăn khách"
            bordered={false}
            className="shadow-sm"
            extra={
              <Button type="link" size="small" className="flex items-center">
                Xem tất cả <FaChevronRight className="ml-1" size={10} />
              </Button>
            }
          >
            {mostBookedMovies.map((movie) => (
              <div key={movie.id} className="flex items-center py-3 border-b last:border-0">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <div className="font-medium">{movie.title}</div>
                  <div className="text-gray-500 text-sm">{movie.bookings} lượt đặt</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(movie.revenue)}</div>
                  <div
                    className={`text-sm flex items-center justify-end ${
                      movie.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {movie.growth >= 0 ? (
                      <FaChevronUp size={10} className="mr-1" />
                    ) : (
                      <FaChevronDown size={10} className="mr-1" />
                    )}
                    {Math.abs(movie.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="Lịch chiếu sắp tới"
            bordered={false}
            className="shadow-sm"
            extra={
              <Tag color="orange" className="flex items-center">
                <FaExclamationTriangle className="mr-1" /> {stats.upcomingShowtimes} lịch chiếu
              </Tag>
            }
          >
            <div className="divide-y">
              <div className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">Robot Revolution</div>
                  <div className="text-sm text-gray-500">13/07/2025 • 19:30 • Phòng 3</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    58% <span className="text-sm text-gray-500">đã đặt</span>
                  </div>
                  <Progress percent={58} size="small" showInfo={false} />
                </div>
              </div>
              <div className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">Pandora Adventure</div>
                  <div className="text-sm text-gray-500">13/07/2025 • 20:00 • Phòng 1</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    75% <span className="text-sm text-gray-500">đã đặt</span>
                  </div>
                  <Progress percent={75} size="small" showInfo={false} />
                </div>
              </div>
              <div className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">Mada</div>
                  <div className="text-sm text-gray-500">13/07/2025 • 18:15 • Phòng 2</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    42% <span className="text-sm text-gray-500">đã đặt</span>
                  </div>
                  <Progress percent={42} size="small" showInfo={false} />
                </div>
              </div>
              <div className="py-3 flex justify-between items-center">
                <div>
                  <div className="font-medium">Survival Race</div>
                  <div className="text-sm text-gray-500">14/07/2025 • 21:30 • Phòng 4</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    29% <span className="text-sm text-gray-500">đã đặt</span>
                  </div>
                  <Progress percent={29} size="small" showInfo={false} />
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Bookings Table */}
      <Card
        title="Đặt vé gần đây"
        bordered={false}
        className="shadow-sm mb-6"
        extra={
          <Button type="link" size="small" className="flex items-center">
            Xem tất cả <FaChevronRight className="ml-1" size={10} />
          </Button>
        }
      >
        <Table
          dataSource={recentBookings}
          columns={bookingColumns}
          rowKey="id"
          pagination={false}
          className="booking-table"
        />
      </Card>

      {/* Theater Stats */}
      <Card title="Hiệu suất rạp chiếu" bordered={false} className="shadow-sm">
        <Row gutter={[16, 16]}>
          {theaterPerformance.map((theater) => (
            <Col xs={24} sm={12} lg={6} key={theater.id}>
              <Card bordered={false} className="bg-gray-50">
                <div className="text-lg font-medium mb-2">{theater.name}</div>
                <div className="text-gray-500 mb-3">{theater.bookings} lượt đặt</div>
                <Progress
                  percent={theater.occupancy}
                  status={
                    theater.occupancy >= 80
                      ? 'success'
                      : theater.occupancy >= 60
                      ? 'active'
                      : 'normal'
                  }
                  format={(percent) => `${percent}% lấp đầy`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default ImprovedDashboard;
