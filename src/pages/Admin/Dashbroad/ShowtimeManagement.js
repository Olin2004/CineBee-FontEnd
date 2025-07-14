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
  Form,
  TimePicker,
  message,
  Tooltip,
} from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FaCalendarAlt } from 'react-icons/fa';
import dayjs from 'dayjs';
import SEO from '../../../components/SEO/SEO';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Mock data for theaters
const theaters = [
  { id: 1, name: 'CGV Vincom Center', rooms: ['Room 1', 'Room 2', 'Room 3', 'Room 4', 'VIP Room'] },
  { id: 2, name: 'Beta Cineplex Mỹ Đình', rooms: ['Hall A', 'Hall B', 'Hall C', 'Premium'] },
  { id: 3, name: 'Lotte Cinema Hà Nội', rooms: ['Cinema 1', 'Cinema 2', 'Cinema 3', 'IMAX'] },
  { id: 4, name: 'Galaxy Cinema Nguyễn Du', rooms: ['Screen 1', 'Screen 2', 'Screen 3', '4DX'] },
];

// Mock data for movies
const movies = [
  { id: 1, title: 'Robot Revolution', duration: 125 },
  { id: 2, title: 'Pandora Adventure', duration: 143 },
  { id: 3, title: 'Mada', duration: 98 },
  { id: 4, title: 'Survival Race', duration: 110 },
  { id: 5, title: 'The Last Hope', duration: 132 },
];

// Mock data for showtimes
const generateMockShowtimes = () => {
  const showtimes = [];
  const today = dayjs();

  for (let i = 0; i < 50; i++) {
    const theater = theaters[Math.floor(Math.random() * theaters.length)];
    const movie = movies[Math.floor(Math.random() * movies.length)];
    const room = theater.rooms[Math.floor(Math.random() * theater.rooms.length)];
    const date = dayjs(today).add(Math.floor(Math.random() * 14), 'day');
    const hourStart = 10 + Math.floor(Math.random() * 11); // 10 AM to 9 PM
    const minuteStart = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    const startTime = dayjs(date).hour(hourStart).minute(minuteStart);
    const endTime = dayjs(startTime).add(movie.duration, 'minute');

    showtimes.push({
      id: `ST${1000 + i}`,
      movieId: movie.id,
      movieTitle: movie.title,
      theaterId: theater.id,
      theaterName: theater.name,
      room: room,
      date: date.format('YYYY-MM-DD'),
      startTime: startTime,
      endTime: endTime,
      duration: movie.duration,
      capacity: 50 + Math.floor(Math.random() * 150),
      availableSeats: Math.floor(Math.random() * 50),
      price: 80000 + Math.floor(Math.random() * 5) * 10000,
      status: Math.random() > 0.2 ? 'active' : 'cancelled',
    });
  }

  return showtimes;
};

const mockShowtimes = generateMockShowtimes();

