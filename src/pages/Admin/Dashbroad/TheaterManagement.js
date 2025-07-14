import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Modal,
  Form,
  Tabs,
  Card,
  Row,
  Col,
  Tag,
  message,
  Tooltip,
  Select,
} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { FaTheaterMasks, FaChair, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import SEO from '../../../components/SEO/SEO';

const { TabPane } = Tabs;

// Mock data for theaters
const mockTheaters = [
  {
    id: 1,
    name: 'CGV Vincom Center',
    address: '191 Bà Triệu, Hai Bà Trưng, Hà Nội',
    phone: '024 3974 3333',
    email: 'customer@cgv.vn',
    description: 'Rạp chiếu phim hiện đại với công nghệ hình ảnh và âm thanh tốt nhất',
    facilities: ['IMAX', '4DX', 'Dolby Atmos', 'Gold Class'],
    openTime: '9:00',
    closeTime: '23:00',
    status: 'active',
    rooms: [
      { id: 101, name: 'Room 1', type: 'standard', capacity: 120, layout: '10x12' },
      { id: 102, name: 'Room 2', type: 'standard', capacity: 100, layout: '10x10' },
      { id: 103, name: 'Room 3', type: 'standard', capacity: 80, layout: '8x10' },
      { id: 104, name: 'Room 4', type: 'standard', capacity: 80, layout: '8x10' },
      { id: 105, name: 'VIP Room', type: 'vip', capacity: 40, layout: '5x8' },
    ],
  },
  {
    id: 2,
    name: 'Beta Cineplex Mỹ Đình',
    address: 'Tầng hầm B1, tòa nhà The Garden, Mỹ Đình, Hà Nội',
    phone: '024 3795 5555',
    email: 'info@betacinemas.vn',
    description: 'Hệ thống rạp chiếu phim giá rẻ, chất lượng tốt',
    facilities: ['Digital Projection', 'Dolby Sound', 'MX4D'],
    openTime: '8:30',
    closeTime: '22:30',
    status: 'active',
    rooms: [
      { id: 201, name: 'Hall A', type: 'standard', capacity: 150, layout: '12x13' },
      { id: 202, name: 'Hall B', type: 'standard', capacity: 120, layout: '10x12' },
      { id: 203, name: 'Hall C', type: 'standard', capacity: 100, layout: '10x10' },
      { id: 204, name: 'Premium', type: 'vip', capacity: 50, layout: '5x10' },
    ],
  },
  {
    id: 3,
    name: 'Lotte Cinema Hà Nội',
    address: 'Tầng 7, TTTM Lotte Center, 54 Liễu Giai, Ba Đình, Hà Nội',
    phone: '024 3333 4567',
    email: 'customer@lotte.vn',
    description: 'Hệ thống rạp phim Hàn Quốc với công nghệ hiện đại',
    facilities: ['Super Plex G', '3D Cinema', 'Charlotte Dining'],
    openTime: '9:00',
    closeTime: '23:30',
    status: 'active',
    rooms: [
      { id: 301, name: 'Cinema 1', type: 'standard', capacity: 140, layout: '10x14' },
      { id: 302, name: 'Cinema 2', type: 'standard', capacity: 120, layout: '10x12' },
      { id: 303, name: 'Cinema 3', type: 'standard', capacity: 100, layout: '10x10' },
      { id: 304, name: 'IMAX', type: 'special', capacity: 180, layout: '12x15' },
    ],
  },
  {
    id: 4,
    name: 'Galaxy Cinema Nguyễn Du',
    address: '116 Nguyễn Du, Hai Bà Trưng, Hà Nội',
    phone: '024 3941 2323',
    email: 'info@galaxycine.vn',
    description: 'Rạp phim Việt với giá vé hợp lý, nhiều chương trình khuyến mãi',
    facilities: ['Dolby Surround 7.1', '2K Digital Projection'],
    openTime: '8:00',
    closeTime: '22:00',
    status: 'maintenance',
    rooms: [
      { id: 401, name: 'Screen 1', type: 'standard', capacity: 130, layout: '10x13' },
      { id: 402, name: 'Screen 2', type: 'standard', capacity: 110, layout: '10x11' },
      { id: 403, name: 'Screen 3', type: 'standard', capacity: 90, layout: '9x10' },
      { id: 404, name: '4DX', type: 'special', capacity: 80, layout: '8x10' },
    ],
  },
];

const TheaterManagement = () => {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [roomModalVisible, setRoomModalVisible] = useState(false);
  const [editingTheater, setEditingTheater] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [currentTheater, setCurrentTheater] = useState(null);
  const [theaterForm] = Form.useForm();
  const [roomForm] = Form.useForm();
  const [searchText, setSearchText] = useState('');

  // Load theater data
  useEffect(() => {
    const fetchTheaters = async () => {
      setLoading(true);
      try {
        // Simulate API call with a delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Filter theaters based on search
        let filteredData = [...mockTheaters];

        if (searchText) {
          const searchLower = searchText.toLowerCase();
          filteredData = filteredData.filter(
            (theater) =>
              theater.name.toLowerCase().includes(searchLower) ||
              theater.address.toLowerCase().includes(searchLower)
          );
        }

        setTheaters(filteredData);
      } catch (error) {
        console.error('Failed to fetch theaters:', error);
        message.error('Không thể tải dữ liệu rạp chiếu');
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, [searchText]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Add new theater
  const handleAddTheater = () => {
    setEditingTheater(null);
    theaterForm.resetFields();
    setVisible(true);
  };

  // Edit existing theater
  const handleEditTheater = (record) => {
    setEditingTheater(record);
    theaterForm.setFieldsValue({
      name: record.name,
      address: record.address,
      phone: record.phone,
      email: record.email,
      description: record.description,
      facilities: record.facilities.join(', '),
      openTime: record.openTime,
      closeTime: record.closeTime,
      status: record.status,
    });
    setVisible(true);
  };

  // View theater details
  const handleViewTheater = (record) => {
    setCurrentTheater(record);
  };

  // Delete theater
  const handleDeleteTheater = (id) => {
    Modal.confirm({
      title: 'Xóa rạp chiếu',
      content: 'Bạn có chắc chắn muốn xóa rạp chiếu này? Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setTheaters(theaters.filter((item) => item.id !== id));
        message.success('Đã xóa rạp chiếu thành công');
        if (currentTheater && currentTheater.id === id) {
          setCurrentTheater(null);
        }
      },
    });
  };

  // Submit theater form
  const handleTheaterSubmit = (values) => {
    const { name, address, phone, email, description, facilities, openTime, closeTime, status } =
      values;

    // Convert facilities from comma-separated string to array
    const facilitiesArray = facilities
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item);

    // Prepare theater data
    const theaterData = {
      name,
      address,
      phone,
      email,
      description,
      facilities: facilitiesArray,
      openTime,
      closeTime,
      status,
    };

    if (editingTheater) {
      // Update existing theater
      theaterData.id = editingTheater.id;
      theaterData.rooms = editingTheater.rooms;

      setTheaters(
        theaters.map((item) => (item.id === editingTheater.id ? { ...theaterData } : item))
      );

      if (currentTheater && currentTheater.id === editingTheater.id) {
        setCurrentTheater({ ...theaterData });
      }

      message.success('Cập nhật rạp chiếu thành công');
    } else {
      // Add new theater
      theaterData.id = Math.max(...theaters.map((t) => t.id), 0) + 1;
      theaterData.rooms = [];

      setTheaters([...theaters, theaterData]);
      message.success('Thêm rạp chiếu mới thành công');
    }

    setVisible(false);
  };

  // Add new room
  const handleAddRoom = () => {
    setEditingRoom(null);
    roomForm.resetFields();
    setRoomModalVisible(true);
  };

  // Edit existing room
  const handleEditRoom = (record) => {
    setEditingRoom(record);
    roomForm.setFieldsValue({
      name: record.name,
      type: record.type,
      capacity: record.capacity,
      layout: record.layout,
    });
    setRoomModalVisible(true);
  };

  // Delete room
  const handleDeleteRoom = (roomId) => {
    if (!currentTheater) return;

    Modal.confirm({
      title: 'Xóa phòng chiếu',
      content: 'Bạn có chắc chắn muốn xóa phòng chiếu này?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        const updatedRooms = currentTheater.rooms.filter((room) => room.id !== roomId);
        const updatedTheater = { ...currentTheater, rooms: updatedRooms };

        setTheaters(
          theaters.map((theater) => (theater.id === currentTheater.id ? updatedTheater : theater))
        );

        setCurrentTheater(updatedTheater);
        message.success('Đã xóa phòng chiếu thành công');
      },
    });
  };

  // Submit room form
  const handleRoomSubmit = (values) => {
    if (!currentTheater) return;

    const { name, type, capacity, layout } = values;

    // Prepare room data
    const roomData = {
      name,
      type,
      capacity,
      layout,
    };

    let updatedRooms = [...currentTheater.rooms];

    if (editingRoom) {
      // Update existing room
      roomData.id = editingRoom.id;
      updatedRooms = updatedRooms.map((room) =>
        room.id === editingRoom.id ? { ...roomData } : room
      );
      message.success('Cập nhật phòng chiếu thành công');
    } else {
      // Add new room
      roomData.id = Math.max(...currentTheater.rooms.map((r) => r.id), 0) + 1;
      updatedRooms.push(roomData);
      message.success('Thêm phòng chiếu mới thành công');
    }

    const updatedTheater = { ...currentTheater, rooms: updatedRooms };

    setTheaters(
      theaters.map((theater) => (theater.id === currentTheater.id ? updatedTheater : theater))
    );

    setCurrentTheater(updatedTheater);
    setRoomModalVisible(false);
  };

  // Table columns for theaters
  const theaterColumns = [
    {
      title: 'Tên rạp',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <span className="font-medium">{name}</span>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: 'Liên hệ',
      key: 'contact',
      render: (_, record) => (
        <div>
          <div>
            <FaPhone className="inline mr-1 text-gray-500" size={12} /> {record.phone}
          </div>
        </div>
      ),
    },
    {
      title: 'Giờ mở cửa',
      key: 'hours',
      render: (_, record) => (
        <span>
          {record.openTime} - {record.closeTime}
        </span>
      ),
    },
    {
      title: 'Phòng chiếu',
      key: 'roomCount',
      render: (_, record) => record.rooms.length,
      align: 'center',
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <>
          {record.status === 'active' && <Tag color="success">Hoạt động</Tag>}
          {record.status === 'maintenance' && <Tag color="warning">Bảo trì</Tag>}
          {record.status === 'closed' && <Tag color="error">Đã đóng cửa</Tag>}
        </>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xem chi tiết">
            <Button icon={<EyeOutlined />} size="small" onClick={() => handleViewTheater(record)} />
          </Tooltip>

          <Tooltip title="Chỉnh sửa">
            <Button
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditTheater(record)}
            />
          </Tooltip>

          <Tooltip title="Xóa">
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              onClick={() => handleDeleteTheater(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Table columns for rooms
  const roomColumns = [
    {
      title: 'Tên phòng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <>
          {type === 'standard' && <Tag color="blue">Tiêu chuẩn</Tag>}
          {type === 'vip' && <Tag color="gold">VIP</Tag>}
          {type === 'special' && <Tag color="purple">Đặc biệt</Tag>}
        </>
      ),
    },
    {
      title: 'Sức chứa',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (capacity) => (
        <span>
          {capacity} <FaChair className="inline ml-1 text-gray-500" size={12} />
        </span>
      ),
    },
    {
      title: 'Bố cục',
      dataIndex: 'layout',
      key: 'layout',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button icon={<EditOutlined />} size="small" onClick={() => handleEditRoom(record)} />
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDeleteRoom(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <SEO
        title="Quản lý rạp chiếu | CineBee Admin"
        description="Quản lý rạp chiếu - CineBee Admin Dashboard"
      />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FaTheaterMasks className="mr-2 text-blue-500" />
          Quản lý rạp chiếu
        </h1>

        <div className="flex space-x-2">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTheater}>
            Thêm rạp chiếu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Theater list */}
        <div className="lg:col-span-3 xl:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <Input
              placeholder="Tìm kiếm rạp chiếu..."
              prefix={<SearchOutlined className="text-gray-400" />}
              value={searchText}
              onChange={handleSearchChange}
              allowClear
              className="mb-4"
            />

            <Table
              columns={theaterColumns}
              dataSource={theaters}
              rowKey="id"
              pagination={false}
              loading={loading}
              size="small"
              scroll={{ x: 'max-content' }}
              rowClassName={(record) =>
                record.id === (currentTheater?.id || -1) ? 'bg-blue-50' : ''
              }
              onRow={(record) => ({
                onClick: () => handleViewTheater(record),
                className: 'cursor-pointer hover:bg-gray-50',
              })}
            />
          </div>
        </div>

        {/* Theater details */}
        <div className="lg:col-span-3 xl:col-span-2">
          {currentTheater ? (
            <div className="bg-white rounded-lg shadow-sm">
              <Tabs defaultActiveKey="details" className="p-4">
                <TabPane tab="Thông tin chung" key="details">
                  <div className="p-2">
                    <h2 className="text-xl font-bold mb-4">{currentTheater.name}</h2>

                    <Row gutter={[24, 16]}>
                      <Col span={24} md={12}>
                        <Card title="Thông tin liên hệ" size="small" className="h-full">
                          <p className="mb-3">
                            <FaMapMarkerAlt className="inline mr-2 text-red-500" />
                            {currentTheater.address}
                          </p>
                          <p className="mb-3">
                            <FaPhone className="inline mr-2 text-blue-500" />
                            {currentTheater.phone}
                          </p>
                          <p>
                            <span className="inline-block mr-2">✉️</span>
                            {currentTheater.email}
                          </p>
                        </Card>
                      </Col>

                      <Col span={24} md={12}>
                        <Card title="Thời gian hoạt động" size="small" className="h-full">
                          <p className="mb-3">
                            <span className="font-medium">Giờ mở cửa:</span>{' '}
                            {currentTheater.openTime}
                          </p>
                          <p className="mb-3">
                            <span className="font-medium">Giờ đóng cửa:</span>{' '}
                            {currentTheater.closeTime}
                          </p>
                          <p>
                            <span className="font-medium">Trạng thái:</span>{' '}
                            {currentTheater.status === 'active' && (
                              <Tag color="success">Hoạt động</Tag>
                            )}
                            {currentTheater.status === 'maintenance' && (
                              <Tag color="warning">Bảo trì</Tag>
                            )}
                            {currentTheater.status === 'closed' && (
                              <Tag color="error">Đã đóng cửa</Tag>
                            )}
                          </p>
                        </Card>
                      </Col>

                      <Col span={24}>
                        <Card title="Mô tả" size="small">
                          <p>{currentTheater.description}</p>
                        </Card>
                      </Col>

                      <Col span={24}>
                        <Card title="Tiện ích" size="small">
                          <div className="flex flex-wrap gap-2">
                            {currentTheater.facilities.map((facility, index) => (
                              <Tag key={index} color="blue">
                                {facility}
                              </Tag>
                            ))}
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </TabPane>

                <TabPane tab={`Phòng chiếu (${currentTheater.rooms.length})`} key="rooms">
                  <div className="p-2">
                    <div className="flex justify-end mb-4">
                      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRoom}>
                        Thêm phòng
                      </Button>
                    </div>

                    <Table
                      columns={roomColumns}
                      dataSource={currentTheater.rooms}
                      rowKey="id"
                      pagination={false}
                    />
                  </div>
                </TabPane>
              </Tabs>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <FaTheaterMasks className="mx-auto text-gray-300 mb-4" size={48} />
              <h3 className="text-xl font-medium text-gray-500">
                Chọn một rạp chiếu để xem chi tiết
              </h3>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Theater Modal */}
      <Modal
        title={editingTheater ? 'Chỉnh sửa rạp chiếu' : 'Thêm rạp chiếu mới'}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={700}
      >
        <Form form={theaterForm} layout="vertical" onFinish={handleTheaterSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="name"
              label="Tên rạp chiếu"
              rules={[{ required: true, message: 'Vui lòng nhập tên rạp chiếu' }]}
            >
              <Input placeholder="Nhập tên rạp chiếu" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
              initialValue="active"
            >
              <Select>
                <Select.Option value="active">Hoạt động</Select.Option>
                <Select.Option value="maintenance">Bảo trì</Select.Option>
                <Select.Option value="closed">Đã đóng cửa</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
          >
            <Input placeholder="Nhập địa chỉ đầy đủ" />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="openTime"
              label="Giờ mở cửa"
              rules={[{ required: true, message: 'Vui lòng nhập giờ mở cửa' }]}
            >
              <Input placeholder="Ví dụ: 9:00" />
            </Form.Item>

            <Form.Item
              name="closeTime"
              label="Giờ đóng cửa"
              rules={[{ required: true, message: 'Vui lòng nhập giờ đóng cửa' }]}
            >
              <Input placeholder="Ví dụ: 23:00" />
            </Form.Item>
          </div>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} placeholder="Nhập mô tả về rạp chiếu" />
          </Form.Item>

          <Form.Item
            name="facilities"
            label="Tiện ích"
            help="Nhập các tiện ích, ngăn cách bằng dấu phẩy (,)"
          >
            <Input.TextArea rows={2} placeholder="Ví dụ: IMAX, 4DX, Dolby Atmos, Gold Class" />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setVisible(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                {editingTheater ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add/Edit Room Modal */}
      <Modal
        title={editingRoom ? 'Chỉnh sửa phòng chiếu' : 'Thêm phòng chiếu mới'}
        visible={roomModalVisible}
        onCancel={() => setRoomModalVisible(false)}
        footer={null}
      >
        <Form form={roomForm} layout="vertical" onFinish={handleRoomSubmit}>
          <Form.Item
            name="name"
            label="Tên phòng"
            rules={[{ required: true, message: 'Vui lòng nhập tên phòng' }]}
          >
            <Input placeholder="Ví dụ: Room 1, VIP Room..." />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại phòng"
            rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}
            initialValue="standard"
          >
            <Select>
              <Select.Option value="standard">Tiêu chuẩn</Select.Option>
              <Select.Option value="vip">VIP</Select.Option>
              <Select.Option value="special">Đặc biệt</Select.Option>
            </Select>
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              name="capacity"
              label="Sức chứa"
              rules={[{ required: true, message: 'Vui lòng nhập sức chứa' }]}
            >
              <Input type="number" min={1} placeholder="Số lượng ghế" />
            </Form.Item>

            <Form.Item
              name="layout"
              label="Bố cục"
              rules={[{ required: true, message: 'Vui lòng nhập bố cục' }]}
            >
              <Input placeholder="Ví dụ: 10x12" />
            </Form.Item>
          </div>

          <Form.Item className="mb-0">
            <div className="flex justify-end space-x-2">
              <Button onClick={() => setRoomModalVisible(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                {editingRoom ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TheaterManagement;
