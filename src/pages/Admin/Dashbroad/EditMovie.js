import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import AddMovieForm from './AddMovieForm';
import { getListMovies, updateMovie } from '../../../services/moviesAPI';
import dayjs from 'dayjs';
import { message } from 'antd';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Nếu có dữ liệu truyền qua state thì ưu tiên dùng luôn
    if (location.state && location.state.movie) {
      const movie = location.state.movie;
      setInitialValues({
        ...movie,
        releaseDate: movie.releaseDate ? dayjs(movie.releaseDate) : null,
      });
      setLoading(false);
    } else {
      // Fallback: gọi API lấy danh sách phim rồi tìm theo id
      const fetchMovie = async () => {
        try {
          setLoading(true);
          const res = await getListMovies(0, 100); // lấy 100 phim đầu
          const movie = res.data.content.find(m => m.id === Number(id));
          if (!movie) throw new Error('Không tìm thấy phim');
          setInitialValues({
            ...movie,
            releaseDate: movie.releaseDate ? dayjs(movie.releaseDate) : null,
          });
        } catch (err) {
          message.error('Không thể tải thông tin phim');
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
    }
  }, [id, location.state]);

  const handleUpdate = async (values, posterFile) => {
    try {
      await updateMovie(id, values, posterFile);
      message.success('Cập nhật phim thành công!');
      navigate('/admin/movies');
    } catch (err) {
      message.error('Cập nhật phim thất bại!');
    }
  };

  if (loading || !initialValues) return <div>Đang tải dữ liệu phim...</div>;

  return (
    <AddMovieForm
      initialValues={initialValues}
      onSubmit={handleUpdate}
      mode="edit"
    />
  );
};

export default EditMovie; 