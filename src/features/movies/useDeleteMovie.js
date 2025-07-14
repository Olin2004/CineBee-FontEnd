import { useState } from 'react';
import { Modal, message } from 'antd';
import { deleteMovie } from '../../services/moviesAPI';

export default function useDeleteMovie(onSuccess) {
  const [loading, setLoading] = useState(false);

  const handleDeleteMovie = (id) => {
    Modal.confirm({
      title: 'Xóa phim',
      content: 'Bạn có chắc chắn muốn xóa phim này? Hành động này không thể hoàn tác.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      async onOk() {
        try {
          setLoading(true);
          await deleteMovie(id);
          message.success('Đã xóa phim thành công');
          if (onSuccess) onSuccess();
        } catch (error) {
          message.error('Xóa phim thất bại');
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return { handleDeleteMovie, loading };
} 