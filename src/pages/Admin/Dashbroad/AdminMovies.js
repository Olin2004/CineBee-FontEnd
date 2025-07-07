import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  addMovieNew,
  deleteMovie,
  getListMovies,
  searchMovies,
  updateMovie,
} from '../../../services/moviesAPI';
import AddMovieModal from './AddMovieModal';

export default function AdminMovies() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, movie: null });
  const [viewModal, setViewModal] = useState({ open: false, movie: null });
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [editMovie, setEditMovie] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  // Fetch movies from API
  const fetchMovies = async (page = 0) => {
    setLoading(true);
    try {
      const res = await getListMovies(page, 10); // page bắt đầu từ 0
      setMovies(
        res.data.content.map((item) => ({
          ...item,
          key: item.id,
        }))
      );
      setTotal(res.data.totalElements || 0);

      // Nếu page hiện tại > 0 và không còn dữ liệu, chuyển về page trước
      if (page > 0 && res.data.content.length === 0) {
        setCurrentPage(page - 1);
      }
    } catch (err) {
      message.error('Không thể tải danh sách phim');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handleAddOrEditMovie = async (values, posterFile) => {
    try {
      // Xử lý dữ liệu trước khi gửi API
      const processedValues = {
        ...values,
        // Truyền actors là chuỗi đúng như backend yêu cầu
        actors: values.actors || '',
        // Đảm bảo các trường số được convert đúng
        basePrice: values.basePrice ? Number(values.basePrice) : undefined,
        duration: values.duration ? Number(values.duration) : undefined,
        // Xử lý releaseDate nếu có
        releaseDate: values.releaseDate || undefined,
      };

      // Loại bỏ các trường undefined và null
      const cleanValues = Object.fromEntries(
        Object.entries(processedValues).filter(
          ([_, value]) => value !== undefined && value !== null && value !== ''
        )
      );

      if (editMovie) {
        // Sửa phim
        await updateMovie(editMovie.id, cleanValues, posterFile);
        message.success('Cập nhật phim thành công!');
        setEditMovie(null);
      } else {
        // Thêm phim mới
        await addMovieNew(cleanValues, posterFile);
        message.success('Thêm phim thành công!');
      }
      setShowAddModal(false);
      fetchMovies(currentPage);
    } catch (error) {
      console.error('Error adding/updating movie:', error);
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi thêm/cập nhật phim');
    }
  };

  const handleEdit = (movie) => {
    setEditMovie(movie);
    setShowAddModal(true);
  };

  const handleDelete = (movie) => {
    setDeleteModal({ open: true, movie });
  };

  const confirmDelete = async () => {
    try {
      console.log('Deleting movie with ID:', deleteModal.movie.id);
      console.log('Movie to delete:', deleteModal.movie);

      await deleteMovie(deleteModal.movie.id);
      message.success('Đã xoá phim thành công!');
      setDeleteModal({ open: false, movie: null });
      fetchMovies(currentPage);
    } catch (error) {
      console.error('Error deleting movie:', error);
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi xoá phim');
    }
  };

  const cancelDelete = () => {
    setDeleteModal({ open: false, movie: null });
  };

  const handleViewDetails = (movie) => {
    setViewModal({ open: true, movie });
  };

  const closeViewModal = () => {
    setViewModal({ open: false, movie: null });
  };

  // Thêm hàm xử lý tìm kiếm
  const handleSearch = async (value) => {
    if (!value) {
      fetchMovies(0);
      return;
    }
    setLoading(true);
    try {
      const res = await searchMovies(value);
      setMovies(
        res.data.content ? res.data.content.map((item) => ({ ...item, key: item.id })) : []
      );
      setTotal(res.data.totalElements || res.data.content?.length || 0);
      setCurrentPage(0);
    } catch (err) {
      message.error('Không tìm thấy phim phù hợp');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Poster',
      dataIndex: 'posterUrl',
      key: 'posterUrl',
      render: (url) => <img src={url} alt="poster" style={{ width: 48, borderRadius: 6 }} />,
    },
    {
      title: 'Tên phim',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => <span style={{ fontWeight: 600 }}>{text}</span>,
    },
    { title: 'Tên khác', dataIndex: 'othernames', key: 'othernames' },
    { title: 'Thể loại', dataIndex: 'genre', key: 'genre' },
    { title: 'Thời lượng', dataIndex: 'duration', key: 'duration', render: (d) => `${d} phút` },
    { title: 'Ngày phát hành', dataIndex: 'releaseDate', key: 'releaseDate' },
    {
      title: 'Giá vé',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (p) => p?.toLocaleString() + ' đ',
    },
    {
      title: 'Đánh giá',
      dataIndex: 'rating',
      key: 'rating',
      render: (r) => (r ? r.toFixed(1) : 'N/A'),
    },
    { title: 'Diễn viên', dataIndex: 'actors', key: 'actors' },
    { title: 'Đạo diễn', dataIndex: 'director', key: 'director' },
    { title: 'Quốc gia', dataIndex: 'country', key: 'country' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            size="small"
            type="default"
            onClick={() => handleViewDetails(record)}
            style={{ color: '#1890ff' }}
          >
            Xem
          </Button>
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
    },
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
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
      />
      <Table
        columns={columns}
        dataSource={movies}
        loading={loading}
        pagination={{
          pageSize: 10,
          current: currentPage + 1, // Table page bắt đầu từ 1
          total: total,
          showSizeChanger: false,
          onChange: (page) => setCurrentPage(page - 1),
        }}
        rowClassName="ant-table-row-hover"
        bordered
        style={{ borderRadius: 8, overflow: 'hidden' }}
      />
      <AddMovieModal
        visible={showAddModal}
        onCancel={() => {
          setShowAddModal(false);
          setEditMovie(null);
        }}
        onSuccess={handleAddOrEditMovie}
        editMovie={editMovie}
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
      {/* Modal xem chi tiết phim */}
      <Modal
        open={viewModal.open}
        onCancel={closeViewModal}
        footer={[
          <Button
            key="close"
            onClick={closeViewModal}
            style={{
              background: 'linear-gradient(90deg, #FFD600 0%, #FF9800 100%)',
              color: '#222',
              fontWeight: 600,
              border: 'none',
              borderRadius: 8,
              padding: '8px 24px',
            }}
          >
            Đóng
          </Button>,
        ]}
        width={800}
        title={
          <span style={{ color: '#FFD600', fontWeight: 700, letterSpacing: 1 }}>
            🎬 Chi tiết phim
          </span>
        }
        className="border-2 border-transparent bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl"
        style={{ padding: 0, background: '#fff' }}
      >
        {viewModal.movie && (
          <div style={{ padding: 20, background: '#fff', borderRadius: 18 }}>
            <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
              {/* Poster */}
              <div style={{ flexShrink: 0 }}>
                <img
                  src={viewModal.movie.posterUrl}
                  alt={viewModal.movie.title}
                  style={{
                    width: 200,
                    height: 300,
                    borderRadius: 12,
                    objectFit: 'cover',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  }}
                />
              </div>

              {/* Thông tin cơ bản */}
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#222',
                    marginBottom: 8,
                    marginTop: 0,
                  }}
                >
                  {viewModal.movie.title}
                </h2>

                {viewModal.movie.othernames && (
                  <p
                    style={{
                      fontSize: 14,
                      color: '#666',
                      marginBottom: 16,
                      fontStyle: 'italic',
                    }}
                  >
                    Tên khác: {viewModal.movie.othernames}
                  </p>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <span style={{ fontWeight: 600, color: '#FFD600' }}>Thể loại:</span>
                    <span style={{ marginLeft: 8, color: '#222' }}>
                      {viewModal.movie.genre || 'Chưa cập nhật'}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontWeight: 600, color: '#FFD600' }}>Thời lượng:</span>
                    <span style={{ marginLeft: 8, color: '#222' }}>
                      {viewModal.movie.duration
                        ? `${viewModal.movie.duration} phút`
                        : 'Chưa cập nhật'}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontWeight: 600, color: '#FFD600' }}>Đạo diễn:</span>
                    <span style={{ marginLeft: 8, color: '#222' }}>
                      {viewModal.movie.director || 'Chưa cập nhật'}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontWeight: 600, color: '#FFD600' }}>Quốc gia:</span>
                    <span style={{ marginLeft: 8, color: '#222' }}>
                      {viewModal.movie.country || 'Chưa cập nhật'}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontWeight: 600, color: '#FFD600' }}>Ngày phát hành:</span>
                    <span style={{ marginLeft: 8, color: '#222' }}>
                      {viewModal.movie.releaseDate || 'Chưa cập nhật'}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontWeight: 600, color: '#FFD600' }}>Giá vé:</span>
                    <span style={{ marginLeft: 8, color: '#222' }}>
                      {viewModal.movie.basePrice
                        ? `${viewModal.movie.basePrice.toLocaleString()} đ`
                        : 'Chưa cập nhật'}
                    </span>
                  </div>

                  <div>
                    <span style={{ fontWeight: 600, color: '#FFD600' }}>Đánh giá:</span>
                    <span style={{ marginLeft: 8, color: '#222' }}>
                      {viewModal.movie.rating
                        ? `${viewModal.movie.rating.toFixed(1)}/10`
                        : 'Chưa có đánh giá'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Diễn viên */}
            {viewModal.movie.actors && (
              <div style={{ marginBottom: 20 }}>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#FFD600',
                    marginBottom: 8,
                    marginTop: 0,
                  }}
                >
                  Diễn viên:
                </h3>
                <p
                  style={{
                    color: '#222',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {Array.isArray(viewModal.movie.actors)
                    ? viewModal.movie.actors.join(', ')
                    : viewModal.movie.actors}
                </p>
              </div>
            )}

            {/* Mô tả */}
            {viewModal.movie.description && (
              <div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#FFD600',
                    marginBottom: 8,
                    marginTop: 0,
                  }}
                >
                  Mô tả:
                </h3>
                <p
                  style={{
                    color: '#222',
                    lineHeight: 1.6,
                    margin: 0,
                    textAlign: 'justify',
                  }}
                >
                  {viewModal.movie.description}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