const ShowtimeManagement = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    search: '',
    dateRange: null,
    theaterId: null,
    movieId: null,
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

  // Load showtime data
  useEffect(() => {
    const fetchShowtimes = async () => {
      setLoading(true);
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filter the mock data based on filters
        let filteredData = [...mockShowtimes];

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredData = filteredData.filter(
            (showtime) =>
              showtime.movieTitle.toLowerCase().includes(searchLower) ||
              showtime.theaterName.toLowerCase().includes(searchLower) ||
              showtime.room.toLowerCase().includes(searchLower)
          );
        }

        if (filters.dateRange) {
          const [startDate, endDate] = filters.dateRange;
          filteredData = filteredData.filter((showtime) => {
            const showtimeDate = dayjs(showtime.date);
            return (
              showtimeDate.isSameOrAfter(startDate, 'day') &&
              showtimeDate.isSameOrBefore(endDate, 'day')
            );
          });
        }

        if (filters.theaterId) {
          filteredData = filteredData.filter(
            (showtime) => showtime.theaterId === filters.theaterId
          );
        }

        if (filters.movieId) {
          filteredData = filteredData.filter((showtime) => showtime.movieId === filters.movieId);
        }

        if (filters.status) {
          filteredData = filteredData.filter((showtime) => showtime.status === filters.status);
        }

        // Sort by date and startTime
        filteredData.sort((a, b) => {
          const dateCompare = dayjs(a.date).diff(dayjs(b.date));
          if (dateCompare !== 0) return dateCompare;
          return dayjs(a.startTime).diff(dayjs(b.startTime));
        });

        setShowtimes(filteredData);
        setPagination({
          ...pagination,
          total: filteredData.length,
        });
      } catch (error) {
        console.error('Failed to fetch showtimes:', error);
        message.error('Không thể tải dữ liệu lịch chiếu');
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
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

  // Handle theater filter change
  const handleTheaterChange = (value) => {
    setFilters({
      ...filters,
      theaterId: value,
    });
    setPagination({
      ...pagination,
      current: 1,
    });
  };

  // Handle movie filter change
  const handleMovieChange = (value) => {
    setFilters({
      ...filters,
      movieId: value,
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
      theaterId: null,
      movieId: null,
      status: null,
    });
    setPagination({
      ...pagination,
      current: 1,
    });
  };

  // Add new showtime
  const handleAddShowtime = () => {
    setEditingShowtime(null);
    form.resetFields();
    setVisible(true);
  };

  // Edit existing showtime
  const handleEditShowtime = (record) => {
    setEditingShowtime(record);
    form.setFieldsValue({
      movieId: record.movieId,
      theaterId: record.theaterId,
      room: record.room,
      date: dayjs(record.date),
      startTime: record.startTime,
      price: record.price,
      capacity: record.capacity,
    });
    setVisible(true);
  };

  // Delete showtime
  const handleDeleteShowtime = (id) => {
    Modal.confirm({
      title: 'Xóa lịch chiếu',
      content: 'Bạn có chắc chắn muốn xóa lịch chiếu này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        // In a real app, you would call an API here
        setShowtimes(showtimes.filter((item) => item.id !== id));
        message.success('Đã xóa lịch chiếu thành công');
      },
    });
  };

  // Cancel showtime
  const handleCancelShowtime = (id) => {
    Modal.confirm({
      title: 'Hủy lịch chiếu',
      content: 'Bạn có chắc chắn muốn hủy lịch chiếu này?',
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Không',
      onOk() {
        // In a real app, you would call an API here
        setShowtimes(
          showtimes.map((item) => (item.id === id ? { ...item, status: 'cancelled' } : item))
        );
        message.success('Đã hủy lịch chiếu thành công');
      },
    });
  };

  // Submit form
  const handleSubmit = (values) => {
    const { movieId, theaterId, room, date, startTime, price, capacity } = values;

    // Get movie details for duration
    const selectedMovie = movies.find((m) => m.id === movieId);
    const movieDuration = selectedMovie.duration;

    // Calculate end time
    const endTime = dayjs(startTime).add(movieDuration, 'minute');

    // Prepare showtime data
    const showtimeData = {
      movieId,
      movieTitle: selectedMovie.title,
      theaterId,
      theaterName: theaters.find((t) => t.id === theaterId).name,
      room,
      date: date.format('YYYY-MM-DD'),
      startTime,
      endTime,
      duration: movieDuration,
      price,
      capacity,
      availableSeats: capacity, // All seats available for a new showtime
      status: 'active',
    };

    if (editingShowtime) {
      // Update existing showtime
      showtimeData.id = editingShowtime.id;
      showtimeData.availableSeats = editingShowtime.availableSeats;

      setShowtimes(
        showtimes.map((item) => (item.id === editingShowtime.id ? { ...showtimeData } : item))
      );

      message.success('Cập nhật lịch chiếu thành công');
    } else {
      // Add new showtime
      showtimeData.id = `ST${1000 + showtimes.length}`;

      setShowtimes([...showtimes, showtimeData]);
      message.success('Thêm lịch chiếu mới thành công');
    }

    setVisible(false);
  };

  // Get available rooms for selected theater
  const getTheaterRooms = (theaterId) => {
    const theater = theaters.find((t) => t.id === theaterId);
    return theater ? theater.rooms : [];
  };

  // Table columns
  const columns = [
    {
      title: 'Phim',
      dataIndex: 'movieTitle',
      key: 'movieTitle',
      ellipsis: true,
    },
    {
      title: 'Rạp',
      dataIndex: 'theaterName',
      key: 'theaterName',
    },
    {
      title: 'Phòng',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Giờ chiếu',
      key: 'time',
      render: (_, record) => (
        <span>
          {moment(record.startTime).format('HH:mm')} - {moment(record.endTime).format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Giá vé',
      dataIndex: 'price',
      key: 'price',
      render: (price) => formatCurrency(price),
    },
    {
      title: 'Ghế trống',
      key: 'seats',
      render: (_, record) => (
        <span>
          {record.availableSeats}/{record.capacity}
        </span>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <>
          {record.status === 'active' && <Tag color="success">Hoạt động</Tag>}
          {record.status === 'cancelled' && <Tag color="error">Đã hủy</Tag>}
        </>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditShowtime(record)}
              disabled={record.status === 'cancelled'}
            />
          </Tooltip>

          {record.status === 'active' && (
            <Tooltip title="Hủy lịch chiếu">
              <Button
                danger
                icon={<DeleteOutlined />}
                size="small"
                onClick={() => handleCancelShowtime(record.id)}
              />
            </Tooltip>
          )}

          {record.status === 'cancelled' && (
            <Tooltip title="Xóa">
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                size="small"
                onClick={() => handleDeleteShowtime(record.id)}
              />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <SEO
        title="Quản lý lịch chiếu | CineBee Admin"
        description="Quản lý lịch chiếu - CineBee Admin Dashboard"
      />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FaCalendarAlt className="mr-2 text-blue-500" />
          Quản lý lịch chiếu
        </h1>

        <div className="flex space-x-2">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddShowtime}>
            Thêm lịch chiếu
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <Input
              placeholder="Tìm kiếm phim, rạp..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={filters.search}
              onChange={handleSearchChange}
              allowClear
            />
          </div>

          <div className="md:col-span-2">
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
              placeholder="Rạp chiếu"
              value={filters.theaterId}
              onChange={handleTheaterChange}
              allowClear
              className="w-full"
            >
              {theaters.map((theater) => (
                <Option key={theater.id} value={theater.id}>
                  {theater.name}
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <Select
              placeholder="Phim"
              value={filters.movieId}
              onChange={handleMovieChange}
              allowClear
              className="w-full"
            >
              {movies.map((movie) => (
                <Option key={movie.id} value={movie.id}>
                  {movie.title}
                </Option>
              ))}
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
          dataSource={showtimes}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
          loading={loading}
          scroll={{ x: 'max-content' }}
        />
      </div>

      {/* Add/Edit Showtime Modal */}
      <Modal
        title={editingShowtime ? 'Chỉnh sửa lịch chiếu' : 'Thêm lịch chiếu mới'}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="movieId"
            label="Phim"
            rules={[{ required: true, message: 'Vui lòng chọn phim' }]}
          >
            <Select placeholder="Chọn phim">
              {movies.map((movie) => (
                <Option key={movie.id} value={movie.id}>
                  {movie.title} ({movie.duration} phút)
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="theaterId"
            label="Rạp chiếu"
            rules={[{ required: true, message: 'Vui lòng chọn rạp chiếu' }]}
          >
            <Select
              placeholder="Chọn rạp chiếu"
              onChange={(value) => {
                // Reset room when theater changes
                form.setFieldsValue({ room: undefined });
              }}
            >
              {theaters.map((theater) => (
                <Option key={theater.id} value={theater.id}>
                  {theater.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="room"
            label="Phòng chiếu"
            rules={[{ required: true, message: 'Vui lòng chọn phòng chiếu' }]}
          >
            <Select placeholder="Chọn phòng chiếu" disabled={!form.getFieldValue('theaterId')}>
              {form.getFieldValue('theaterId') &&
                getTheaterRooms(form.getFieldValue('theaterId')).map((room) => (
                  <Option key={room} value={room}>
                    {room}
                  </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="date"
            label="Ngày chiếu"
            rules={[{ required: true, message: 'Vui lòng chọn ngày chiếu' }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              className="w-full"
              disabledDate={(current) => {
                // Can't select days before today
                return current && current < moment().startOf('day');
              }}
            />
          </Form.Item>

          <Form.Item
            name="startTime"
            label="Giờ bắt đầu"
            rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu' }]}
          >
            <TimePicker format="HH:mm" className="w-full" minuteStep={15} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá vé"
            rules={[{ required: true, message: 'Vui lòng nhập giá vé' }]}
          >
            <Input type="number" min={0} addonAfter="VND" placeholder="Ví dụ: 90000" />
          </Form.Item>

          <Form.Item
            name="capacity"
            label="Sức chứa"
            rules={[{ required: true, message: 'Vui lòng nhập sức chứa' }]}
          >
            <Input type="number" min={1} placeholder="Số ghế tối đa" />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setVisible(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                {editingShowtime ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ShowtimeManagement;
