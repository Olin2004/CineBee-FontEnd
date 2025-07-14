import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaFilm, FaEdit, FaTrash, FaEye, FaTh, FaList, FaSearch } from 'react-icons/fa';
import { getListMovies, deleteMovie } from '../../../services/moviesAPI';
import { Spin, message, Pagination, Table, Input, Tooltip, Modal, Button } from 'antd';

const AdminMovies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);
  const [viewMode, setViewMode] = useState('table'); // 'grid' or 'table' - default to table
  const [searchId, setSearchId] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const pageSize = 10; // Fetch movies list
  const fetchMovies = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getListMovies(page - 1, pageSize); // API expects 0-based page

      if (response.data) {
        setMovies(response.data.content || []);
        setTotalMovies(response.data.totalElements || 0);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      message.error('Không thể tải danh sách phim');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  // Filter movies based on search ID
  useEffect(() => {
    if (searchId.trim()) {
      const filtered = movies.filter(
        (movie) =>
          movie.id.toString().includes(searchId.trim()) ||
          movie.title.toLowerCase().includes(searchId.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [movies, searchId]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle search
  const handleSearch = (value) => {
    setSearchId(value);
  };
  const displayMovies = searchId.trim() ? filteredMovies : movies;

  // Copy ID to clipboard
  const copyMovieId = (id) => {
    navigator.clipboard.writeText(id.toString());
    message.success(`Đã copy ID phim: ${id}`);
  };

  // Show movie details modal
  const showMovieDetails = (movie) => {
    setSelectedMovie(movie);
    setIsDetailModalVisible(true);
  };
  // Close movie details modal
  const closeMovieDetails = () => {
    setSelectedMovie(null);
    setIsDetailModalVisible(false);
  }; // Smart refresh after deletion - handles page navigation
  const refreshAfterDelete = async () => {
    try {
      const remainingMoviesOnPage = movies.length - 1;

      // If current page will be empty after deletion and not on first page
      if (remainingMoviesOnPage === 0 && currentPage > 1) {
        const targetPage = currentPage - 1;
        setCurrentPage(targetPage);
        await fetchMovies(targetPage);
      } else {
        // Stay on current page and refresh
        await fetchMovies(currentPage);
      }
    } catch (error) {
      console.error('Error in smart refresh:', error);
      // Fallback: just refresh current page
      await fetchMovies(currentPage);
    }
  }; // Delete movie function
  const handleDeleteMovie = async (movieId) => {
    console.log('Attempting to delete movie with ID:', movieId);

    if (window.confirm(`Bạn có chắc chắn muốn xóa phim ID: ${movieId}?`)) {
      try {
        setLoading(true);
        console.log('Calling deleteMovie API...');
        const response = await deleteMovie(movieId);
        console.log('Delete response:', response);

        // Check for successful deletion
        if (response.status === 200 || response.status === 204) {
          message.success('Xóa phim thành công!');
          console.log('Delete successful, refreshing...');
          // Use smart refresh that handles page navigation
          await refreshAfterDelete();
        } else {
          console.log('Unexpected response status:', response.status);
          message.error(`Có lỗi khi xóa phim (Status: ${response.status})`);
        }
      } catch (error) {
        console.error('Delete movie error:', error);

        let errorMessage = 'Có lỗi khi xóa phim';
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.status === 404) {
          errorMessage = 'Không tìm thấy phim để xóa';
        } else if (error.response?.status === 403) {
          errorMessage = 'Không có quyền xóa phim';
        } else if (error.response?.status === 500) {
          errorMessage = 'Lỗi server khi xóa phim';
        } else if (error.code === 'NETWORK_ERROR') {
          errorMessage = 'Lỗi kết nối mạng';
        }

        message.error(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      console.log('Delete cancelled by user');
    }
  };

  // Table columns for table view
  const tableColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => (
        <div className="flex items-center gap-2">
          <Tooltip title="Click để copy ID">
            <span
              className="font-bold text-blue-600 cursor-pointer hover:text-blue-800 transition-colors"
              onClick={() => copyMovieId(id)}
            >
              #{id}
            </span>
          </Tooltip>
          <button
            onClick={() => copyMovieId(id)}
            className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Copy ID"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      ),
    },
    {
      title: 'Poster',
      dataIndex: 'posterUrl',
      key: 'poster',
      width: 80,
      render: (posterUrl, record) => (
        <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden">
          {posterUrl ? (
            <img src={posterUrl} alt={record.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FaFilm className="text-gray-400" />
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Tên Phim',
      dataIndex: 'title',
      key: 'title',
      render: (title) => <span className="font-medium">{title}</span>,
    },
    {
      title: 'Thể Loại',
      dataIndex: 'genre',
      key: 'genre',
    },
    {
      title: 'Thời Lượng',
      dataIndex: 'duration',
      key: 'duration',
      width: 100,
      render: (duration) => `${duration} phút`,
    },
    {
      title: 'Giá Vé',
      dataIndex: 'basePrice',
      key: 'basePrice',
      width: 120,
      render: (price) => (price ? `${price.toLocaleString('vi-VN')}đ` : 'N/A'),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'releaseDate',
      key: 'status',
      width: 120,
      render: (releaseDate) => {
        if (!releaseDate) {
          return (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
              Chưa có lịch
            </span>
          );
        }
        const isReleased = new Date(releaseDate) <= new Date();
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              isReleased ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}
          >
            {isReleased ? 'Đang chiếu' : 'Sắp chiếu'}
          </span>
        );
      },
    },
    {
      title: 'Hành Động',
      key: 'actions',
      width: 150,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => showMovieDetails(record)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="Xem chi tiết"
          >
            <FaEye />
          </button>
          <button
            onClick={() => {
              navigate(`/admin/movies/edit/${record.id}`);
            }}
            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
            title="Chỉnh sửa"
          >
            <FaEdit />
          </button>{' '}
          <button
            onClick={() => handleDeleteMovie(record.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Xóa phim"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <FaFilm className="text-blue-600" />
                Quản Lý Phim
              </h1>
              <p className="text-gray-600">Quản lý danh sách phim trong hệ thống</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Search by ID */}
              <div className="relative">
                <Input
                  placeholder="Tìm theo ID hoặc tên phim..."
                  prefix={<FaSearch className="text-gray-400" />}
                  value={searchId}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-64"
                  allowClear
                />
              </div>
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FaTh />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                    viewMode === 'table'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FaList />
                  Table
                </button>
              </div>
              <button
                onClick={() => navigate('/admin/movies/add')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
              >
                <FaPlus />
                Thêm Phim Mới
              </button>
            </div>
          </div>
        </div>
        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            {' '}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Danh Sách Phim</h2>
              <div className="text-white text-sm">
                {searchId.trim() ? (
                  <>
                    Tìm thấy: {displayMovies.length} / {totalMovies} phim
                  </>
                ) : (
                  <>Tổng: {totalMovies} phim</>
                )}
              </div>
            </div>
          </div>
          <div className="p-8">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Spin size="large" />
                <span className="ml-3 text-gray-600">Đang tải danh sách phim...</span>
              </div>
            ) : displayMovies.length === 0 ? (
              <div className="text-center py-12">
                {searchId.trim() ? (
                  <>
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <FaSearch className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Không tìm thấy phim
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Không có phim nào khớp với từ khóa "{searchId}"
                    </p>
                    <button
                      onClick={() => setSearchId('')}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Xóa bộ lọc
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                      <FaFilm className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Chưa có phim nào</h3>
                    <p className="text-gray-500 mb-6">
                      Bắt đầu bằng cách thêm phim đầu tiên vào hệ thống
                    </p>
                    <button
                      onClick={() => navigate('/admin/movies/add')}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2 mx-auto"
                    >
                      <FaPlus />
                      Thêm Phim Đầu Tiên
                    </button>
                  </>
                )}
              </div>
            ) : (
              <>
                {viewMode === 'table' /* Table View */ ? (
                  <div className="overflow-x-auto">
                    <Table
                      columns={tableColumns}
                      dataSource={displayMovies}
                      rowKey="id"
                      pagination={false}
                      className="border border-gray-200 rounded-lg"
                      size="middle"
                    />
                  </div>
                ) : (
                  /* Grid View */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {displayMovies.map((movie) => (
                      <div
                        key={movie.id}
                        className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group"
                      >
                        {/* Movie Poster */}
                        <div className="relative h-64 bg-gray-100">
                          {movie.posterUrl ? (
                            <img
                              src={movie.posterUrl}
                              alt={movie.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <FaFilm className="w-16 h-16 text-gray-400" />
                            </div>
                          )}{' '}
                          {/* Action Buttons Overlay */}
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center space-x-3">
                            <button
                              onClick={() => showMovieDetails(movie)}
                              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                              title="Xem chi tiết"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => navigate(`/admin/movies/edit/${movie.id}`)}
                              className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full transition-colors"
                              title="Chỉnh sửa"
                            >
                              <FaEdit />
                            </button>{' '}
                            <button
                              onClick={() => handleDeleteMovie(movie.id)}
                              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                              title="Xóa"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        {/* Movie Info */}
                        <div className="p-4">
                          {' '}
                          {/* Movie ID Badge - Made more prominent */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Tooltip title="Click để copy ID phim">
                                <span
                                  className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-lg shadow-sm cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all"
                                  onClick={() => copyMovieId(movie.id)}
                                >
                                  ID: {movie.id}
                                </span>
                              </Tooltip>
                              {/* Copy ID button */}
                              <button
                                onClick={() => copyMovieId(movie.id)}
                                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                title="Copy ID phim"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
                            {movie.title}
                          </h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>
                              <span className="font-medium">Thể loại:</span> {movie.genre}
                            </p>
                            <p>
                              <span className="font-medium">Thời lượng:</span> {movie.duration} phút
                            </p>
                            <p>
                              <span className="font-medium">Đạo diễn:</span>{' '}
                              {movie.director || 'Chưa cập nhật'}
                            </p>
                            <p>
                              <span className="font-medium">Diễn viên:</span>{' '}
                              {movie.actors || 'Chưa cập nhật'}
                            </p>
                            <p>
                              <span className="font-medium">Giá vé:</span>{' '}
                              {movie.basePrice?.toLocaleString('vi-VN')}đ
                            </p>
                            {movie.discountPercentage && (
                              <p>
                                <span className="font-medium">Giảm giá:</span>{' '}
                                {movie.discountPercentage}%
                              </p>
                            )}
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                movie.releaseDate
                                  ? new Date(movie.releaseDate) <= new Date()
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {movie.releaseDate
                                ? new Date(movie.releaseDate) <= new Date()
                                  ? 'Đang chiếu'
                                  : 'Sắp chiếu'
                                : 'Chưa có lịch chiếu'}
                            </span>
                            {movie.releaseDate && (
                              <span className="text-xs text-gray-500">
                                {new Date(movie.releaseDate).toLocaleDateString('vi-VN')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}{' '}
                {/* Pagination */}
                {!searchId.trim() && totalMovies > pageSize && (
                  <div className="flex justify-center mt-8">
                    <Pagination
                      current={currentPage}
                      total={totalMovies}
                      pageSize={pageSize}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                      showQuickJumper
                      showTotal={(total, range) => `${range[0]}-${range[1]} của ${total} phim`}
                    />
                  </div>
                )}
                {searchId.trim() && displayMovies.length > 10 && (
                  <div className="text-center mt-8 text-gray-500">
                    Hiển thị tất cả {displayMovies.length} kết quả tìm kiếm
                  </div>
                )}
              </>
            )}{' '}
          </div>
        </div>
      </div>

      {/* Movie Details Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3">
            <FaFilm className="text-blue-600" />
            <span>Chi Tiết Phim</span>
          </div>
        }
        open={isDetailModalVisible}
        onCancel={closeMovieDetails}
        footer={[
          <Button key="close" onClick={closeMovieDetails}>
            Đóng
          </Button>,
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              navigate(`/admin/movies/edit/${selectedMovie?.id}`);
              closeMovieDetails();
            }}
          >
            Chỉnh Sửa
          </Button>,
        ]}
        width={800}
        className="movie-detail-modal"
      >
        {selectedMovie && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Poster */}
            <div className="md:col-span-1">
              <div className="w-full h-80 bg-gray-100 rounded-lg overflow-hidden">
                {selectedMovie.posterUrl ? (
                  <img
                    src={selectedMovie.posterUrl}
                    alt={selectedMovie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaFilm className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* Movie Info */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold rounded-lg shadow-sm">
                    ID: {selectedMovie.id}
                  </span>
                  <button
                    onClick={() => copyMovieId(selectedMovie.id)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Copy ID phim"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedMovie.title}</h2>
                {selectedMovie.othernames && (
                  <p className="text-gray-600 mb-3">{selectedMovie.othernames}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Thể loại:</span>
                  <p className="text-gray-600">{selectedMovie.genre}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Thời lượng:</span>
                  <p className="text-gray-600">{selectedMovie.duration} phút</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Đạo diễn:</span>
                  <p className="text-gray-600">{selectedMovie.director || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Quốc gia:</span>
                  <p className="text-gray-600">{selectedMovie.country || 'Chưa cập nhật'}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Giá vé:</span>
                  <p className="text-gray-600">
                    {selectedMovie.basePrice?.toLocaleString('vi-VN')}đ
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Ngày phát hành:</span>
                  <p className="text-gray-600">
                    {selectedMovie.releaseDate
                      ? new Date(selectedMovie.releaseDate).toLocaleDateString('vi-VN')
                      : 'Chưa có lịch chiếu'}
                  </p>
                </div>
                {selectedMovie.discountPercentage && (
                  <div>
                    <span className="font-medium text-gray-700">Giảm giá:</span>
                    <p className="text-gray-600">{selectedMovie.discountPercentage}%</p>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Trạng thái:</span>
                  <span
                    className={`inline-block ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      selectedMovie.releaseDate
                        ? new Date(selectedMovie.releaseDate) <= new Date()
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {selectedMovie.releaseDate
                      ? new Date(selectedMovie.releaseDate) <= new Date()
                        ? 'Đang chiếu'
                        : 'Sắp chiếu'
                      : 'Chưa có lịch chiếu'}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-medium text-gray-700">Diễn viên:</span>
                <p className="text-gray-600 mt-1">{selectedMovie.actors || 'Chưa cập nhật'}</p>
              </div>

              {selectedMovie.description && (
                <div>
                  <span className="font-medium text-gray-700">Mô tả:</span>
                  <p className="text-gray-600 mt-1">{selectedMovie.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminMovies;
