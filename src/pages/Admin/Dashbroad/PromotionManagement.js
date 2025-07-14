import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Button,
  Space,
  Input,
  DatePicker,
  Modal,
  Form,
  Select,
  InputNumber,
  Switch,
  Upload,
  message,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { FaPercent, FaTicketAlt, FaTag, FaCalendarAlt, FaClock, FaUsers } from 'react-icons/fa';
import moment from 'moment';
import SEO from '../../../components/SEO/SEO';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

// Mock data for promotions
const generateMockPromotions = () => {
  const promotionTypes = ['percentage', 'fixed', 'freeticket'];
  const targetTypes = ['all', 'newuser', 'movie', 'theater'];
  const movieIds = [1, 2, 3, 4, 5];
  const theaterIds = [1, 2, 3, 4];
  const currentDate = new Date();

  return Array(25)
    .fill()
    .map((_, index) => {
      const id = `PROMO${1000 + index}`;
      const type = promotionTypes[Math.floor(Math.random() * promotionTypes.length)];
      const value =
        type === 'percentage'
          ? 5 + Math.floor(Math.random() * 11) * 5 // 5%, 10%, 15%, ... 50%
          : type === 'fixed'
          ? Math.floor(Math.random() * 10 + 1) * 10000 // 10k, 20k, ... 100k
          : 1; // 1 free ticket

      const target = targetTypes[Math.floor(Math.random() * targetTypes.length)];
      const minPurchase =
        type === 'freeticket' || type === 'fixed'
          ? (value + 10000) * (1 + Math.floor(Math.random() * 3))
          : 0;

      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 10));

      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7 + Math.floor(Math.random() * 30));

      const status =
        new Date() > endDate ? 'expired' : new Date() < startDate ? 'upcoming' : 'active';

      const usageLimit = Math.floor(Math.random() * 10) * 100 + 100; // 100, 200, ... 1000
      const usageCount =
        status === 'active'
          ? Math.floor(Math.random() * usageLimit)
          : status === 'expired'
          ? usageLimit
          : 0;

      return {
        id,
        code: `${
          ['SUMMER', 'NEWYEAR', 'WELCOME', 'SPECIAL', 'MOVIE'][Math.floor(Math.random() * 5)]
        }${1000 + Math.floor(Math.random() * 9000)}`,
        name: [
          'Khuyến mãi mùa hè',
          'Chào mừng khách hàng mới',
          'Ưu đãi cuối tuần',
          'Giảm giá đặc biệt',
          'Khuyến mãi phim mới',
          'Ưu đãi thành viên',
          'Mừng khai trương',
        ][Math.floor(Math.random() * 7)],
        description:
          'Mô tả chi tiết về chương trình khuyến mãi này. Áp dụng cho các khách hàng đủ điều kiện.',
        type,
        value,
        minPurchase,
        target,
        targetId:
          target === 'movie'
            ? movieIds[Math.floor(Math.random() * movieIds.length)]
            : target === 'theater'
            ? theaterIds[Math.floor(Math.random() * theaterIds.length)]
            : null,
        startDate,
        endDate,
        status,
        usageLimit,
        usageCount,
        isVisible: Math.random() > 0.2,
        requiresAuth: Math.random() > 0.3,
      };
    });
};

const mockPromotions = generateMockPromotions();

// Mock data references
const mockMovies = [
  { id: 1, title: 'Robot Revolution' },
  { id: 2, title: 'Pandora Adventure' },
  { id: 3, title: 'Mada' },
  { id: 4, title: 'Survival Race' },
  { id: 5, title: 'The Last Hope' },
];

