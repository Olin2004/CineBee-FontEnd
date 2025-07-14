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
  Rate,
  Avatar,
  message,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import SEO from '../../../components/SEO/SEO';
import { FaCommentDots } from 'react-icons/fa';
import { Form } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;

// Mock data for reviews
const generateMockReviews = () => {
  const reviewStatus = ['approved', 'pending', 'rejected'];
  const reviewContents = [
    'Phim hay, diễn viên diễn xuất tốt. Cốt truyện hấp dẫn và cuốn hút từ đầu đến cuối.',
    'Phim không tệ nhưng chưa đạt kỳ vọng. Nội dung hơi lan man và thiếu điểm nhấn.',
    'Tuyệt vời! Đây là một trong những bộ phim hay nhất mà tôi từng xem. Sẽ xem lại lần nữa.',
    'Phim khá nhàm chán và kéo dài. Tôi đã buồn ngủ vào giữa phim.',
    'Phim hay, nhưng tôi nghĩ phần kết chưa trọn vẹn. Có lẽ sẽ có phần tiếp theo.',
    'Kỹ xảo và hình ảnh quá đẹp. Âm thanh sống động. Tuy nhiên cốt truyện hơi đơn giản.',
    'Phim đáng xem với bạn bè hoặc gia đình. Không quá xuất sắc nhưng rất giải trí.',
    'Thất vọng với phim này. Trailer hay hơn cả bộ phim. Lãng phí thời gian và tiền bạc.',
    'Diễn viên diễn xuất tốt nhưng kịch bản chưa chặt chẽ. Còn nhiều tình tiết thiếu logic.',
    'Một bộ phim đáng xem với những ai yêu thích thể loại này. Tôi thực sự thích nó!',
  ];

  const usersFirstNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng'];
  const usersLastNames = ['An', 'Bình', 'Cường', 'Dung', 'Hà', 'Hùng', 'Linh', 'Mai', 'Nam'];

  const movies = [
    { id: 1, title: 'Robot Revolution' },
    { id: 2, title: 'Pandora Adventure' },
    { id: 3, title: 'Mada' },
    { id: 4, title: 'Survival Race' },
    { id: 5, title: 'The Last Hope' },
  ];

  return Array(100)
    .fill()
    .map((_, index) => {
      const userId = `U${10000 + Math.floor(Math.random() * 5000)}`;
      const userName = `${usersFirstNames[Math.floor(Math.random() * usersFirstNames.length)]} ${
        usersLastNames[Math.floor(Math.random() * usersLastNames.length)]
      }`;
      const movie = movies[Math.floor(Math.random() * movies.length)];
      const rating = Math.floor(Math.random() * 5) + 1;
      const status = reviewStatus[Math.floor(Math.random() * (index < 80 ? 1 : 3))]; // Make most approved
      const dateCreated = new Date();
      dateCreated.setDate(dateCreated.getDate() - Math.floor(Math.random() * 60));

      const content = reviewContents[Math.floor(Math.random() * reviewContents.length)];

      // Generate replies for some reviews
      const hasReply = Math.random() > 0.7;
      const reply = hasReply
        ? {
            content:
              'Cảm ơn bạn đã đánh giá. Chúng tôi rất vui khi bạn đã có trải nghiệm tốt tại rạp. Hẹn gặp lại bạn trong những bộ phim tiếp theo!',
            date: new Date(
              dateCreated.getTime() + 1000 * 60 * 60 * 24 * Math.floor(Math.random() * 3 + 1)
            ),
          }
        : null;

      return {
        id: `R${10000 + index}`,
        userId,
        userName,
        movieId: movie.id,
        movieTitle: movie.title,
        rating,
        content,
        dateCreated,
        status,
        reply,
        reported: Math.random() > 0.9, // Some reviews are reported
      };
    });
};

