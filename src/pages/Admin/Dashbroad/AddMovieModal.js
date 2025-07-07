import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Modal, Select, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;
const { Option } = Select;

// Danh sách thể loại phim
const movieGenres = [
  'Hành động',
  'Phiêu lưu',
  'Hoạt hình',
  'Hài hước',
  'Tội phạm',
  'Tài liệu',
  'Drama',
  'Gia đình',
  'Fantasy',
  'Lịch sử',
  'Kinh dị',
  'Âm nhạc',
  'Bí ẩn',
  'Tình cảm',
  'Khoa học viễn tưởng',
  'Thriller',
  'Chiến tranh',
  'Western',
  'Thể thao',
  'Siêu anh hùng',
  'Kinh dị tâm lý',
  'Hài đen',
  'Hành động hài',
  'Tình cảm lãng mạn',
  'Kinh dị siêu nhiên',
  'Khoa học viễn tưởng hành động',
  'Drama tâm lý',
  'Hài gia đình',
  'Thriller tâm lý',
  'Hành động chiến tranh',
];

const AddMovieModal = ({ visible, onCancel, onSuccess, editMovie }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [posterFile, setPosterFile] = useState(null);

  useEffect(() => {
    if (visible) {
      if (editMovie) {
        form.setFieldsValue({
          title: editMovie.title || '',
          othernames: editMovie.othernames || '',
          genre: editMovie.genre || '',
          description: editMovie.description || '',
          basePrice: editMovie.basePrice || undefined,
          duration: editMovie.duration || undefined,
          actors: Array.isArray(editMovie.actors)
            ? editMovie.actors.join(', ')
            : editMovie.actors || '',
          director: editMovie.director || '',
          country: editMovie.country || '',
          releaseDate: editMovie.releaseDate || '',
          posterUrl: editMovie.posterUrl || '',
        });
      } else {
        form.resetFields();
        setPosterFile(null);
      }
    }
  }, [visible, editMovie, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      const movieData = {
        ...values,
        basePrice:
          values.basePrice !== undefined && values.basePrice !== ''
            ? Number(values.basePrice)
            : undefined,
        duration:
          values.duration !== undefined && values.duration !== ''
            ? Number(values.duration)
            : undefined,
      };
      await onSuccess(movieData, posterFile);
      form.resetFields();
      setPosterFile(null);
      onCancel();
    } catch (error) {
      console.error('Error adding/updating movie:', error);
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi thêm/cập nhật phim');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setPosterFile(null);
    onCancel();
  };

  const uploadProps = {
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Chỉ được upload file ảnh!');
        return false;
      }

      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error('File ảnh phải nhỏ hơn 5MB!');
        return false;
      }

      setPosterFile(file);
      return false; // Prevent upload
    },
    onChange: (info) => {
      if (info.file.status === 'removed') {
        setPosterFile(null);
      }
    },
    fileList: posterFile ? [posterFile] : [],
  };

  return (
    <Modal
      title={
        <span style={{ color: '#FFD600', fontWeight: 700, letterSpacing: 1 }}>
          {editMovie ? '🎬 Cập nhật phim' : '🎬 Thêm phim mới'}
        </span>
      }
      open={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={700}
      okText={<span style={{ color: '#fff' }}>{editMovie ? 'Cập nhật phim' : 'Thêm phim'}</span>}
      cancelText={<span style={{ color: '#222' }}>Huỷ</span>}
      className="border-2 border-transparent bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl"
      style={{ padding: 0, background: '#fff' }} // nền trắng
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{}}
        style={{ background: '#fff', borderRadius: 18, padding: 20 }}
      >
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          {/* Cột trái: Thông tin cơ bản */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <Form.Item
              name="title"
              label={<span style={{ fontWeight: 600, color: '#FFD600' }}>Tên phim *</span>}
              rules={[{ required: true, message: t('common.error', 'Vui lòng nhập tên phim!') }]}
            >
              <Input
                placeholder="Nhập tên phim"
                style={{
                  borderColor: '#ddd',
                  background: '#fff',
                  color: '#222',
                  borderRadius: 8,
                  padding: '8px 12px',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
                onBlur={(e) => (e.target.style.borderColor = '#ddd')}
              />
            </Form.Item>
            <Form.Item name="othernames" label={<span style={{ color: '#888' }}>Tên khác</span>}>
              <Input
                placeholder="Tên khác (nếu có)"
                style={{
                  background: '#fff',
                  color: '#222',
                  borderColor: '#ddd',
                  borderRadius: 8,
                  padding: '8px 12px',
                }}
              />
            </Form.Item>
            <Form.Item name="genre" label={<span style={{ color: '#222' }}>Thể loại</span>}>
              <Select
                placeholder="Chọn thể loại"
                allowClear
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{ background: '#fff', color: '#222', borderColor: '#ddd', borderRadius: 8 }}
                dropdownStyle={{ background: '#fff', color: '#222', borderRadius: 8 }}
              >
                {movieGenres.map((genre) => (
                  <Option key={genre} value={genre}>
                    {genre}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="description" label={<span style={{ color: '#222' }}>Mô tả phim</span>}>
              <TextArea
                rows={3}
                placeholder="Mô tả ngắn về phim..."
                style={{
                  background: '#fff',
                  color: '#222',
                  borderColor: '#ddd',
                  borderRadius: 8,
                  padding: '8px 12px',
                }}
              />
            </Form.Item>
          </div>
          {/* Cột phải: Thông tin chi tiết */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <Form.Item
                name="basePrice"
                label={<span style={{ color: '#222' }}>Giá vé (VND)</span>}
                style={{ flex: 1 }}
              >
                <InputNumber
                  placeholder="100000"
                  min={0}
                  style={{
                    width: '100%',
                    background: '#fff',
                    color: '#222',
                    borderColor: '#ddd',
                    borderRadius: 8,
                    padding: '8px 12px',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
                  onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                />
              </Form.Item>
              <Form.Item
                name="duration"
                label={<span style={{ color: '#222' }}>Thời lượng (phút)</span>}
                style={{ flex: 1 }}
              >
                <InputNumber
                  placeholder="120"
                  min={1}
                  style={{
                    width: '100%',
                    background: '#fff',
                    color: '#222',
                    borderColor: '#ddd',
                    borderRadius: 8,
                    padding: '8px 12px',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#FFD600')}
                  onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                />
              </Form.Item>
            </div>
            <Form.Item name="actors" label={<span style={{ color: '#222' }}>Diễn viên</span>}>
              <Input
                placeholder="Nguyen Van A, Tran Thi B"
                style={{
                  background: '#fff',
                  color: '#222',
                  borderColor: '#ddd',
                  borderRadius: 8,
                  padding: '8px 12px',
                }}
              />
            </Form.Item>
            <Form.Item name="director" label={<span style={{ color: '#222' }}>Đạo diễn</span>}>
              <Input
                placeholder="Le Van C"
                style={{
                  background: '#fff',
                  color: '#222',
                  borderColor: '#ddd',
                  borderRadius: 8,
                  padding: '8px 12px',
                }}
              />
            </Form.Item>
            <Form.Item name="country" label={<span style={{ color: '#222' }}>Quốc gia</span>}>
              <Input
                placeholder="Việt Nam"
                style={{
                  background: '#fff',
                  color: '#222',
                  borderColor: '#ddd',
                  borderRadius: 8,
                  padding: '8px 12px',
                }}
              />
            </Form.Item>
            <Form.Item
              name="releaseDate"
              label={<span style={{ color: '#222' }}>Ngày phát hành</span>}
            >
              <Input
                type="date"
                style={{
                  background: '#fff',
                  color: '#222',
                  borderColor: '#ddd',
                  borderRadius: 8,
                  padding: '8px 12px',
                }}
              />
            </Form.Item>
          </div>
        </div>
        {/* Ảnh poster */}
        <div style={{ display: 'flex', gap: 24, marginTop: 8, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <Form.Item name="posterUrl" label={<span style={{ color: '#222' }}>Poster URL</span>}>
              <Input
                placeholder="https://..."
                style={{
                  background: '#fff',
                  color: '#222',
                  borderColor: '#ddd',
                  borderRadius: 8,
                  padding: '8px 12px',
                }}
              />
            </Form.Item>
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <Form.Item label={<span style={{ color: '#222' }}>Upload poster</span>}>
              <Upload {...uploadProps} listType="picture">
                <Button
                  style={{
                    background: 'linear-gradient(90deg,#FFD600,#FF4D4F)',
                    color: '#222',
                    fontWeight: 600,
                    border: 'none',
                    borderRadius: 8,
                  }}
                  icon={<UploadOutlined />}
                >
                  Tải ảnh lên
                </Button>
              </Upload>
              <div style={{ fontSize: 12, color: '#FFD600', marginTop: 8 }}>
                Chấp nhận: JPG, PNG, GIF. Tối đa: 5MB
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default AddMovieModal;
