import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import AddMovieModal from '../../components/AddMovieModal';

import { moviesAllByLikesPaged } from '../../services/moviesAPI';

const columnsBase = (onEdit) => [
  {
    title: 'Tên phim',
    dataIndex: 'title',
    key: 'title',
    sorter: (a, b) => a.title.localeCompare(b.title),
    render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
  },
  {
    title: 'Thể loại',
    dataIndex: 'genre',
    key: 'genre',
    filters: [
      { text: 'Sci-fi', value: 'Sci-fi' },
      { text: 'Action', value: 'Action' },
      { text: 'Drama', value: 'Drama' },
    ],
    onFilter: (value, record) => record.genre === value,
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'Active' ? 'green' : 'volcano'} style={{ fontWeight: 500 }}>
        {status}
      </Tag>
    ),
    filters: [
      { text: 'Active', value: 'Active' },
      { text: 'Inactive', value: 'Inactive' },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: 'Hành động',
    key: 'action',
    render: (_, record) => (
      <Space>
        <Button
          icon={<EditOutlined />}
          size="small"
          type="primary"
          ghost
          onClick={() => onEdit(record)}
        >
          Sửa
        </Button>
        <Button icon={<DeleteOutlined />} size="small" danger ghost>
          Xóa
        </Button>
      </Space>
    ),
  },
];

export default function AdminMovies() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, movie: null });

  // Fetch movies from API
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await moviesAllByLikesPaged(1, 20); // lấy 20 phim đầu
      setMovies(
        res.data.content.map((item) => ({
          ...item,
          key: item.id,
          status: 'Active',
        }))
      );
    } catch (err) {
      message.error('Không thể tải danh sách phim');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddMovieSuccess = () => {
    setShowAddModal(false);
    fetchMovies(); // reload lại danh sách phim sau khi thêm
  };

  const handleEditMovieSuccess = () => {
    setShowEditModal(false);
    setSelectedMovie(null);
    fetchMovies(); // reload lại danh sách phim sau khi sửa
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setShowEditModal(true);
  };

  const handleDelete = (movie) => {
    setDeleteModal({ open: true, movie });
  };

  const confirmDelete = () => {
    // TODO: Gọi API xoá phim deleteModal.movie
    setDeleteModal({ open: false, movie: null });
    message.success('Đã xoá phim!');
    fetchMovies();
  };

  const cancelDelete = () => {
    setDeleteModal({ open: false, movie: null });
  };

  const columns = [
    ...columnsBase(handleEdit).map((col) =>
      col.key === 'action'
        ? {
            ...col,
            render: (_, record) => (
              <Space>
                <Button
                  icon={<EditOutlined />}
                  size="small"
                  type="primary"
                  ghost
                  onClick={() => handleEdit(record)}
                >
                  Sửa
                </Button>
                <Button
                  icon={<DeleteOutlined />}
                  size="small"
                  danger
                  ghost
                  onClick={() => handleDelete(record)}
                >
                  Xóa
                </Button>
              </Space>
            ),
          }
        : col
    ),
  ];

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.3s',
        minHeight: 500,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          style={{
            borderRadius: 16,
            background: 'linear-gradient(90deg, #FFD600 0%, #FF9800 100%)',
            color: '#222',
            fontWeight: 700,
            boxShadow: '0 4px 16px #ff980033',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
          onClick={() => setShowAddModal(true)}
        >
          Thêm phim mới
        </Button>
      </div>
      <Input.Search
        placeholder="Tìm kiếm phim..."
        style={{ width: 300, marginBottom: 16 }}
        allowClear
        enterButton
      />
      <Table
        columns={columns}
        dataSource={movies}
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowClassName="ant-table-row-hover"
        bordered
        style={{ borderRadius: 8, overflow: 'hidden' }}
      />
      <AddMovieModal
        visible={showAddModal}
        onCancel={() => setShowAddModal(false)}
        onSuccess={handleAddMovieSuccess}
      />
      {/* Modal xác nhận xoá phim */}
      <Modal
        open={deleteModal.open}
        onCancel={cancelDelete}
        onOk={confirmDelete}
        okText="Xoá phim"
        okButtonProps={{ danger: true }}
        cancelText="Huỷ"
        title="Xác nhận xoá phim"
      >
        <div style={{ fontWeight: 500, color: '#e53935' }}>
          Bạn có chắc muốn xoá phim này? Hành động không thể hoàn tác!
        </div>
        <div style={{ marginTop: 8, fontWeight: 600 }}>{deleteModal.movie?.title}</div>
      </Modal>
    </div>
  );
}