const mockTheaters = [
  { id: 1, name: 'CGV Vincom Center' },
  { id: 2, name: 'Beta Cineplex Mỹ Đình' },
  { id: 3, name: 'Lotte Cinema Hà Nội' },
  { id: 4, name: 'Galaxy Cinema Nguyễn Du' },
];

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    search: '',
    status: null,
    dateRange: null,
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

  // Load promotion data
  useEffect(() => {
    const fetchPromotions = async () => {
      setLoading(true);
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filter the mock data based on filters
        let filteredData = [...mockPromotions];

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredData = filteredData.filter(
            (promotion) =>
              promotion.name.toLowerCase().includes(searchLower) ||
              promotion.code.toLowerCase().includes(searchLower) ||
              promotion.description.toLowerCase().includes(searchLower)
          );
        }

        if (filters.status) {
          filteredData = filteredData.filter((promotion) => promotion.status === filters.status);
        }

        if (filters.dateRange) {
          const [startDate, endDate] = filters.dateRange;
          filteredData = filteredData.filter((promotion) => {
            const promoStartDate = new Date(promotion.startDate);
            const promoEndDate = new Date(promotion.endDate);

            return (
              (promoStartDate >= startDate && promoStartDate <= endDate) ||
              (promoEndDate >= startDate && promoEndDate <= endDate) ||
              (promoStartDate <= startDate && promoEndDate >= endDate)
            );
          });
        }

        // Sort by start date (newest first)
        filteredData.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

        setPromotions(filteredData);
        setPagination({
          ...pagination,
          total: filteredData.length,
        });
      } catch (error) {
        console.error('Failed to fetch promotions:', error);
        message.error('Không thể tải dữ liệu khuyến mãi');
      } finally {
        setLoading(false);
      }
    };

    fetchPromotions();
  }, [filters]);

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

  // Reset all filters
  const handleClearFilters = () => {
    setFilters({
      search: '',
      status: null,
      dateRange: null,
    });
    setPagination({
      ...pagination,
      current: 1,
    });
  };

  // Format promotion value
  const formatPromotionValue = (promotion) => {
    if (promotion.type === 'percentage') {
      return `${promotion.value}%`;
    } else if (promotion.type === 'fixed') {
      return formatCurrency(promotion.value);
    } else if (promotion.type === 'freeticket') {
      return `${promotion.value} vé miễn phí`;
    }
    return promotion.value;
  };

  // Format promotion target
  const formatPromotionTarget = (promotion) => {
    if (promotion.target === 'all') {
      return 'Tất cả';
    } else if (promotion.target === 'newuser') {
      return 'Khách hàng mới';
    } else if (promotion.target === 'movie') {
      const movie = mockMovies.find((m) => m.id === promotion.targetId);
      return movie ? `Phim: ${movie.title}` : 'Phim không xác định';
    } else if (promotion.target === 'theater') {
      const theater = mockTheaters.find((t) => t.id === promotion.targetId);
      return theater ? `Rạp: ${theater.name}` : 'Rạp không xác định';
    }
    return 'Không xác định';
  };

  // Add new promotion
  const handleAddPromotion = () => {
    setEditingPromotion(null);
    form.resetFields();
    form.setFieldsValue({
      type: 'percentage',
      target: 'all',
      isVisible: true,
      requiresAuth: true,
      startDate: moment(),
      endDate: moment().add(30, 'days'),
    });
    setVisible(true);
  };

  // Edit existing promotion
  const handleEditPromotion = (record) => {
    setEditingPromotion(record);
    form.setFieldsValue({
      name: record.name,
      code: record.code,
      description: record.description,
      type: record.type,
      value: record.value,
      minPurchase: record.minPurchase,
      target: record.target,
      targetId: record.targetId,
      startDate: moment(record.startDate),
      endDate: moment(record.endDate),
      usageLimit: record.usageLimit,
      isVisible: record.isVisible,
      requiresAuth: record.requiresAuth,
    });
    setVisible(true);
  };

  // Delete promotion
  const handleDeletePromotion = (id) => {
    Modal.confirm({
      title: 'Xóa khuyến mãi',
      content: 'Bạn có chắc chắn muốn xóa khuyến mãi này? Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        // In a real app, you would call an API here
        setPromotions(promotions.filter((item) => item.id !== id));
        message.success('Đã xóa khuyến mãi thành công');
      },
    });
  };

  // View promotion details
  const showPromotionDetails = (promotion) => {
    Modal.info({
      title: `Chi tiết khuyến mãi: ${promotion.name}`,
      content: (
        <div className="p-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-500 text-sm">Mã khuyến mãi:</p>
              <p className="font-bold text-xl">{promotion.code}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Trạng thái:</p>
              <div>
                {promotion.status === 'active' && <Tag color="success">Đang hoạt động</Tag>}
                {promotion.status === 'upcoming' && <Tag color="processing">Sắp diễn ra</Tag>}
                {promotion.status === 'expired' && <Tag color="default">Đã hết hạn</Tag>}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-500 text-sm">Mô tả:</p>
            <p>{promotion.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-500 text-sm">Loại khuyến mãi:</p>
              <p className="font-medium">
                {promotion.type === 'percentage' && 'Giảm theo phần trăm'}
                {promotion.type === 'fixed' && 'Giảm số tiền cố định'}
                {promotion.type === 'freeticket' && 'Tặng vé miễn phí'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Giá trị:</p>
              <p className="font-medium text-red-600">{formatPromotionValue(promotion)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-500 text-sm">Áp dụng cho:</p>
              <p className="font-medium">{formatPromotionTarget(promotion)}</p>
            </div>
            {promotion.minPurchase > 0 && (
              <div>
                <p className="text-gray-500 text-sm">Giá trị đơn hàng tối thiểu:</p>
                <p className="font-medium">{formatCurrency(promotion.minPurchase)}</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-500 text-sm">Thời gian bắt đầu:</p>
              <p className="font-medium">
                {new Date(promotion.startDate).toLocaleDateString('vi-VN')}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Thời gian kết thúc:</p>
              <p className="font-medium">
                {new Date(promotion.endDate).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-500 text-sm">Giới hạn sử dụng:</p>
              <p className="font-medium">
                {promotion.usageCount} / {promotion.usageLimit}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Hiển thị công khai:</p>
              <p>{promotion.isVisible ? 'Có' : 'Không'}</p>
            </div>
          </div>
        </div>
      ),
      width: 700,
    });
  };

  // Submit promotion form
  const handleSubmit = (values) => {
    const {
      name,
      code,
      description,
      type,
      value,
      minPurchase,
      target,
      targetId,
      startDate,
      endDate,
      usageLimit,
      isVisible,
      requiresAuth,
    } = values;

    // Prepare promotion data
    const promotionData = {
      name,
      code: code.toUpperCase(),
      description,
      type,
      value,
      minPurchase: minPurchase || 0,
      target,
      targetId: target === 'all' || target === 'newuser' ? null : targetId,
      startDate: startDate.toDate(),
      endDate: endDate.toDate(),
      usageLimit,
      isVisible,
      requiresAuth,
    };

    // Determine status based on dates
    const now = new Date();
    if (now < promotionData.startDate) {
      promotionData.status = 'upcoming';
    } else if (now > promotionData.endDate) {
      promotionData.status = 'expired';
    } else {
      promotionData.status = 'active';
    }

    if (editingPromotion) {
      // Update existing promotion
      promotionData.id = editingPromotion.id;
      promotionData.usageCount = editingPromotion.usageCount;

      setPromotions(
        promotions.map((item) => (item.id === editingPromotion.id ? { ...promotionData } : item))
      );

      message.success('Cập nhật khuyến mãi thành công');
    } else {
      // Add new promotion
      promotionData.id = `PROMO${1000 + promotions.length}`;
      promotionData.usageCount = 0;

      setPromotions([...promotions, promotionData]);
      message.success('Thêm khuyến mãi mới thành công');
    }

    setVisible(false);
  };

  // Table columns
  const columns = [
    {
      title: 'Tên khuyến mãi',
      key: 'name',
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.name}</div>
          <div className="text-xs text-gray-500">Mã: {record.code}</div>
        </div>
      ),
    },
    {
      title: 'Giá trị',
      key: 'value',
      render: (_, record) => (
        <div className="font-medium text-red-600">{formatPromotionValue(record)}</div>
      ),
    },
    {
      title: 'Thời gian áp dụng',
      key: 'time',
      render: (_, record) => (
        <div>
          <div>
            <FaCalendarAlt className="inline mr-1 text-gray-500" size={12} />
            {new Date(record.startDate).toLocaleDateString('vi-VN')}
          </div>
          <div>
            <FaClock className="inline mr-1 text-gray-500" size={12} />
            {new Date(record.endDate).toLocaleDateString('vi-VN')}
          </div>
        </div>
      ),
    },
    {
      title: 'Áp dụng cho',
      key: 'target',
      render: (_, record) => formatPromotionTarget(record),
    },
    {
      title: 'Đã sử dụng',
      key: 'usage',
      render: (_, record) => (
        <div>
          <span className="font-medium">{record.usageCount}</span>
          <span className="text-gray-500">/{record.usageLimit}</span>
        </div>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <>
          {record.status === 'active' && <Tag color="success">Đang hoạt động</Tag>}
          {record.status === 'upcoming' && <Tag color="processing">Sắp diễn ra</Tag>}
          {record.status === 'expired' && <Tag color="default">Đã hết hạn</Tag>}
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
              onClick={() => showPromotionDetails(record)}
            />
          </Tooltip>

          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditPromotion(record)}
            />
          </Tooltip>

          <Tooltip title="Xóa">
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDeletePromotion(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <SEO
        title="Quản lý khuyến mãi | CineBee Admin"
        description="Quản lý khuyến mãi - CineBee Admin Dashboard"
      />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FaPercent className="mr-2 text-blue-500" />
          Quản lý khuyến mãi
        </h1>

        <div className="flex space-x-2">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPromotion}>
            Thêm khuyến mãi
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Input
              placeholder="Tìm kiếm theo tên, mã..."
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
              <Option value="active">Đang hoạt động</Option>
              <Option value="upcoming">Sắp diễn ra</Option>
              <Option value="expired">Đã hết hạn</Option>
            </Select>
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

          <div className="flex items-center">
            <Button onClick={handleClearFilters}>Xóa bộ lọc</Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          dataSource={promotions}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
          loading={loading}
          scroll={{ x: 'max-content' }}
        />
      </div>

      {/* Add/Edit Promotion Modal */}
      <Modal
        title={editingPromotion ? 'Chỉnh sửa khuyến mãi' : 'Thêm khuyến mãi mới'}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={700}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Tên khuyến mãi"
              rules={[{ required: true, message: 'Vui lòng nhập tên khuyến mãi' }]}
            >
              <Input placeholder="Nhập tên khuyến mãi" />
            </Form.Item>

            <Form.Item
              name="code"
              label="Mã khuyến mãi"
              rules={[
                { required: true, message: 'Vui lòng nhập mã khuyến mãi' },
                { pattern: /^[A-Za-z0-9]+$/, message: 'Mã chỉ gồm chữ cái và số' },
              ]}
            >
              <Input placeholder="Ví dụ: SUMMER2023" style={{ textTransform: 'uppercase' }} />
            </Form.Item>
          </div>

          <Form.Item name="description" label="Mô tả">
            <TextArea rows={3} placeholder="Nhập mô tả chi tiết về khuyến mãi" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="type"
              label="Loại khuyến mãi"
              rules={[{ required: true, message: 'Vui lòng chọn loại khuyến mãi' }]}
            >
              <Select
                placeholder="Chọn loại khuyến mãi"
                onChange={(value) => {
                  // Reset value when type changes
                  form.setFieldsValue({ value: undefined });
                }}
              >
                <Option value="percentage">Giảm theo phần trăm</Option>
                <Option value="fixed">Giảm số tiền cố định</Option>
                <Option value="freeticket">Tặng vé miễn phí</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="value"
              label="Giá trị"
              rules={[{ required: true, message: 'Vui lòng nhập giá trị khuyến mãi' }]}
            >
              <InputNumber
                className="w-full"
                placeholder={
                  form.getFieldValue('type') === 'percentage'
                    ? 'Ví dụ: 15 (%)'
                    : form.getFieldValue('type') === 'fixed'
                    ? 'Ví dụ: 50000 (VNĐ)'
                    : 'Số vé miễn phí'
                }
                min={0}
                max={form.getFieldValue('type') === 'percentage' ? 100 : undefined}
                formatter={
                  form.getFieldValue('type') === 'percentage'
                    ? (value) => `${value}%`
                    : form.getFieldValue('type') === 'fixed'
                    ? (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    : undefined
                }
                parser={
                  form.getFieldValue('type') === 'percentage'
                    ? (value) => value.replace('%', '')
                    : form.getFieldValue('type') === 'fixed'
                    ? (value) => value.replace(/\$\s?|(,*)/g, '')
                    : undefined
                }
              />
            </Form.Item>

            <Form.Item
              name="minPurchase"
              label="Giá trị đơn hàng tối thiểu"
              tooltip="Đơn hàng phải đạt giá trị tối thiểu này để áp dụng khuyến mãi"
            >
              <InputNumber
                className="w-full"
                placeholder="Nhập giá trị tối thiểu"
                min={0}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Form.Item
              name="target"
              label="Áp dụng cho"
              rules={[{ required: true, message: 'Vui lòng chọn đối tượng áp dụng' }]}
            >
              <Select
                placeholder="Chọn đối tượng áp dụng"
                onChange={(value) => {
                  // Reset targetId when target changes
                  form.setFieldsValue({ targetId: undefined });
                }}
              >
                <Option value="all">Tất cả</Option>
                <Option value="newuser">Khách hàng mới</Option>
                <Option value="movie">Phim cụ thể</Option>
                <Option value="theater">Rạp cụ thể</Option>
              </Select>
            </Form.Item>

            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.target !== currentValues.target
              }
            >
              {({ getFieldValue }) => {
                const target = getFieldValue('target');

                if (target === 'movie') {
                  return (
                    <Form.Item
                      name="targetId"
                      label="Chọn phim"
                      rules={[{ required: true, message: 'Vui lòng chọn phim' }]}
                    >
                      <Select placeholder="Chọn phim áp dụng">
                        {mockMovies.map((movie) => (
                          <Option key={movie.id} value={movie.id}>
                            {movie.title}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  );
                }

                if (target === 'theater') {
                  return (
                    <Form.Item
                      name="targetId"
                      label="Chọn rạp"
                      rules={[{ required: true, message: 'Vui lòng chọn rạp' }]}
                    >
                      <Select placeholder="Chọn rạp áp dụng">
                        {mockTheaters.map((theater) => (
                          <Option key={theater.id} value={theater.id}>
                            {theater.name}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  );
                }

                return null;
              }}
            </Form.Item>

            <Form.Item
              name="usageLimit"
              label="Giới hạn sử dụng"
              rules={[{ required: true, message: 'Vui lòng nhập giới hạn sử dụng' }]}
              initialValue={1000}
            >
              <InputNumber className="w-full" placeholder="Số lần được sử dụng" min={1} />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="startDate"
              label="Ngày bắt đầu"
              rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
            >
              <DatePicker
                className="w-full"
                format="DD/MM/YYYY"
                disabledDate={(current) => {
                  const endDate = form.getFieldValue('endDate');
                  if (endDate) {
                    return current && current > endDate;
                  }
                  return false;
                }}
              />
            </Form.Item>

            <Form.Item
              name="endDate"
              label="Ngày kết thúc"
              rules={[
                { required: true, message: 'Vui lòng chọn ngày kết thúc' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      !getFieldValue('startDate') ||
                      value.isAfter(getFieldValue('startDate'))
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu'));
                  },
                }),
              ]}
            >
              <DatePicker
                className="w-full"
                format="DD/MM/YYYY"
                disabledDate={(current) => {
                  const startDate = form.getFieldValue('startDate');
                  if (startDate) {
                    return current && current < startDate;
                  }
                  return false;
                }}
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="isVisible"
              label="Hiển thị công khai"
              valuePropName="checked"
              tooltip="Hiển thị khuyến mãi trong danh sách cho người dùng"
            >
              <Switch checkedChildren="Có" unCheckedChildren="Không" />
            </Form.Item>

            <Form.Item
              name="requiresAuth"
              label="Yêu cầu đăng nhập"
              valuePropName="checked"
              tooltip="Người dùng phải đăng nhập để sử dụng mã này"
            >
              <Switch checkedChildren="Có" unCheckedChildren="Không" />
            </Form.Item>
          </div>

          <Form.Item className="mb-0">
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setVisible(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit" icon={<FaTag className="mr-1" size={14} />}>
                {editingPromotion ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PromotionManagement;
