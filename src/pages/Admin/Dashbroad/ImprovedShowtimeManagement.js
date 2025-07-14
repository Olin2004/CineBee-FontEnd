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
  Modal,
  Form,
  TimePicker,
  Dropdown,
  Badge,
  Tooltip,
  Row,
  Col,
  Radio,
  Drawer,
  Tabs,
} from 'antd';
import {
  FaSearch,
  FaFilter,
  FaEye,
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaPlus,
  FaFilm,
  FaTheaterMasks,
  FaEllipsisV,
  FaTimes,
  FaExclamationCircle,
  FaChevronRight,
  FaDownload,
  FaInfoCircle,
  FaChair,
} from 'react-icons/fa';
import SEO from '../../../components/SEO/SEO';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const ImprovedShowtimeManagement = () => {
  // State variables
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState(null);
  const [viewShowtimeDetails, setViewShowtimeDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editShowtime, setEditShowtime] = useState(null);
  const [form] = Form.useForm();
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch movie and theater options (mock data)
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [rooms, setRooms] = useState([]);

  // Mock data for initial load
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const mockData = generateMockShowtimes(50);
      setShowtimes(mockData);
      setLoading(false);

      // Mock movies
      setMovies([
        { id: 1, title: 'Robot Revolution', duration: 120 },
        { id: 2, title: 'Pandora Adventure', duration: 145 },
        { id: 3, title: 'Mada', duration: 105 },
        { id: 4, title: 'Survival Race', duration: 135 },
        { id: 5, title: 'City of Dreams', duration: 118 },
        { id: 6, title: 'The Last Hope', duration: 150 },
        { id: 7, title: 'Quantum Journey', duration: 130 },
        { id: 8, title: 'Silent Night', duration: 115 },
      ]);

      // Mock theaters
      setTheaters([
        { id: 1, name: 'CGV Vincom Center' },
        { id: 2, name: 'Beta Cineplex Mỹ Đình' },
        { id: 3, name: 'Lotte Cinema Hà Nội' },
        { id: 4, name: 'Galaxy Cinema Nguyễn Du' },
      ]);

      // Mock rooms
      setRooms([
        { id: 1, theaterId: 1, name: 'Phòng 1', capacity: 120 },
        { id: 2, theaterId: 1, name: 'Phòng 2', capacity: 80 },
        { id: 3, theaterId: 1, name: 'Phòng 3', capacity: 100 },
        { id: 4, theaterId: 2, name: 'Phòng 1', capacity: 110 },
        { id: 5, theaterId: 2, name: 'Phòng 2', capacity: 90 },
        { id: 6, theaterId: 3, name: 'Phòng 1', capacity: 130 },
        { id: 7, theaterId: 3, name: 'Phòng 2', capacity: 85 },
        { id: 8, theaterId: 4, name: 'Phòng 1', capacity: 100 },
        { id: 9, theaterId: 4, name: 'Phòng 2', capacity: 95 },
      ]);
    }, 1000);
  }, []);

  // Generate mock showtimes data
  const generateMockShowtimes = (count) => {
    const statuses = ['active', 'cancelled', 'completed'];
    const movieIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const theaterIds = [1, 2, 3, 4];
    const roomIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const movieTitles = [
      'Robot Revolution',
      'Pandora Adventure',
      'Mada',
      'Survival Race',
      'City of Dreams',
      'The Last Hope',
      'Quantum Journey',
      'Silent Night',
    ];

    const theaterNames = [
      'CGV Vincom Center',
      'Beta Cineplex Mỹ Đình',
      'Lotte Cinema Hà Nội',
      'Galaxy Cinema Nguyễn Du',
    ];

    const result = [];

    for (let i = 1; i <= count; i++) {
      const randomDate = new Date();
      randomDate.setDate(
        randomDate.getDate() - Math.floor(Math.random() * 10) + Math.floor(Math.random() * 20)
      );

      const movieId = movieIds[Math.floor(Math.random() * movieIds.length)];
      const theaterId = theaterIds[Math.floor(Math.random() * theaterIds.length)];
      const roomId = roomIds[Math.floor(Math.random() * roomIds.length)];

      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const hour = Math.floor(Math.random() * 12) + 10; // 10 AM to 10 PM
      const minute = Math.floor(Math.random() * 4) * 15; // 0, 15, 30, 45

      const bookedSeats = Math.floor(Math.random() * 80) + 10;
      const totalSeats = 100 + Math.floor(Math.random() * 50);

      result.push({
        id: `S${10000 + i}`,
        movieId,
        movieTitle: movieTitles[movieId - 1],
        theaterId,
        theaterName: theaterNames[theaterId - 1],
        roomId,
        roomName: `Phòng ${Math.floor(Math.random() * 5) + 1}`,
        date: randomDate.toISOString().split('T')[0],
        time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
        status,
        price: Math.floor(Math.random() * 3) * 10000 + 90000, // 90K, 100K, 110K
        bookedSeats,
        totalSeats,
        occupancyRate: Math.round((bookedSeats / totalSeats) * 100),
        is3D: Math.random() > 0.7,
        language: Math.random() > 0.3 ? 'Tiếng Việt' : 'Phụ đề Việt',
        createdAt: new Date().toISOString(),
      });
    }

    return result;
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Filter showtimes based on search text, status, and date range
  const filteredShowtimes = showtimes.filter((showtime) => {
    // Search text filter
    const searchMatch =
      showtime.id.toLowerCase().includes(searchText.toLowerCase()) ||
      showtime.movieTitle.toLowerCase().includes(searchText.toLowerCase()) ||
      showtime.theaterName.toLowerCase().includes(searchText.toLowerCase()) ||
      showtime.roomName.toLowerCase().includes(searchText.toLowerCase());

    // Status filter
    const statusMatch = statusFilter === 'all' || showtime.status === statusFilter;

    // Date range filter
    let dateMatch = true;
    if (dateRange && dateRange[0] && dateRange[1]) {
      const showtimeDate = new Date(showtime.date);
      const startDate = dateRange[0].startOf('day').toDate();
      const endDate = dateRange[1].endOf('day').toDate();

      dateMatch = showtimeDate >= startDate && showtimeDate <= endDate;
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

  // View showtime details
  const viewShowtime = (showtime) => {
    setViewShowtimeDetails(showtime);
    setShowDetails(true);
  };

  // Add new showtime
  const showAddShowtimeModal = () => {
    setEditShowtime(null);
    form.resetFields();
    setShowAddModal(true);
  };

  // Edit showtime
  const showEditShowtimeModal = (showtime) => {
    setEditShowtime(showtime);
    form.setFieldsValue({
      movieId: showtime.movieId,
      theaterId: showtime.theaterId,
      roomId: showtime.roomId,
      date: dayjs(showtime.date),
      time: dayjs(`2023-01-01T${showtime.time}`),
      price: showtime.price,
      is3D: showtime.is3D,
      language: showtime.language,
    });
    setShowAddModal(true);
  };

  // Delete showtime
  const confirmDeleteShowtime = () => {
    // In a real app, this would be an API call
    setShowtimes(showtimes.filter((showtime) => showtime.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Handle form submission
  const handleFormSubmit = (values) => {
    // Format time from TimePicker
    const timeString = values.time.format('HH:mm');

    // In a real app, this would be an API call to save the showtime
    if (editShowtime) {
      // Update existing showtime
      setShowtimes(
        showtimes.map((st) =>
          st.id === editShowtime.id
            ? {
                ...st,
                movieId: values.movieId,
                movieTitle: movies.find((m) => m.id === values.movieId)?.title || '',
                theaterId: values.theaterId,
                theaterName: theaters.find((t) => t.id === values.theaterId)?.name || '',
                roomId: values.roomId,
                roomName: rooms.find((r) => r.id === values.roomId)?.name || '',
                date: values.date.format('YYYY-MM-DD'),
                time: timeString,
                price: values.price,
                is3D: values.is3D,
                language: values.language,
              }
            : st
        )
      );
    } else {
      // Add new showtime
      const newShowtime = {
        id: `S${10000 + showtimes.length + 1}`,
        movieId: values.movieId,
        movieTitle: movies.find((m) => m.id === values.movieId)?.title || '',
        theaterId: values.theaterId,
        theaterName: theaters.find((t) => t.id === values.theaterId)?.name || '',
        roomId: values.roomId,
        roomName: rooms.find((r) => r.id === values.roomId)?.name || '',
        date: values.date.format('YYYY-MM-DD'),
        time: timeString,
        status: 'active',
        price: values.price,
        bookedSeats: 0,
        totalSeats: rooms.find((r) => r.id === values.roomId)?.capacity || 100,
        occupancyRate: 0,
        is3D: values.is3D,
        language: values.language,
        createdAt: new Date().toISOString(),
      };

      setShowtimes([newShowtime, ...showtimes]);
    }

    setShowAddModal(false);
    form.resetFields();
  };

  // Export showtimes as CSV
  const exportShowtimes = () => {
    // In a real app, this would generate and download a CSV/Excel file
    alert('Đang xuất dữ liệu lịch chiếu...');
  };

  // Get rooms by theater
  const getRoomsByTheater = (theaterId) => {
    return rooms.filter((room) => room.theaterId === theaterId);
  };

  // Table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Phim',
      dataIndex: 'movieTitle',
      key: 'movieTitle',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">
            {record.is3D ? 'Bản 3D' : 'Bản 2D'} • {record.language}
          </div>
        </div>
      ),
    },
    {
      title: 'Rạp & Phòng',
      dataIndex: 'theaterName',
      key: 'theaterName',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <div className="text-xs text-gray-500">{record.roomName}</div>
        </div>
      ),
    },
    {
      title: 'Ngày chiếu',
      dataIndex: 'date',
      key: 'date',
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString('vi-VN');
      },
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Giờ chiếu',
      dataIndex: 'time',
      key: 'time',
      width: 100,
    },
    {
      title: 'Giá vé',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatCurrency(price),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          active: { color: 'success', label: 'Đang bán vé' },
          cancelled: { color: 'error', label: 'Đã hủy' },
          completed: { color: 'default', label: 'Đã chiếu' },
        };

        return <Tag color={statusConfig[status].color}>{statusConfig[status].label}</Tag>;
      },
      filters: [
        { text: 'Đang bán vé', value: 'active' },
        { text: 'Đã hủy', value: 'cancelled' },
        { text: 'Đã chiếu', value: 'completed' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Tỷ lệ đặt chỗ',
      dataIndex: 'occupancyRate',
      key: 'occupancyRate',
      render: (rate, record) => (
        <Tooltip title={`${record.bookedSeats}/${record.totalSeats} ghế`}>
          <div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
              <div
                className={`h-2.5 rounded-full ${
                  rate > 80 ? 'bg-green-600' : rate > 40 ? 'bg-blue-600' : 'bg-yellow-400'
                }`}
                style={{ width: `${rate}%` }}
              ></div>
            </div>
            <div className="text-xs text-right">{rate}%</div>
          </div>
        </Tooltip>
      ),
      sorter: (a, b) => a.occupancyRate - b.occupancyRate,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button
              type="text"
              icon={<FaEye />}
              size="small"
              onClick={() => viewShowtime(record)}
            />
          </Tooltip>

          {record.status === 'active' && (
            <>
              <Tooltip title="Chỉnh sửa">
                <Button
                  type="text"
                  icon={<FaEdit />}
                  size="small"
                  onClick={() => showEditShowtimeModal(record)}
                />
              </Tooltip>

              <Tooltip title="Hủy lịch chiếu">
                <Button
                  type="text"
                  danger
                  icon={<FaTrash />}
                  size="small"
                  onClick={() => {
                    setDeleteId(record.id);
                    setShowDeleteModal(true);
                  }}
                />
              </Tooltip>
            </>
          )}

          <Dropdown
            menu={{
              items: [
                { key: '1', label: 'Xem chi tiết', icon: <FaEye /> },
                ...(record.status === 'active'
                  ? [
                      { key: '2', label: 'Chỉnh sửa', icon: <FaEdit /> },
                      { key: '3', label: 'Hủy lịch chiếu', icon: <FaTrash />, danger: true },
                    ]
                  : []),
              ],
              onClick: ({ key }) => {
                if (key === '1') viewShowtime(record);
                if (key === '2') showEditShowtimeModal(record);
                if (key === '3') {
                  setDeleteId(record.id);
                  setShowDeleteModal(true);
                }
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
        title="Quản lý lịch chiếu - CineBee Admin"
        description="Quản lý lịch chiếu phim trên hệ thống CineBee"
      />

      <div className="showtime-management">
        {/* Page header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Quản lý lịch chiếu</h1>
            <p className="text-gray-500">Quản lý tất cả lịch chiếu phim trên hệ thống</p>
          </div>
          <Space>
            <Button type="default" icon={<FaDownload />} onClick={exportShowtimes}>
              Xuất dữ liệu
            </Button>
            <Button
              type="primary"
              icon={<FaPlus />}
              onClick={showAddShowtimeModal}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Thêm lịch chiếu
            </Button>
          </Space>
        </div>

        {/* Filter section */}
        <Card className="mb-6 shadow-sm">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <Input.Search
                placeholder="Tìm kiếm phim, rạp..."
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
                <Select.Option value="active">Đang bán vé</Select.Option>
                <Select.Option value="cancelled">Đã hủy</Select.Option>
                <Select.Option value="completed">Đã chiếu</Select.Option>
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
              <Badge count={filteredShowtimes.length} showZero className="mr-2" />
              <span className="text-gray-500">Hiển thị {filteredShowtimes.length} lịch chiếu</span>
            </div>
            <div className="flex items-center">
              <Button icon={<FaFilter />} className="mr-2">
                Lọc nâng cao
              </Button>
            </div>
          </div>

          <Tabs defaultActiveKey="list" className="showtime-tabs">
            <TabPane
              tab={
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-1" /> Danh sách
                </span>
              }
              key="list"
            >
              <Table
                columns={columns}
                dataSource={filteredShowtimes}
                rowKey="id"
                loading={loading}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ['10', '20', '50', '100'],
                  showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} lịch chiếu`,
                }}
              />
            </TabPane>
            <TabPane
              tab={
                <span className="flex items-center">
                  <FaTheaterMasks className="mr-1" /> Theo rạp
                </span>
              }
              key="theaters"
            >
              <div className="text-center text-gray-500 py-8">
                Tính năng xem lịch chiếu theo rạp sẽ được cập nhật trong phiên bản tới
              </div>
            </TabPane>
            <TabPane
              tab={
                <span className="flex items-center">
                  <FaFilm className="mr-1" /> Theo phim
                </span>
              }
              key="movies"
            >
              <div className="text-center text-gray-500 py-8">
                Tính năng xem lịch chiếu theo phim sẽ được cập nhật trong phiên bản tới
              </div>
            </TabPane>
          </Tabs>
        </Card>

        {/* Showtime details drawer */}
        <Drawer
          title={`Chi tiết lịch chiếu #${viewShowtimeDetails?.id}`}
          placement="right"
          width={500}
          onClose={() => setShowDetails(false)}
          open={showDetails}
          extra={
            viewShowtimeDetails?.status === 'active' && (
              <Space>
                <Button
                  type="primary"
                  icon={<FaEdit />}
                  onClick={() => {
                    setShowDetails(false);
                    showEditShowtimeModal(viewShowtimeDetails);
                  }}
                >
                  Chỉnh sửa
                </Button>
              </Space>
            )
          }
        >
          {viewShowtimeDetails && (
            <div className="showtime-details">
              {/* Status tag */}
              <div className="mb-6">
                {(() => {
                  const statusConfig = {
                    active: { color: 'success', label: 'Đang bán vé' },
                    cancelled: { color: 'error', label: 'Đã hủy' },
                    completed: { color: 'default', label: 'Đã chiếu' },
                  };

                  return (
                    <Tag
                      color={statusConfig[viewShowtimeDetails.status].color}
                      className="text-base px-3 py-1"
                    >
                      {statusConfig[viewShowtimeDetails.status].label}
                    </Tag>
                  );
                })()}
              </div>

              {/* Movie details */}
              <section className="mb-6">
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FaFilm className="mr-2 text-purple-500" />
                  Thông tin phim
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-lg font-semibold">{viewShowtimeDetails.movieTitle}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Tag color="blue">{viewShowtimeDetails.is3D ? 'Bản 3D' : 'Bản 2D'}</Tag>
                    <Tag color="purple">{viewShowtimeDetails.language}</Tag>
                    <Tag>
                      {movies.find((m) => m.id === viewShowtimeDetails.movieId)?.duration || 120}{' '}
                      phút
                    </Tag>
                  </div>
                </div>
              </section>

              {/* Showtime details */}
              <section className="mb-6">
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FaCalendarAlt className="mr-2 text-blue-500" />
                  Thông tin lịch chiếu
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div className="text-gray-500">Rạp chiếu</div>
                      <div className="font-medium">{viewShowtimeDetails.theaterName}</div>
                    </Col>
                    <Col span={12}>
                      <div className="text-gray-500">Phòng</div>
                      <div className="font-medium">{viewShowtimeDetails.roomName}</div>
                    </Col>
                    <Col span={12}>
                      <div className="text-gray-500">Ngày chiếu</div>
                      <div className="font-medium">
                        {new Date(viewShowtimeDetails.date).toLocaleDateString('vi-VN')}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="text-gray-500">Giờ chiếu</div>
                      <div className="font-medium">{viewShowtimeDetails.time}</div>
                    </Col>
                    <Col span={24}>
                      <div className="text-gray-500">Giá vé</div>
                      <div className="font-medium">{formatCurrency(viewShowtimeDetails.price)}</div>
                    </Col>
                  </Row>
                </div>
              </section>

              {/* Occupancy details */}
              <section className="mb-6">
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FaChair className="mr-2 text-green-500" />
                  Tình trạng chỗ ngồi
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-3">
                    <div className="text-sm text-gray-500 mb-1">Tỷ lệ đặt chỗ</div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                      <div
                        className={`h-3 rounded-full ${
                          viewShowtimeDetails.occupancyRate > 80
                            ? 'bg-green-600'
                            : viewShowtimeDetails.occupancyRate > 40
                            ? 'bg-blue-600'
                            : 'bg-yellow-400'
                        }`}
                        style={{ width: `${viewShowtimeDetails.occupancyRate}%` }}
                      ></div>
                    </div>
                  </div>
                  <Row gutter={[16, 16]}>
                    <Col span={8}>
                      <div className="text-gray-500">Đã đặt</div>
                      <div className="font-medium">{viewShowtimeDetails.bookedSeats} ghế</div>
                    </Col>
                    <Col span={8}>
                      <div className="text-gray-500">Còn trống</div>
                      <div className="font-medium">
                        {viewShowtimeDetails.totalSeats - viewShowtimeDetails.bookedSeats} ghế
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="text-gray-500">Tổng số</div>
                      <div className="font-medium">{viewShowtimeDetails.totalSeats} ghế</div>
                    </Col>
                  </Row>
                </div>
              </section>

              {/* System information */}
              <section>
                <h3 className="text-lg font-medium flex items-center mb-3">
                  <FaInfoCircle className="mr-2 text-gray-500" />
                  Thông tin hệ thống
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div className="text-gray-500">ID lịch chiếu</div>
                      <div className="font-medium">{viewShowtimeDetails.id}</div>
                    </Col>
                    <Col span={12}>
                      <div className="text-gray-500">Ngày tạo</div>
                      <div className="font-medium">
                        {new Date(viewShowtimeDetails.createdAt).toLocaleString('vi-VN')}
                      </div>
                    </Col>
                  </Row>
                </div>
              </section>

              {/* Action buttons */}
              {viewShowtimeDetails.status === 'active' && (
                <div className="mt-6 flex flex-col gap-2">
                  <Button
                    type="default"
                    block
                    icon={<FaChevronRight />}
                    className="justify-between items-center flex"
                  >
                    <span>Xem danh sách đặt vé</span>
                  </Button>
                  <Button
                    danger
                    block
                    icon={<FaTimes />}
                    onClick={() => {
                      setShowDetails(false);
                      setDeleteId(viewShowtimeDetails.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Hủy lịch chiếu này
                  </Button>
                </div>
              )}
            </div>
          )}
        </Drawer>

        {/* Add/Edit showtime modal */}
        <Modal
          title={editShowtime ? 'Chỉnh sửa lịch chiếu' : 'Thêm lịch chiếu mới'}
          open={showAddModal}
          onCancel={() => {
            setShowAddModal(false);
            setEditShowtime(null);
            form.resetFields();
          }}
          footer={null}
          width={800}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{
              is3D: false,
              language: 'Phụ đề Việt',
              price: 90000,
              date: dayjs(),
              time: dayjs('2023-01-01T19:30:00'),
            }}
          >
            <div className="mt-4">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="movieId"
                    label="Chọn phim"
                    rules={[{ required: true, message: 'Vui lòng chọn phim' }]}
                  >
                    {' '}
                    <Select placeholder="Chọn phim" size="large">
                      {movies.map((movie) => (
                        <Select.Option key={movie.id} value={movie.id}>
                          {movie.title} ({movie.duration} phút)
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="theaterId"
                    label="Chọn rạp"
                    rules={[{ required: true, message: 'Vui lòng chọn rạp' }]}
                  >
                    {' '}
                    <Select
                      placeholder="Chọn rạp"
                      size="large"
                      onChange={() => {
                        // Reset room when theater changes
                        form.setFieldsValue({ roomId: undefined });
                      }}
                    >
                      {theaters.map((theater) => (
                        <Select.Option key={theater.id} value={theater.id}>
                          {theater.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="roomId"
                    label="Chọn phòng chiếu"
                    rules={[{ required: true, message: 'Vui lòng chọn phòng chiếu' }]}
                  >
                    {' '}
                    <Select
                      placeholder="Chọn phòng"
                      size="large"
                      disabled={!form.getFieldValue('theaterId')}
                    >
                      {form.getFieldValue('theaterId') &&
                        getRoomsByTheater(form.getFieldValue('theaterId')).map((room) => (
                          <Select.Option key={room.id} value={room.id}>
                            {room.name} ({room.capacity} ghế)
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="date"
                    label="Ngày chiếu"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày chiếu' }]}
                  >
                    <DatePicker
                      format="DD/MM/YYYY"
                      className="w-full"
                      size="large"
                      disabledDate={(current) => current && current < dayjs().startOf('day')}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="time"
                    label="Giờ chiếu"
                    rules={[{ required: true, message: 'Vui lòng chọn giờ chiếu' }]}
                  >
                    <TimePicker format="HH:mm" className="w-full" size="large" minuteStep={15} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="price"
                    label="Giá vé"
                    rules={[{ required: true, message: 'Vui lòng nhập giá vé' }]}
                  >
                    <Input type="number" size="large" min={10000} step={10000} addonAfter="VND" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="language"
                    label="Ngôn ngữ"
                    rules={[{ required: true, message: 'Vui lòng chọn ngôn ngữ' }]}
                  >
                    {' '}
                    <Select placeholder="Chọn ngôn ngữ" size="large">
                      <Select.Option value="Tiếng Việt">Tiếng Việt</Select.Option>
                      <Select.Option value="Phụ đề Việt">Phụ đề Việt</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    name="is3D"
                    label="Định dạng"
                    rules={[{ required: true, message: 'Vui lòng chọn định dạng' }]}
                  >
                    <Radio.Group>
                      <Radio value={false}>2D</Radio>
                      <Radio value={true}>3D</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                onClick={() => {
                  setShowAddModal(false);
                  setEditShowtime(null);
                  form.resetFields();
                }}
              >
                Hủy bỏ
              </Button>
              <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700">
                {editShowtime ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </Form>
        </Modal>

        {/* Delete confirmation modal */}
        <Modal
          title={
            <div className="flex items-center text-red-500">
              <FaExclamationCircle className="mr-2" />
              Xác nhận hủy lịch chiếu
            </div>
          }
          open={showDeleteModal}
          onCancel={() => {
            setShowDeleteModal(false);
            setDeleteId(null);
          }}
          footer={[
            <Button
              key="back"
              onClick={() => {
                setShowDeleteModal(false);
                setDeleteId(null);
              }}
            >
              Hủy bỏ
            </Button>,
            <Button key="submit" danger type="primary" onClick={confirmDeleteShowtime}>
              Xác nhận hủy
            </Button>,
          ]}
        >
          <div className="py-4">
            <p className="mb-4">Bạn có chắc chắn muốn hủy lịch chiếu này?</p>
            <p className="text-gray-500">
              Hành động này sẽ hủy tất cả các đặt vé liên quan đến lịch chiếu này. Hành động này
              không thể hoàn tác.
            </p>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ImprovedShowtimeManagement;