const mockReviews = generateMockReviews();

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyVisible, setReplyVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    status: null,
    rating: null,
    dateRange: null,
    reported: false,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Load review data
  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filter the mock data based on filters
        let filteredData = [...mockReviews];

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredData = filteredData.filter(
            (review) =>
              review.userName.toLowerCase().includes(searchLower) ||
              review.movieTitle.toLowerCase().includes(searchLower) ||
              review.content.toLowerCase().includes(searchLower)
          );
        }

        if (filters.status) {
          filteredData = filteredData.filter((review) => review.status === filters.status);
        }

        if (filters.rating) {
          filteredData = filteredData.filter((review) => review.rating === filters.rating);
        }

        if (filters.dateRange) {
          const [startDate, endDate] = filters.dateRange;
          filteredData = filteredData.filter((review) => {
            const reviewDate = new Date(review.dateCreated);
            return reviewDate >= startDate && reviewDate <= endDate;
          });
        }

        if (filters.reported) {
          filteredData = filteredData.filter((review) => review.reported);
        }

        // Sort by date (newest first)
        filteredData.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));

        setReviews(filteredData);
        setPagination({
          ...pagination,
          total: filteredData.length,
        });
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        message.error('Không thể tải dữ liệu đánh giá');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [filters, pagination.current, pagination.pageSize]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Handle rating filter change
  const handleRatingChange = (value) => {
    setFilters({
      ...filters,
      rating: value,
    });
    setPagination({
      ...pagination,
      current: 1,
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

  // Handle reported filter change
  const handleReportedChange = (e) => {
    setFilters({
      ...filters,
      reported: e.target.checked,
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
      status: null,
      rating: null,
      dateRange: null,
      reported: false,
    });
    setPagination({
      ...pagination,
      current: 1,
    });
  };

  // Approve review
  const handleApproveReview = (id) => {
    confirm({
      title: 'Duyệt đánh giá',
      content: 'Bạn có chắc chắn muốn duyệt đánh giá này?',
      icon: <CheckOutlined style={{ color: '#52c41a' }} />,
      okText: 'Duyệt',
      okButtonProps: {
        type: 'primary',
        style: { backgroundColor: '#52c41a', borderColor: '#52c41a' },
      },
      cancelText: 'Hủy',
      onOk() {
        // In a real app, you would call an API here
        setReviews(
          reviews.map((review) => (review.id === id ? { ...review, status: 'approved' } : review))
        );
        message.success('Đã duyệt đánh giá thành công');
      },
    });
  };

  // Reject review
  const handleRejectReview = (id) => {
    confirm({
      title: 'Từ chối đánh giá',
      content: 'Bạn có chắc chắn muốn từ chối đánh giá này?',
      icon: <CloseOutlined style={{ color: '#f5222d' }} />,
      okText: 'Từ chối',
      okButtonProps: { danger: true },
      cancelText: 'Hủy',
      onOk() {
        // In a real app, you would call an API here
        setReviews(
          reviews.map((review) => (review.id === id ? { ...review, status: 'rejected' } : review))
        );
        message.success('Đã từ chối đánh giá thành công');
      },
    });
  };

  // Delete review
  const handleDeleteReview = (id) => {
    confirm({
      title: 'Xóa đánh giá',
      content: 'Bạn có chắc chắn muốn xóa đánh giá này? Hành động này không thể hoàn tác.',
      icon: <ExclamationCircleOutlined />,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        // In a real app, you would call an API here
        setReviews(reviews.filter((review) => review.id !== id));
        message.success('Đã xóa đánh giá thành công');
      },
    });
  };

  // Open reply modal
  const handleReply = (review) => {
    setCurrentReview(review);
    setReplyContent(review.reply ? review.reply.content : '');
    setReplyVisible(true);
  };

  // Submit reply
  const handleSubmitReply = () => {
    if (!currentReview) return;

    const updatedReview = {
      ...currentReview,
      reply: {
        content: replyContent,
        date: new Date(),
      },
    };

    // In a real app, you would call an API here
    setReviews(reviews.map((review) => (review.id === currentReview.id ? updatedReview : review)));

    message.success('Đã trả lời đánh giá thành công');
    setReplyVisible(false);
  };

  // View review details
  const showReviewDetails = (review) => {
    Modal.info({
      title: `Chi tiết đánh giá`,
      content: (
        <div className="p-2">
          <div className="flex items-start mb-4">
            <Avatar className="mt-1 mr-3" style={{ backgroundColor: '#1890ff' }}>
              {review.userName[0]}
            </Avatar>
            <div>
              <h3 className="font-medium">{review.userName}</h3>
              <p className="text-gray-500 text-xs">
                {new Date(review.dateCreated).toLocaleDateString('vi-VN')}
              </p>
              <div className="my-1">
                <Rate disabled defaultValue={review.rating} />
              </div>
              <p className="mt-2">{review.content}</p>
            </div>
          </div>

          {review.reply && (
            <div className="ml-8 mt-4 border-l-2 border-blue-500 pl-4">
              <h4 className="font-medium">Phản hồi từ quản trị viên:</h4>
              <p className="text-gray-500 text-xs">
                {new Date(review.reply.date).toLocaleDateString('vi-VN')}
              </p>
              <p className="mt-1">{review.reply.content}</p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-500">Phim:</span>
                <p className="font-medium">{review.movieTitle}</p>
              </div>
              <div>
                <span className="text-gray-500">ID người dùng:</span>
                <p className="font-medium">{review.userId}</p>
              </div>
            </div>
          </div>
        </div>
      ),
      width: 600,
    });
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

  // Table columns
  const columns = [
    {
      title: 'Người dùng',
      key: 'user',
      render: (_, record) => (
        <div className="flex items-center">
          <Avatar style={{ backgroundColor: '#1890ff' }} size="small">
            {getInitials(record.userName)}
          </Avatar>
          <span className="ml-2">{record.userName}</span>
        </div>
      ),
    },
    {
      title: 'Phim',
      dataIndex: 'movieTitle',
      key: 'movieTitle',
      ellipsis: true,
    },
    {
      title: 'Đánh giá',
      key: 'rating',
      render: (_, record) => <Rate disabled defaultValue={record.rating} />,
    },
    {
      title: 'Nội dung',
      key: 'content',
      render: (_, record) => <div className="max-w-xs truncate">{record.content}</div>,
    },
    {
      title: 'Ngày tạo',
      key: 'date',
      render: (_, record) => new Date(record.dateCreated).toLocaleDateString('vi-VN'),
      sorter: (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <>
          {record.status === 'approved' && <Tag color="success">Đã duyệt</Tag>}
          {record.status === 'pending' && <Tag color="warning">Chờ duyệt</Tag>}
          {record.status === 'rejected' && <Tag color="error">Đã từ chối</Tag>}
          {record.reported && <Tag color="volcano">Bị báo cáo</Tag>}
        </>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button icon={<EyeOutlined />} size="small" onClick={() => showReviewDetails(record)} />
          </Tooltip>

          <Tooltip title="Trả lời">
            <Button
              icon={<FaCommentDots size={12} />}
              size="small"
              onClick={() => handleReply(record)}
            />
          </Tooltip>

          {record.status === 'pending' && (
            <>
              <Tooltip title="Duyệt">
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  size="small"
                  onClick={() => handleApproveReview(record.id)}
                  style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                />
              </Tooltip>

              <Tooltip title="Từ chối">
                <Button
                  danger
                  icon={<CloseOutlined />}
                  size="small"
                  onClick={() => handleRejectReview(record.id)}
                />
              </Tooltip>
            </>
          )}

          <Tooltip title="Xóa">
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDeleteReview(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <SEO
        title="Quản lý đánh giá | CineBee Admin"
        description="Quản lý đánh giá - CineBee Admin Dashboard"
      />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FaCommentDots className="mr-2 text-blue-500" />
          Quản lý đánh giá
        </h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Tìm kiếm theo tên, nội dung, phim..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={filters.search}
              onChange={handleSearchChange}
              allowClear
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
              <Option value="approved">Đã duyệt</Option>
              <Option value="pending">Chờ duyệt</Option>
              <Option value="rejected">Đã từ chối</Option>
            </Select>
          </div>

          <div>
            <Select
              placeholder="Đánh giá sao"
              value={filters.rating}
              onChange={handleRatingChange}
              allowClear
              className="w-full"
            >
              <Option value={5}>5 sao</Option>
              <Option value={4}>4 sao</Option>
              <Option value={3}>3 sao</Option>
              <Option value={2}>2 sao</Option>
              <Option value={1}>1 sao</Option>
            </Select>
          </div>

          <div className="flex items-center">
            <Button onClick={handleClearFilters}>Xóa bộ lọc</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <RangePicker
              placeholder={['Từ ngày', 'Đến ngày']}
              format="DD/MM/YYYY"
              value={filters.dateRange}
              onChange={handleDateRangeChange}
              className="w-full"
            />
          </div>

          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 h-5 w-5"
                checked={filters.reported}
                onChange={(e) => handleReportedChange(e)}
              />
              <span className="ml-2">Chỉ hiển thị đánh giá bị báo cáo</span>
            </label>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          dataSource={reviews}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
          loading={loading}
          scroll={{ x: 'max-content' }}
        />
      </div>

      {/* Reply Modal */}
      <Modal
        title="Trả lời đánh giá"
        visible={replyVisible}
        onCancel={() => setReplyVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setReplyVisible(false)}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitReply}>
            Gửi phản hồi
          </Button>,
        ]}
      >
        {currentReview && (
          <>
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start">
                <Avatar size="small" className="mt-1 mr-2">
                  {getInitials(currentReview.userName)}
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{currentReview.userName}</span>
                    <Rate disabled defaultValue={currentReview.rating} size="small" />
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(currentReview.dateCreated).toLocaleDateString('vi-VN')}
                  </p>
                  <p className="mt-2">{currentReview.content}</p>
                </div>
              </div>
            </div>

            <Form layout="vertical">
              <Form.Item
                label="Nội dung phản hồi"
                rules={[{ required: true, message: 'Vui lòng nhập nội dung phản hồi' }]}
              >
                <TextArea
                  rows={4}
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Nhập phản hồi của bạn ở đây..."
                />
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ReviewManagement;
