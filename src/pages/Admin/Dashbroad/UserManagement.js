import React, { useState, useEffect } from 'react';
import {
  Table,
  Tag,
  Button,
  Space,
  Input,
  Modal,
  Form,
  Select,
  Switch,
  Avatar,
  message,
  Tooltip,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { FaUsers, FaUserEdit, FaUserPlus, FaUserShield, FaUserSlash } from 'react-icons/fa';
import SEO from '../../../components/SEO/SEO';

const { Option } = Select;

// Mock data for users
const generateMockUsers = () => {
  const userRoles = ['USER', 'STAFF', 'ADMIN'];
  const userStatus = ['active', 'inactive', 'blocked'];
  const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ'];
  const middleNames = ['Văn', 'Thị', 'Đức', 'Minh', 'Quang', 'Thanh', 'Hải', 'Tuấn', 'Thu', 'Ngọc'];
  const firstNames = [
    'An',
    'Bình',
    'Cường',
    'Dung',
    'Hà',
    'Hùng',
    'Linh',
    'Mai',
    'Nam',
    'Phương',
    'Quân',
    'Thảo',
    'Tùng',
    'Việt',
    'Xuân',
  ];

  return Array(50)
    .fill()
    .map((_, index) => {
      const id = 10000 + index;
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const fullName = `${lastName} ${middleName} ${firstName}`;
      const email = `${firstName.toLowerCase()}${
        middleName.toLowerCase()[0]
      }${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`;
      const role = userRoles[Math.floor(Math.random() * (index < 5 ? 3 : 2))]; // Ensure some admins
      const created = new Date(
        2023,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      );

      return {
        id: `U${id}`,
        name: fullName,
        email,
        phone: `0${9}${Math.floor(Math.random() * 10000000)
          .toString()
          .padStart(7, '0')}`,
        role,
        lastLogin:
          role === 'blocked'
            ? null
            : new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        created,
        bookings: Math.floor(Math.random() * 20),
        status:
          userRoles.indexOf(role) === 2
            ? 'active'
            : userStatus[Math.floor(Math.random() * userStatus.length)],
      };
    });
};

const mockUsers = generateMockUsers();

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [filters, setFilters] = useState({
    search: '',
    role: null,
    status: null,
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Load user data
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filter the mock data based on filters
        let filteredData = [...mockUsers];

        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredData = filteredData.filter(
            (user) =>
              user.name.toLowerCase().includes(searchLower) ||
              user.email.toLowerCase().includes(searchLower) ||
              user.phone.includes(filters.search)
          );
        }

        if (filters.role) {
          filteredData = filteredData.filter((user) => user.role === filters.role);
        }

        if (filters.status) {
          filteredData = filteredData.filter((user) => user.status === filters.status);
        }

        setUsers(filteredData);
        setPagination({
          ...pagination,
          total: filteredData.length,
        });
      } catch (error) {
        console.error('Failed to fetch users:', error);
        message.error('Không thể tải dữ liệu người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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

  // Handle role filter change
  const handleRoleChange = (value) => {
    setFilters({
      ...filters,
      role: value,
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
      role: null,
      status: null,
    });
    setPagination({
      ...pagination,
      current: 1,
    });
  };

  // Add new user
  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setVisible(true);
  };

  // Edit existing user
  const handleEditUser = (record) => {
    setEditingUser(record);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      phone: record.phone,
      role: record.role,
      status: record.status,
    });
    setVisible(true);
  };

  // Delete user
  const handleDeleteUser = (id) => {
    Modal.confirm({
      title: 'Xóa người dùng',
      content: 'Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        // In a real app, you would call an API here
        setUsers(users.filter((user) => user.id !== id));
        message.success('Đã xóa người dùng thành công');
      },
    });
  };

  // Block/Unblock user
  const handleToggleUserStatus = (user) => {
    const newStatus = user.status === 'active' ? 'blocked' : 'active';
    const confirmTitle = newStatus === 'active' ? 'Mở khóa người dùng' : 'Khóa người dùng';
    const confirmContent =
      newStatus === 'active'
        ? 'Bạn có chắc chắn muốn mở khóa người dùng này?'
        : 'Bạn có chắc chắn muốn khóa người dùng này?';

    Modal.confirm({
      title: confirmTitle,
      content: confirmContent,
      okText: 'Đồng ý',
      okType: newStatus === 'active' ? 'primary' : 'danger',
      cancelText: 'Hủy',
      onOk() {
        // In a real app, you would call an API here
        setUsers(
          users.map((item) => (item.id === user.id ? { ...item, status: newStatus } : item))
        );
        message.success(`Đã ${newStatus === 'active' ? 'mở khóa' : 'khóa'} người dùng thành công`);
      },
    });
  };

  // Open reset password modal
  const handleResetPassword = (userId) => {
    setSelectedUserId(userId);
    passwordForm.resetFields();
    setResetPasswordVisible(true);
  };

  // Submit user form
  const handleUserSubmit = (values) => {
    const { name, email, phone, role, status } = values;

    // Prepare user data
    const userData = {
      name,
      email,
      phone,
      role,
      status,
    };

    if (editingUser) {
      // Update existing user
      userData.id = editingUser.id;
      userData.created = editingUser.created;
      userData.lastLogin = editingUser.lastLogin;
      userData.bookings = editingUser.bookings;

      setUsers(users.map((user) => (user.id === editingUser.id ? { ...userData } : user)));

      message.success('Cập nhật người dùng thành công');
    } else {
      // Add new user
      userData.id = `U${10000 + users.length}`;
      userData.created = new Date();
      userData.lastLogin = null;
      userData.bookings = 0;

      setUsers([...users, userData]);
      message.success('Thêm người dùng mới thành công');
    }

    setVisible(false);
  };

  // Submit password reset form
  const handlePasswordSubmit = (values) => {
    // In a real app, you would call an API here to reset the password
    message.success('Đã đặt lại mật khẩu thành công');
    setResetPasswordVisible(false);
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((part) => part[0])
      .slice(-2)
      .join('')
      .toUpperCase();
  };

  // Get random color for avatar
  const getAvatarColor = (id) => {
    const colors = [
      '#1890ff',
      '#13c2c2',
      '#52c41a',
      '#faad14',
      '#722ed1',
      '#eb2f96',
      '#f5222d',
      '#fa541c',
      '#fa8c16',
      '#a0d911',
    ];
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Table columns
  const columns = [
    {
      title: 'Người dùng',
      key: 'user',
      render: (_, record) => (
        <div className="flex items-center">
          <Avatar style={{ backgroundColor: getAvatarColor(record.id) }} size="large">
            {getInitials(record.name)}
          </Avatar>
          <div className="ml-3">
            <div className="font-medium">{record.name}</div>
            <div className="text-gray-500 text-xs">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Vai trò',
      key: 'role',
      render: (_, record) => (
        <>
          {record.role === 'ADMIN' && <Tag color="red">Quản trị viên</Tag>}
          {record.role === 'STAFF' && <Tag color="blue">Nhân viên</Tag>}
          {record.role === 'USER' && <Tag color="green">Người dùng</Tag>}
        </>
      ),
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <>
          {record.status === 'active' && <Tag color="success">Hoạt động</Tag>}
          {record.status === 'inactive' && <Tag color="default">Không hoạt động</Tag>}
          {record.status === 'blocked' && <Tag color="error">Đã khóa</Tag>}
        </>
      ),
    },
    {
      title: 'Đặt vé',
      dataIndex: 'bookings',
      key: 'bookings',
      align: 'center',
      sorter: (a, b) => a.bookings - b.bookings,
    },
    {
      title: 'Ngày tạo',
      key: 'created',
      render: (_, record) => record.created.toLocaleDateString('vi-VN'),
      sorter: (a, b) => a.created - b.created,
    },
    {
      title: 'Đăng nhập gần nhất',
      key: 'lastLogin',
      render: (_, record) =>
        record.lastLogin ? (
          record.lastLogin.toLocaleDateString('vi-VN')
        ) : (
          <span className="text-gray-400">Chưa đăng nhập</span>
        ),
      sorter: (a, b) => {
        if (!a.lastLogin && !b.lastLogin) return 0;
        if (!a.lastLogin) return 1;
        if (!b.lastLogin) return -1;
        return b.lastLogin - a.lastLogin;
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Chỉnh sửa">
            <Button icon={<EditOutlined />} size="small" onClick={() => handleEditUser(record)} />
          </Tooltip>

          <Tooltip title="Đặt lại mật khẩu">
            <Button
              icon={<LockOutlined />}
              size="small"
              onClick={() => handleResetPassword(record.id)}
            />
          </Tooltip>

          <Tooltip title={record.status === 'active' ? 'Khóa người dùng' : 'Mở khóa'}>
            <Button
              icon={
                record.status === 'active' ? <FaUserSlash size={12} /> : <FaUserShield size={12} />
              }
              size="small"
              danger={record.status === 'active'}
              type={record.status !== 'active' ? 'primary' : 'default'}
              onClick={() => handleToggleUserStatus(record)}
            />
          </Tooltip>

          {record.role !== 'ADMIN' && (
            <Tooltip title="Xóa">
              <Button
                danger
                icon={<DeleteOutlined />}
                size="small"
                onClick={() => handleDeleteUser(record.id)}
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
        title="Quản lý người dùng | CineBee Admin"
        description="Quản lý người dùng - CineBee Admin Dashboard"
      />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FaUsers className="mr-2 text-blue-500" />
          Quản lý người dùng
        </h1>

        <div className="flex space-x-2">
          <Button type="primary" icon={<FaUserPlus size={14} />} onClick={handleAddUser}>
            Thêm người dùng
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Input
              placeholder="Tìm kiếm tên, email, số điện thoại..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={filters.search}
              onChange={handleSearchChange}
              allowClear
            />
          </div>

          <div>
            <Select
              placeholder="Vai trò"
              value={filters.role}
              onChange={handleRoleChange}
              allowClear
              className="w-full"
            >
              <Option value="ADMIN">Quản trị viên</Option>
              <Option value="STAFF">Nhân viên</Option>
              <Option value="USER">Người dùng</Option>
            </Select>
          </div>

          <div>
            <Select
              placeholder="Trạng thái"
              value={filters.status}
              onChange={handleStatusChange}
              allowClear
              className="w-full"
            >
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Không hoạt động</Option>
              <Option value="blocked">Đã khóa</Option>
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
          dataSource={users}
          rowKey="id"
          pagination={pagination}
          onChange={handleTableChange}
          loading={loading}
          scroll={{ x: 'max-content' }}
        />
      </div>

      {/* Add/Edit User Modal */}
      <Modal
        title={editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng mới'}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleUserSubmit}>
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
          >
            <Input placeholder="Nhập họ và tên đầy đủ" prefix={<UserOutlined />} />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input placeholder="Nhập địa chỉ email" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
              initialValue="USER"
            >
              <Select placeholder="Chọn vai trò">
                <Option value="ADMIN">Quản trị viên</Option>
                <Option value="STAFF">Nhân viên</Option>
                <Option value="USER">Người dùng</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
              initialValue="active"
            >
              <Select placeholder="Chọn trạng thái">
                <Option value="active">Hoạt động</Option>
                <Option value="inactive">Không hoạt động</Option>
                <Option value="blocked">Đã khóa</Option>
              </Select>
            </Form.Item>
          </div>

          {!editingUser && (
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-blue-700 text-sm">
                <strong>Lưu ý:</strong> Mật khẩu mặc định sẽ được tạo và gửi qua email cho người
                dùng.
              </p>
            </div>
          )}

          <Form.Item className="mb-0">
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setVisible(false)}>Hủy</Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<FaUserEdit size={14} className="mr-1" />}
              >
                {editingUser ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        title="Đặt lại mật khẩu"
        visible={resetPasswordVisible}
        onCancel={() => setResetPasswordVisible(false)}
        footer={null}
      >
        <Form form={passwordForm} layout="vertical" onFinish={handlePasswordSubmit}>
          <div className="mb-4">
            <p className="text-gray-600">Chọn cách đặt lại mật khẩu cho người dùng:</p>
          </div>

          <Form.Item name="resetType" initialValue="auto">
            <Select>
              <Option value="auto">Tạo mật khẩu ngẫu nhiên và gửi qua email</Option>
              <Option value="manual">Nhập mật khẩu mới thủ công</Option>
            </Select>
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.resetType !== currentValues.resetType
            }
          >
            {({ getFieldValue }) =>
              getFieldValue('resetType') === 'manual' ? (
                <>
                  <Form.Item
                    name="password"
                    label="Mật khẩu mới"
                    rules={[
                      { required: true, message: 'Vui lòng nhập mật khẩu' },
                      { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
                    ]}
                  >
                    <Input.Password placeholder="Nhập mật khẩu mới" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Xác nhận mật khẩu"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Vui lòng xác nhận mật khẩu' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Hai mật khẩu không khớp!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password placeholder="Xác nhận mật khẩu mới" />
                  </Form.Item>
                </>
              ) : (
                <div className="bg-blue-50 p-3 rounded-lg mb-4">
                  <p className="text-blue-700 text-sm">
                    Hệ thống sẽ tạo một mật khẩu ngẫu nhiên và gửi tới email của người dùng.
                  </p>
                </div>
              )
            }
          </Form.Item>

          <Form.Item name="requireChange" valuePropName="checked" initialValue={true}>
            <Switch checkedChildren="Có" unCheckedChildren="Không" className="mr-2" />
            <span>Yêu cầu đổi mật khẩu khi đăng nhập lần đầu</span>
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setResetPasswordVisible(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                Đặt lại mật khẩu
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
